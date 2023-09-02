import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import MessagePill from '../components/MessagePill'
import { BsSendFill } from 'react-icons/bs'
export default function Home() {
    return (
        <div className='flex' >
            <Sidebar />

            <div className='p-7 flex-1 h-screen overflow-y-scroll'>
                <Navbar />
                <div className="bg-slate-50 h-3/4 overflow-auto p-10 rounded border-2 border-green-100">

                    <main className="flex">
                        <section className="container p-4 flex flex-col w-100">
                            <MessagePill currentUser={true} message={"hello"} user={'Usama'} time={'01:00'} />
                            <MessagePill currentUser={false} message={"hello"} user={'Usama'} time={'01:00'} />
                        </section>
                    </main>


                </div>



                <div className="fixed bottom-0 w-[73%] mb-5 flex justify-between">
                    <textarea id="message" rows="1" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your message here..."></textarea>
                    <button className='bg-slate-900 text-white px-3 ml-4 rounded-full'><BsSendFill /></button>
                </div>
            </div>
        </div>
    )
}
