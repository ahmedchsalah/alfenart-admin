import { FaFileUpload } from "react-icons/fa";
import { MdOutlineDone } from "react-icons/md";
import {useEffect, useRef, useState} from "react";
import axiosClient from "../axiosClient.js";
import { IoCloudDoneOutline } from "react-icons/io5";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "/Loading.gif";
const EditBanner =() =>{

    const [file,setFile] = useState(null)
    const titleRef = useRef()
    const categoryRef = useRef()
    const urlRef = useRef()
    const navigate  = useNavigate()
    const {id} = useParams()
    const [banner, setBanner] = useState({})
    const [loading,setLoading] = useState(false)
    const [isModified,setIsModified] = useState(true)

    const handleInputChange = () => {
        if (
            titleRef.current.value !== banner.title ||
            categoryRef.current.value !== banner.description ||
            urlRef.current.value !== banner.url && banner.category && banner.url
        ) {
            setIsModified(false);
            // console.log(banner.url,banner.category)
        } else {
            setIsModified(true)
        }
    };
    const onFileChange = (ev)=>{
        setFile(ev.target.files[0])
        setIsModified(false)
    }

    const loadBanner = async ()=>{
        setLoading(true)
        try{
            const result = await axiosClient.get(`/banners/${id}`)
            setBanner(result.data.banner)
        }catch (error){
            // console.log(error.response.data.errors)
        }finally {
            setLoading(false)
        }
    }
    const onSubmit = async (ev) =>{
        ev.preventDefault()
        setLoading(true)
        const formData = new FormData()
        if(titleRef.current.value){
            formData.append('title',titleRef.current.value)
        }
        if(categoryRef.current.value){
            formData.append('category',categoryRef.current.value)
        }
        if(urlRef.current.value){
            formData.append('url',urlRef.current.value)
        }
        if(file){
            formData.append('image',file)
        }
        formData.append('_method','put')
        // console.log(formData)

        try {
            await axiosClient.post(`/banners/${id}`,formData,{
                headers :{
                    'Content-Type' : 'multipart/form-data',
                    'Accept' : 'application/json'
                }
            })
            // console.log(result)
            navigate('/banners')

        }catch (error){
            // console.log(error.response.data.errors)
        }finally {
            setLoading(false)
        }

    }
    useEffect(() => {
        loadBanner()
    }, []);
    return (
        <div className='w-[100%] h-[100%] flex justify-center items-baseline mt-12'>
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-5 rounded shadow-lg text-center">
                        <div className="spinner-border text-primary" role="status">
                            <img alt='Loading ...' src={Loading}/>
                        </div>
                    </div>
                </div>
            )}
            <form className='flex flex-col justify-between mt-0 border-2 rounded border-amber-800 p-7'
                  onSubmit={onSubmit}>
                <div className='flex flex-col justify-between my-[30px]'>
                    <h2 className='text-[40px] font-bold text-amber-700'>Modifier une bannière</h2>
                </div>
                <div className='flex flex-col justify-between gap-5 my-[20px]'>
                    <label htmlFor='title'>titre de bannière</label>
                    <input id='title' type='text' ref={titleRef} placeholder='Saisir le titre de bannière'
                           className='border-2 border-amber-800 rounded p-[12px]' defaultValue={banner.title} onChange={handleInputChange}/>
                </div>
                <div className='flex flex-col justify-between gap-5 my-[20px]'>
                    <label htmlFor='category'>catégoré de bannière </label>
                    <input id='category' type='text' ref={categoryRef} placeholder='Saisir la catégoré de bannière'
                           className='border-2 border-amber-800 rounded p-[12px]' defaultValue={banner.category && banner.category} onChange={handleInputChange}/>
                </div>
                <div className='flex flex-col justify-between my-[10px] gap-5'>
                    <label htmlFor='link'>Link des projets de link </label>
                    <textarea id='link' placeholder='Saisir le link des projets de cette bannière' ref={urlRef}
                              className='border-2 border-amber-800 rounded p-[12px]' defaultValue={banner.url && banner.url} onChange={handleInputChange}/>
                </div>
                <div className='flex items-center justify-center my-[20px] gap-5 w-[fit-content] m-auto'>
                    <label htmlFor='upload' className='flex uppercase text-white
                                        bg-amber-800 py-[15px] px-[40px] text-[17px]
                                        rounded-[5px] cursor-pointer text-center
                                        hover:bg-amber-900 transition hover:scale-95 items-center justify-center gap-7 sm:text-[14px] sm:px-[26px] sm:py-[11px]'><FaFileUpload/> Image
                        de Bannière</label>
                    <input type='file' className='hidden' id='upload' onChange={onFileChange} />
                    {file && <IoCloudDoneOutline className='inline text-green-600 text-[23px]'/>}
                </div>
                <button type='submit'
                        className={`bg-green-500 text-center text-white w-[fit-content] py-[10px]
                                    px-[30px] m-auto text-[21px] rounded flex sm:py-[6px] sm:px-[20px] sm:text-[15px]
                                    justify-between items-baseline gap-2 ${!isModified ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'}`} disabled={isModified}><MdOutlineDone/> submit
                </button>

            </form>
        </div>
    )
}

export default EditBanner;