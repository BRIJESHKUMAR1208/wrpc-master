import React, { useState } from 'react';
// import { WhatsNewData } from '../../data/datasource';

export const WhatsNew = () => {
  const [selectedData, setSelectedData] = useState(null);

  const handleLinkClick = (data) => {
    setSelectedData(data);
  };

  return (
    <div className="container">
      
      <div className="card d-flex" style={{ width: "20rem" }}>
      <p style={{textAlign:'center',backgroundColor:"blue",fontWeight:"bold",color:"white",padding:"20px",borderRadius:"5px"}}>What's New</p>

        <div className="card-body">
        
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            <table className="table table-hover table-forum text-center">
              <thead>
                <tr>
                  <th className="text-center">Latest Update</th>
                </tr>
              </thead>
              <tbody>
              <ul style={{listStyle:'none'}}>
     
    </ul>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
