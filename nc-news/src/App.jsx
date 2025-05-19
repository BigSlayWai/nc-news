import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ArticleDetails from './pages/ArticleDetails'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles/:article_id" element={<ArticleDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App