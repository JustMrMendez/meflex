import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "firebase/auth";
import { SignOutUser, userStateListener } from "../firebase";
import Cookies from "js-cookie"; // If using js-cookie

interface Props {
	children?: React.ReactNode;
}

export const AuthContext = createContext({
	currentUser: {} as User | null,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	setCurrentUser: (_user: User) => {},
	signOut: () => {},
});

export const AuthProvider = ({ children }: Props) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const unsubscribe = userStateListener((user) => {
			if (user) {
				setCurrentUser(user);
				Cookies.set("userAuth", "true", {
					expires: 1,
					secure: true,
					httpOnly: false,
				}); // Set cookie
			} else {
				setCurrentUser(null);
				Cookies.set("userAuth", "false", {
					expires: 1,
					secure: true,
					httpOnly: false,
				}); // Set cookies
			}
		});

		return () => {
			unsubscribe();
			Cookies.remove("userAuth"); // Ensure cookie is cleared when component unmounts
		};
	}, []);

	const signOut = () => {
		SignOutUser();
		setCurrentUser(null);
		Cookies.remove("userAuth"); // Clear cookie
		navigate("/");
	};

	const value = {
		currentUser,
		setCurrentUser,
		signOut,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};
