import './App.css'
import { Outlet, useLocation } from 'react-router'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import HomePage from './components/HomePage/HomePage'

function App() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  return (
    <div className="app-container">
      <Header title="The Interdimensional Portal to Rick and Morty" />
      <main className="main-content">
        {isHomePage ? <HomePage /> : <Outlet />}
      </main>
      <Footer />
    </div>
  )
}

export default App
