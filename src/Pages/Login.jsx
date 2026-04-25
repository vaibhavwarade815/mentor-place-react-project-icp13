import { useState } from "react";
import "../style/Login.css";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

   const [errors, setErrors] = useState({});

    const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
