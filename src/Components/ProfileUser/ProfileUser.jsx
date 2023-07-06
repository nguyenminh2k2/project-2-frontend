import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUserPost } from "../../redux/apiRequest";

const ProfileUser = () => {
    const users = useSelector((state) => state.auth.login?.currentUser);
    const userPost = useSelector((state) => state.post.userPost?.posts) ;

    const [user, setUser] = useState(null);
    
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function countFollowings(){
        let cnt = 0;
        for(let i = 0 ; i < user?.followings.length; i++){
          cnt ++;
        }
        return cnt;
    }
    function countFollowers(){
        let cnt = 0;
        for(let i = 0 ; i < user?.followers.length; i++){
          cnt ++;
        }
        return cnt;
    }

    useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const userParam = searchParams.get('user');
      if (userParam) {
        setUser(JSON.parse(decodeURIComponent(userParam)));
      }
    }, [location.search]);

    /* eslint-disable */
    useEffect(() => {
        if (!users) {
          navigate("/");
        }
        if (users?.accessToken) {
          getUserPost(users?.accessToken, dispatch , user?._id);
        }
    }, [users, user]);
    return (  
        <main className="profile-container">
        <div className="header-profile">            
            <div className = "image">
            <img src="https://znews-photo.zingcdn.me/w660/Uploaded/qoswae/2022_08_25/file_20200429_51457_ll2phm.jpg" alt="" 
                className="background"/>
            <img src={user?.profilePicture} alt="avatar" 
                className="avatar"/>
            </div>                  
            <div className="info">
            <p>Name: {user?.username}</p>    
            <p>Email: {user?.email}</p>
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
}
 
export default ProfileUser;