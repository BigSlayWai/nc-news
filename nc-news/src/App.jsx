import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ArticleDetails from './pages/ArticleDetails'
import Navbar from './components/NavBar'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles/:article_id" element={<ArticleDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App