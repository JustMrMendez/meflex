import { AuthContext } from "@/lib/context/auth-context";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

function RequireAuth({
	children,
	reload = false,
	to = "auth/login",
}) {
	const { currentUser } = useContext(AuthContext);
	const location = useLocation();

	if (!currentUser && reload) {
		return children;
	}

	if (!currentUser && !reload) {
		return (
			<Navigate
				to={`${to}/${location.pathname}`}
				state={{ from: location }}
				replace
			/>
		);
	}

	return children;
}

export default RequireAuth;
