import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Home, { getMovies } from "@/pages/Home.tsx";
import MoviePage, { getMovie } from "@/pages/MoviePage.tsx";
import Login from "@/pages/auth/Login.tsx";
import AuthLayout from "@/pages/auth/AuthLayout.tsx";
import { AuthProvider } from "@/lib/context/auth-context.tsx";
import RequireAuth from "@/lib/require-auth.tsx";

const withAuthProvider = (
	Component,
	requireAuth = false,
	reload = false
) => {
	return (
		<AuthProvider>
			{requireAuth ? (
				<RequireAuth reload={reload}>
					<Component />
				</RequireAuth>
			) : (
				<Component />
			)}
		</AuthProvider>
	);
};

const router = createBrowserRouter([
	{
		path: "/",
		element: withAuthProvider(App, true, true),
		children: [
			{
				path: "/",
				element: <Home />,
				loader: getMovies,
			},
		],
	},
	{
		path: "movie/:id",
		element: <MoviePage />,
		loader: getMovie,
	},
	{
		path: "auth",
		element: withAuthProvider(AuthLayout),
		children: [
			{
				path: "login",
				element: <Login />,
			},
		],
	},
	{
		path: "*",
		element: <div>404</div>,
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router}></RouterProvider>
	</React.StrictMode>
);
