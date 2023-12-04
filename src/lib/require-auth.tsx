import { AuthContext } from "@/lib/context/auth-context";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

function RequireAuth({ children, to="auth/login", redirect = "/" }: { children: JSX.Element, to?: string, redirect?: string }) {
	const { currentUser } = useContext(AuthContext);
	const location = useLocation();

	if (!currentUser) {
		// Redirect the user to the home page.
		// Please! Close the mustache {{}}
		return <Navigate to={`${to}?redirect=${redirect}`} state={{ from: location }} replace />;
	}

	return children;
}

export default RequireAuth;
