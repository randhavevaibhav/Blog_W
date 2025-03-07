import { createSlice } from "@reduxjs/toolkit";

const initialState = [{
    id:0,
    content:"",
    created_at:"",
    likes:0,
    userName:""
}]

export const postCommentSlice = createSlice({
  name: "postComment",
  initialState,
  reducers: {
    createComments: (state=[], action) => {
      const newComments = [...state, ...action.payload ];
      return newComments;
    },
  },
});

export const { createComments } = postCommentSlice.actions;

export default postCommentSlice.reducer;
