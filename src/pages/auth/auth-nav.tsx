"use client";

import { Link } from "react-router-dom";
// import { Icons } from "@/components/icons";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/mode-toggle";

export function AuthNav() {
	return (
		<div className="md:flex w-full justify-between px-4 py-2">
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem>
						<Link
							to="/"
							className={navigationMenuTriggerStyle()}>
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
