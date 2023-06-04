import React, { useState } from "react";
import {Form, Input, Modal} from "antd";
import './addRoom.css';
const AddRoom = () => {
    const [visible, setVisible] = useState(false);

    const handleOk = () => {
       
    }

    const handleCancel = () => {
        setVisible(false);
    }

    const openModal = () => {
        setVisible(true);
    }

    return (
        <div>
            <button className="icon-button" onClick={openModal}><img src="https://cdn-icons-png.flaticon.com/512/4458/4458537.png" alt="add-chat" className="icon-img"/></button>
            <Modal
                title="Create Room"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form>
                    <Form.Item label="Name" name="name">
                        <Input placeholder="ten phong" />
                    </Form.Item>
                    <Form.Item label="Members" name="description">
                        <Input placeholder="select..." />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}


export default AddRoom;