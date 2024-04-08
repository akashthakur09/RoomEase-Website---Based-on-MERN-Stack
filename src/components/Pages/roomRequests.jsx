// import React, { useState, useEffect } from 'react';
// import Navbar from './llnavbar';
// import '../css/RoomSearch.css';
// import axios from 'axios'; // Import axios

// const RoomRequests = () => {
//   const [requests, setRequests] = useState([]);

//   useEffect(() => {
//     // Fetch room requests using axios and include JWT token in the request headers
//     const fetchRoomRequests = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/request/all', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`, // Include JWT token in headers
//           },
//         });

//         setRequests(response.data);
//       } catch (error) {
//         console.error('Error fetching room requests:', error);
//       }
//     };

//     fetchRoomRequests();
//   }, []);

//   const updateStatusOfRoom = async (requestId, status) => {
//     try {
//       const response = await axios.put(`http://localhost:5000/api/request/${requestId}`, { status }, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`, // Include JWT token in headers
//         },
//       });

//       // Optionally, you can handle the success response here
//       console.log('Room status updated successfully');
//     } catch (error) {
//       console.error('Error updating room status:', error);
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className='requestPage'>
//         <div className='room-list_requestPage'>
//           {requests.map((request) => (
//             <div className='room-card_requestPage' key={request._id} style={{width:"600px"}}>
//               <div className='roomDetails'>
//                 <p className='lable'>Tenant Id:</p>
//                 <p className='inputFields'>{request.tenant}</p>

//                 <p className='lable'>Landlord Id: </p>
//                 <p className='inputFields'>{request.landlord}</p>

//                 <p className='lable'>Room Id: </p>
//                 <p className='inputFields'>{request.room}</p>

//                 <p className='lable'>Status: </p>
//                 <p className='inputFields'>{request.status}</p>
//               </div>
//               <div className='updateButtons_box'>
//                 <button className='updateAndDelete_btn' onClick={() => updateStatusOfRoom(request._id, 'accepted')}>Accept</button>
//                 <button className='updateAndDelete_btn' onClick={() => updateStatusOfRoom(request._id, 'rejected')}>Reject</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RoomRequests;
import React, { useState, useEffect } from 'react';
import Navbar from './llnavbar';
import '../css/RoomSearch.css';
import axios from 'axios';

const RoomRequests = () => {
  const [requests, setRequests] = useState([]);
  const userId = localStorage.getItem('userId'); // Get the current landlord's ID from localStorage

  useEffect(() => {
    const fetchRoomRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/request/all/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching room requests:', error);
      }
    };

    fetchRoomRequests();
  }, [userId]); // Include userId in the dependency array to re-fetch requests when it changes

  const updateStatusOfRoom = async (requestId, status) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/request/${requestId}`, { status }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

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
            (request.landlord === userId) && (
            <div className='room-card_requestPage' key={request._id} style={{width:"600px"}}>
              <div className='roomDetails'>
                <p className='lable'>Tenant Id:</p>
                <p className='inputFields'>{request.tenant}</p>

                <p className='lable'>Landlord Id: </p>
                <p className='inputFields'>{request.landlord}</p>

                <p className='lable'>Room Id: </p>
                <p className='inputFields'>{request.room}</p>

                <p className='lable'>Status: </p>
                <p className='inputFields'>{request.status}</p>
              </div>
              <div className='updateButtons_box'>
                <button className='updateAndDelete_btn' onClick={() => updateStatusOfRoom(request._id, 'accepted')}>Accept</button>
                <button className='updateAndDelete_btn' onClick={() => updateStatusOfRoom(request._id, 'rejected')}>Reject</button>
              </div>
            </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomRequests;
