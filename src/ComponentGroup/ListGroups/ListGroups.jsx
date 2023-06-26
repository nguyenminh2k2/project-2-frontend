import { useEffect, useState } from "react";
import { getAllGroup } from "../../redux/groupRequest";
import "./listGroups.css";

const ListGroups = ({data}) => {

    const [groups, setGroups] = useState([]);

    useEffect(() => {
        getAllGroup(setGroups);
    }, []);

    // Mảng chứa các nhóm chưa join
    const otherGroups = groups?.filter((user) => !data.find((member) => member._id === user._id));      

    return ( 
        <div>
            <div>
                {otherGroups?.map((group) => (
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

