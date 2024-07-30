import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import ProfilePosts from "../components/ProfilePosts";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const Profile = () => {
  const param = useParams().id;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [updated, setUpdated] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(URL + "/api/users/" + user._id);
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserUpdate = async () => {
    setUpdated(false);
    try {
      const res = await axios.put(
        URL + "/api/users/" + user._id,
        { username, email, password },
        { withCredentials: true }
      );
      // console.log(res.data)
      setUpdated(true);
      navigate("/");
      toast.success("User Updated Successfully");
    } catch (err) {
      console.log(err);
      setUpdated(false);
    }
  };

  const handleUserDelete = async () => {
    try {
      const res = await axios.delete(URL + "/api/users/" + user._id, {
        withCredentials: true,
      });
      setUser(null);
      navigate("/");
      toast.success("User Deleted Successfully");
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(user)
  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/user/" + user._id);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [param]);

  useEffect(() => {
    fetchUserPosts();
  }, [param]);

  return (
    <div>
      <NavBar />
      <div className="min-h-[80vh] px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-start">
        <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0">
          <h1 className="text-xl font-bold mb-4">Your Posts:</h1>
          {posts.length === 0 ? (
            <h3 className="font-bold mt-1">No Posts Avaliable</h3>
          ) : (
            <></>
          )}

          {posts?.map((p) => (
            <>
              <Link to={user ? `/posts/post/${p._id}` : "/login"}>
                <ProfilePosts key={p._id} p={p} />
              </Link>
            </>
          ))}
        </div>
        <div className="md:sticky md:top-12  flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end">
          <div className="flex flex-col space-y-4 items-start">
            <h1 className="text-xl font-bold mb-4">Profile</h1>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="border border-gray-400 rounded outline-0 px-4 py-2 text-black"
              type="text"
              placeholder="Your Username"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="border border-gray-400 rounded outline-0 px-4 py-2 text-black"
              type="email"
              placeholder="Your Email"
            />
            {/* <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="border border-gray-400 outline-0 px-4 py-2 text-black"
              type="password"
              placeholder="Your Password"
            /> */}
            <div className="flex items-center space-x-4 mt-8">
              <button
                onClick={handleUserUpdate}
                className="text-white font-semibold bg-black px-4 py-2  transition duration-500 hover:scale-95"
              >
                Update Details
              </button>
              <button
                onClick={handleUserDelete}
                className="text-white font-semibold bg-black px-4 py-2 transition duration-500 hover:scale-95"
              >
                Delete Account
              </button>
            </div>
            {updated && (
              <h3 className="text-green-500 text-sm text-center mt-4">
                user updated successfully!
              </h3>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
