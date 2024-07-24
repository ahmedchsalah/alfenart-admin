import { FaFileUpload } from "react-icons/fa";
import { MdOutlineDone } from "react-icons/md";
import {useRef, useState} from "react";
import axiosClient from "../axiosClient.js";
import { IoCloudDoneOutline } from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import Loading from "/Loading.gif";
import TextEditor from "../components/TextEditor.jsx";
const AddResume =() =>{


    const [loading,setLoading] = useState(false)
    const titleRef = useRef()
    const [titleError,setTitleError] = useState('')
    const [file,setFile] = useState(null)
    const [imageError,setImageError] = useState('')
    const [content,setContent] = useState('')
    const [resError,setResError] = useState('')
    const resRef = useRef()
    const [contentError,setContentError] = useState('')
    const navigate = useNavigate()
    const onFileChange = (ev)=>{
        setFile(ev.target.files[0])
    }
    const handleContentChange = (newContent) => {
        setContent(newContent);
    };
    const clearError = (setError) => {
        setTimeout(() => setError(''), 2000); // Clear the error after 3 seconds
    };

    const onSubmit = async (ev) =>{
        ev.preventDefault()
        let hasError = false
        if(!titleRef.current || titleRef.current.value===''){
            setTitleError('titre est obligatoire')
            clearError(setTitleError)
            hasError = true
        }
        if (!resRef.current || resRef.current.value===''){
            setResError('résumé est obligatoire')
            clearError(setResError)
            hasError = true
        }
        if (!file){
            setImageError('image est obligatoire')
            clearError(setImageError)
            hasError = true
        }
        if (!content){
            setContentError('contenu est obligatoire')
            clearError(setContentError)
            hasError = true
        }

        if (hasError) return;

        setLoading(true)
        const formData = new FormData()
        formData.append('title' , titleRef.current.value)
        formData.append('resume',resRef.current.value)
        formData.append('content',content)
        formData.append('image',file)

        try{
            await axiosClient.post('/resumes/add',formData,{
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
                    <h2 className='text-[40px] font-bold text-amber-700'>Ajouter une description</h2>
                </div>
                <div className='flex flex-col justify-between gap-5 my-[20px] w-[80%] mx-auto'>
                    <label htmlFor='title'>titre de description <span className='text-red-600 text-[14px]'>*</span></label>
                    <input id='title' type='text' ref={titleRef} placeholder='Saisir le titre de description'
                           className='border-2 border-amber-800 rounded p-[12px]'/>
                    {titleError && <p className='text-red-600 '>{titleError}</p>}
                </div>
                <div className='flex flex-col justify-between gap-5 my-[20px] w-[80%] mx-auto'>
                    <label htmlFor='resume'>Bref Texte de résumé <span
                        className='text-red-600 text-[14px]'>*</span></label>
                    <textarea id='resume' placeholder='Saisir un bref texte de description' ref={resRef}
                              className='border-2 border-amber-800 rounded p-[12px]'/>
                    {resError && <p className='text-red-600'>{resError}</p>}
                </div>
                <div className='flex flex-col justify-between gap-5 my-[20px] w-[80%] mx-auto'>
                    <label htmlFor='content'>Contenu de description <span
                        className='text-red-600 text-[14px]'>*</span>(Text seulement)</label>
                    <TextEditor content={content} onContentChange={handleContentChange}/>
                    {contentError && <p className='text-red-600'>{contentError}</p>}
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
                {imageError && <p className='text-red-600'>{imageError}</p>}
                <button type='submit' className='bg-green-500 text-center text-white w-[fit-content] py-[10px]
                px-[30px] m-auto text-[21px] rounded flex justify-between items-baseline gap-2 sm:py-[6px] sm:px-[20px] sm:text-[15px]'><MdOutlineDone/> submit
                </button>

            </form>
        </div>
    )
}

export default AddResume;