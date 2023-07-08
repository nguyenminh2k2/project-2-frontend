import { useEffect, useState } from "react";
import { getAllGroup, joinGroup } from "../../redux/groupRequest";
import "./listGroups.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ListGroups = ({data}) => {
    const user = useSelector((state) => state.auth.login?.currentUser);

    const [groups, setGroups] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getAllGroup(setGroups);
    }, []);

    const handleJoin = (groupId) => {
        joinGroup(groupId, user?.accessToken, navigate);
        window.location.reload();
    }

    // Mảng chứa các nhóm chưa join
    const otherGroups = groups?.filter((user) => !data.find((member) => member._id === user._id));      

    return ( 
        <div>
            <div>
                {otherGroups?.map((group) => (
                    <div className='div-groups' key={group._id} onClick={() => handleJoin(group._id)}>
                        <div style={{display:"flex", alignItems:"center", padding:"15px 0 15px 0"}}>
                            <div className='list-groups' style={{margin:"0", padding:"0 10px 0 0"}} >
                                {group.name}
                            </div>
                            {(group.type === true) ? (
                                <p style={{marginLeft: "auto", fontSize:"13px", backgroundColor:"#D2E7F8", color:"#1877F2", padding:"4px", borderRadius:"20px"}}>
                                    Public
                                </p>
                            ):(
                                <p style={{marginLeft: "auto", fontSize:"13px", backgroundColor:"#f0dbdf", color:"crimson", padding:"4px", borderRadius:"20px"}}>
                                    Private
                                </p>
                            )}
                        </div>
                        <hr style={{ width: "95%", border: "0.1px solid #ececec" }} />
                    </div>
                    
                ))}
            </div>
        </div>
     );
}
 
export default ListGroups;

