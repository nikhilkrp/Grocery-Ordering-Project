import react from "react"
import MainBanner from "../components/MainBanner"
import Categories from "../components/Categories"
import Bestseller from "../components/Bestseller.jsx"
import BottomBanner from "../components/BottomBanner.jsx"
import Newsletter from "../components/Newsletter.jsx"

const Home = () => {

    return (
        <div className="mt-10">
            <MainBanner />
            <Categories/>
            <Bestseller/>
            <BottomBanner/>
            <Newsletter/>
           
        </div>
    )
}

export default Home