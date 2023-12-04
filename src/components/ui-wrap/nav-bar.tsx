import React from "react";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons";
import {
	NavigationMenu,
	NavigationMenuItem,
	// NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/mode-toggle";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/lib/context/auth-context";
import { Button } from "@/components/ui/button";
import { SignOutUser } from "@/lib/firebase";

export function NavBar({
	searchTerm,
	setSearchTerm,
}: {
	searchTerm: string;
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) {
	const { currentUser } = useContext(AuthContext);
	// const navigate = useNavigate();

	useEffect(() => {
		console.log(searchTerm);
	}, [searchTerm]);

	return (
		<div className="md:flex w-full justify-between px-4 py-2">
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem>
						<Link
							to="/auth/login"
							className={navigationMenuTriggerStyle()}>
							Log in
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<Link
							to="/auth/register"
							className={navigationMenuTriggerStyle()}>
							Sing Up
						</Link>
					</NavigationMenuItem>
					{currentUser && (
						<NavigationMenuItem>
							<Button onClick={SignOutUser}>Sign Out</Button>
						</NavigationMenuItem>
					)}
				</NavigationMenuList>
			</NavigationMenu>
			<div className="flex items-center space-x-4 p-2">
				<Input
					placeholder="Search"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<ModeToggle />
			</div>
		</div>
	);
}

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<Link
				ref={ref}
				to={props.href as string}
				className={cn(
					"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
					className
				)}
				{...props}>
				<div className="text-sm font-medium leading-none">{title}</div>
				<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
					{children}
				</p>
			</Link>
		</li>
	);
});
ListItem.displayName = "ListItem";
