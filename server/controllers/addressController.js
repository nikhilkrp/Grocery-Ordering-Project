import Address from "../models/Address.model.js"



// Add Address : /api/address/add
export const addAddress = async (req, res) => {
    try {
        console.log("📩 Request Body:", req.body); 
        const { address, userId } = req.body
        await Address.create({ ...address, userId })
        res.json({ success: true, message: "Address added SuccessFully" })
    } catch (error) {
        console.log("❌ Error:", error.message);
        res.json({ success: false, message: error.message })

    }
}


// Get Address : /api/address/get
export const getAddress = async (req, res) => {
    try {
         const userId = req.query.userId;
        const addresses = await Address.find({ userId })
        // console.log(addresses)
        res.json({ success: true, addresses })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}


// Update Address : /api/address/update
// export const updateAddress = async (req, res) => {
//     try {
//         const { userId, address } = req.body
//         const addresses = await Address.findByIdAndUpdate({ userId, address })
//         res.json({ success: true, addresses })
//     } catch (error) {
//         console.log(error.message);
//         res.json({ success: false, message: error.message })
//     }
// }