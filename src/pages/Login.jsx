import React from 'react'
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from '../utils/FirebaseConfig'
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc'


export default function Login() {
    const LoginUser = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                const payload = {
                    displayName: user.displayName,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    photoURL: user.photoURL,
                    uid: user.uid
                }

                axios.post('http://localhost:1234/api/login', payload).then((json) => console.log(json.data))


            }).catch((error) => {
                console.log(error)
            });
    }
    return (

        <div className='flex justify-center items-center text-center h-[100vh] '>
            <div>
                <h1 className='text-3xl'> Login</h1>
                <button onClick={LoginUser} className='text-green-500 flex items-center mt-10 border border-green-500 px-5 py-3 rounded-md font-bold'><FcGoogle /><span className='ml-3'>Login with Google</span></button>
            </div>


        </div>

    )
}
