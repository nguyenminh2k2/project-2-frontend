import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    allPosts: {
      posts: null,
      comments: [],
      pending: false,
      error: false,
    },
    // onePost: {
    //   post: [],
    //   pending: false,
    //   error: false,
    // },
    userPost: {
      posts: null,
      pending: false,
      error: false,
    },
    deletePost: {
      pending: false,
      error: null,
    },
    createPost: {
      pending: false,
      error: null,
    },
    // interactPost: {
    //   pending: false,
    //   error: null,
    //   success: null,
    // },
  },
  reducers: {
    getAllPostStart: (state) => {
      state.allPosts.pending = true;
    },
    getAllPostSuccess: (state, action) => {
      state.allPosts.pending = false;
      // if (Array.isArray(state.allPosts.posts))
      //   state.allPosts.posts = Array.from(new Set([...state.allPosts.posts, ...action.payload]));
      // else 
        state.allPosts.posts = action.payload;
    },
     getAllPostFailed: (state) => {
      state.allPosts.pending = false;
      state.allPosts.error = true;
    },

    getUserPostStart: (state) => {
      state.userPost.pending = true;
    },
    getUserPostSuccess: (state, action) => {
      state.userPost.pending = false;
      state.userPost.posts = action.payload;
    },
    getUserPostFailed: (state) => {
      state.userPost.pending = false;
      state.userPost.error = true;
    },
  
    createPostStart: (state) => {
      state.createPost.pending = true;
      state.createPost.error = false;
    },
    createPostSuccess: (state) => {
      state.createPost.pending = false;
      state.createPost.error = false;
    },
    createPostFailed: (state) => {
      state.createPost.pending = false;
      state.createPost.error = true;
    },
    deletePostStart: (state) => {
      state.deletePost.pending = true;
    },
    deletePostSuccess: (state) => {
      state.deletePost.pending = false;
      state.deletePost.error = false;
    },
    deletePostFailed: (state) => {
      state.deletePost.error = true;
      state.deletePost.pending = false;
    },

  },
});

export const {
  createPostStart,
  createPostSuccess,
  createPostFailed,
  getAllPostStart,
  getAllPostSuccess,
  getAllPostFailed,
  getUserPostStart,
  getUserPostSuccess,
  getUserPostFailed,
  deletePostStart,
  deletePostFailed,
  deletePostSuccess,

} = postSlice.actions;
export default postSlice.reducer;