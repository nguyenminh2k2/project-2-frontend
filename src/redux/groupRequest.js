import axios from "axios";

/**
 * Group
 */
export const getAllGroup = async (setGroups) => {
    try{
        const res = await axios.get("http://localhost:8000/v1/group/allGroup");
        setGroups(res.data);
    }
    catch(err){
        console.log(err)
    }
};

export const userGroup = async (userId) => {
    try{
        return await axios.get(`http://localhost:8000/v1/group/${userId}`);
    }catch(err){
        console.log(err)
    }
};

export const getMembers = async (groupId) => {
    try{
        return await axios.get(`http://localhost:8000/v1/group/members/${groupId}`);
    }catch(err){
        console.log(err)
    }
};

export const removerMember = async (groupId, group, accessToken, navigate, setIsModalOpen) => {
    try{
      await axios.put(`http://localhost:8000/v1/group/remove/${groupId}`, group, {
        headers: { token: `Bearer ${accessToken}` },
      });
      navigate("/group");
      alert("remove members successfully");
      setIsModalOpen(false);
    }catch(err){
      console.log(err);
      alert("You aren't admin");
      setIsModalOpen(false);
    }
};

export const leaveGroup = async (groupId, accessToken, navigate) => {
    try{
        await axios.put(`http://localhost:8000/v1/group/leave/${groupId}`, groupId,{
            headers: { token: `Bearer ${accessToken}` },
        });
        navigate("/group");
        alert("Leave group successfully !");
    }catch(err){
        console.log(err);
        alert("You are no longer in this group");
    }
};

export const joinGroup = async (groupId, accessToken, navigate) => {
    try{
        await axios.put(`http://localhost:8000/v1/group/join/${groupId}`, groupId,{
            headers: { token: `Bearer ${accessToken}` },
        });
        navigate("/group");
    }catch(err){
        console.log(err);
        
    }
};



export const createGroup = async (group, accessToken, navigate, setVisible) =>{
    try{
        await axios.post("http://localhost:8000/v1/group/", group, {
            headers: { token: `Bearer ${accessToken}` },
        });
        navigate("/group");
        setVisible(false);      
    }
    catch(err){
        console.log(err)
    }
};

/**
 * Post group
 */

export const getAllPosts = async (groupId, accessToken, setPosts) => {
    try{
        const res = await axios.get(`http://localhost:8000/v1/postGroup/${groupId}`, {
            headers: { token: `Bearer ${accessToken}` },
        });
        setPosts(res.data.results);
    }
    catch(err){
        console.log(err)
    }
};

export const createPost = async (post, accessToken,groupId, navigate) => {
    try{
        await axios.post(`http://localhost:8000/v1/postGroup/${groupId}`, post, {
            headers: { token: `Bearer ${accessToken}` },
        });
        navigate("/group");
    }catch(err){
        console.log(err)
    }
}