import "./leftHome.css";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { follow, getFollowers, getFollowings } from "../../redux/apiRequest";

const LeftHome = ({user}) => {
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

    const handlefollow = async (id) => {
        await follow(id, user?.accessToken);

        const response = await getFollowings(user?._id, user?.accessToken);
        setFollowings(response?.data?.followings);

        const res = await getFollowers(user?._id, user?.accessToken);
        setFollowers(res?.data?.followers);

        // window.location.reload();
    }

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

    const otherUsers = followers?.filter((user) => !followings?.find((member) => member._id === user._id)); 

    console.log(otherUsers)

    return (  
        <div className='Group-container' style={{paddingTop: "20px"}}>
            <div className='Left-Home-Header' style={{}}>
                <img src="https://znews-photo.zingcdn.me/w660/Uploaded/qoswae/2022_08_25/file_20200429_51457_ll2phm.jpg" 
                    alt=""
                    style={{  top: 0, left: 0, width: "100%",height: "140px", borderRadius: "20px 20px 0 0" }}
                />
                <img 
                    src={user?.profilePicture} alt="" 
                    style={{
                            width: "100px", height: "100px", zIndex: 1000,
                            position: "absolute",
                            top: "22%",
                            left: "50%",
                            transform: "translate(-50%, -50%)"
                        }} 
                    className='Image-followings'
                />
                <p style={{fontWeight: "bold"}} className="style_username">
                    {user?.username}
                </p>
                <div className="Cout-Follows">
                    <div className="followings-count">
                        <p style={{margin: "0 0 0 32px",fontSize: "18px", fontWeight: "bold"}}>{countFollowings()}</p>
                        <p style={{fontSize: "14px", margin: "10px 0 0 0"}}>Followings</p>
                    </div>
                    <div className="vertical-line"></div>
                    <div className="followers-count">
                        <p style={{margin: "0 0 0 28px", fontSize: "18px", fontWeight: "bold"}}>{countFollowers()}</p>
                        <p style={{fontSize: "14px", margin: "10px 0 0 0"}}>Followers</p>
                    </div>
                </div>
                <Link className='Profile-User' to = '/profile'>
                    My Profile
                </Link>                                                
            </div>
            <div>
                {(followings?.length > 0) ? (
                    <h4 style={{marginBottom: "20px"}}>
                        Followings
                    </h4>                    
                ) : (
                    <div></div>
                )}

                {followings?.map((following) => {
                    return (
                        <div>
                            <div style={{display: "flex", alignItems: "center", margin: "15px 0"}}>
                                <img 
                                    src={following.profilePicture} alt="" 
                                    style={{width: "40px"}}
                                    className='Image-followings'
                                />
                                <p style={{fontWeight: "bold",paddingLeft: 15}}>
                                    {following.username}
                                </p>
                                <button style={{marginLeft: "auto", marginTop: 0, color: "#7a7878", backgroundColor: "#fff", 
                                        border: "1.5px solid #ececec"
                                    }}
                                    onClick={() => handlefollow(following._id)}
                                    >
                                    Đang Follow
                                </button>
                            </div>
                            <hr style={{ width: "95%", border: "0.1px solid #ececec" }} />
                        </div>
                    )
                })}
            </div>
            <div>
                {(followers?.length > 0) ? (
                    <h4 style={{marginBottom: "20px"}}>
                        Followers
                    </h4>                    
                ) : (
                    <div></div>
                )}

                {followers?.map((following) => {
                    return (
                        <div>
                            <div style={{display: "flex", alignItems: "center", margin: "15px 0"}}>
                                <img 
                                    src={following.profilePicture} alt="" 
                                    style={{width: "40px"}}
                                    className='Image-followings'
                                />
                                <p style={{fontWeight: "bold",paddingLeft: 15}}>
                                    {following.username}
                                </p>
                                <button style={{marginLeft: "auto", marginTop: 0, color: "#fff", backgroundColor: "#FE2C55", 
                                            border: "1.5px solid #ececec"
                                        }}
                                        className={(otherUsers?.includes(following)) ? "block" : "none"}
                                        onClick={() => handlefollow(following._id)}
                                >
                                    Follow lại
                                </button>
                            </div>
                            <hr style={{ width: "95%", border: "0.1px solid #ececec" }} />
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
 
export default LeftHome;
