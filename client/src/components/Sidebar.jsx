import {
  LayoutDashboard,
  PlayCircle,
  History,
  User,
  LogOut,
} from "lucide-react";


import { Link } from "react-router-dom";

const Sidebar = () => {
  return (

    <div className="w-72 bg-slate-900 text-white min-h-screen p-8">

      <h1 className="text-3xl font-bold mb-12">

        AI Mock

      </h1>

      <div className="space-y-6">

        <Link className="flex gap-3 items-center hover:text-blue-400" to="/dashboard">
          <LayoutDashboard />
          Dashboard
        </Link>

        <Link className="flex gap-3 items-center hover:text-blue-400" to="/interview-setup">
          <PlayCircle />
          Start Interview
        </Link>

        <Link className="flex gap-3 items-center hover:text-blue-400" to="/history">
          <History />
          History
        </Link>

        <Link className="flex gap-3 items-center hover:text-blue-400" to="/profile">
          <User />
          Profile
        </Link>

        <Link className="flex gap-3 items-center hover:text-red-400" to="/login">
          <LogOut />
          Logout
        </Link>

      </div>

    </div>

  );
};

export default Sidebar;