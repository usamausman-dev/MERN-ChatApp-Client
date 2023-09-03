import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import MessagePill from '../components/MessagePill'
import { BsSendFill } from 'react-icons/bs'
import { Tab } from '@headlessui/react'
import { auth } from '../utils/FirebaseConfig'
import { onAuthStateChanged } from "firebase/auth";
import axios from 'axios'
import MessageArea from '../components/MessageArea'

export default function Home() {
    const [currentUser, setCurrentUser] = useState(null)
    const [rooms, setRooms] = useState([])

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if (user) {
                axios.get(`http://localhost:1234/api/userbyemail/${user.email}`)
                    .then((json) => {
                        axios.get(`http://localhost:1234/api/room/${json.data.Users._id}`).then((data) => {
                            setCurrentUser(json.data.Users)
                            setRooms(data.data.rooms)

                        })
                            .catch(err => console.log(err))

                    })
                    .catch(err => console.log(err))
            }
            else {
                setCurrentUser(user)
            }
        });
    }, [])



    return (
        <div className='flex' >
            <Tab.Group>

                <Sidebar currentUser={currentUser} rooms={rooms} />

                <div className='p-7 flex-1 h-screen overflow-y-scroll'>
                    <Navbar recallData={setRooms} />

                    <Tab.Panels className="mt-2">

                        {
                            rooms.map((room, key) => (
                                <Tab.Panel
                                    key={key}
                                    className={classNames(
                                        'rounded-xl bg-white p-3',
                                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2'
                                    )}
                                >

                                    <MessageArea room={room} />

                                </Tab.Panel>
                            ))
                        }
                    </Tab.Panels>
                </div>

            </Tab.Group>
        </div>
    )
}
