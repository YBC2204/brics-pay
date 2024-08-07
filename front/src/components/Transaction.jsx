import React, { useEffect, useRef, useState } from "react";
import { Search } from "@mui/icons-material";
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const Transaction = () => {

    const [query, setQuery] = useState("");
    const [selectedUser, setSelectedUser] = useState(null); // State to track selected user
    const [proceed, setProceed] = useState(false); // State to track proceed action
    const [email, setemail] = useState("");
    const [amt, setAmt] = useState("");
    const [error, setError] = useState("");
    const userContainerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (userContainerRef.current && !userContainerRef.current.contains(event.target)) {
            setSelectedUser(null);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);
      const transactions = async () => {
        try {
          const token = localStorage.getItem('token');
          console.log(token);
          const response = await axios.post('http://localhost:3000/api/token/transactions', {
            "amount":amt,email
          },{
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          });
          if(response)
          {
            console.log(response);
            alert("Transaction Successfull")
          }
          
        } catch (error) {
          console.error('Buy failed:', error);
          setError('Buy failed. Please try again later.');
        }
      };
    
      const users = ["anjanakj009@gmail.com","parveen123@gmail.com", "anson210@gmail.com"];
    
      const renderUsers = () => {
        return users.map((user) => (
          <button
            key={user}
            className={`user-item bg-slate-800 p-3 rounded-md hover:border-b border-[#2e72d2] hover:scale-105 hover:cursor-pointer ${
              selectedUser === user ? "bg-slate-500  text-[#2e72d2] scale-105 border-b border-[#2e72d2]" : ""
            }`}
            onClick={() => {
              setSelectedUser(user);
              setemail(user);
            }}
          >
            {user}
          </button>
        ));
      };
    
      const handleProceedClick = () => {
        setProceed(true);
      };

     
    

    return (
        <div className={`relative h-screen ${proceed ? "bg-black bg-opacity-50" : ""}`}>
          <div className="flex flex-col justify-center ali gap-4 px-4 py-5 mt-32 border-2 rounded-[20px] border-white bg-gray-900 mx-auto w-[50%]">
            <div className="font-bold uppercase text-3xl text-center tracking-widest">
              Transaction
            </div>
            <div>
              <div className="input-box flex items-center gap-1">
                <Search color="" />
                <input
                  type="search"
                  name="search-form"
                  id="search-form"
                  className="search-input p-2 text-black rounded-xl bg-gray-300 placeholder:text-black w-full"
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search user"
                />
              </div>
            </div>
            <div className="w-full flex flex-col gap-2 px-4 py-2 rounded-xl">
              <div className="text-xl font-semibold">Contacts</div>
              <div className="flex flex-col gap-2 font-semibold">{renderUsers()}</div>
              {selectedUser && (
                <button
                  className="proceed-button bg-[#2e72d2] text-white px-4 py-2 rounded-md mt-2 hover:bg-[#0000ee] transition duration-300"
                  onClick={handleProceedClick}
                >
                  Proceed
                </button>
              )}
            </div>
          </div>
    
          {proceed && (
            <div className="bg-black bg-opacity-50 absolute inset-0 flex items-center justify-center ">
              <div className="btoken-container">
                <div className="bg-gray-800 relative bottom-0 border-2 border-[#2e72d2] p-8 rounded-lg" style={{ width: '28%', height: '320px' }}>
                  <div className="absolute top-2 right-4">
                    <CloseIcon fontSize="medium" color="" onClick={()=>setProceed(false)}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="font-bold text-xl text-white ml-8 uppercase mb-10">Enter Amount</label>
                    <div className="flex flex-col gap-2 ">
                      <input
                        id="amount"
                        name="amount"
                        className="input join-item ip-padding bg-slate-400 rounded-lg"
                        type="text"
                        placeholder=""
                        value={amt}
                        onChange={(e) => setAmt(e.target.value)}
                      />
                      <select
                        id="asset"
                        name="asset"
                        className="select join-item ip-padding bg-slate-300 rounded-lg text-black"
                      >
                        <option value="" disabled>Select Asset</option>
                        
                        <option value="native">BRIC</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-5 flex justify-center">
                    <button
                      type="button"
                      className="flex gap-1 px-3 py-2 border-2 border-blue-600 text-blue-700 rounded-lg hover:bg-blue-600 hover:text-white font-bold"
                      onClick={()=>{
                        transactions();
                      }
                      }
                    >
                      Send <ArrowOutwardIcon />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
}

export default Transaction