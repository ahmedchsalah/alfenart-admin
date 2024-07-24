import { MdOutlineDone } from "react-icons/md";
import {useEffect, useRef, useState} from "react";
import axiosClient from "../axiosClient.js";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../../public/Loading.gif";
const EditContact =() =>{
    const [contact,setContact] = useState({})
    const {id} = useParams()
    const navigate = useNavigate()
    const valueRef = useRef()
    const [loading,setLoading] = useState(false)
    const [isModified,setIsModified] = useState(true)


    const handleInputChanges = () =>{
        if (valueRef.current.value !== contact.value){
            setIsModified(false)
        }else{
            setIsModified(true)
        }
    }


    const loadContact = async () =>{
        setLoading(true)
            // console.log(id)
            try{
                const result = await axiosClient.get(`/contacts/${id}`)
                // console.log(result.data.contact)
                setContact(result.data.contact)
            }catch (error){
                // console.log(error.response.data.errors)
            }finally {
                setLoading(false)
            }
    }

    useEffect(() => {
        loadContact()
        // console.log(contact.type)
    }, [id]);
    const onSubmit = async (ev) =>{
        ev.preventDefault()
        setLoading(true)
        const payload = {
            value : valueRef.current.value,
            type_id : contact.type.id
        }
        try{
             await axiosClient.put(`/contacts/${id}`,payload)
            // console.log(result)
            navigate('/contacts')
        }catch(error){
            // console.log(error.response.data.errors)
        }finally {
            setLoading(false)
        }


    }
    return (
        <div className='w-[100%] h-[100%] flex justify-center items-baseline mt-4'>
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-5 rounded shadow-lg text-center">
                        <div className="spinner-border text-primary" role="status">
                            <img alt='Loading ...' src={Loading}/>
                        </div>
                    </div>
                </div>
            )}
            <form className='flex flex-col justify-between mt-8  gap-8 rounded border-amber-800 p-7' onSubmit={onSubmit}>
                <div className='flex flex-col justify-between my-[30px]'>
                    <h2 className='text-[40px] font-bold text-amber-700'>modifier un contact</h2>
                </div>
                {contact.type && contact.type.name==='téléphone' ?
                    <div className='w-full bg-gray-100 p-4 rounded flex flex-col gap-5 '>
                        <label>téléphone</label>
                        <input type='tel'  defaultValue={contact.value} onChange={handleInputChanges} className='border-2 border-amber-800 rounded p-[12px]' ref={valueRef}/>
                    </div> : contact.type && contact.type.name==='localisation' ?
                        <div className='w-full bg-gray-100 p-4 rounded flex flex-col gap-5 '>
                            <label>Localisation</label>
                            <textarea defaultValue={contact.value} onChange={handleInputChanges} className='border-2 border-amber-800 rounded p-[12px]' ref={valueRef}/>
                        </div> :
                        <div className='w-full bg-gray-100 p-4 rounded flex flex-col gap-5 '>
                            <label>{contact.type && contact.type.name}</label>
                            <input type='text' className='border-2 border-amber-800 rounded p-[12px]' onChange={handleInputChanges} defaultValue={contact.value} ref={valueRef}/>
                        </div>
                    }
                <button type='submit'
                        className={`bg-green-500 text-center text-white w-[fit-content] py-[10px]
                                    px-[30px] m-auto text-[21px] rounded flex 
                                    justify-between items-baseline gap-2 
                                    ${!isModified ? 'bg-green-500 hover:bg-green-600' 
                                                    : 'bg-gray-400 cursor-not-allowed'} sm:py-[6px] sm:px-[20px] sm:text-[15px]`}
                        disabled={isModified}><MdOutlineDone /> submit</button>

            </form>
        </div>
    )
}

export default EditContact;