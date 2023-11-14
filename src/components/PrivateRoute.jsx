import React, { useEffect, useState } from 'react';
import { Outlet,Navigate } from 'react-router-dom'
import { auth } from '../config/firebase'

function PrivateRoute() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setUser(user);
        setLoading(false);
      });
  
      return () => unsubscribe();
    }, []);
  
    if (loading) {
      // Render loading indicator or nothing while authentication state is being resolved
      return null;
    }
  return (
   <>
    
  {  auth.currentUser?<Outlet/>:<Navigate to='/login'/>}
    </>
  )
}

export default PrivateRoute