import "./follow.css";
import {  useSelector } from "react-redux";


const Follow = () => {
  const userFollowers = useSelector((state) => state.auth.login?.currentUser.followers);
  const userFollowings = useSelector((state) => state.auth.login?.currentUser.followings);


    return (
      <main className="follow-container">
        <div className="followings">
          <div>
            <h2 className="follow-title">Followings</h2>
          </div>
          <div className="follow-userlist">
            {userFollowings?.map((user) => {
              return (
                
                <div className="user-follow">
                  <div className="follow-user">{user}</div>
                </div>
               );
            })} 
          </div>
        </div>

        <div className="followers">
          <div>
            <h2 className="follow-title">Followers</h2>
          </div>
          <div className="follow-userlist">
            {userFollowers?.map((user) => {
              return (
                <div className="user-follow">
                  <div className="follow-user">{[user]}</div>
                </div>
               );
            })} 
          </div>
        </div>  
      </main>
    );
  };
  
  export default Follow;