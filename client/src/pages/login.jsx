import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

const Signup = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("chatAppUser")) {
      navigate("/");
    }
  }, []);

  const toastOptions = {
    position: "bottom-center",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (handleValidation()) {
      const { password, username, email } = values;

      const { data } = await axios.post(loginRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.message, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("chatAppUser", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const handleValidation = () => {
    const { password, username, email } = values;
    if (password === " ") {
      toast.error("Enter a password!", toastOptions);
      return false;
    } else if (username.length === " ") {
      toast.error("enter a Username", toastOptions);
      return false;
    } else if (email === " ") {
      toast.error("enter the corrent email", toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="brand">
          <img src="" alt="" />
          <h1>heading</h1>
        </div>
        <input
          type="text"
          placeholder="username"
          name="username"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          placeholder="email"
          name="email"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          placeholder="password"
          name="password"
          onChange={(e) => handleChange(e)}
        />

        <button type="submit"> </button>
        <span>
          don`t have an account ? <Link to="/signup"> Signup </Link>
        </span>
      </form>
      <ToastContainer />
    </>
  );
};

export default Signup;
