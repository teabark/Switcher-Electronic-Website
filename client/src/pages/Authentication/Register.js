import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Register({ setAuth }) {
  const [inputs, setInputs] = useState({
    email: "",
    f_name: "",
    l_name: "",
    password: "",
  });

  const { email, f_name, l_name, password } = inputs;

  function onChange(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  const body = { email, f_name, l_name, password };

  async function onSubmitForm(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseResponse = await response.json();

      if (parseResponse.token) {
        localStorage.setItem("token", parseResponse.token);
        localStorage.setItem("user", JSON.stringify(parseResponse.user));
        setAuth(true);
        toast.success("Successfully registered!");
      } else {
        setAuth(false);
        toast.error(parseResponse);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <Fragment>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="p-4 border rounded shadow" style={{ width: "100%", maxWidth: "400px" }}>
          <h2 className="text-center mb-4">Register</h2>
          <form onSubmit={onSubmitForm}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control my-2"
              onChange={onChange}
              value={email}
              required
            />
            <input
              type="text"
              name="f_name"
              placeholder="First Name"
              className="form-control my-2"
              onChange={onChange}
              value={f_name}
              required
            />
            <input
              type="text"
              name="l_name"
              placeholder="Last Name"
              className="form-control my-2"
              onChange={onChange}
              value={l_name}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control my-2"
              onChange={onChange}
              value={password}
              required
            />
            <button className="btn btn-success w-100 mt-3">Submit</button>
          </form>
          <div className="text-center mt-3">
            <Link to="/login">Already have an account? Login</Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Register;
