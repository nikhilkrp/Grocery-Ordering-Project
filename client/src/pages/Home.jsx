import react from "react"
import MainBanner from "../components/MainBanner"
import Categories from "../components/Categories"
import Bestseller from "../components/Bestseller.jsx"
import BottomBanner from "../components/BottomBanner.jsx"
import Newsletter from "../components/Newsletter.jsx"
import useOnlineStatus from "../utils/useOnlineStatus.jsx"

const Home = () => {

    const onlineStatus = useOnlineStatus();

    if(onlineStatus===false)return <h1 className="text-red-600 flex items-center align-middle p-32 font-bold text-2xl" >Looks Like you are Offline</h1>

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