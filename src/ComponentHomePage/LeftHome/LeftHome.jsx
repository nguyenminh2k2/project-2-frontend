import React from 'react';

const LeftHome = ({user}) => {
    return (  
        <div className='Group-container'>
            <p>{user.username}</p>
        </div>
    );
}
 
export default LeftHome;
