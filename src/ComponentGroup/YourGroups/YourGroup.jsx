// import { useEffect, useState } from "react";
import "./yourGroups.css";

const YourGroups = ({data}) => {

 
    return (
      <>
        <div>
            <div className="list-groups">
              <div className='list-name'>{data.name}</div>
            </div>
        </div>
        <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
      </>  
    );
}
 
export default YourGroups;