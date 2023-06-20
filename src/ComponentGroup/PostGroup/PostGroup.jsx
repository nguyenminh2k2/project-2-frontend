import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllPosts } from "../../redux/groupRequest";
import "./postGroups.css";
import CreatePost from "../CreatePostGroup/CreatePost";

const PostGroup = ({group}) => {
    const  user  = useSelector((state) => state.auth.login?.currentUser);

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getAllPosts(group?._id ,user?.accessToken ,setPosts);
    }, [group?._id, user?.accessToken]);
    // console.log(group)
    
    return (  
        <div>
            <div className="home-postlist">
                {group ? (
                    <CreatePost
                        group = {group}
                    />
                ) : (
                    <span className="chatbox-empty-messages">
                        Tap on a group to start ...
                    </span>
                )}
                
                {posts?.map((post) => {
                    if (post.groupId === group?._id) {
                        return (
                            <div key={post._id} className="user-container">
                                <div className="home-user">
                                    <h2 className="post-username">{post.username}</h2>
                                    <h3 className="post-title">{post.title}</h3>
                                    <p className="post-description">{post.description}</p>
                                    <img src={post.image} alt="" className="post-img" />
                                    {/* <div className="delete-post" onClick={() => handleDelete(post._id)}>
                                        {" "}
                                        X{" "}
                                    </div> */}
                                </div>
                            </div>
                        );
                    } else {
                        return null; 
                    }
                })}
            </div>

        </div>
    );
}
 
export default PostGroup;