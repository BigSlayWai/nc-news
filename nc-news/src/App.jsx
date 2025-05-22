import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ArticleDetails from './pages/ArticleDetails'
import Navbar from './components/NavBar'
import Login from './components/Login'
import Topics from './pages/Topics'
import TopicsArticles from './pages/TopicsArticles'

function App() {
  const [currentUser, setCurrentUser] = useState(null)

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <Login onLogin={setCurrentUser} />
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/topics/:topic_slug" element={<TopicsArticles />} />
          <Route path="/articles/:article_id" element={<ArticleDetails currentUsername={currentUser}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App