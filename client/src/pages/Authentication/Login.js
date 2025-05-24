import { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Login({ setAuth }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "", // fixed typo here
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseResponse = await response.json();

      if (parseResponse.token) {
        localStorage.setItem("token", parseResponse.token);
        localStorage.setItem("user", JSON.stringify(parseResponse.user));
        toast.success("Login successfully!");
        setAuth(true);
      } else {
        toast.error(parseResponse);
        setAuth(false);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="p-4 border rounded shadow" style={{ width: "100%", maxWidth: "400px" }}>
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={onSubmitForm}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control my-2"
              value={email}
              onChange={onChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control my-2"
              value={password}
              onChange={onChange}
              required
            />
            <button className="btn btn-success w-100 mt-3">Login</button>
          </form>
          <div className="text-center mt-3">
            <Link to="/register">Don't have an account? Register</Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
