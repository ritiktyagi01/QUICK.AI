import React from 'react'
import { Routes, Route } from 'react-router-dom'

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

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/ai" element={<Layout />}>
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
  )
}

export default App
