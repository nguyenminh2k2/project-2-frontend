import { useEffect, useState } from "react";
import { getMembers } from "../../redux/groupRequest";
import "./getMembers.css"

const GetMembers = ({group}) => {

    const [members, setMembers] = useState([]);
    // console.log(members)

    useEffect(() => {
        const fetchMembers = async () => {
          try {
            const response = await getMembers(group?._id);
            setMembers(response.data.members);
          } catch (error) {
            console.log(error);
          }
        };
        fetchMembers();
        
    }, [ group?._id]);

    return (  
        <div>
            <div className="members-group">
            {group? (
              <h3>Danh sách thành viên:</h3>
            ) : (
              <div></div>
            )}
            
            {members?.map((member) => (
                <div className='div-members' key={member._id}>
                    <div className='list-members'>{member.username}</div>
                </div>
            ))}
            </div>
        </div>
    );
}
 
export default GetMembers;