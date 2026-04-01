/**
 * MainLayout.jsx
 * Path: src/layouts/MainLayout.jsx
 *
 * SiteBackground একবার এখানে বসালেই সারা সাইটে কাজ করবে।
 * About / Skills / Hero — সব section-এ background দেখা যাবে।
 * প্রতিটা section-এ bg-[#030712] নেই, তাই SiteBackground সরাসরি দেখা যায়।
 */

import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SiteBackground from "../components/background/SiteBackground";

const MainLayout = () => {
    return (
        <div className="relative min-h-screen">
            {/*
        ─── SiteBackground ───
        fixed position — সারা সাইটে একটাই instance লাগে।
        সব section-এর পেছনে থাকবে।
        variant="default"  → 28 particles, normal glow, grid, grain
        variant="intense"  → 45 particles, stronger glow (Hero-র জন্য ভালো)
        variant="minimal"  → 10 particles, subtle (Contact-এর জন্য ভালো)
      */}
            <SiteBackground variant="default" />

            {/* Navbar */}
            <Navbar />

            {/* Page content */}
            <main className="relative z-10">
                <Outlet />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default MainLayout;