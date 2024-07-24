import { FaFileUpload } from "react-icons/fa";
import { MdOutlineDone } from "react-icons/md";
import {useEffect, useRef, useState} from "react";
import axiosClient from "../axiosClient.js";
import { IoCloudDoneOutline } from "react-icons/io5";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "/Loading.gif";
import TextEditor from "../components/TextEditor.jsx";
const EditResume =() =>{


    const [loading,setLoading] = useState(false)
    const titleRef = useRef()
    const [resume,setResume] = useState({})
    const [file,setFile] = useState(null)
    const [content,setContent] = useState('')
    const resRef = useRef()
    const navigate = useNavigate()
    const {id} = useParams()
    const onFileChange = (ev)=>{
        setFile(ev.target.files[0])
    }
    const handleContentChange = (newContent) => {
        setContent(newContent);
    };


    const loadResume = async () =>{
        setLoading(true)
        try {
            const result = await axiosClient.get(`/resumes/${id}`)
            setResume(result.data.resume)
            setContent(result.data.resume.content || '')
            // console.log(resume)
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
        if(titleRef.current && titleRef.current.value){
            formData.append('title' , titleRef.current.value)
        }
        if (resRef.current && resRef.current.value){
            formData.append('resume',resRef.current.value)
        }
        if (content){
            formData.append('content',content)
        }
        if (file){
            formData.append('image',file)
        }
        formData.append('_method' , 'put')

        try{
            await axiosClient.post(`/resumes/${id}`,formData,{
                headers :{
                    'Content-Type' : 'multipart/form-data',
                    'Accept' : 'application/json'
                }
            })
            navigate('/resume')
        }catch (error){
            // console.log(error.response.data.errors)
        }finally {
            setLoading(false)
        }

    }
    useEffect(() => {
        loadResume()
        // console.log(resume.title)
    }, []);

    return (
        <div className='w-[100%] h-[100%] flex justify-center items-baseline mt-12 p-7'>
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-5 rounded shadow-lg text-center">
                        <div className="spinner-border text-primary" role="status">
                            <img alt='Loading ...' src={Loading}/>
                        </div>
                    </div>
                </div>
            )}
            <form className='flex flex-col justify-between items-center w-full p-7' onSubmit={onSubmit}>
                <div className='flex flex-col justify-between my-[30px]'>
                    <h2 className='text-[40px] font-bold text-amber-700'>Modifier une description</h2>
                </div>
                <div className='flex flex-col justify-between gap-5 my-[20px] w-[80%] mx-auto'>
                    <label htmlFor='title'>titre de résumé </label>
                    <input id='title' type='text' ref={titleRef} placeholder='Saisir le titre de description'
                           className='border-2 border-amber-800 rounded p-[12px]' defaultValue={resume.title && resume.title}/>
                </div>
                <div className='flex flex-col justify-between gap-5 my-[20px] w-[80%] mx-auto'>
                    <label htmlFor='resume'>Bref Texte de description </label>
                    <textarea id='resume' placeholder='Saisir un bref texte de description' ref={resRef}
                              className='border-2 border-amber-800 rounded p-[12px]' defaultValue={resume.resume && resume.resume}/>
                </div>
                <div className='flex flex-col justify-between gap-5 my-[20px] w-[80%] mx-auto'>
                    <label htmlFor='content'>Contenu de description <span
                        className='text-red-600 text-[14px]'>*</span>(Text seulement)</label>
                    <TextEditor content={content} onContentChange={handleContentChange}/>
                </div>
                <div className='flex items-center justify-center my-[20px] gap-5 w-[fit-content] m-auto'>
                    <span className='text-red-600 text-[14px]'>*</span>
                    <label htmlFor='upload' className='flex uppercase text-white
                                        bg-amber-800 py-[15px] px-[40px] text-[17px]
                                        rounded-[5px] cursor-pointer text-center
                                        hover:bg-amber-900 transition hover:scale-95 items-center justify-center gap-7 sm:text-[14px] sm:px-[26px] sm:py-[11px]'><FaFileUpload/> Image
                        de Description</label>
                    <input type='file' className='hidden' id='upload' onChange={onFileChange}/>
                    {file && <IoCloudDoneOutline className='inline text-green-600 text-[23px]'/>}
                </div>
                <button type='submit' className='bg-green-500 text-center text-white w-[fit-content] py-[10px]
                px-[30px] m-auto text-[21px] rounded flex justify-between items-baseline gap-2 sm:py-[6px] sm:px-[20px] sm:text-[15px]'><MdOutlineDone/> submit
                </button>

            </form>
        </div>
    )
}

export default EditResume;