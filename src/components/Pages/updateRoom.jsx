
import React, { useEffect, useState } from "react";
import Navbar from "./llnavbar";
import '../css/homePage.css';
import { NavLink } from "react-router-dom";
import SharingRoomPhoto from "../data/sharing.avif";

const UpdateRoom = () => {
  const [userRooms, setUserRooms] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch(`http://localhost:5000/api/room/all`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => setUserRooms(data))
      .catch((error) => console.error('Error fetching data:', error)); // Handle fetch error
  }, [userId]);

  const deleteRoom = async (roomId) => { // Corrected function to accept roomId
    console.log('Deleting room with id:', roomId);
    if (!roomId) {
      console.error('Invalid room ID front');
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/room/user/${roomId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete room');
      }

      // Optionally, you can handle the success response here
      console.log('Room deleted successfully');
      
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="updatepagecss">
        <button className="updatepagebtn">
          <NavLink to="/addRoom" style={{ textDecoration: "none", color: "white" }}>
            Add Room
          </NavLink>
        </button>

        <h2>User Rooms</h2>

        <div className='room-list'>
          {userRooms.map((room) => (
            <div className='room-card' key={room.id}>
              { console.log(room.id)}
              <div className='forImage'>
                <img src={SharingRoomPhoto} alt="Profile" className="Room-photo" />
              </div>
              <div className='roomDetails'>
                <p>Type: {room.type}</p>
                <p>Address: {room.address}</p>
                <p>Status: {room.status}</p>
                <button className="updateAndDelete_btn" onClick={() => deleteRoom(room._id)}> Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpdateRoom;



