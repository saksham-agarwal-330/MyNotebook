import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const host = process.env.HOST || "http://localhost:5000";
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        cpass: ""
    });
    const [error, setError] = useState("");  // To store error messages
    const [loading, setLoading] = useState(false);  // To handle loading state
    const navigate = useNavigate();  // For navigation after successful signup

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");  // Reset any previous errors
        setLoading(true);  // Show loading state

        // Password and confirm password match check
        if (credentials.password !== credentials.cpass) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        // Validate email format
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(credentials.email)) {
            setError("Invalid email format");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${host}/api/auth/createuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to sign up");
            }

            const json = await response.json();
            console.log(json);  // Handle successful signup or response

            // Redirect after successful signup (e.g., to login page)
            navigate("/login");

        } catch (error) {
            console.error("Error signing up:", error.message);
            setError(error.message);  // Set error state to display it to the user
        } finally {
            setLoading(false);  // Hide loading state after request completes
        }
    };

    const onChange = (e) => {
        setCredentials({
            ...credentials, [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="container my-4">
            <h2>Signup</h2>
            {error && <div className="alert alert-danger">{error}</div>}  {/* Display error message if any */}
            <form onSubmit={handleSubmit} className="my-4">
                <div className="mb-3 row">
                    <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={credentials.name}
                            onChange={onChange}
                            required
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={credentials.email}
                            onChange={onChange}
                            required
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            id="password"
                            value={credentials.password}
                            onChange={onChange}
                            required
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="cpass" className="col-sm-2 col-form-label">Confirm Password</label>
                    <div className="col-sm-10">
                        <input
                            type="password"
                            className="form-control"
                            name="cpass"
                            id="cpass"
                            value={credentials.cpass}
                            onChange={onChange}
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Signing up..." : "Signup"}
                </button>
            </form>
        </div>
    );
};

export default SignUp;
