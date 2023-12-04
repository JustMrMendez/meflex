/* eslint-disable react-hooks/exhaustive-deps */
import { ThemeProvider } from "@/components/theme-provider";
import { AuthContext } from "@/lib/context/auth-context";
import { AuthNav } from "@/pages/auth/auth-nav";
import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function AuthLayout() {
	const { currentUser } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (currentUser) {
			navigate("/");
		}
	}, [currentUser]);
	return (
		<ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
			<div className="md:container h-screen overflow-hidden w-full flex flex-col justify-start">
				<AuthNav />
				<Outlet />
			</div>
		</ThemeProvider>
	);
}
