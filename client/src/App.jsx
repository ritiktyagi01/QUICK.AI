import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import DashBoard from './pages/DashBoard'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Community from './pages/Community'
import RemoveObject from './pages/RemoveObject'
import WriteArticle from './pages/WriteArticle'
import RemoveBackground from './pages/RemoveBackground'
import GenerateImage from './pages/GenerateImage'
import BlogTitle from './pages/BlogTitle'
import ReviewResume from './pages/ReviewResume'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { useSession } from "@clerk/clerk-react";
import { Toaster } from 'react-hot-toast'


const App = () => {

  // Get the token using useAuth
  const {getToken} = useAuth();
  useEffect(()=>{
    getToken().then((token)=>console.log(token));
  },[])



  // const { session, isLoaded } = useSession();

  // useEffect(() => {
  //   if (!isLoaded || !session) return;

  //   session.getToken().then(token => {
  //     console.log(token);
  //   });
  // }, [isLoaded, session]);




  return (
  <>
    {/* Global UI */}
    <Toaster />

    <Routes>
      {/* Public route */}
      <Route path="/" element={<Home />} />

      {/* Protected routes */}
      <Route
        path="/ai"
        element={
          <ProtectedRoutes>
            <Layout />
          </ProtectedRoutes>
        }
      >
        <Route index element={<DashBoard />} />
        <Route path="write-article" element={<WriteArticle />} />
        <Route path="blog-title" element={<BlogTitle />} />
        <Route path="generate-image" element={<GenerateImage />} />
        <Route path="remove-background" element={<RemoveBackground />} />
        <Route path="remove-object" element={<RemoveObject />} />
        <Route path="review-resume" element={<ReviewResume />} />
        <Route path="community" element={<Community />} />
      </Route>
    </Routes>
  </>
)};

const ProtectedRoutes = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <div className='flex justify-center items-center h-screen font-extrabold '>Loading...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};


export default App;