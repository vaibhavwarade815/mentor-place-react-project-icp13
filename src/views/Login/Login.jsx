import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ ADD
import "../Login/Login.css";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate(); // ✅ ADD

 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (isSignup && !form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!form.email.includes("@")) {
      newErrors.email = "Enter valid email";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Min 6 characters required";
    }

    return newErrors;
  };

   // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert(isSignup ? "Signup Successful 🚀" : "Login Successful 🔐");

     
      if (!isSignup) {
        navigate("/dashboard");
      }

    
      if (isSignup) {
        setIsSignup(false);
      }


       // Reset form
      setForm({
        name: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="login-container">
      <div className="form-box">
        <h2>{isSignup ? "Create Account" : "Login"}</h2>

        <form onSubmit={handleSubmit}>
          
         
          {isSignup && (
            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>
          )}


{/* EMAIL */}
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          {/* PASSWORD */}
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <button type="submit" className="btn">
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* TOGGLE */}
        <p className="toggle">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <span onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? " Login" : " Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}