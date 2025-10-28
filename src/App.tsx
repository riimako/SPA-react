import './App.css'
import { Outlet } from 'react-router'
import Footer from './components/Footer'
import Header from './components/Header'

function App() {
  return (
    <div className="app-container">
      <Header title={'TEST'} />
      <main className='main-content'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
