
import react from "react"

const Newsletter = () => {
    
    return (
        <div className="flex flex-col items-center justify-center text-center space-y-2 mt-14">
            <h1 className="md:text-3xl text-2xl font-semibold">Never Miss a Deal!</h1>
            <p className="md:text-lg text-gray-500/70 pb-8">
                Subscribe to get the latest offers, new arrivals, and exclusive discounts
            </p>
            <form className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12">
                <input
                    className="border border-gray-300 rounded-full h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
                    type="text"
                    placeholder="Enter your email id"
                    required
                />
                <button type="submit" className="md:px-12 px-8 h-full text-white bg-green-700 hover:bg-green-600 transition-all cursor-pointer rounded-full rounded-l-none">
                    Subscribe
                </button>
            </form>
        </div>
    )
}

export default Newsletter