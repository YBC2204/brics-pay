import { LaunchProveModal, useAnonAadhaar } from '@anon-aadhaar/react';
import { useEffect, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Alert from '@mui/material/Alert';
import axios from 'axios';


const Anon = () => {
  const [anonAadhar] = useAnonAadhaar();
  
  const [log, setLog] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [estat,setEstat] = useState("")

  const getemail = async() =>
  {
    try{
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/user/get-email',{
      headers:{
        'Authorization' : `Bearer ${token}`,
       }
       });
       console.log(response.data.email + 'verified');
       
       return (response.data.email + 'verified')
  
      }
    catch(error)
    {
      console.error("error:",error)
    }
  }

  const Verifylog = ()=>
  {
    console.log("Anon Status: ", anonAadhar.status);
    anonAadhar.status === "logged-in" && setLog(true);
    console.log(log);
    const a = anonAadhar.anonAadhaarProofs;
    if (a) {
      console.log(a);
      
      const parsedData = JSON.parse(a["0"].pcd);
      localStorage.setItem('proof',parsedData)
      localStorage.setItem('stats',estat)
      const gender = parsedData.claim.gender;
      const above = parsedData.claim.ageAbove18;
      console.log("Gender:", gender);
      console.log("Above 18:", above);
    }
  }
  useEffect(()=>
  {
     setEstat(getemail())
    const stat = localStorage.getItem('stats');
    console.log(stat);
    
    if (stat == estat)
    {
      setLog(true)
      console.log(stat);
      
    }
  },[])

  

  useEffect(() => {
    if (log) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000); // 3 seconds

      return () => clearTimeout(timer);
    }
  }, [log]);

  return (
    <div className='text-white absolute right-3'>
      {log !== true ? (
        <div onClick={Verifylog()}>
          <LaunchProveModal
            buttonStyle={{ backgroundColor: '#9333ea', color: 'white' }}
            buttonTitle="Verify"
            nullifierSeed="113127483288210213123711461142312541791634"
            fieldsToReveal={["revealAgeAbove18", "revealGender"]}
            
          />
        </div>
      ) : (
        <div className='flex justify-end items-center hover:cursor-pointer'>
          <AccountCircleIcon fontSize='large' />
          <p className='text-lg'>✅</p>
        </div>
      )}

      {showAlert && (
        <Alert severity="success" variant='outlined' className='absolute right-1/2'>
          Login Successful
        </Alert>
      )}
    </div>
  );
}

export default Anon;



   {/* <LogInWithAnonAadhaar 
        nullifierSeed="113127483288210213123711461142312541791634"
          fieldsToReveal={["revealAgeAbove18", "revealPinCode","revealGender","revealState"]} 
  /> */}