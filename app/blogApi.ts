import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { Blog } from "../types";
import supabase from "../utils/supabase";
type Blogs = Blog[];
const baseQuery = fetchBaseQuery({
  baseUrl: "",
});

export const blogApi = createApi({
  reducerPath: "blogs",
  baseQuery,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ["Blogs", "Blog"],
  endpoints: (builder) => ({
    getBlogs: builder.query<Blogs, void>({
      // @ts-ignore
      queryFn: async (arg, queryApi, extraOptions, fetchWithBQ) => {
        const { data: blogs, error } = await supabase.from("posts").select("*");
        if (blogs?.length) {
          const data = blogs as Blog[];
          return { data };
        }
        return {
          error,
        };
      },
      providesTags: (result) =>
        result?.length
          ? [...result.map((post) => ({ type: "Blogs", id: post.id } as const))]
          : [{ type: "Blogs", id: "LIST" }],
    }),
    deleteBlog: builder.mutation<Blog, string>({
      // @ts-ignore
      queryFn: async (_arg, _queryApi, _extraOptions, fetchWithBQ) => {
        const { data, error } = await supabase
          .from("posts")
          .delete()
          .match({ id: _arg });
        if (data?.length) {
          return { data };
        }
        if (error) {
          return { error };
        }
      },
      invalidatesTags: ["Blogs"],
    }),
    addBlog: builder.mutation<void, Partial<Blog>>({
      // @ts-ignore
      queryFn: async (_arg, _queryApi, _extraOptions, fetchWithBQ) => {
        const { data, error } = await supabase.from("posts").insert([
          {
            title: _arg.title,
            content: _arg.content,
            is_published: true,
          },
        ]);
        if (data) {
          return { data };
        }

        if (error) {
          return { error };
        }
      },
      invalidatesTags: ["Blogs"],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useDeleteBlogMutation,
  useAddBlogMutation,
  util: { getRunningOperationPromises },
} = blogApi;
export const { getBlogs } = blogApi.endpoints;
