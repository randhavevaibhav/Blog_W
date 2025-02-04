import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postImageURL: "",
  postTitle: "",
  postContent: "",
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    updatePost: (state, action) => {
      const newPost = { ...action.payload };
      return newPost;
    },
  },
});

export const { updatePost } = postSlice.actions;

export default postSlice.reducer;
