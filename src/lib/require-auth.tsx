import { AuthContext } from "@/lib/context/auth-context";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

function RequireAuth({
	children,
	reload = false,
	to = "/auth/login",
}: {
	children: JSX.Element;
	reload?: boolean;
	to?: string;
}) {
	const { currentUser } = useContext(AuthContext);
	const location = useLocation();

	if (!currentUser && reload) {
		return children;
	}

	if (!currentUser) {
		// Redirect the user to the home page.
		// Please! Close the mustache {{}}
		return (
			<Navigate
				to={`${to}?redirect=${location.pathname}`}
				state={{ from: location }}
				replace
			/>
		);
	}

	return children;
}

export default RequireAuth;
