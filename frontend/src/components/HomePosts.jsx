import { IF } from "../url.js";

const HomePosts = ({ post }) => {
  return (
    <div className="w-full flex mt-8 space-x-4 bg-gray-100 transform transition duration-500 hover:scale-105">
      {/* left */}
      {/* <div className="w-[20%] h-[200px] flex justify-center items-center">
        <img
          // src={IF + post.photo}
          src="https://w7.pngwing.com/pngs/903/953/png-transparent-question-mark-red-question-mark-capitalization-number-question-check-mark-thumbnail.png"
          alt="image"
          className="h-full w-full object-cover rounded-full"
        />
      </div> */}
      {/* right */}
      <div className="flex flex-col w-[1000%] border border-black rounded px-4 py-2">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          {post.title}
        </h1>
        <div className="flex mb-2 text-sm font-semibold  text-gray-500 items-center justify-between md:mb-4">
          <p>🙋‍♂️@{post.username}</p>
          <div className="flex space-x-2 text-sm">
            <p>⏲️{new Date(post.updatedAt).toString().slice(4, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 21)}</p>
          </div>
        </div>
        <p className="text-sm md:text-lg">
          {post.desc.slice(0, 200) + " ...Read more"}
        </p>
      </div>
    </div>
  );
};

export default HomePosts;
