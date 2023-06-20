import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllGroup } from "../../redux/groupRequest";
import "./listGroups.css";

const ListGroups = () => {
    const  user  = useSelector((state) => state.auth.login?.currentUser);

    const [groups, setGroups] = useState([]);

    useEffect(() => {
        getAllGroup(setGroups);
    }, []);
    
    return ( 
        <div>
            <div>
                {groups?.map((group) => (
                    <div className='div-groups' key={group._id}>
                        <div className='list-groups' >{group.name}</div>
                        <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default ListGroups;

