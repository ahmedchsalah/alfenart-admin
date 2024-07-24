// import {Link} from "react-router-dom";

import {useEffect, useState} from "react";
import axiosClient from "../axiosClient.js";
import { BiSolidErrorAlt } from "react-icons/bi";
import office from '/office.png'
import Loading from "/Loading.gif";
import Alert from "../components/Alert.jsx";


const Messages = () => {

    const [messages,setMes] = useState([])
    const [loading,setLoading] = useState(false)
    const [showAlert,setShowAlert] = useState(false)
    const [selectedMessage, setSelectedMessage] = useState(null);

    const loadMessages = async () =>{
        setLoading(true)
        try{
            const result = await axiosClient.get('/messages')
            setMes(result.data.messages)
            // console.log(result.data.categories)
        }catch (error){
            // console.log(error.response.data.errors)
        }finally {
            setLoading(false)
        }
    }
    const handleOnClose = () => {
        setShowAlert(false)
        setSelectedMessage(null);
    }
    const handleSeeMore = (message) =>{
        setSelectedMessage(message);
        setShowAlert(true)
    }

    useEffect(() => {
        loadMessages()
        // console.log(categories.length)
    }, []);
    return (
        <div className='flex flex-col justify-between items-center gap-16 w-full  p-16 sm:px-6 sm:pt-10  '>
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-5 rounded shadow-lg text-center">
                        <div className="spinner-border text-primary" role="status">
                            <img alt='Loading ...' src={Loading}/>
                        </div>
                    </div>
                </div>
            )}
            <div>
                <h2 className='text-[35px] text-amber-700 space-x-3.5 font-bold'>Messages</h2>
            </div>
            <div className=' w-full h-full    m-auto mt-5 grid grid-cols-[repeat(auto-fill_,_minmax(270px,1fr))] gap-12  sm:place-items-center '>
                {messages.length !== 0 ? messages.map((message) => (
                        <div key={message.id} className='w-full bg-white border border-gray-200
                                                                rounded-lg shadow flex flex-col relative h-[360px]'>
                            <div className='relative left-[-10px] top-[-10px]'>
                                <img alt='' className='rounded-full border-[13px] border-stone-300  w-[140px]'
                                     src={office} loading={"lazy"}/>
                            </div>
                            <div className=' px-5 justify-self-start text-green-600'>
                                <h2 className='text-[30px] font-semibold mb-[10px]'>{message.full_name}</h2>
                                <div className='flex justify-between'>
                                    <p className='overflow-hidden text-gray-700'>{message.email}</p>
                                    {message.phone && <p className='overflow-hidden text-gray-700'>{message.phone}</p>}
                                </div>
                            </div>
                            <div className='   bg-gray-100 pb-3 pr-9 h-60 pl-2 pt-2 mt-[10px] flex flex-col justify-between'>
                                <p className='text-[21px]  overflow-hidden line-clamp-3'>{message.message}</p>
                                <button onClick={() => handleSeeMore(message)}
                                        className='self-end p-1 rounded bg-blue-700 text-white'>voir plus
                                </button>
                            </div>
                            {showAlert && selectedMessage && <Alert message={selectedMessage.message} onClose={handleOnClose} />}
                        </div>
                    )) :
                    <p className='flex justify-center items-center m-auto text-[30px] text-red-600 text-center'>
                        <BiSolidErrorAlt
                            className='mr-3'/> Aucun Résultat Trouvé</p>}
            </div>
        </div>
    )
}
export default Messages
