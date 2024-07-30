import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { URL } from "../url";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import toast from "react-hot-toast";

const Comment = ({ c, post }) => {
  const { user } = useContext(UserContext);

  const deleteComment = async (id) => {
    try {
      await axios.delete(URL + "/api/comments/" + id, {
        withCredentials: true,
      });
      window.location.reload(true);
      toast.success("Comment Deleted Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="px-2 py-2 my-2 bg-gray-200 rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-600">@{c.author}</h3>
        <div className="flex justify-center items-center space-x-4 ">
          <p className="text-gray-500 text-sm">
            {new Date(c.updatedAt).toString().slice(4, 15)}
          </p>
          <p className="text-gray-500 text-sm">
            {new Date(c.updatedAt).toString().slice(16, 21)}
          </p>
          {user?._id === c?.userId ? (
            <div className="flex items-center justify-center space-x-2">
              <p
                className="cursor-pointer transform transition duration-500 hover:scale-150"
                onClick={() => deleteComment(c._id)}
              >
                <MdDelete />
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <p className="px-4 mt-2">{c.comment}</p>
    </div>
  );
};

export default Comment;
