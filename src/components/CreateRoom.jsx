import React, { Fragment, useContext, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { GlobalContext } from '../context/context'
import axios from 'axios'

export default function CreateRoom({ recallData }) {
    let [isOpen, setIsOpen] = useState(false)
    const [roomName, setRoomName] = useState('')
    const { state, dispatch } = useContext(GlobalContext)


    const openModal = () => {

        setIsOpen(true)
    }

    const makeRoom = (e) => {
        e.preventDefault();
        const payload =
        {
            name: roomName,
            user: state.user._id
        }

        axios.post('http://localhost:1234/api/create-room', payload).then((json) => {

            recallData(json.data.rooms)
            setIsOpen(false)
        })


    }

    return (
        <>
            <button className="bg-white text-green-500 px-8 py-2 rounded-md" onClick={openModal}>Create Room</button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
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
                                        Create Room
                                    </Dialog.Title>
                                    <form onSubmit={makeRoom}>
                                        <div className="mt-2">


                                            <div>
                                                <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Room Name</label>
                                                <input type="text" id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder='Write a Unique Group Name' value={roomName} onChange={(e) => setRoomName(e.target.value)} required />
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"

                                            >
                                                Create
                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
