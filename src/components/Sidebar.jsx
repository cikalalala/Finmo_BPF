import { BiError } from "react-icons/bi";
import {AiFillHome} from "react-icons/ai";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
    const menuClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
     ${isActive
            ? "bg-green-100 text-green-700 font-semibold shadow-sm"
            : "text-gray-600 hover:bg-green-50 hover:text-green-700"
        }`;

    return (
        <aside className="min-h-screen w-full max-w-[240px] bg-white shadow-md px-4 py-6">

            <div className="text-xl font-bold text-green-600 mb-6 text-center">
                💰 FINMO
            </div>


            <ul className="space-y-2">
                <li>
                    <NavLink to="/" className={menuClass}>
                        <AiFillHome className="text-xl" />
                        <span>Dashboard</span>
                    </NavLink>
                </li>

            </ul>
        </aside>
    );
}
