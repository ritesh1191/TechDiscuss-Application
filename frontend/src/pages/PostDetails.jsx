import { useNavigate, useParams } from "react-router-dom";
import Comment from "../components/Comment";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { URL, IF } from "../url";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const PostDetails = () => {
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const fetchPost = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      setPost(res.data);
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(true);
    }
  };

  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(URL + "/api/posts/" + postId, {
        withCredentials: true,
      });
      navigate("/");
      toast.success("Post Deleted Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPostComments = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/comments/post/" + postId);
      setComments(res.data);
      setLoader(false);
    } catch (err) {
      setLoader(true);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPostComments();
  }, [postId]);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        URL + "/api/comments/create",
        {
          comment: comment,
          author: user.username,
          postId: postId,
          userId: user._id,
        },
        { withCredentials: true }
      );
      // fetchPostComments()
      // setComment("")
      window.location.reload(true);
      toast.success("Commented Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-gray-50">
      <NavBar />
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center w-full">
          <Loader />
        </div>
      ) : (
        <div className="px-8 md:px-[200px] mt-8 ">
          <div className="flex justify-between items-center">
            {/* for smaller scrren text will be 2xl and for medium it will be 3xl */}
            <h1 className="text-2xl font-bold text-black md:text-3xl">
              {post.title}
            </h1>
            {user?._id === post?.userId && (
              <div className="flex items-center justify-center space-x-2">
                <p
                  onClick={() => navigate("/edit/" + postId)}
                  className="cursor-pointer transition duration-500 hover:scale-150"
                >
                  <BiEdit />
                </p>
                <p
                  className="cursor-pointer transition duration-500 hover:scale-150"
                  onClick={handleDeletePost}
                >
                  <MdDelete />
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-2 md:mt-4">
            <p>🙋‍♂️@{post.username}</p>
            <div className="flex space-x-2 text-sm">
              <p>⏲️{new Date(post.updatedAt).toString().slice(4, 15)}</p>
              <p>{new Date(post.updatedAt).toString().slice(16, 21)}</p>
            </div>
          </div>
          {/* <img
            className="w-full  mx-auto mt-8"
            src={IF + post.photo}
            alt="Post Image"
          /> */}
          <h1 className="text-lg text-center font-bold mt-10">Description</h1>
          <p className="mx-auto mt-8">{post.desc}</p>
          <div className="flex items-center mt-8 space-x-4 font-semibold">
            <p>Categories:</p>
            <div className="flex justify-center items-center space-x-2">
              {post.categories?.map((c, i) => (
                <>
                  <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">
                    {c}
                  </div>
                </>
              ))}
            </div>
          </div>

          <div className="flex flex-col mt-4">
            <h3 className="mt-6 mb-4 font-semibold">Discussions:</h3>
            {comments?.map((c) => (
              <Comment key={c._id} c={c} post={post} />
            ))}
          </div>
          {/* write a Comment */}
          <div className="flex flex-col mt-4 md:flex-row">
            <input
              onChange={(e) => setComment(e.target.value)}
              className="md:w-[75%] border border-gray-500 rounded outline-0 px-4 md:mr-2 mt-4 md:mt-0"
              type="text"
              placeholder="Write a Comment"
            />
            <button
              onClick={postComment}
              className="bg-black text-sm text-white px-2 py-2 md:w-[25%] mt-4 md:mt-0 transition duration-500 hover:scale-95"
            >
              Add Comment ⬇️
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PostDetails;
