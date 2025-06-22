import "./assets/tailwind.css";
import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";

// Lazy import layouts
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const GuestLayout = React.lazy(() => import("./layouts/GuestLayout"));
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));

// Lazy import pages
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const Dashboard = React.lazy(() => import("./pages/Dashbord"));
const Laporan = React.lazy(() => import("./pages/Laporan"));
const Pemasukan = React.lazy(() => import("./pages/Pemasukan"));
const Pengeluaran = React.lazy(() => import("./pages/Pengeluaran"));
const Budgeting = React.lazy(() => import("./pages/Budgeting"));
const About = React.lazy(() => import("./pages/Guest/about"));
const OurTim = React.lazy(() => import("./pages/guest/OurTim"));
const FAQpage = React.lazy(() => import("./pages/guest/FAQpage"));
const Contact = React.lazy(() => import("./pages/guest/Contact"));
const CustomerRivew = React.lazy(() => import("./pages/guest/CustomerReview"));

// Lazy import components
const HeroSection = React.lazy(() => import("./components/HeroSection"));
const Loading = React.lazy(() => import("./components/Loading"));

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Main layout untuk halaman setelah login */}
        <Route path="/main" element={<MainLayout />}>
          <Route path="/main/Dashboard" element={<Dashboard />} />
          <Route path="/main/Laporan" element={<Laporan />} />
          <Route path="/main/Dashboard/Pemasukan" element={<Pemasukan />} />
          <Route path="/main/Dashboard/Pengeluaran" element={<Pengeluaran />} />
          <Route path="/main/Dashboard/Budgeting" element={<Budgeting />} />
        </Route>

        {/* Auth layout untuk halaman login/register/forgot */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* Guest layout untuk halaman home, about, team, FAQ, contact, rivew */}
        <Route element={<GuestLayout />}>
          <Route path="/" element={<HeroSection />} />
          <Route path="/pages/guest/about" element={<About />} />
          <Route path="/pages/guest/OurTim" element={<OurTim />} />
          <Route path="/pages/guest/FAQpage" element={<FAQpage />} />
          <Route path="/pages/guest/Contact" element={<Contact />} />
          <Route path="/pages/guest/CustomerRivew" element={<CustomerRivew />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
