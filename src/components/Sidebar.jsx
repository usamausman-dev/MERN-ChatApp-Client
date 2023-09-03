import React, { useContext, useEffect } from 'react'
import { auth } from '../utils/FirebaseConfig'
import { onAuthStateChanged } from "firebase/auth";
import { MdArrowBackIosNew } from 'react-icons/md'
import { Dialog, Transition, Tab } from '@headlessui/react'
import { Fragment, useState } from 'react'
import axios from 'axios';
import { GlobalContext } from '../context/context'

const Sidebar = ({ data, currentUser, rooms }) => {
    const [open, setOpen] = useState(true);
    let [isOpen, setIsOpen] = useState(false)
    const [displayName, setDisplayName] = useState("")
    const [photoURL, setPhotoURL] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const { state, dispatch } = useContext(GlobalContext)



    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const updateUser = (e) => {
        e.preventDefault()
        const payload = {
            _id: currentUser._id,
            displayName,
            photoURL,
            phoneNumber
        }

        console.log(payload)

        axios.put('http://localhost:1234/api/update-profile', payload)
            .then((json) => {
                dispatch({ type: "SET_USER", payload: json.data.user })
                setIsOpen(false)
                window.location.reload(false);

            })
            .catch((err) => console.log(err))
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }


    return (
        <div className={`${open ? "w-72" : "w-20"} duration-300 h-screen p-5 pt-8 bg-green-500 relative`}>

            <MdArrowBackIosNew color='#72c179' size={27} onClick={() => setOpen(!open)} className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 p-1.5 bg-white  ${!open && "rotate-180"}`} />
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        User Profile
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <form onSubmit={updateUser}>
                                            <div className="grid gap-6 mb-6 md:grid-cols-2">

                                                <div>
                                                    <label
                                                        htmlFor="displayName"
                                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                    >
                                                        User Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="displayName"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        placeholder="Doe"

                                                        value={displayName}
                                                        onChange={(e) => setDisplayName(e.target.value)}
                                                    />
                                                </div>

                                                <div>
                                                    <label
                                                        htmlFor="phone"
                                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                    >
                                                        Phone number
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        id="phone"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        placeholder="123-45-678"

                                                        value={phoneNumber}
                                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                                    />
                                                </div>


                                            </div>


                                            <div className="mb-6">
                                                <label
                                                    htmlFor="photoURL"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Photo URL
                                                </label>
                                                <input
                                                    type="text"
                                                    id="photoURL"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Firebase URL"

                                                    value={photoURL}
                                                    onChange={(e) => setPhotoURL(e.target.value)}
                                                />
                                            </div>

                                            <div className="mt-4 gap-4 flex">
                                                <button
                                                    type="submit"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"

                                                >
                                                    Update
                                                </button>
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
                                                    onClick={closeModal}
                                                >
                                                    Close
                                                </button>
                                            </div>

                                        </form>

                                    </div>


                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>


            <ul >

                <li onClick={openModal}
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
            </ul>

            <Tab.List className="flex flex-col rounded-xl bg-green-900/20">
                {
                    rooms.map((room, index) => (
                        <Tab
                            key={index}
                            className={`group text-white text-sm flex items-center gap-x-4 cursor-pointer  p-2 hover:bg-light-white rounded-md `}>
                            <div className='w-[2vw] h-[2vw] bg-white text-slate-900 rounded-full flex items-center justify-center'><span className='p-3 font-bold'>{room.name[0]}</span></div>
                            <span
                                style={{ transitionDelay: `${index + 1}00ms` }}
                                className={`${!open && 'opacity-0 translate-x-28 overflow-hidden'} whitespace-pre origin-left duration-500 hover:white hover:font-semibold`}>
                                {room.name}
                            </span>

                            <span
                                className={`${open && "hidden"}  absolute left-48 bg-white font-semibold text-sm whitespace-pre text-green-700 rounded-md overflow-hidden drop-shadow-lg px-0 py-0 w-0 group-hover:p-2  group-hover:left-24 group-hover:duration-300 group-hover:w-fit`}>
                                {room.name}
                            </span>

                        </Tab>
                    ))
                }



                {/* {Object.keys(data).map((room) => (
                    <Tab
                        key={room}
                        className={({ selected }) =>
                            classNames(
                                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-green-700',
                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2',
                                selected
                                    ? 'bg-white shadow'
                                    : 'text-green-100 hover:bg-white/[0.12] hover:text-white'
                            )
                        }
                    >
                        {room}
                    </Tab>
                ))} */}
            </Tab.List>
        </div>
    )
}

export default Sidebar