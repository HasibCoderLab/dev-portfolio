import { Outlet } from "react-router"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import SiteBackground from "../components/background/SiteBackground.jsx";

const MainLayout = () => {
  return (
      <div className="relative">
          <SiteBackground />
          <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
