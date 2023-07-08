import { useEffect, useState } from "react";
import { acceptMembers, getMembers, getPendingMembers, leaveGroup, refuseMembers, removerMember } from "../../redux/groupRequest";
import { Form, Modal, Select } from 'antd';
import "./getMembers.css"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const GetMembers = ({group}) => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const { Option } = Select;
    const [members, setMembers] = useState([]);
    const [membersToRemove, setMembersToRemove] = useState([]);
    const [pendingMember, setPendingMember] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleLeaveGroup = (groupId) => {
      leaveGroup(groupId, user?.accessToken, navigate);
      window.location.reload();
    }

    const handleAccept = async (groupId, requestId) => {
      await acceptMembers(groupId, requestId, user?.accessToken);

      // Sau khi xóa thành công, gọi lại API để lấy danh sách thành viên mới
      const response = await getMembers(group?._id);
      setMembers(response.data.members);

      const res = await getPendingMembers(group?._id);
      setPendingMember(res?.data?.members);
    }

    const handleRefuse = async (groupId, requestId) => {
      await refuseMembers(groupId, requestId, user?.accessToken);

      const res = await getPendingMembers(group?._id);
      setPendingMember(res?.data?.members);
    }

    useEffect(() => {
        const fetchMembers = async () => {
          try {
            const response = await getMembers(group?._id);
            setMembers(response?.data?.members);
          } catch (error) {
            console.log(error);
          }
        };
        fetchMembers();
        
    }, [ group?._id, membersToRemove]);

    useEffect(() => {
      const fetchMembers = async () => {
        try {
          const response = await getPendingMembers(group?._id);
          setPendingMember(response?.data?.members);
        } catch (error) {
          console.log(error);
        }
      };
      fetchMembers();
      
  }, [ group?._id]);

    const handleRemoveMembers = async (groupId) => {
      const Members = {
        membersToRemove: membersToRemove
      };
      await removerMember(groupId, Members, user?.accessToken, navigate, setIsModalOpen);
      
      // Sau khi xóa thành công, gọi lại API để lấy danh sách thành viên mới
      const response = await getMembers(group?._id);
      setMembers(response.data.members);
    }
    
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
        setIsModalOpen(false);
    };


    return (  
        <div>
            <div className="members-group">
            {group? (
              <div>
                <div style={{display:"flex", alignItems:"center", padding:"0 0 15px 5px"}}>
                  <img src="https://banner2.cleanpng.com/20180710/ibf/kisspng-computer-icons-house-real-estate-home-universal-studios-icon-5b44a215a05c67.5280732815312245976568.jpg" alt="" 
                       style={{width:"50px", borderRadius:"50%"}}
                  />
                  <h1 style={{marginLeft: "5px"}}>{group?.name}</h1>
                </div>
                <hr style={{ width: "90%", border: "0.1px solid #ececec" , marginBottom:"15px"}} />
                <h3 className="List-member-name" onClick={openModal}>Danh sách thành viên:</h3>
              </div>
              
            ) : (
              <div></div>
            )}
            
            {members?.map((member) => (
                <div className='div-members' key={member._id}>
                    <div className='list-members'>{member.username}</div>
                </div>
            ))}

            <hr style={{ width: "90%", border: "0.1px solid #ececec" , marginBottom:"15px", marginTop:"15px"}} />

            {(group?.createId === user?._id) ? (
              <div>
                <h3 className="List-member-name">Danh sách cần duyệt:</h3>
                {pendingMember?.map((member) => (
                  <div key = {member._id} style={{display:"flex"}}>
                      <div className='list-members'>{member.username}</div>
                      <i class='fa fa-check' style={{marginLeft:"auto", color:"green", marginRight:"5px", cursor:"pointer"}}
                        onClick={() => handleAccept(group?._id, member?._id)}
                      ></i>
                      <i class='fa-solid fa-xmark' style={{color:"red", cursor:"pointer"}}
                        onClick={() => handleRefuse(group?._id, member?._id)}
                      ></i>
                  </div>
                ))}                
              </div>
            ) : (
              <div>
                {group? (
                  <button className='button-leave' onClick={() => handleLeaveGroup(group._id)}>
                    <i className="fa-solid fa-arrow-up-from-bracket fa-rotate-90"></i>
                    <p className="leave">Leave</p>
                </button>
                ) : (
                  <div></div>
                )}                
              </div>
            )}

            <Modal
                title="Thêm xóa thành viên"
                open={isModalOpen}
                onCancel={closeModal}
                footer={null}

            >
                <Form>
                    <Form.Item label="Remove Members" name="name">
                        <Select 
                            mode="multiple"
                            placeholder="Select..." 
                            value={membersToRemove}
                            onChange={(values) => setMembersToRemove(values)}
                        >
                            {members?.map((user) => (
                                <Option key={user._id} value={user.username}>
                                    {user.username}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <button className="button-remove" onClick={() => handleRemoveMembers(group._id)}>
                        <i class="eraser">Remove</i>
                    </button>
                </Form>
            </Modal>
            </div>
        </div>
    );
}
 
export default GetMembers;