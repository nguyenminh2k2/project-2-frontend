import axios from "axios";
import {
    loginFailed,
    loginStart,
    loginSuccess,
    logOutFailed,
    logOutStart,
    logOutSuccess,
    registerFailed,
    registerStart,
    registerSuccess,
  } from "./authSlice";
  import {
    deleteUserFailed,
    deleteUsersSuccess,
    deleteUserStart,
    getUsersFailed,
    getUsersStart,
    getUsersSuccess,
  } from "./userSlice";
  import {
    createPostFailed,
    createPostStart,
    createPostSuccess,
    deletePostFailed,
    deletePostStart,
    deletePostSuccess,
    getAllPostFailed,
    getAllPostStart,
    getAllPostSuccess,
    getUserPostFailed,
    getUserPostStart,
    getUserPostSuccess,
  } from "./postSlice";

const API = axios.create({ baseURL: "http://localhost:8000" });

/**
 * AUTH
 */
export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
      const res = await axios.post("http://localhost:8000/v1/auth/login", user);
      dispatch(loginSuccess(res.data));
      navigate("/");
      // alert("Đăng nhập thành công!");

    } catch (err) {
      dispatch(loginFailed());
      alert("Tài khoản hoặc mật khẩu không chính xác!");

    }
  };

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
      await axios.post("http://localhost:8000/v1/auth/register", user);
      dispatch(registerSuccess());
      navigate("/login");
      alert("Đăng kí thành công!");
      
    } catch (err) {
      dispatch(registerFailed());
      alert("Tài Khoản đã tồn tại!");

    }
};
export const logOut = async (dispatch, id, navigate, accessToken, axiosJWT) => {
  dispatch(logOutStart());
  try {
    await axiosJWT.post("http://localhost:8000/v1/auth/logout", id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(logOutSuccess());
    navigate("/login");
  } catch (err) {
    dispatch(logOutFailed());
  }
};

/**
 * USER
 */
export const getUser = (userId) => API.get(`v1/user/${userId}`);

export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getUsersStart());
  try {
    const res = await axiosJWT.get("http://localhost:8000/v1/user/", {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailed());
  }
};

export const deleteUser = async (accessToken, dispatch, id, axiosJWT ) => {
  dispatch(deleteUserStart());
  try {
    const res = await axiosJWT.delete("http://localhost:8000/v1/user/" + id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(deleteUsersSuccess(res.data));
  } catch (err) {
    dispatch(deleteUserFailed(err.response.data));
  }
};

export const getFollowers = async (userId, accessToken) => {
  try{
    return await axios.get(`http://localhost:8000/v1/user/followers/${userId}`, {
      headers: { token: `Bearer ${accessToken}` },
    })
  }catch(err){
    console.log(err);
  }
};

export const getFollowings = async (userId, accessToken) => {
  try{
    return await axios.get(`http://localhost:8000/v1/user/followings/${userId}`, {
      headers: { token: `Bearer ${accessToken}` },
    })
  }catch(err){
    console.log(err);
  }
};

/** 
 * POST
 */
export const getAllPosts = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getAllPostStart());
  try {
    const res = await axiosJWT.get("http://localhost:8000/v1/post/", {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getAllPostSuccess(res.data.results));
  } catch (err) {
    dispatch(getAllPostFailed());
  }
};

export const createPost = async ( post, accessToken, dispatch, navigate) => {
  dispatch(createPostStart());
  try {
    await axios.post("http://localhost:8000/v1/post/", post, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(createPostSuccess());
    navigate("/");
    // alert("Đăng bài thành công!");
  } catch (err) {
    dispatch(createPostFailed());
  }
};

export const getUserPost = async ( accessToken, dispatch, id) => {
  dispatch(getUserPostStart());
  try {
    const res = await axios.get("http://localhost:8000/v1/post/user/" + id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getUserPostSuccess(res.data));
  } catch (err) {
    dispatch(getUserPostFailed());
  }
};

export const deletePost = async (accessToken, dispatch, id, axiosJWT ) => {
  dispatch(deletePostStart());
  try {
    const res = await axiosJWT.delete("http://localhost:8000/v1/post/" + id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(deletePostSuccess(res.data));
    alert("Deleted sucssesfully!")
  } catch (err) {
    dispatch(deletePostFailed(err.response.data));
    alert("You're not allowed to do that!");
  }
};

/**
 * API tải ảnh lên server
 * @createdby minh 22.05.2023
 */
export const imageUpload = async (fileModel, accessToken, axiosJWT ) => {
  return axiosJWT.post("http://localhost:8000/v1/file/image-upload", fileModel, {
    headers: { token: `Bearer ${accessToken}` },
  });
};

