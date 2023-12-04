import { Link, useNavigate } from "react-router-dom";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/mode-toggle";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/lib/context/auth-context";

export function AuthNav() {
	const { currentUser } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (currentUser) {
			navigate("/");
		}
	}, [currentUser, navigate]);

	return (
		<div className="md:flex w-full justify-between px-4 py-2">
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem>
						<Link to="/" className={navigationMenuTriggerStyle()}>
							Home
						</Link>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
			<div className="flex items-center space-x-4 p-2">
				<ModeToggle />
			</div>
		</div>
	);
}
