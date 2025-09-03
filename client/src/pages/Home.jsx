import react from "react"
import MainBanner from "../components/MainBanner"
import Categories from "../components/Categories"
import Bestseller from "../components/Bestseller.jsx"

const Home = () => {
    return (
        <div className="mt-10">
            <MainBanner />
            <Categories/>
            <Bestseller/>
        </div>
    )
}

export default Home