import {Link} from "react-router-dom";

import  {useEffect, useState} from "react";
import axiosClient from "../axiosClient.js";
import { BiSolidErrorAlt } from "react-icons/bi";
import { IoIosAddCircle } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { IoPricetagsOutline } from "react-icons/io5";
import { CgRename } from "react-icons/cg";
import { MdOutlineDescription } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import Alert from "../components/Alert.jsx";
import Loading from "/Loading.gif";


const Products = () => {

    const [products,setPro] = useState([])
    const [showAlert,setShowAlert] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading,setLoading] = useState(false)

    const loadProducts = async () =>{
        setLoading(true)
        try{
            const result = await axiosClient.get('/products')
            setPro(result.data.data)
            // console.log(result.data.categories)
        }catch (error){
            // console.log(error.response.data.errors)
        }finally {
            setLoading(false)
        }
    }
    const handleOnClose = () => {
        setShowAlert(false)
        setSelectedProduct(null);
    }
    const handleSeeMore = (product) =>{
        setSelectedProduct(product);
        setShowAlert(true)
    }
    useEffect(() => {
        loadProducts()
        // console.log(categories.length)
    }, []);
    const deletePro =async (id) =>{
        await axiosClient.delete(`/products/${id}`)
        loadProducts()
    }
    return (
        <div className='flex flex-col justify-between items-center gap-16 w-full p-20 sm:p-10 sm:pt-10  '>
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
                <h2 className='text-[35px] text-amber-700 space-x-3.5 font-bold'>Produits</h2>
            </div>
            <div
                className=' w-full h-full    m-auto mt-5 flex flex-wrap gap-12 justify-start   '>
                {products.length !== 0 ? products.map((product) => (
                        <div key={product.id} className='max-w-xs bg-white border border-gray-200
                                                                rounded-lg shadow flex flex-col relative min-h-[600px] sm:h-[700px] w-[100%]'>
                            <div className='overflow-hidden max-h-[25%] w-[100%]'>
                                <img src={product.image} alt='' className='w-[100%] rounded-lg relative z-10' loading={"lazy"}/>
                            </div>
                            <div className='p-5 justify-self-start   min-h-[30%] mt-[-3px] h-auto'>
                                <h2 className='text-[30px] font-semibold mb-[10px]'><CgRename
                                    className='inline'/> {product.name}</h2>
                                <h2 className='text-[20px] font-semibold mb-[10px] text-green-600 flex items-center gap-6'><IoPricetagsOutline
                                    className='inline'/> {product.reference} </h2>
                                <p className='overflow-hidden text-gray-700 flex items-center gap-6 text-[17px] '>
                                    <BiCategoryAlt className='inline text-[26px]'/> {product.category_name}
                                </p>

                            </div>
                            <div className='px-5  py-2 justify-self-start bg-gray-50 h-[25%] sm:h-[23%] flex flex-col justify-between'>

                                <p className='line-clamp-3 text-gray-700 w-full'><MdOutlineDescription
                                    className='inline'/> {product.description}</p>
                                <button onClick={() => handleSeeMore(product)} className='self-end p-1 rounded bg-blue-700 text-white'>voir plus</button>
                            </div>
                            <div
                                className='p-5  absolute bottom-1 flex justify-between  w-full sm:flex-col sm:items-center sm:justify-between sm:gap-4'>
                                <Link to={`/product/${product.id}`} className='bg-transparent hover:bg-blue-500 text-blue-700
                                                                                 font-semibold hover:text-white py-2 px-4 border
                                                                                 border-blue-500 hover:border-transparent rounded sm:px-4 '>
                                    <MdOutlineEdit className='inline'/> Modifier
                                </Link>
                                <button onClick={() => deletePro(product.id)} className='bg-transparent hover:bg-red-700 text-red-600
                                                                                font-semibold hover:text-white py-2 px-4 border
                                                                                border-red-600 hover:border-transparent rounded sm:px-4 '>
                                    <MdDeleteOutline className='inline'/> Supprimer
                                </button>
                            </div>
                            {showAlert && selectedProduct && <Alert description={selectedProduct.description} onClose={handleOnClose} />}
                        </div>
                    )) :
                    <p className='flex justify-center items-center m-auto text-[30px] text-red-600 text-center'>
                        <BiSolidErrorAlt
                            className='mr-3'/> Aucun Résultat Trouvé</p>}

            </div>
            <Link to='/add-product' className='bg-amber-700 text-white text-[30px] rounded px-[20px] w-[fit-content]
            transition m-auto flex justify-center items-center hover:bg-amber-800'><IoIosAddCircle
                className='inline'/> Ajouter </Link>
        </div>
    )
}
export default Products
