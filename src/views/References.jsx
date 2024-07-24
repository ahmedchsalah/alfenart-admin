import {Link} from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";
import {useEffect, useState} from "react";
import axiosClient from "../axiosClient.js";
import {MdDeleteOutline, MdOutlineEdit} from "react-icons/md";
import {BiSolidErrorAlt} from "react-icons/bi";
import Loading from "/Loading.gif";



const References = () => {
    const [references,setReferences] = useState([])
    const [loading,setLoading] = useState(false)

    const loadReferences = async () =>{
        setLoading(true)
        try{
            const result = await axiosClient.get('/references')
            setReferences(result.data.references)
        }catch(error){
            // console.log(error.response.data.errors)
        }finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadReferences()
    }, []);

    const onDelete = async (id) =>{
        setLoading(true)
        try{
            await axiosClient.delete(`/references/${id}`)
            loadReferences()
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
                <h2 className='text-[35px] text-amber-700 space-x-3.5 font-bold'>Références</h2>
            </div>
            <div
                className=' w-full h-full    m-auto mt-5 flex flex-wrap gap-7 justify-start  sm:place-items-center '>
                {references.length !== 0 ? references.map((reference) => (
                        <div key={reference.id} className='w-[130px] bg-white border border-gray-200
                                                                rounded-lg shadow flex flex-col justify-between gap-0 relative  '>
                            <div className='overflow-hidden  w-[100%] h-[100px]'>
                                <img src={reference.image} alt='' className=' rounded-lg m-auto' loading={"lazy"}/>
                            </div>
                            <div className='p-4 justify-self-start '>
                                <h2 className='text-[21px] font-semibold mb-[6px] sm:text-[20px]'>{reference.title}</h2>
                            </div>
                            <div
                                className='p-1 sm:mt-7  flex justify-between  w-full flex-col sm:items-center  gap-4 mb-0'>
                                <Link to={`/references/${reference.id}`} className='bg-transparent hover:bg-blue-500 text-blue-700
                                                                                 font-semibold hover:text-white py-1 px-1 border text-center
                                                                                 border-blue-500 hover:border-transparent rounded  text-[15px] sm:w-[fit-content]'>
                                    <MdOutlineEdit className='inline'/> Modifier
                                </Link>
                                <button onClick={() => onDelete(reference.id)} className='bg-transparent hover:bg-red-700 text-red-600
                                                                                font-semibold hover:text-white py-1 px-1 border
                                                                                border-red-600 hover:border-transparent rounded  text-[12px] sm:w-[fit-content] '>
                                    <MdDeleteOutline className='inline'/> Supprimer
                                </button>
                            </div>
                        </div>
                    )) :
                    <p className='flex justify-center items-center m-auto text-[30px] text-red-600 text-center'>
                        <BiSolidErrorAlt
                            className='mr-3'/> Aucun Résultat Trouvé</p>}
            </div>
            <Link to='/add-reference' className='bg-amber-700 text-white text-[30px] rounded px-[20px] w-[fit-content]
            transition m-auto flex justify-center items-center hover:bg-amber-800'><IoIosAddCircle
                className='inline'/> Ajouter </Link>
        </div>
    )
}
export default References
