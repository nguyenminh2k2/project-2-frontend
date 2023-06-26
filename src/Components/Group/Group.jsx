import "./group.css";
import React, { useEffect, useState } from 'react';
import ListGroups from "../../ComponentGroup/ListGroups/ListGroups"
import YourGroups from "../../ComponentGroup/YourGroups/YourGroup";
import AddGroup from "../../ComponentGroup/AddNewGroup/AddGroup";
import PostGroup from "../../ComponentGroup/PostGroup/PostGroup";
import { useSelector } from "react-redux";
import { userGroup } from "../../redux/groupRequest";
import GetMembers from "../../ComponentGroup/GetMembersGroups/GetMembers";

const Group = () => {
    const  user  = useSelector((state) => state.auth.login?.currentUser);

    const [activeTab, setActiveTab] = useState('yourGroups');
    const [groups, setGroups] = useState([]);
    const [currentGroup, setCurrentGroup] = useState(null);

    useEffect(() => {
        const getChats = async () => {
          try {
            const {data} = await userGroup(user._id);
            setGroups(data);
          } catch (error) {
            console.log(error);
          }
        };
        getChats();
    }, [user._id]);

    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };
    return ( 
        <div className="Group">

            {/* Left Side */}
            <div className="Group-side-left">
                <div className="Group-container">
                    <div className="Group-header">
                        <button onClick={() => handleTabClick('yourGroups')}>
                            <i className="fa-solid fa-user-group"></i>
                            <p className="">Your Group</p>
                        </button>
                        <button onClick={() => handleTabClick('discover')}>
                            <i className="fa-regular fa-compass fa-lg"></i>
                            <p>Discover</p>
                        </button>
                        <AddGroup/>
                    </div>
                    <div className="Group-list">
                        <h4 className="List-header">{activeTab === 'yourGroups' ? "Groups you've joined" : 'List Group'}</h4>
                        <div>
                            {activeTab === 'yourGroups' 
                            ? 
                                groups?.map((group) => (
                                    <div key={group._id} onClick={() => {
                                        setCurrentGroup(group);
                                    }}>
                                        <YourGroups
                                            data = {group}
                                        />
                                    </div>
                                ))
                            : 
                                <ListGroups
                                    data = {groups}
                                />
                            }
                        </div>
                    </div>

                </div>
            </div>

            {/* Body Side */}
            <div className="Group-side-body">
                <PostGroup
                   group = {currentGroup} 
                />
            </div>
            
            {/* Right Side */}
            <div className="Group-side-right">
                <GetMembers
                    group = {currentGroup}
                />
            </div>

        </div> 
    );
}
 
export default Group;