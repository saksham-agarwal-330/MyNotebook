import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const host = "http://localhost:5000";
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [error, setError] = useState("");  // To store error messages
    const [loading, setLoading] = useState(false);  // To handle loading state
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");  // Clear any previous errors
        setLoading(true);  // Show loading state

        // Validate form fields
        if (!credentials.email || !credentials.password) {
            setError("Email and password are required.");
            setLoading(false);
            return;
        }

        try {
            // Send POST request to login
            const response = await fetch(`${host}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password }),
            });

            // Check for failed response
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to log in");
            }

            // Parse response JSON
            const json = await response.json();

            // Handle successful login
            if (json.success) {
                localStorage.setItem('token', json.authToken);  // Store auth token
                navigate("/"); // Redirect to home page
            } else {
                // Handle login failure
                setError(json.error || "Login failed");
            }

        } catch (error) {
            console.error("Error logging in:", error.message);
            setError(error.message);  // Set error message to be displayed
        } finally {
            setLoading(false);  // Hide loading state after the request is complete
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className='container my-4'>
            <h2>Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}  {/* Display error message if any */}
            <form onSubmit={handleSubmit} className='my-4'>
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
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;
