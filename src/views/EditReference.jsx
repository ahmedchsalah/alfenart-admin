import { FaFileUpload } from "react-icons/fa";
import { MdOutlineDone } from "react-icons/md";
import {useEffect, useRef, useState} from "react";
import axiosClient from "../axiosClient.js";
import {useNavigate, useParams} from "react-router-dom";
import { IoCloudDoneOutline } from "react-icons/io5";
import Loading from "/Loading.gif";
const EditReference =() =>{

    const [file,setFile] = useState(null)
    const titleRef = useRef()
    const {id} = useParams()
    const [reference , setReference] = useState({})
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const [isModified,setIsModified] = useState(true)

    const handleInputChange = () => {
        if (
            titleRef.current.value !== reference.title
        ) {
            setIsModified(false);
        } else {
            setIsModified(true);
        }
    };


    const onFileChange = (ev)=>{
        setFile(ev.target.files[0])
        setIsModified(false);
    }
    const loadRef = async () =>{
        setLoading(true)
        try{
            const result = await axiosClient.get(`/references/${id}`)
            setReference(result.data.reference)
        }catch (error){
            // console.log(error.response.data.errors)
        }finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        loadRef()
    }, []);
    const onSubmit = async (ev) =>{
        ev.preventDefault()
        setLoading(true)
        const formData = new FormData()
        if(titleRef.current && titleRef.current.value!==''){
            formData.append('title',titleRef.current.value)
        }
        if (file){
            formData.append('image',file)
        }
        formData.append('_method','put')
        // console.log(formData)

        try {
            await axiosClient.post(`/references/${reference.id}`,formData,{
                headers :{
                    'Content-Type' : 'multipart/form-data',
                    'Accept' : 'application/json'
                }
            })
            // console.log(result)
            navigate('/references')
        }catch (error){
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
            <form className='flex flex-col justify-between mt-0 border-2 rounded border-amber-800 p-7' onSubmit={onSubmit}>
                <div className='flex flex-col justify-between my-[30px]'>
                    <h2 className='text-[40px] font-bold text-amber-700'>modifier une référence</h2>
                </div>
                <div className='flex flex-col justify-between gap-5 my-[20px]'>
                    <label htmlFor='name'>Titre de référence</label>
                    <input defaultValue={reference.title} id='name' type='text' onChange={handleInputChange} ref={titleRef} placeholder='Saisir le nom de catégoré' className='border-2 border-amber-800 rounded p-[12px]'/>
                </div>
                <div className='flex items-center justify-center my-[20px] gap-5 w-[fit-content] m-auto'>
                    <label htmlFor='upload' className='flex uppercase text-white
                                        bg-amber-800 py-[15px] px-[40px] text-[17px]
                                        rounded-[5px] cursor-pointer text-center
                                        hover:bg-amber-900 transition hover:scale-95 items-center justify-center gap-7 sm:text-[14px] sm:px-[26px] sm:py-[11px]'><FaFileUpload/> Image de référence</label>
                    <input type='file' className='hidden' id='upload' onChange={onFileChange}/>
                    {file && <IoCloudDoneOutline  className='inline text-green-600 text-[23px]'/>}
                </div>
                <button type='submit'
                        className={`bg-green-500 text-center text-white w-[fit-content] py-[10px]
                                    px-[30px] m-auto text-[21px] rounded flex 
                                    justify-between items-baseline gap-2 ${!isModified ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'} sm:py-[6px] sm:px-[20px] sm:text-[15px]`}
                        disabled={isModified}><MdOutlineDone /> submit</button>

            </form>
        </div>
    )
}

export default EditReference;