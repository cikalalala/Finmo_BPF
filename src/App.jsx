import "./assets/tailwind.css";
import { Route, Routes } from "react-router-dom";
import React from "react";
import { Suspense } from "react";

const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));

const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

const GuestLayout = React.lazy(() => import("./layouts/GuestLayout"));

const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const Dashboard = React.lazy(() => import("./pages/Dashbord"));
const Laporan = React.lazy(() => import("./pages/Laporan"));
const Pemasukan = React.lazy(() => import("./pages/Pemasukan"));
const Pengeluaran = React.lazy(() => import("./pages/Pengeluaran"));
const Budgeting = React.lazy(() => import("./pages/Budgeting"));

const Loading = React.lazy(() => import("./components/Loading"));

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/main" element={<MainLayout />}>
          <Route path="/main/Dashboard" element={<Dashboard />} />
          <Route path="/main/Laporan" element={<Laporan />} />

          <Route path="/main/Dashboard/Pemasukan" element={<Pemasukan />} />
          <Route path="/main/Dashboard/Pengeluaran" element={<Pengeluaran />} />
          <Route path="/main/Dashboard/Budgeting" element={<Budgeting />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

      </Routes>
    </Suspense>
  );
}
