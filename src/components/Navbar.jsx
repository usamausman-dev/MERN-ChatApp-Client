import React, { useState, useContext } from 'react'
import { signOut } from "firebase/auth";
import { auth } from '../utils/FirebaseConfig'
import { IoMdLogOut } from 'react-icons/io'
import JoinRoom from './JoinRoom';
import CreateRoom from './CreateRoom'



export default function Navbar({ recallData }) {




    return (
        <div className='w-full bg-green-500 p-4 text-white rounded-md flex justify-between items-center'>
            <h1 className='text-xl font-bold'>Chats</h1>
            <div className='gap-4 flex font-semibold'>
                <JoinRoom recallData={recallData} />
                <CreateRoom recallData={recallData} />
                <button onClick={() => signOut(auth)} className='bg-white text-green-500 px-5 py-3 rounded-md'><IoMdLogOut /></button>
            </div>






        </div>
    )
}
