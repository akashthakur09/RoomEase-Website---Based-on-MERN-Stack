import React, { useState,useEffect } from 'react';
import '../../css/llp.css'; 
import Navbar from '../../Pages/llnavbar';
import profileImage from '../../data/profile1.jpg'
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [selectedOption, setSelectedOption] = useState('PersonalDetails'); // Default option: PersonalDetails
  const [update, setUpdate]=useState([]);

  const navigate=useNavigate();
  
  const updateDetails = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const response = await fetch(`http://localhost:5000/api/landlord/profile/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setUpdate(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };


  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId');
      try {
        const response = await fetch(`http://localhost:5000/api/landlord/profile/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setUserData(data); // Assuming the API response is an object containing user data
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    updateDetails();
  }, []);



  const renderContent = () => {
    
      switch (selectedOption) {
        case 'PersonalDetails':
          return (
            <div className='renderbox'>
              <div className='second-heading'><h1>Your Personal Details</h1></div>
              <div className='second-content'>
                {userData ? (
                  <>
                    <p className='label'>Name:</p>
                    <p className='InputField'>{userData.name}</p>

                    <p className='label'>Email Id: </p>
                    <p className='InputField'>{userData.email}</p>

                    <p className='label'>Contact Details:</p>
                    <p className='InputField'> {userData.contactNumber}</p>
                    
                    {/* Add other user details here */}
                  </>
                ) : (
                  <div>
                    <h1>Dummy User Data</h1>
                    <p>Name: John Doe</p>
                    <p>Email: johndoe@example.com</p>
                    <p>Contact: 123-456-7890</p>
                    <p>Aadhar Number: 1234-5678-9012</p>
                </div>
                )}
              </div>
              <div className='second-btn'>
                <button className='profile-btn' onClick={updateDetails}>Edit</button>
              </div>
            </div>
          );
        default:
          return (
            <div className='renderbox'>
              <div className='second-heading'><h1>Your Personal Details</h1></div>
              <div className='second-content'>
                <p>Name: John Doe</p>
                <p>Email: johndoe@example.com</p>
                <p>Contact: 123-456-7890</p>
                <p>Aadhar Number: 1234-5678-9012</p>
              </div>
              <div className='second-btn'>
                <button className='profile-btn'>Edit</button>
              </div>
            </div>
          );
    }
  };


  const deleteAccount= async()=>{
    const userId = localStorage.getItem("userId");
    console.log("delete");

    try {
      const response = await fetch(`http://localhost:5000/api/landlord/profile/${userId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      
      window.localStorage.clear();
      
      // Optionally, you can handle the success response here
      console.log('User deleted successfully');
      navigate("/");
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  return (
    <>
      <Navbar />
      <div className="profile-page">
        <div className="firstsec">
          <ul>
            <li onClick={() => setSelectedOption('PersonalDetails')}>Personal Details</li>
            {/* <li onClick={() => setSelectedOption('RoomsDetails')}>Rooms Details</li>
            <li onClick={() => setSelectedOption('RoomRequests')}>Room Requests</li>
            <li onClick={() => setSelectedOption('Payments')}>Due Payments</li> */}
            <button onClick={deleteAccount} className='profile-btn'>Delete Account</button>
            
          </ul>
        </div>
        <div className="second">
          {renderContent()}
        </div>
        <div className="profile-section">
          <img src={profileImage} alt="Profile" className="profile-photo" />
          <div className="ratings">
            <h3>Your Ratings</h3>
            <p>5 stars</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;

