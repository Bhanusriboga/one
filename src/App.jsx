
import { BrowserRouter } from 'react-router-dom'
import './App.scss'
import Routes from './app.routes.jsx'

const App = () => {
  return (
    <div className='vh-100 pagewidth'>
      <BrowserRouter>
        <Routes></Routes>
      </BrowserRouter>

    </div>
  )

}

export default App
