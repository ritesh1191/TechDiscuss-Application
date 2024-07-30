import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useState } from "react";
import axios from "axios";
import { URL } from "../url";
import toast from "react-hot-toast";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post(URL + "/api/auth/register", {
        username,
        email,
        password,
      });
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
      setError(false);
      navigate("/login");
      toast.success("User Registered Successfully");
    } catch (err) {
      setError(true);
      toast.error("Please Fill All Fields Correctly");
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4 bg-gray-900">
        <h1 className="text-lg md:text-xl font-extrabold text-white">
          <Link to="/">🛜TechDiscuss</Link>
        </h1>
        <h3 className="transform transition duration-500 hover:scale-95 text-white">
          <Link to="/login">Login</Link>
        </h3>
      </div>
      <div className="w-full flex justify-center items-center h-[80vh] bg-gray-50">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
          <h1 className="text-xl font-bold text-left">Create an account</h1>
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black rounded outline-0"
            type="text"
            placeholder="Enter your username"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black rounded outline-0"
            type="text"
            placeholder="Enter your email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black rounded outline-0"
            type="password"
            placeholder="Enter your password"
          />
          <button
            onClick={handleRegister}
            className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg transform transition duration-500 hover:scale-95"
          >
            Register
          </button>

          <div className="flex justify-center items-center space-x-3">
            <p>Already have an account?</p>
            <p className="text-gray-500 hover:text-black">
              <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
