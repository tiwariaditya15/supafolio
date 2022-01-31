import { useDeleteBlogMutation } from "../app/blogApi";
import { Blog as TBlog } from "../types";
import supabase from "../utils/supabase";

export default function Blog({ post }: { post: TBlog }): JSX.Element {
  const [deleteBlog, {}] = useDeleteBlogMutation();
  const deletePost = async (id: string) => {
    await deleteBlog(id);
  };
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <section
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>{post.title}</h1>
        <button
          style={{
            height: "max-content",
          }}
          onClick={() => deletePost(post.id)}
        >
          Delete
        </button>
      </section>
      <p>{post.content}</p>
    </section>
  );
}
