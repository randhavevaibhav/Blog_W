import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./slices/postSlice";
import postCommentReducer from "./slices/postCommentsSlice";
export const store = configureStore({ reducer: {postReducer,indivPostComment:postCommentReducer} });
