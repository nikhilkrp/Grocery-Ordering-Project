import Product from "../models/Product.model.js"
import Order from "../models/Order.model.js"
import stripe from "stripe"
import User from "../models/User.model.js"


// -------------------------------------------------------------------------------------------PLace Order COD :/api/order/cod
export const placeOrderCOD = async (req, res) => {
    try {
        const { userId, items, address } = req.body
        if (!address || items.length == 0) {
            return res.json({ success: false, message: "No Items In Cart" })
        }
        // Calculate Amount Using Items
        let amount = await items.reduce(async (acc, items) => {
            const product = await Product.findById(items.product);
            return (await acc) + product.offerPrice * items.quantity;
        }, 0)

        // Addd charges in product tax(2%) 
        amount += Math.floor(amount * 0.02)

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD"
        });
        return res.json({ success: true, message: "Order Placed SuccessFully" })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}






// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------place order online payment : /api/order/stripe
export const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, address } = req.body
        const { origin } = req.headers;
        if (!address || items.length == 0) {
            return res.json({ success: false, message: "Invalid data" })
        }

        let productData = []
        // Calculate Amount Using Items
        let amount = await items.reduce(async (acc, items) => {
            const product = await Product.findById(items.product);
            productData.push({
                name: product.name,
                price: product.offerPrice,
                quantity: items.quantity,
            })
            return (await acc) + product.offerPrice * items.quantity;
        }, 0)

        // Addd charges in product tax(2%) 
        amount += Math.floor(amount * 0.02)

        const order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "ONLINE"
        });
        //  stripe Gateway Initialize
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

        // create line items for stripe

        const line_items = productData.map((items) => {
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: items.name,
                    },
                    unit_amount: Math.floor(items.price + items.price * 0.02) * 100
                },
                quantity: items.quantity,
            }
        })

        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/loader?next=my-orders`,
            cancel_url: `${origin}/cart`,
            metadata: {
                orderId: order._id.toString(),
                userId,
            }
        })

        return res.json({ success: true, url: session.url })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}


// Stripe WebHooks to verify Payments Action : /stripe
export const stripeWebHooks = async (request, response) => {
    // Stripe gateway initilize
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    const sig = request.headers["stripe-signature"];
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(
            request.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        response.status(400).send(`WebHook ERROR : ${error.message}`)
    }

    //  Handle the Event
    switch (event.type) {
        case "payment_intent.succeeded": {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            // Getting Session Metadata

            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId,
            });

            const { orderId, userId } = session.data[0].metadata;

            // Mark Payment as Paid
            await Order.findByIdAndUpdate(orderId, { isPaid: true })
            // Clear user cart
            await User.findByIdAndUpdate(userId, { cartItems: {} });
            break;
        }
        case "payment_intent.payment_failed": {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            // Getting Session Metadata

            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId,
            });

            const { orderId } = session.data[0].metadata;
            await Order.findByIdAndDelete(orderId);
            break;
        }
        default:
            console.error(`Unhandled event type ${event.type}`)
            break;
    }
    response.json({ recived: true })
}


//-------------------------------------------------------------------------------------- Get Orders by user ID :/api/order/user
export const getUserOrders = async (req, res) => {
    try {

        const { userId } = req.query;
        console.log("UserId from query:", userId);
        if (!userId) {
            return res.json({ success: false, message: "UserId is required" });
        }
        const orders = await Order.find({
            userId,
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        })
        .populate("items.product address")
        .sort({ createdAt: -1 })

        res.json({ success: true, orders })
        // console.log(orders)

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}


//---------------------------------------------------------------------------------------- GetAll Orders (for Seller / admin) : /api/order/seller
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate("items.product address").sort({ createdAt: -1 })
        res.json({ success: true, orders })


    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}