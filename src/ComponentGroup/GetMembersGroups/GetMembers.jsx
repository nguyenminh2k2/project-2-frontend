import { useEffect, useState } from "react";
import { getMembers, leaveGroup, removerMember } from "../../redux/groupRequest";
import { Form, Modal, Select } from 'antd';
import "./getMembers.css"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const GetMembers = ({group}) => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const { Option } = Select;
    const [members, setMembers] = useState([]);
    const [membersToRemove, setMembersToRemove] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleLeaveGroup = (groupId) => {
      leaveGroup(groupId, user?.accessToken, navigate)
    }
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

    const handleRemoveMembers = (groupId) => {
      const addMembers = {
          membersToRemove: membersToRemove
      };
      removerMember(groupId, addMembers, user?.accessToken, navigate, setIsModalOpen);
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
              <h3 className="List-member-name" onClick={openModal}>Danh sách thành viên:</h3>
            ) : (
              <div></div>
            )}
            
            {members?.map((member) => (
                <div className='div-members' key={member._id}>
                    <div className='list-members'>{member.username}</div>
                </div>
            ))}
            {group? (
              <button className='button-leave' onClick={() => handleLeaveGroup(group._id)}>
                <i className="fa-solid fa-arrow-up-from-bracket fa-rotate-90"></i>
                <p className="leave">Leave</p>
            </button>
            ) : (
              <div></div>
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