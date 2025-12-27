import React from 'react'
import { useState, useEffect} from 'react'
import { dummyCreationdata } from '../assets/assets'

const DashBoard = () => {
  const [creations, setCreations] = useState([]);
  const getDashboardData = async () => {
    // Fetch dashboard data logic here
    setCreations(dummyCreationdata); // Update with fetched data
  }
  useEffect(()=>{
    getDashboardData();
  },[]);
  return (
    <div>
    
    </div>
  )
}

export default DashBoard;
