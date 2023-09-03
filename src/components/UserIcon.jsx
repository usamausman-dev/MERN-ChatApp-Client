import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function UserIcon({ id }) {
    const [Name, setName] = useState("")
    useEffect(() => {
        axios.get(`http://localhost:1234/api//userbyid/${id}`)
            .then((json) => {
                setName(json.data.Users.displayName)
            }).catch(err => console.log(err))

    }, [])
    return (
        <div title={Name} className='w-[2vw] h-[2vw] bg-green-700 rounded-full flex justify-center items-center text-white'>
            <span>{Name[0]}</span>
        </div>
    )
}
