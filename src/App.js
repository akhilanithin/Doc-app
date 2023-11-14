import { Routes,Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PrivateRoute from './components/PrivateRoute';
import DocPage from './pages/DocPage';
import EditDoc from './pages/EditDoc';


function App() {
  return (
    <>
    <Routes>
      <Route element={<PrivateRoute/>}>
        <Route path='/' element={<DocPage/>}/>
        <Route path='/editdoc/:id' element={<EditDoc/>}/>

      </Route>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
    </Routes>  
    </> 
  );
}

export default App;