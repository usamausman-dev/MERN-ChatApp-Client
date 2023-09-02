import React from 'react'
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from '../utils/FirebaseConfig'


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

                console.log(payload)

            }).catch((error) => {
                console.log(error)
            });
    }
    return (
        <div className='flex justify-center text-center'>
            <h1 className='text-3xl'> Login</h1>
            <button onClick={LoginUser} className='bg-green-500 mt-10 text-white px-5 py-3 rounded-md'>Login</button>


        </div>
    )
}
