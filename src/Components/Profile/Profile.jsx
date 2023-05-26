import "./profile.css";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useNavigate/*, useParams*/ } from "react-router-dom";
import { getAllPosts/*, getUserPost*/} from "../../redux/apiRequest";
// import { createAxios } from "../../createInstance";

function Profile() {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const postList = useSelector((state) => state.post.allPosts?.posts) ;
  // const { id } = useParams();
  // console.log(user.id);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = axios.create();

  function countFollowings(){
    let cnt = 0;
    for(let i = 0 ; i < user.followings.length; i++){
      cnt ++;
    }
    return cnt;
  }
  function countFollowers(){
    let cnt = 0;
    for(let i = 0 ; i < user.followers.length; i++){
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
      // getUserPost(user?.accessToken, dispatch , user.id);
      getAllPosts(user?.accessToken, dispatch , axiosJWT);

    }
  }, []);

  return (
    <main className="profile-container">
      <div className="header-profile">            
        <div className = "image">
          <img src="https://file1.dangcongsan.vn/data/0/images/2021/10/15/anhdv/dh-bach-khoa-15-10.jpg?dpi=150&quality=100&w=780" alt="" 
            className="background"/>
          <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t1.6435-9/102261488_3013160935447101_2486117098089648848_n.jpg?stp=dst-jpg_s960x960&_nc_cat=109&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=bHozSIm-V_UAX-x4yfq&_nc_ht=scontent.fhan2-5.fna&oh=00_AfCo22DhJ1hYND0wpKAUb3YRr9Av-tqZnOvboWaNdxyNCQ&oe=648D8EAE" alt="" 
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
        {postList?.map((post) => {
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