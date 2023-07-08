import { useEffect, useRef, useState } from "react";
import { createPost, getAllPosts } from "../../redux/groupRequest";
import "./createPost.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAxios } from "../../createInstance";
import { loginSuccess } from "../../redux/authSlice";
import { imageUpload } from "../../redux/apiRequest";

const CreatePost = ({group, posts}) => {
    const  user  = useSelector((state) => state.auth.login?.currentUser);
    // console.log(group)
    const formRef = useRef();
    const [showForm, setShowForm] = useState(false);
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [image,setImage] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // let axiosJWT = axios.create();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    
    const handleCreatePost= (e)=>{
      e?.preventDefault(); 
      const newPost = {
        title: title,
        description:description,
        image:image
      };
      createPost(newPost, user?.accessToken,group?._id, navigate); 
      setShowForm(false);
      getAllPosts(group?._id ,user?.accessToken ,posts);
    };

    function handleChangeImage(e) {
        var file = e.target.files && e.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function (e) {
          imageUpload({
            File: e.target.result,
            FileName: file?.name,
            Folder: "posts",
            Type: 2
          }, user?.accessToken, axiosJWT)
          .then(res => {
            setImage(res.data.url);
          })
          .catch(err => {
            console.log(err);
          })
        };   
        file && reader.readAsDataURL(file);
    };

    const handleShowForm = () => {
        setShowForm(true);
    };

    const handleHideForm = () => {
        setShowForm(false);
    };

    const handleFormClick = (e) => {
        e.stopPropagation();
      };
    
      useEffect(() => {
        const handleClickOutsideForm = (event) => {
          if (formRef.current && !formRef.current.contains(event.target)) {
            setShowForm(false);
          }
        };
        handleClickOutsideForm();
      }, []);

    return (  
        <div>
            <div className="Input-header" onClick={handleShowForm}>
                <img src={user?.profilePicture} alt="" style={{width: "50px"}} className="Image-Input"/>
                <input type="button" value="" className="Input-Content" />
                <p className="button-label">What's on your mind...?</p>
                <hr style={{ width: "90%", border: "0.1px solid #ececec" }} />
                <div className="icon-photo">
                  <i className="fa-solid fa-photo-film fa-xl"></i>
                  <p>Photo/Videos</p>
                </div>
                <div className="icon-face">
                  <i className="fa-solid fa-face-grin-wide fa-xl"></i>
                  <p>Feeling/activity</p>
                </div>
                
            </div>
            {showForm && (
                <div className="overlay" onClick={handleHideForm}>
                <div className="form-container" ref={formRef} onClick={handleFormClick}>
                    <form onSubmit={handleCreatePost}>
                    <label>Title</label>
                    <input type="text" onChange={(e) => setTitle(e.target.value)} />
                    <label>Description</label>
                    <input
                        type="text"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <label>Image</label>
                    <input type="file" onChange={(e) => handleChangeImage(e)} />
                    {image && <img src={image} alt="" height={100} width={150} />}
                    <button type="submit">Create Post</button>
                    </form>
                </div>
                </div>
            )}
        </div>
    );
}
 
export default CreatePost;