// eslint-disable-next-line
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePost, /*, getAllUsers,*/ getAllPosts, createPost, imageUpload} from "../../redux/apiRequest";
import { createAxios } from "../../createInstance";
import "./home.css";
import { loginSuccess } from "../../redux/authSlice";


function HomePage() {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const postList = useSelector((state) => state.post.allPosts?.posts) ;

  // const msg = useSelector((state) => state.users?.msg);
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [image,setImage] = useState("");
  // const [imageUrl, setImageUrl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // let axiosJWT = axios.create();
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const handleCreatePost= (e)=>{
    const newPost = {
      title: title,
      description:description,
      image:image
    };
    createPost(newPost, user?.accessToken, dispatch, navigate); 
  };

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   const imageUrl = URL.createObjectURL(file);
  //   setImageUrl(imageUrl);
  // };
  //  useEffect(() => {
  //   return () => {
  //     imageUrl && URL.revokeObjectURL(imageUrl);
  //   }
  // }, [imageUrl]);
 
   const handleDelete = (id) => {
    deletePost(user?.accessToken, dispatch , id, axiosJWT);
    };

  /* eslint-disable */
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (user?.accessToken) {
      getAllPosts(user?.accessToken, dispatch , axiosJWT);
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
    <main className="home-container">
      
      {/* <div className="home-role">
        {`Your role: ${user?.isAdmin ? `Admin` : `User`}`}
      </div> */}
      <section className="post-container">
              <div className="post-title"> Create post </div>
            <form onSubmit={handleCreatePost}>
                <label>Title</label>
                <input 
                    type="text" 
                    onChange={(e)=>setTitle(e.target.value)}
                />
                <label>Description</label>
                <input 
                    type="text" 
                    onChange={(e)=>setDescription(e.target.value)}
                />
                <label>Image</label>
                <input 
                    type="file" 
                    onChange={(e)=>handleChangeImage(e)}
                />
                {image && <img src={image} height={100} width={150}/>}
                {/* <div>
                  <input type="file" onChange={handleFileChange} />
                  {imageUrl && (
                    <div>
                      <img src={imageUrl} alt="Uploaded Image" width="100px" />
                    </div>
                  )}
                </div> */}
                <button type="submit"> Create Post </button>
            </form>
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
    </main>
  );
};

export default HomePage;
