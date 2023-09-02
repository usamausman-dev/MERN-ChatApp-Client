import React, { useEffect, useState } from 'react'
import { auth } from '../utils/FirebaseConfig'
import { onAuthStateChanged } from "firebase/auth";
import { MdArrowBackIosNew } from 'react-icons/md'

const Sidebar = () => {

    const [open, setOpen] = useState(true);
    const [currentUser, setCurrentUser] = useState(null)
    const Users = [
        {
            user: 'Usama',
            image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80'
        }
    ]

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

                setCurrentUser(payload)

            } else {
                setCurrentUser(user)
            }
        });
    }, [])

    return (
        <div className={`${open ? "w-72" : "w-20"} duration-300 h-screen p-5 pt-8 bg-green-500 relative`}>

            <MdArrowBackIosNew color='#72c179' size={27} onClick={() => setOpen(!open)} className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 p-1.5 bg-white  ${!open && "rotate-180"}`} />



            <ul >

                <li
                    className={`group text-gray-300 text-sm mb-8 flex items-center gap-x-4 cursor-pointer bg-white p-2 hover:bg-light-white rounded-md `}>
                    <img alt="current-user" src={currentUser?.photoURL} className={`${open && 'w-8'}  rounded-full `} />
                    <span
                        style={{ transitionDelay: `100ms` }}
                        className={`${!open && 'opacity-0 translate-x-28 overflow-hidden'} whitespace-pre origin-left duration-500 hover:white hover:font-semibold`}>
                        {currentUser?.displayName}
                    </span>

                    <span
                        className={`${open && "hidden"}  absolute left-48 bg-white font-semibold text-sm whitespace-pre text-green-700 rounded-md overflow-hidden drop-shadow-lg px-0 py-0 w-0 group-hover:p-2  group-hover:left-24 group-hover:duration-300 group-hover:w-fit`}>
                        {currentUser?.displayName}
                    </span>
                </li>

                {Users.map((user, index) => {
                    return (
                        <li
                            key={index}
                            className={`group text-white text-sm flex items-center gap-x-4 cursor-pointer  p-2 hover:bg-light-white rounded-md `}>
                            <img alt={`logo-${index}`} src={user.image} className={`${open && 'w-8'}  rounded-full `} />
                            <span
                                style={{ transitionDelay: `${index + 1}00ms` }}
                                className={`${!open && 'opacity-0 translate-x-28 overflow-hidden'} whitespace-pre origin-left duration-500 hover:white hover:font-semibold`}>
                                {user.user}
                            </span>

                            <span
                                className={`${open && "hidden"}  absolute left-48 bg-white font-semibold text-sm whitespace-pre text-green-700 rounded-md overflow-hidden drop-shadow-lg px-0 py-0 w-0 group-hover:p-2  group-hover:left-24 group-hover:duration-300 group-hover:w-fit`}>
                                {user.user}
                            </span>
                        </li>
                    )
                })}



            </ul>



        </div>
    )
}

export default Sidebar