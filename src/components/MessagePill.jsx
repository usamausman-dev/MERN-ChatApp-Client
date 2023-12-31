import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function MessagePill({ currentUser, message, user, time }) {
    const [messageUser, setMessageUser] = useState({})
    useEffect(() => {
        axios.get(`http://localhost:1234/api/userbyid/${user}`).then(json => setMessageUser(json.data.Users)).catch(err => console.log(err))

    }, [])
    return (
        <div className={`${currentUser ? 'justify-start self-start' : 'justify-end self-end'} w-2/4`}>

            <div className={`${currentUser ? 'justify-start' : ''} justify-end flex items-center `}>
                {
                    currentUser && <div className="w-3 overflow-hidden">
                        <div className="h-4 bg-green-200 rotate-45 transform origin-bottom-right rounded-sm"></div>
                    </div>
                }

                <div className={`${currentUser ? 'bg-green-200' : 'bg-green-300'}  p-4 my-6 rounded-lg flex-1`}>
                    <h3 className='mb-2 font-semibold'>{messageUser.displayName}</h3>
                    <span>{message}</span>
                    <h3 className='mt-2 font-thin text-sm text-right'>{time}</h3>
                </div>

                {!currentUser && <div className="w-3 overflow-hidden ">
                    <div className="h-4 bg-green-300 rotate-45 transform origin-top-left rounded-sm"></div>
                </div>}
            </div>
        </div>
    )
}
