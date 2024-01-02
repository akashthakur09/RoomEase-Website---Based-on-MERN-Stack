
import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import Footer from './footer';
import '../css/RoomSearch.css';
import SharingRoomPhoto from "../data/sharing.avif"

const ExploreRoom = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch("http://localhost:5000/api/room/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => setRooms(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [selectedCity, selectedRoomType]);

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  const handleRoomTypeChange = (type) => {
    setSelectedRoomType(type);
  };

  const request = async (roomId) => {
    // e.preventDefault();
    const userId = localStorage.getItem("userId");
    const status = "pending";
  
    try {
     
      const roomResponse = await fetch(`http://localhost:5000/api/room/${roomId}`);
      const roomData = await roomResponse.json();

      console.log(roomData);
      const response = await fetch("http://localhost:5000/api/request/create", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tenant: userId,
          room: roomId,
          status: status,
          landlord: roomData.landlord, 
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to make the request');
      }
  
      console.log('Request successfully stored in the database!');
    } catch (error) {
      console.error("Error making the request:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='explore-room-page'>
        <div className='search-box'>
          <div className='city-selection'>
            <h3>City:</h3>
            <select value={selectedCity} onChange={(e) => handleCityChange(e.target.value)}>
              <option value=''>All Cities</option>
             
            </select>
          </div>

          <div className='room-type-filter'>
            <h3>Room Type:</h3>
            <select value={selectedRoomType} onChange={(e) => handleRoomTypeChange(e.target.value)}>
              <option value=''>All Types</option>
              <option value='single'>Single Room</option>
              <option value='sharing'>Sharing Room</option>
              <option value='apartment'>Apartment</option>
            </select>
          </div>
        </div>

        
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className='room-list'>
            {rooms.map((room) => (
              <div className='room-card' key={room.id}>
                <div className='forImage'>
                  {/* {room.photos.map((photo, index) => (
                    <img src={photo} alt={`Room ${index}`} key={index} />
                  ))} */}
                  <img src={SharingRoomPhoto} alt="Profile" className="Room-photo" />
         
                </div>
                <div className='roomDetails'>
                  <p>Type: {room.type}</p>
                  <p>Address: {room.address}</p>
                  
                  <p>Status: {room.status}</p>
                  <button className='searchBookBtn' onClick={() => request(room._id)}>Book</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default ExploreRoom;
