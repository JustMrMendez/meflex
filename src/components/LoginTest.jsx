import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function LoginTest() {
	const [formFields, setFormFields] = useState({
		email: "",
		password: "",
	});
	const { email, password } = formFields;

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields((prev) => ({ ...prev, [name]: value }));
	};

	useEffect(() => {
		console.log(formFields);
	}, [formFields]);
	

	









	const navigate = useNavigate();
	const handleSubmit = async (event) => {
		event.preventDefault();
		
		
		try {
			const userCredentials = await signInUser(email, password);
	
			if (userCredentials) {
				setFormFields({ email: "", password: "" });

				navigate("/");
			
			}
		} catch (error) {
			console.log("Error signing in user: ", error.message);
		}
	};

















	return (
		<form onSubmit={handleSubmit}>
			<input
				type="email"
				name="email"
				value={email}
				onChange={handleChange}
			/>
			<input
				type="password"
				name="password"
				value={password}
				onChange={handleChange}
			/>
			<button type="submit">Submit</button>
		</form>
	);
}

// const navigate = useNavigate();

