import React, { useEffect, useState } from 'react';
import "./rightHome.css";
import { follow, getFollowings } from '../../redux/apiRequest';
import { Link,} from 'react-router-dom';

const RightHome = ({userList, user}) => {
   
    const [followings, setFollowings] = useState([]);
    // const [followers, setFollowers] = useState([]);
    // const navigate = useNavigate();

    const handlefollow = async(id) => {
        await follow(id, user?.accessToken);
        const response = await getFollowings(user?._id, user?.accessToken);
        setFollowings(response?.data?.followings);
    }
    
    useEffect(() => {
        const fetchFollowings = async () => {
            const response = await getFollowings(user?._id, user?.accessToken);
            setFollowings(response?.data?.followings);  
        }
        fetchFollowings();
    }, [user?._id, user?.accessToken]);

    // useEffect(() => {
    //     const fetchFollowers = async () => {
    //         const response = await getFollowers(user._id, user.accessToken);
    //         setFollowers(response.data.followers);  
    //     }
    //     fetchFollowers();
    // }, [user._id, user.accessToken]); 
    
    const otherUserName = userList?.filter((followings) => followings._id !== user?._id); 
    const otherUsers = otherUserName?.filter((user) => !followings?.find((member) => member._id === user._id)); 
   
    // const otherFollowings = otherUsers?.filter((user) => !followers.find((member) => member._id === user._id)); 

    return (  
        <div className='Home-Right'>
            <h4>
                Contacts
            </h4>
            {otherUserName?.map((user) => {
                return (
                    <div className='Followings-content'>
                        <div className='List-Followings'>    
                            <Link className='profile-user' to = {`/profile_user?user=${encodeURIComponent(JSON.stringify(user))}`}
                                onClick={(e) => {
                                    // setCurrenetUser(user);
                                    // navigate('/profile_user');
                                }}
                            >
                                <img 
                                    src={user.profilePicture} alt="" 
                                    style={{width: "40px", height: "40px"}} 
                                    className='Image-followings'
                                />
                                <p>{user.username}</p>
                            </Link>
                            <button 
                                onClick={() => {
                                    if (otherUsers?.includes(user)) {
                                        handlefollow(user?._id);
                                    }
                                }}
                                style={{ display: otherUsers?.includes(user) ? "block" : "none" }}
                            >
                                Follow
                            </button> 
                        </div>
                        <hr style={{ width: "90%", border: "0.1px solid #ececec" }} />
                    </div>
                )
            })}
        </div>
    );
}
 
export default RightHome;