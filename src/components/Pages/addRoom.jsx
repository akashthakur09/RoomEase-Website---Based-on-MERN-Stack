import React,{ useEffect, useState }  from "react";
import Navbar from "./llnavbar";
import "./../css/llp.css";
import { useNavigate } from "react-router-dom";



export default function AddRoom(){

    const[newRooms,setNewRooms] = useState(
        {
            type:"",
            email:"",
            photos:"",
            address:"",
            landlord:"",
            status:"",
        }
    );
    const userId = localStorage.getItem("userId");
    let navigate = useNavigate()



    const addNewRoom = async(e)=>{
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/room/user/${userId}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                type: newRooms.type,
                email: newRooms.email,
                photos: newRooms.photos,
                address: newRooms.address,
                landlord: newRooms.landlord,
                status: newRooms.status,
              }),
            });
      
            const json = await response.json();
            // console.log(json);
            // if (json.success) {
              alert("Room Added Successfully :)");
              navigate('/updateRoom'); 
            // } else {
            //   alert("Failed to add room. Please try again.");
            // }
          } catch (error) {
            console.error("Error adding room:", error);
            alert("An error occurred. Please try again later.");
          }

    };

    const onChange=(e)=>{
        setNewRooms({...newRooms,[e.target.name]: e.target.value})
    }


    return(
        
        <div>
            <Navbar />
            <div className="addRoomPage">
                <div className="formBox">
                    <form onSubmit={addNewRoom}>
                        <h1 className="addRoomHeading">Enter Room Details</h1>
                        <label>Room Type</label>
                        {/* <br /> */}
                        <input
                            type="text"
                            name="type"
                            onChange={onChange}
                            value={newRooms.type}
                        />
                        {/* <br /> */}
                        <label>Email:</label>
                        {/* <br /> */}
                        <input
                            type="text"
                            name="email"
                            onChange={onChange}
                            value={newRooms.email}
                        />
                        {/* <br /> */}
                        <label>Images of the Room:</label>
                        {/* <br /> */}
                        <input
                            type="text"
                            name="photos"
                            onChange={onChange}
                            value={newRooms.photos}
                        />
                        {/* <br /> */}
                        <label>Address:</label>
                        {/* <br /> */}
                        <input
                            type="text"
                            name="address"
                            onChange={onChange}
                            value={newRooms.address}
                        />
                        {/* <br /> */}
                        <label>Id of the Landlord:</label>
                        {/* <br /> */}
                        <input
                            type="text"
                            name="landlord"
                            onChange={onChange}
                            value={newRooms.landlord}
                        />
                        {/* <br /> */}
                        <label>Status:</label>
                        {/* <br /> */}
                        <input
                            type="text"
                            name="status"
                            onChange={onChange}
                            value={newRooms.status}
                        />
                        {/* <br /> */}
                        <button className="addRoom_btn">Add Room</button>

                    </form>
                </div>
            </div>
            
        </div>

    );
        

        
}
