import {Link} from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";
import {useEffect, useState} from "react";
import axiosClient from "../axiosClient.js";
import {MdDeleteOutline, MdOutlineEdit} from "react-icons/md";
import {BiSolidErrorAlt} from "react-icons/bi";
import { GiClick } from "react-icons/gi";
import Loading from "/Loading.gif";



const Banners = () => {
    const [banners,setBanners] = useState([])
    const [loading,setLoading] = useState(false)

    const loadBanners = async () =>{
        setLoading(true)
        try{
            const result = await axiosClient.get('/banners')
            setBanners(result.data.banners)
        }catch(error){
            // console.log(error.response.data.errors)
        }finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadBanners()
    }, []);

    const onDelete = async (id) =>{
        setLoading(true)
       try{
           await axiosClient.delete(`/banners/${id}`)
           loadBanners()
       }catch (error){
            // console.log(error.response.data.errors)
       }finally {
           setLoading(false)
       }
    }

    return (
        <div className='flex flex-col justify-between items-center gap-16 w-full pt-12 pl-40 sm:px-4 sm:pt-10  '>
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
                <h2 className='text-[35px] text-amber-700 space-x-3.5 font-bold'>Bannières</h2>
            </div>
            <div
                className=' w-full h-full mx-auto mt-5 flex flex-wrap gap-12 justify-start'>
                {banners.length !== 0 ? banners.map((banner) => (
                        <div key={banner.id} className='group  bg-white border border-gray-200
                                                                rounded-lg shadow flex flex-col relative h-[340px] w-[400px]'>
                            <div className='overflow-hidden h-full w-full rounded-lg'>
                                <img src={banner.image} alt='' loading={"lazy"} className='banner-image w-[100%] h-full rounded-lg transform scale-150 transition-transform duration-300 group-hover:scale-100 m-auto'/>
                            </div>
                            <div className='p-5 justify-self-center absolute'>
                                <h2 className='text-[30px] tracking-wider text-white bg-amber-900 font-semibold mb-[10px] mix-blend-plus-darker p-2 rounded-lg'>{banner.title}</h2>
                                {banner.category &&
                                    <p className='overflow-hidden text-white bg-amber-700 rounded-lg text-center mix-blend-plus-darker text-[20px] p-1.5'>{banner.category}</p>}
                                {banner.url && <a href={banner.url} className='flex mt-3 justify-center text-white items-center p-2 rounded-lg bg-green-500 text-[19px] '><GiClick/> link</a>}
                            </div>
                            <div
                                className='p-5  absolute bottom-1 flex justify-between  w-full sm:flex-col sm:items-center sm:justify-between sm:gap-4'>
                                <Link to={`/banners/${banner.id}`} className=' bg-blue-500
                                                                                 font-semibold text-white py-2 px-4
                                                                                  rounded sm:px-4  transform transition-transform duration-300 hover:scale-110'>
                                    <MdOutlineEdit className='inline'/> Modifier
                                </Link>
                                <button  onClick={() => onDelete(banner.id)} className=' bg-red-700  font-semibold text-white py-2 px-4
                                                        rounded sm:px-4 transform transition-transform duration-300 hover:scale-110'>
                                    <MdDeleteOutline className='inline'/> Supprimer
                                </button>
                            </div>
                        </div>
                    )) :
                    <p className='flex justify-center items-center m-auto text-[30px] text-red-600 text-center'>
                        <BiSolidErrorAlt
                            className='mr-3'/> Aucun Résultat Trouvé</p>}
            </div>
            <Link to='/add-banner' className='bg-amber-700 text-white text-[30px] rounded px-[20px] w-[fit-content]
            transition m-auto flex justify-center items-center hover:bg-amber-800'><IoIosAddCircle
                className='inline'/> Ajouter </Link>
        </div>
    )
}
export default Banners
