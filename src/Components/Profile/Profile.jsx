import "./profile.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {getFollowers, getFollowings, getUserPost} from "../../redux/apiRequest";

function Profile({ accessToken, userId }) {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userPost = useSelector((state) => state.post.userPost?.posts) ;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [followings, setFollowings] = useState([]);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
      const fetchFollowings = async () => {
          const response = await getFollowings(user?._id, user?.accessToken);
          setFollowings(response?.data?.followings);  
      }
      fetchFollowings();
  }, [user?._id, user?.accessToken]);

  useEffect(() => {
      const fetchFollowers = async () => {
          const response = await getFollowers(user?._id, user?.accessToken);
          setFollowers(response?.data?.followers);  
      }
      fetchFollowers();
  }, [user?._id, user?.accessToken]);

  function countFollowings(){
    let cnt = 0;
    for(let i = 0 ; i < followings?.length; i++){
      cnt ++;
    }
    return cnt;
  }
  function countFollowers(){
    let cnt = 0;
    for(let i = 0 ; i < followers?.length; i++){
      cnt ++;
    }
    return cnt;
  }
    /* eslint-disable */
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    if (user?.accessToken) {
      getUserPost(user?.accessToken, dispatch , user._id);
    }
  }, []);

  return (
    <main className="profile-container">
      <div className="header-profile">            
        <div className = "image">
          <img src="https://znews-photo.zingcdn.me/w660/Uploaded/qoswae/2022_08_25/file_20200429_51457_ll2phm.jpg" alt="" 
            className="background"/>
          <img src={user.profilePicture} alt="avatar" 
            className="avatar"/>
        </div>                  
        <div className="info">
          <p>Name: {user.username}</p>    
          <p>Email: {user.email}</p>
          <p> {`Your role: ${user?.isAdmin ? `Admin` : `User`}`}</p>
          <Link className="a" to="/followers">Followings: {countFollowings()} {" | "} </Link>
          <Link className="a" to="/followers">Followers: {countFollowers()} </Link>
        </div>         
      </div>
      <div className="post-user">
      <div className="home-postlist">
        {userPost?.map((post) => {
          return (
            <div key={post._id} className="user-container">
              <div>                
                <div className="home-user">
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-description">{post.description}</p>
                  <img src={post.image} alt="" className="post-img" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </main>
  );
};

export default Profile;