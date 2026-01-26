import { Outlet } from "react-router"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#010b17] text-white">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
