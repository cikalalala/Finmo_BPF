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
const Dashboard = React.lazy(() => import("./pages/Dashbord")); // PASTIKAN PATH INI BENAR: './pages/Dashboard' BUKAN './pages/Dashbord'
const Laporan = React.lazy(() => import("./pages/Laporan"));
const Total = React.lazy(() => import("./pages/Total"));
const About = React.lazy(() => import("./pages/guest/about"));
const OurTim = React.lazy(() => import("./pages/guest/OurTim"));
const FAQpage = React.lazy(() => import("./pages/guest/FAQpage"));
const Contact = React.lazy(() => import("./pages/guest/Contact"));
const CustomerRivew = React.lazy(() => import("./pages/guest/CustomerReview"));
const NotFoundPage = React.lazy(() => import("./components/NotFoundPage")); // Import NotFoundPage

// Lazy import components
const HeroSection = React.lazy(() => import("./components/HeroSection"));
const Loading = React.lazy(() => import("./components/Loading"));
const ErrorBoundary = React.lazy(() => import("./components/ErrorBoundary")); // Import ErrorBoundary

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      {/* Bungkus seluruh Routes dengan ErrorBoundary untuk menangkap error JS di seluruh aplikasi */}
      <ErrorBoundary>
        <Routes>
          {/* Main layout untuk halaman setelah login */}
          <Route path="/main" element={<MainLayout />}>
            {/* Rute index untuk /main agar tidak kosong */}
            <Route index element={<Dashboard />} /> {/* Atau <Navigate to="Dashboard" replace /> */}
            <Route path="Dashboard" element={<Dashboard />} /> {/* Dashboard */}
            <Route path="Laporan" element={<Laporan />} /> {/* Laporan */}
            <Route path="Total" element={<Total />} /> {/* Total */}
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
            <Route path="/About" element={<About />} />
            <Route path="/OurTim" element={<OurTim />} />
            <Route path="/FAQpage" element={<FAQpage />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/CustomerRivew" element={<CustomerRivew />} />
          </Route>

          {/* --- RUTE CATCH-ALL UNTUK 404 NOT FOUND --- */}
          {/* Ini harus menjadi rute TERAKHIR di dalam <Routes> */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary>
    </Suspense>
  );
}