import {Link} from "react-router-dom";

import {useEffect, useState} from "react";
import axiosClient from "../axiosClient.js";
import { BiSolidErrorAlt } from "react-icons/bi";
import { IoIosAddCircle } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import Loading from "/Loading.gif";
import Alert from "../components/Alert.jsx";


const Categories = () => {

    const [categories,setCat] = useState([])
    const [loading,setLoading] = useState(false)
    const [showAlert,setShowAlert] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(null);


    const handleOnClose = () => {
        setShowAlert(false)
        setSelectedCategory(null);
    }
    const handleSeeMore = (category) =>{
        setSelectedCategory(category);
        setShowAlert(true)
    }
    const loadCategories = async () =>{
        setLoading(true)
        try{
            const result = await axiosClient.get('/categories')
            setCat(result.data.categories)
            // console.log(result.data.categories)
        }catch (error){
            // console.log(error.response.data.errors)
        }finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadCategories()
        // console.log(categories.length)
    }, []);
    const deleteCat =async (id) =>{
        setLoading(true)
        try{
            await axiosClient.delete(`/categories/${id}`)
            loadCategories()
        }catch (error){
            // console.log(error.response.data.errors)
        }finally {
            setLoading(false)
        }
    }
    return (
        <div className='flex flex-col justify-between items-center gap-16 w-full p-10 sm:pt-10  '>
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
                <h2 className='text-[35px] text-amber-700 space-x-3.5 font-bold'>Catégories</h2>
            </div>
            <div className=' w-full h-full    m-auto mt-5 flex flex-wrap gap-12 justify-start   sm:mr-3'>
                {categories.length !== 0 ? categories.map((category) => (
                        <div  key={category.id} className=' bg-white border border-gray-200
                                                                rounded-lg shadow flex flex-col relative h-[500px] max-w-xs'>
                            <div className='overflow-hidden h-40 max-w-[100%]'>
                                <img src={category.image} alt='' className='max-w-[100%] rounded-lg object-cover' loading={"lazy"}/>
                            </div>
                            <div className='p-5 justify-self-start'>
                                <h2 className='text-[30px] font-semibold mb-[10px]'>{category.name}</h2>
                                <p className='overflow-hidden text-gray-700 line-clamp-3'>{category.description}</p>
                                <button onClick={() => handleSeeMore(category)}
                                        className='self-end p-1 rounded bg-blue-700 text-white mt-5'>voir plus
                                </button>
                            </div>
                            <div
                                className='p-5  absolute bottom-1 flex justify-between  w-full sm:flex-col sm:items-center sm:justify-between sm:gap-4'>
                                <Link to={`/category/${category.id}`} className='bg-transparent hover:bg-blue-500 text-blue-700
                                                                                 font-semibold hover:text-white py-2 px-4 border
                                                                                 border-blue-500 hover:border-transparent rounded sm:px-4 '>
                                    <MdOutlineEdit className='inline'/> Modifier
                                </Link>
                                <button onClick={() => deleteCat(category.id)}  className='bg-transparent hover:bg-red-700 text-red-600
                                                                                font-semibold hover:text-white py-2 px-4 border
                                                                                border-red-600 hover:border-transparent rounded sm:px-4 '>
                                    <MdDeleteOutline className='inline'/> Supprimer
                                </button>
                            </div>
                            {showAlert && selectedCategory && <Alert description={selectedCategory.description} onClose={handleOnClose} />}
                        </div>
                    )) :
                    <p className='flex justify-center items-center m-auto text-[30px] text-red-600 text-center'><BiSolidErrorAlt
                        className='mr-3'/> Aucun Résultat Trouvé</p>}
            </div>
            <Link to='/add-category' className='bg-amber-700 text-white text-[30px] rounded px-[20px] w-[fit-content]
            transition m-auto flex justify-center items-center hover:bg-amber-800'><IoIosAddCircle className='inline'/> Ajouter </Link>
        </div>
    )
}
export default Categories
