import { NavBar } from "@/components/ui-wrap/nav-bar";
import "./App.css";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { useState } from "react";

function App() {
	const [searchTerm, setSearchTerm] = useState("");

	return (
		<ThemeProvider>
			<div className="flex h-screen flex-col justify-between overflow-hidden container mx-auto w-full">
				<NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
				<Outlet />
			</div>
		</ThemeProvider>
	);
}

export default App;
