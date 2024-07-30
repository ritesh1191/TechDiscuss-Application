import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { useContext, useState } from "react";
import Menu from "./Menu.jsx";
import { UserContext } from "../context/UserContext";

const NavBar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const showMenu = () => {
    setMenu(!menu);
  };

  const { user } = useContext(UserContext);

  return (
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4 bg-gray-900">
      <h1 className="text-lg md:text-xl font-extrabold text-white">
        <Link to="/">🛜TechDiscuss</Link>
      </h1>
      {path === "/" && (
        <div className="flex justify-center items-center space-x-0 ">
          <p
            onClick={() =>
              navigate(prompt ? "?search=" + prompt : navigate("/"))
            }
            className="cursor-pointer mr-1 bg-gray-300 px-1 py-1 transform transition duration-500 hover:scale-105"
          >
            <BsSearch />
          </p>
          <input
            onChange={(e) => setPrompt(e.target.value)}
            className="outline-0 px-3 border border-black rounded"
            placeholder="Search a post"
            type="text"
          />
        </div>
      )}
      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
        {user ? (
          <h3 className="text-white transition duration-500 hover:scale-95">
            <Link to="/write">Write Post</Link>
          </h3>
        ) : (
          <h3 className="text-white transition duration-500 hover:scale-95">
            <Link to="/login">Login</Link>
          </h3>
        )}
        {user ? (
          <div onClick={showMenu}>
            <p className="cursor-pointer relative text-white transition duration-500 hover:scale-95">
              <FaBars />
            </p>
            {menu && <Menu />}
          </div>
        ) : (
          <h3 className="text-white">
            <Link to="/register">Register</Link>
          </h3>
        )}
      </div>
      <div onClick={showMenu} className="md:hidden text-lg">
        <p className="cursor-pointer relative text-white">
          <FaBars />
        </p>
        {menu && <Menu />}
      </div>
    </div>
  );
};

export default NavBar;
