import React, { useState, useEffect } from 'react';
import Navbar from './llnavbar';
import '../css/RoomSearch.css';

const RoomRequests = () => {
  const [requests, setRequests] = useState([]);
  // const [user,setUser]=useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/request/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => setRequests(data))
      .catch((error) => console.error('Error fetching room requests:', error));
  }, []);

  const updateStatusOfRoom = async (requestId, status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/request/${requestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update room status');
      }
  
      // Optionally, you can handle the success response here
      console.log('Room status updated successfully');
  
    } catch (error) {
      console.error('Error updating room status:', error);
    }
  };
  


  return (
    <div>
      <Navbar />
      
      <div className='requestPage'>
        <div className='room-list_requestPage'>
          {requests.map((request) => (
            <div className='room-card_requestPage' key={request._id}>
              <div className='roomDetails'>
                <p className='lable'>Tenant Id:</p>
                <p className='inputFields'>{request.tenant}</p>


                <p className='lable'>Landlord Id: </p>
                <p className='inputFields'>{request.landlord}</p>


                <p className='lable'>Room Id: </p>
                <p className='inputFields'>{request.room}</p>


                <p className='lable'>Status: </p>
                <p className='inputFields'>{request.status}</p>


                {/* <button className='updateAndDelete_btn'>Accept</button>
                <button className='updateAndDelete_btn'>Reject</button> */}
              </div>
              <div className='updateButtons_box'>
                <button className='updateAndDelete_btn' onClick={() => updateStatusOfRoom(request._id, 'accepted')}>Accept</button>
                <button className='updateAndDelete_btn' onClick={() => updateStatusOfRoom(request._id, 'rejected')}>Reject</button>
              </div>
              
            </div>
            
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomRequests;
