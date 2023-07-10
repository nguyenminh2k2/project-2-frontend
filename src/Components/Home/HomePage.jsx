// eslint-disable-next-line
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePost, getAllUsers, getAllPosts, createPost, imageUpload} from "../../redux/apiRequest";
import { createAxios } from "../../createInstance";
import "./home.css";
import { loginSuccess } from "../../redux/authSlice";
import LeftHome from "../../ComponentHomePage/LeftHome/LeftHome";
import RightHome from "../../ComponentHomePage/RightHome/RightHome";


function HomePage() {
  const formRef = useRef();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userList = useSelector((state) => state.users.users?.allUsers);// mảng chứa tát cả các thành viên
  const postList = useSelector((state) => state.post.allPosts?.posts) ;

  const [showForm, setShowForm] = useState(false);
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [image,setImage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const handleCreatePost= (e)=>{
    const newPost = {
      title: title,
      description:description,
      image:image
    };
    createPost(newPost, user?.accessToken, dispatch, navigate); 
    setShowForm(false);
    getAllPosts(user?.accessToken, dispatch , axiosJWT);
  };
 
  const handleDelete = (id) => {
    deletePost(user?.accessToken, dispatch , id, axiosJWT);
    getAllPosts(user?.accessToken, dispatch , axiosJWT);
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

  /* eslint-disable */
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (user?.accessToken) {
      getAllPosts(user?.accessToken, dispatch , axiosJWT);
      getAllUsers(user?.accessToken, dispatch, axiosJWT);
    }
  }, []);

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
  }

  return (
    <div className="HomePage">

      {/* Left Side */}
      <div className="Home-side-left">
        <LeftHome
          user = {user}
        />
      </div>

      {/* Body Side */}
      <div className="home-container">
        <section>
            <div className="Input-header" onClick={handleShowForm}>
                <img src={user?.profilePicture} alt="" style={{width: "50px"}} className="Image-Input"/>
                <input type="button" value="" className="Input-Content" />
                <p className="button-labels">What's on your mind...?</p>
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
        </section>
      <div className="home-title">Post List</div>
      <div className="home-postlist">
        {postList?.map((post) => {
          return (
            <div key={post._id} className="user-container">    
                <div className="home-user">
                  <h2 className="post-username">{post.username}</h2>
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-description">{post.description}</p>
                  <img src={post.image} alt="" className="post-img" />
                  <div className="delete-post" onClick={() => handleDelete(post._id)}> 
                  {" "}
                 X{" "} 
              </div>
                </div>
            </div>
          );
        })}
      </div>
      </div>

      {/* Right Side */}
      <div className="Group-side-right">
        <RightHome
          userList = {userList}
          user = {user}
        />
      </div>
    </div>

  );
};

export default HomePage;
