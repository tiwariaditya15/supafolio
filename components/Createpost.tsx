import { FormEvent } from "react";
import { useAddBlogMutation } from "../app/blogApi";

export default function CreatePost({
  createFlag,
  setCreateFlag,
}: {
  createFlag: boolean;
  setCreateFlag: (flag: boolean) => void;
}): JSX.Element {
  const [createBlog, {}] = useAddBlogMutation();
  const createPost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //  @ts-ignore
    const title = event.target.title.value,
      //  @ts-ignore
      content = event.target.content.value;
    await createBlog({ title, content });
    setCreateFlag(!createFlag);
  };
  return (
    <form
      onSubmit={createPost}
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "1rem auto",
      }}
    >
      <label htmlFor="title">
        Title:
        <input type={"text"} id="title" name="title" />
      </label>
      <label htmlFor="title">
        Content:
        <input type={"text"} id="content" name="content" />
      </label>
      <button type="submit" style={{ width: "max-content" }}>
        Create post
      </button>
    </form>
  );
}
