import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postImageURL: "",
  postTitle: "",
  postContent: "",
  postImgFile:null,
  
};

export const postSlice = createSlice({
  name: "postData",
  initialState,
  reducers: {
    createPost: (state={}, action) => {
      const newPost = {...state, ...action.payload };
      return newPost;
    },
  },
});

export const { createPost } = postSlice.actions;

export default postSlice.reducer;
