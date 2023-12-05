import { NavBar } from "@/components/ui-wrap/nav-bar";
import "./App.css";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function PrivateApp() {
	const [searchTerm, setSearchTerm] = useState("");

	return (
			<div className="md:container h-screen overflow-hidden w-full flex flex-col justify-start">
				<NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
				<Outlet />
			</div>
	);
}

export default PrivateApp;
