import React, { useContext, useEffect, useState } from 'react'
import { auth } from './utils/FirebaseConfig'
import { onAuthStateChanged } from "firebase/auth";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from './pages/Home'
import Login from './pages/Login'
import { GlobalContext } from './context/context'
import axios from 'axios';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const { state, dispatch } = useContext(GlobalContext)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const payload = {
          displayName: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          uid: user.uid
        }

        axios.get(`http://localhost:1234/api/userbyemail/${user.email}`)
          .then((json) => {
            dispatch({ type: "SET_USER", payload: json.data.Users })
          })
          .catch(err => console.log(err))

        setCurrentUser(payload)

      } else {
        setCurrentUser(user)
      }
    });
  }, [])


  return (
    <>
      {
        currentUser ?
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Routes>
          :
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace={true} />} />
          </Routes>
      }
    </>
  )
}
