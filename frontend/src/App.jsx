import {Routes, Route} from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import Send from './pages/Send';

function App() {

  return (
    <div>
        <Routes>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/signin' element={<Signin/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/send' element={<Send/>}/>
        </Routes>
    </div>
  )
}

export default App
