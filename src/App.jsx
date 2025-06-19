import "./assets/tailwind.css";
import { Route, Routes } from "react-router-dom";
import React from "react";
import { Suspense } from "react";

const GuestLayout = React.lazy(() => import("./layouts/GuestLayout"));

const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const Dashboard = React.lazy(() => import("./pages/Dashbord"));
const Pemasukan = React.lazy(() => import("./pages/Pemasukan"));
const Pengeluaran = React.lazy(() => import("./pages/Pengeluaran"));
const Budgeting = React.lazy(() => import("./pages/Budgeting"));

export default function App() {
  return (
    // <Suspense fallback={<Loading />}>
    <Routes>
      <Route path="/main" element={<MainLayout />}>
        <Route path="/main/Dashboard" element={<Dashboard />} />
        <Route path="/main/Dashboard/Pemasukan" element={<Pemasukan />} />
        <Route path="/main/Dashboard/Pengeluaran" element={<Pengeluaran />} />
        <Route path="/main/Dashboard/Budgeting" element={<Budgeting />} />
      </Route>
    </Routes>
    // </Suspense>
  );
}
