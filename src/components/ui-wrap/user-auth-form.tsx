/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-expect-error - trying jsx
// @ts-nocheck  - trying jsx
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInUser } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [formFields, setFormFields] = useState({
		email: "",
		password: "",
	});

	const { email, password } = formFields;
	const navigate = useNavigate();

	const resetFormFields = () => {
		setFormFields({ email: "", password: "" });
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);
		try {
			const userCredentials = await signInUser(email, password);

			if (userCredentials) {
				resetFormFields();
				navigate("/");
			}
			setIsLoading(false);
		} catch (error) {
			console.log("Error signing in user: ", error.message);
			setIsLoading(false);
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormFields((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<div className={cn("grid gap-6", className)} {...props}>
			<form onSubmit={handleSubmit}>
				<div className="grid gap-2">
					<div className="grid gap-1">
						<Label className="sr-only" htmlFor="email">
							Email
						</Label>
						<Input
							id="email"
							name="email"
							placeholder="name@example.com"
							type="email"
							value={email}
							onChange={handleChange}
							autoCapitalize="none"
							autoComplete="email"
							autoCorrect="off"
							disabled={isLoading}
						/>
						<Label className="sr-only" htmlFor="password">
							password
						</Label>
						<Input
							id="password"
							name="password"
							placeholder="********"
							type="password"
							value={password}
							onChange={handleChange}
							autoCapitalize="none"
							autoComplete="password"
							autoCorrect="off"
							disabled={isLoading}
						/>
					</div>
					<Button type="submit" disabled={isLoading}>
						{isLoading && (
							<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
						)}
						Login now
					</Button>
				</div>
			</form>
			{/* <div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">
						Or continue with
					</span>
				</div>
			</div>
			<Button variant="outline" type="button" disabled={isLoading}>
				{isLoading ? (
					<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
				) : (
					<Icons.gitHub className="mr-2 h-4 w-4" />
				)}{" "}
				Github
			</Button> */}
		</div>
	);
}
