import { Feed, Home, Login, Profile } from './container'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}>
          <Route index element={<Feed/>}/>
          <Route path='/profile/:id' element={<Profile/>}/>
        </Route>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      
    </Router>
  )
}

export default App
