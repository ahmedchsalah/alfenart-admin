import { FaFileUpload } from "react-icons/fa";
import { MdOutlineDone } from "react-icons/md";
import {useEffect, useRef, useState} from "react";
import axiosClient from "../axiosClient.js";
import { IoCloudDoneOutline } from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import Loading from '/Loading.gif'
const AddProduct =() =>{

    const [file,setFile] = useState(null)
    const nameRef = useRef()
    const descRef = useRef()
    const refRef = useRef()
    const navigate  = useNavigate()
    const [categories,setCategories] = useState([])
    const [selectedItem , setItem] = useState('')
    const [nameError,setNameError] = useState('')
    const [descError,setDescError] = useState('')
    const [refError,setRefError] = useState('')
    const [catError,setCatError] = useState('')
    const [imageError,setImageError] = useState('')
    const [loading,setLoading] = useState(false)
    const onFileChange = (ev)=>{
        setFile(ev.target.files[0])
    }
    const clearError = (setError) => {
        setTimeout(() => setError(''), 2000); // Clear the error after 3 seconds
    };
    const loadCategories = async () =>{
        const result = await axiosClient.get('/categories')
        setCategories(result.data.categories)
    }
    const onSubmit = async (ev) =>{
        ev.preventDefault()
        let hasError = false

        if(!nameRef.current || nameRef.current.value===''){
            setNameError('Nom est obligatoire');
            clearError(setNameError);
            hasError = true;

        }

        if (!descRef.current || descRef.current.value===''){
            setDescError('Description est obligatoire');
            clearError(setDescError);
            hasError = true;

        }

        if(!selectedItem){
            setCatError('Catégorie est obligatoire');
            clearError(setCatError);
            hasError = true;
        }

        if (!refRef.current || refRef.current.value===''){
            setRefError('Référence est obligatoire');
            clearError(setRefError);
            hasError = true;
        }

        if (!file){
            setImageError('Image est obligatoire');
            clearError(setImageError);
            hasError = true;
        }
        if (hasError) return;

        setLoading(true)
        const formData = new FormData()
        formData.append('name',nameRef.current.value)
        formData.append('description',descRef.current.value)
        formData.append('category_id', selectedItem)
        formData.append('reference',refRef.current.value)
        formData.append('image',file)
        // console.log(formData)

        try {

            await axiosClient.post('/products/add',formData,{
                headers :{
                    'Content-Type' : 'multipart/form-data',
                    'Accept' : 'application/json'
                }
            })
            // console.log(result)
            navigate('/products')

        }catch (error){
            // console.log(error.response.data.errors)
        }finally {
            setLoading(false)
        }

    }
    useEffect(() => {
        loadCategories()
    }, []);

    const handleItem = (ev) =>{
        setItem(ev.target.value)
    }
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
                <div className='flex flex-col justify-between my-[20px]'>
                    <h2 className='text-[40px] font-bold text-amber-700'>Ajouter un produit</h2>
                </div>
                <div className='flex flex-col justify-between gap-5 my-[20px]'>
                    <label htmlFor='name'>Nom de produit <span className='text-red-600 text-[14px]'>*</span></label>
                    <input id='name' type='text' ref={nameRef} placeholder='Saisir le nom de produit'
                           className='border-2 border-amber-800 rounded p-[12px]'/>
                    {nameError && <p className='text-red-600 '>{nameError}</p>}
                </div>
                <div className='flex flex-col justify-between my-[10px] gap-5'>
                    <label htmlFor='description'>Description de Produit <span
                        className='text-red-600 text-[14px]'>*</span></label>
                    <textarea id='description' placeholder='Saisir le description de produit' ref={descRef}
                              className='border-2 border-amber-800 rounded p-[12px]'/>
                    {descError && <p className='text-red-600'>{descError}</p>}
                </div>
                <div className='flex flex-col justify-between gap-5 my-[20px]'>
                    <label htmlFor='name'>Reference de produit <span
                        className='text-red-600 text-[14px]'>*</span></label>
                    <input id='name' type='text' ref={refRef} placeholder='Saisir la reference de produit'
                           className='border-2 border-amber-800 rounded p-[12px]' />
                    {refError && <p className='text-red-600'>{refError}</p>}
                </div>
                <div className='flex flex-col justify-between my-[10px] gap-5'>
                    <label htmlFor='category'>Catégoré de Produit <span className='text-red-600 text-[14px]'>*</span></label>
                    <select id='category' value={selectedItem} onChange={handleItem} className='block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent
                                                                                  border-0 border-b-2 border-gray-200 appearance-none
                    focus:outline-none focus:ring-0 focus:border-gray-200 peer'>
                        <option selected>Choisir catégoré</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}> {category.name}</option>
                        ))}

                    </select>
                    {catError && <p className='text-red-600'>{catError}</p>}
                </div>
                <div className='flex items-center justify-center my-[20px] gap-5 w-[fit-content] m-auto'>
                    <span className='text-red-600 text-[14px]'> * </span>
                    <label htmlFor='upload' className='flex uppercase text-white
                                        bg-amber-800 py-[15px] px-[40px] text-[17px]
                                        rounded-[5px] cursor-pointer text-center
                                        hover:bg-amber-900 transition hover:scale-95 items-center justify-center gap-7 sm:text-[14px] sm:px-[26px] sm:py-[11px]'><FaFileUpload/> Image
                        de Produit</label>
                    <input type='file' className='hidden' id='upload' onChange={onFileChange}/>
                    {file && <IoCloudDoneOutline className='inline text-green-600 text-[23px]'/>}
                </div>
                {imageError && <p className='text-red-600 text-center'>{imageError}</p>}
                <button type='submit' className='bg-green-500 text-center text-white w-[fit-content] py-[10px]
                px-[30px] m-auto text-[21px] rounded flex justify-between items-baseline gap-2 sm:py-[6px] sm:px-[20px] sm:text-[15px]'><MdOutlineDone/> submit
                </button>

            </form>
        </div>
    )
}

export default AddProduct;