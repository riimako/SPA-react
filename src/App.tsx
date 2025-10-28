import './App.css'
import { Outlet, useLocation } from 'react-router'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import CharacterList from './components/CharacterList'

function App() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  return (
    <div className="app-container">
      <Header title="The Interdimensional Portal to Rick and Morty" />
      <main className="main-content">
        {isHomePage ? <CharacterList /> : <Outlet />}
      </main>
      <Footer />
    </div>
  )
}

export default App
