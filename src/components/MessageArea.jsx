import React, { useContext, useEffect, useState } from 'react'
import MessagePill from './MessagePill'
import { BsSendFill } from 'react-icons/bs'
import { GlobalContext } from '../context/context'
import axios from 'axios'
import io from 'socket.io-client'
import UserIcon from './UserIcon'

export default function MessageArea({ room }) {

    const socket = io.connect('http://localhost:1234');


    const [content, setContent] = useState("")
    const { state, dispatch } = useContext(GlobalContext)
    const [messages, setMessages] = useState([])
    const [members, setmembers] = useState([])
    const sendMessage = (e) => {
        e.preventDefault();
        const payload = {
            room: room._id,
            content: content,
            sender: state.user._id
        }
        axios.post('http://localhost:1234/api/send-message', payload).then(json => console.log(json.data)).catch(err => console.log(err))
        setContent("")
        socket.emit('message', payload)
    }

    useEffect(() => {
        axios.get(`http://localhost:1234/api/messages/${room._id}`).then(json => {
            setMessages(json.data.messages)
            axios.get(`http://localhost:1234/api/room-details/${room.name}`).then((json) => {
                setmembers(json.data.rooms.users)
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        socket.on('connect', function () {
            console.log("connected to server")
        });

        socket.on('disconnect', function (message) {
            console.log("disconnected from server: ", message);

        });

        socket.on('message', (msg) => {
            console.log("message===>", msg)
            setMessages([...messages, msg])
        });


    }, [socket])
    return (
        <>
            <div className="flex justify-between items-center">
                <h1 className='my-4 font-semibold text-green-500 '>{room.name} ({members.length})</h1>
                <div className='flex gap-2'>
                    {members.map((member, key) => <UserIcon key={key} id={member} />)}
                </div>
            </div>

            <div className="bg-slate-100  rounded border-2 border-green-100 w-100 h-[64vh] overflow-auto">

                <main className="flex">
                    <section className="container p-4 flex flex-col">
                        {
                            messages.map((message, key) => <MessagePill key={key} currentUser={message.sender !== state.user._id} message={message.content} user={message.sender} time={message.timestamp} />)
                        }

                    </section>
                </main>



            </div>
            <form onSubmit={sendMessage}>
                <div className="fixed bottom-0  mb-5 flex justify-betweenmt">
                    <input value={content} onChange={(e) => setContent(e.target.value)} className="block p-2.5  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Write your message here..." />
                    <button type='submit' className='bg-slate-900 text-white px-3 ml-4 rounded-full'><BsSendFill /></button>
                </div>
            </form>
        </>
    )
}
