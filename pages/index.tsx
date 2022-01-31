import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../utils/supabase";
import Blog from "../components/Blog";
import CreatePost from "../components/Createpost";
import { Blog as TBlog } from "../types";
import { wrapper } from "../app/store";
import {
  getBlogs,
  useGetBlogsQuery,
  getRunningOperationPromises,
} from "../app/blogApi";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(getBlogs.initiate());
    await Promise.all(getRunningOperationPromises());
    return {
      props: {},
    };
  }
);

export default function Home({}: { blogs?: TBlog[] }) {
  const [createFlag, setCreateFlag] = useState(false);
  const router = useRouter();
  const { data: blogs, error } = useGetBlogsQuery(undefined, {
    skip: router.isFallback,
  });
  useEffect(() => {
    if (!supabase.auth.user()) {
      router.push("/login");
    }
  }, [router]);

  if (!supabase.auth.user()) return null;

  return (
    <section
      style={{
        width: "75%",
        margin: "1rem auto",
      }}
    >
      {blogs?.length && blogs.map((post) => <Blog post={post} key={post.id} />)}
      <section
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p>{!blogs?.length ? "No Blog blogs." : null}</p>
        <button
          onClick={() => setCreateFlag((curFlag) => !curFlag)}
          style={{
            padding: "0 0",
            height: "max-content",
          }}
        >
          New Post
        </button>
      </section>
      {createFlag && (
        <CreatePost setCreateFlag={setCreateFlag} createFlag={createFlag} />
      )}
    </section>
  );
}
