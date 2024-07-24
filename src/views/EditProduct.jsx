import { FaFileUpload } from "react-icons/fa";
import { MdOutlineDone } from "react-icons/md";
import {useEffect, useRef, useState} from "react";
import axiosClient from "../axiosClient.js";
import { IoCloudDoneOutline } from "react-icons/io5";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "/Loading.gif";
const EditProduct =() =>{

    const [file,setFile] = useState(null)
    const nameRef = useRef()
    const descRef = useRef()
    const refRef = useRef()
    const navigate  = useNavigate()
    const [categories,setCategories] = useState([])
    const [product,setProduct] = useState({})
    const {id} = useParams()
    const [selectedItem , setItem] = useState()
    const [loading,setLoading] = useState(false)
    const [isModified,setIsModified] = useState(true)
    const onFileChange = (ev)=>{
        setFile(ev.target.files[0])
        setIsModified(false)
    }
    const handleInputChanges = () =>{
        if(nameRef.current.value !==product.name
            || descRef.current.value !== product.description
            || refRef.current.value !== product.reference){
            setIsModified(false)
        }else{
            setIsModified(true)
        }
    }
    const loadCategories = async () =>{
        setLoading(true)
        try{
            const result = await axiosClient.get('/categories')
            setCategories(result.data.categories)
        }catch(error){
            // console.log(error.response.data.errors)
        }finally {
            setLoading(false)
        }
    }
    const loadProduct = async () =>{
        const result = await axiosClient.get(`/products/${id}`)
        setProduct(result.data.Product)
        setItem(result.data.Product.category)
    }
    const onSubmit = async (ev) =>{
        ev.preventDefault()
        setLoading(true)
        const formData = new FormData()
        if(nameRef.current && nameRef.current.value !== ''){
            formData.append('name',nameRef.current.value)
        }
        if(descRef.current && descRef.current.value){
            formData.append('description',descRef.current.value)
        }
        if (selectedItem){
            formData.append('category_id', selectedItem)
        }
        if (refRef.current && refRef.current.value){
            formData.append('reference',refRef.current.value)
        }
        if (file){
            formData.append('image',file)
        }
        formData.append('_method','put')
        // console.log(formData.getAll('category_id'))

        try {
            await axiosClient.post(`/products/${product.id}`,formData,{
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
        loadProduct()
    }, []);

    const handleItem = (ev) =>{
        setItem(ev.target.value)
        if (ev.target.value !== product.id){
            setIsModified(false)
        }else{
            setIsModified(true)
        }
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
                    <h2 className='text-[40px] font-bold text-amber-700'>Modifier un produit</h2>
                </div>
                <div className='flex flex-col justify-between gap-5 my-[20px]'>
                    <label htmlFor='name'>Nom de produit</label>
                    <input id='name' type='text' ref={nameRef} placeholder='Saisir le nom de produit'
                           className='border-2 border-amber-800 rounded p-[12px]' defaultValue={product.name} onChange={handleInputChanges}/>
                </div>
                <div className='flex flex-col justify-between my-[10px] gap-5'>
                    <label htmlFor='description'>Description de Produit</label>
                    <textarea id='description' placeholder='Saisir le description de produit' ref={descRef}
                              className='border-2 border-amber-800 rounded p-[12px]' defaultValue={product.description} onChange={handleInputChanges}/>
                </div>
                <div className='flex flex-col justify-between gap-5 my-[20px]'>
                    <label htmlFor='name'>Reference de produit</label>
                    <input id='name' type='text' ref={refRef} placeholder='Saisir la reference de produit'
                           className='border-2 border-amber-800 rounded p-[12px]' defaultValue={product.reference} onChange={handleInputChanges}/>
                </div>
                <div className='flex flex-col justify-between my-[10px] gap-5'>
                    <label htmlFor='category'>Catégoré de Produit</label>
                    <select id='category' value={selectedItem} onChange={handleItem} className='block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent
                                                                                  border-0 border-b-2 border-gray-200 appearance-none
                    focus:outline-none focus:ring-0 focus:border-gray-200 peer' >
                        {categories.map((category) => (
                            <option selected={category.id===product.category} key={category.id} value={category.id}> {category.name}</option>
                        ))}
                    </select>
                </div>
                <div className='flex items-center justify-center my-[20px] gap-5 w-[fit-content] m-auto'>
                    <label htmlFor='upload' className='flex uppercase text-white
                                        bg-amber-800 py-[15px] px-[40px] text-[17px]
                                        rounded-[5px] cursor-pointer text-center
                                        hover:bg-amber-900 transition hover:scale-95 items-center justify-center gap-7 sm:text-[14px] sm:px-[26px] sm:py-[11px]'><FaFileUpload/> Image
                        de Produit</label>
                    <input type='file' className='hidden' id='upload' onChange={onFileChange}/>
                    {file && <IoCloudDoneOutline className='inline text-green-600 text-[23px]'/>}
                </div>
                <button type='submit'
                        disabled={isModified}
                        className={`bg-green-500 text-center text-white w-[fit-content] py-[10px]
                                    px-[30px] m-auto text-[21px] rounded flex 
                                    justify-between items-baseline gap-2 
                                    ${!isModified ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-gray-400 cursor-not-allowed'} sm:py-[6px] sm:px-[20px] sm:text-[15px]`}><MdOutlineDone/> submit
                </button>

            </form>
        </div>
    )
}

export default EditProduct;