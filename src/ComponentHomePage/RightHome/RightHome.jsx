import React, { useEffect, useState } from 'react';
import "./rightHome.css";
import { getFollowers, getFollowings } from '../../redux/apiRequest';
import { Link, useNavigate,  } from 'react-router-dom';

const RightHome = ({userList, user}) => {
    const navigate = useNavigate();
    const [followings, setFollowings] = useState([]);
    const [followers, setFollowers] = useState([]);
    // eslint-disable-next-line
    const [currentUser, setCurrenetUser] = useState(null);
    
    useEffect(() => {
        const fetchFollowings = async () => {
            const response = await getFollowings(user._id, user.accessToken);
            setFollowings(response.data.followings);  
        }
        fetchFollowings();
    }, [user._id, user.accessToken]);

    useEffect(() => {
        const fetchFollowers = async () => {
            const response = await getFollowers(user._id, user.accessToken);
            setFollowers(response.data.followers);  
        }
        fetchFollowers();
    }, [user._id, user.accessToken]);

    const otherUsers = userList?.filter((user) => !followings.find((member) => member._id === user._id)); 
    const otherUserName = otherUsers?.filter((followings) => followings._id !== user._id); 
    const otherFollowings = otherUserName?.filter((user) => !followers.find((member) => member._id === user._id)); 
    
    return (  
        <div className='Home-Right'>
            <h4>
                Who's following you
            </h4>
            {otherFollowings?.map((user) => {
                return (
                    <div className='Followings-content'>
                        <Link className='List-Followings' to = {`/profile_user?user=${encodeURIComponent(JSON.stringify(user))}`} 
                        onClick={(e) => {
                            e.stopPropagation(); // Ngăn sự kiện click lan ra các phần tử cha
                            setCurrenetUser(user);
                            navigate('/profile_user');
                        }}
                        >
                            <img 
                                src={user.profilePicture} alt="" 
                                style={{width: "40px", height: "40px"}} 
                                className='Image-followings'
                            />
                            <p>{user.username}</p>
                            <button onClick={(e) => e.stopPropagation()}>Follow</button> 
                        </Link>
                        <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
                    </div>
                )
            })}
        </div>
    );
}
 
export default RightHome;