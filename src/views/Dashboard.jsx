import {useEffect, useState} from 'react'
import { IoPricetagOutline } from "react-icons/io5";
import { MdProductionQuantityLimits } from "react-icons/md";
import { RiContactsBook3Line } from "react-icons/ri";
import { MdOutlinePanorama } from "react-icons/md";
import {Link} from "react-router-dom";
import axiosClient from "../axiosClient.js";
import { BiMessageDetail } from "react-icons/bi";
import Loading from '/Loading.gif'
import { FaRegAddressCard } from "react-icons/fa";
const Dashboard = () => {
    const [contactsNum,setConNum]= useState()
    const [categoriesNum,setCatNum]= useState()
    const [productsNum,setProNum]= useState()
    const [bannersNum,setBanNum]= useState()
    const [messagesNum,setMesNum] = useState()
    const [loading,setLoading] = useState(false)
    const loadInfo = async () =>{
        setLoading(true)
        try{
            const result = await axiosClient.get('/dashboard')
            setConNum(result.data.contacts_num)
            setCatNum(result.data.categories_num)
            setProNum(result.data.products_num)
            setBanNum(result.data.banners_num)
            setMesNum(result.data.messages_num)
            // console.log(result)
        }catch (error){
            // console.log(error.response.data.errors)
        }finally {
            setLoading(false)
        }
    }
    useEffect( () => {
        loadInfo()
    }, []);
    return (
        <div className=' w-full h-screen   flex flex-wrap gap-12 justify-start  m-auto pl-10 pr-5 pt-[100px] '>
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-5 rounded shadow-lg text-center">
                        <div className="spinner-border text-primary" role="status">
                            <img alt='Loading ...' src={Loading}/>
                        </div>
                    </div>
                </div>
            )}
            <Link to='/categories' className='cursor-pointer transition hover:scale-105  delay-100 w-[fit-content]'>
                <div className='flex flex-col items-center w-[200px] h-[200px] shadow-xl
                                justify-evenly p-5 rounded-xl border-2 border-amber-800 '>
                    <IoPricetagOutline className='text-[80px]'/>
                    <p className='text-[23px]'><span className={`${categoriesNum === 0 ? 'text-red-600' : 'text-green-600'}`}>{categoriesNum}</span> Catégories</p>
                </div>
            </Link>
            <Link to='/products' className='cursor-pointer transition hover:scale-105  delay-100 w-[fit-content]'>
                <div className='flex flex-col items-center w-[200px] h-[200px] shadow-xl
                                justify-evenly p-5 rounded-xl border-2 border-amber-800'>
                    <MdProductionQuantityLimits className='text-[80px]'/>
                    <p className='text-[23px]'><span className={`${productsNum === 0 ? 'text-red-600' : 'text-green-600'}`}>{productsNum}</span> Produits
                    </p>
                </div>
            </Link>
            <Link to='/contacts' className='cursor-pointer transition hover:scale-105  delay-100 w-[fit-content]'>
                <div className='flex flex-col items-center w-[200px] h-[200px] shadow-xl
                                justify-evenly p-5 rounded-xl border-2 border-amber-800'>
                    <RiContactsBook3Line className='text-[80px]'/>
                    <p className='text-[23px]'><span className={`${contactsNum === 0 ? 'text-red-600' : 'text-green-600'}`}>{contactsNum}</span> Contacts
                    </p>
                </div>
            </Link>
            <Link to='/banners' className='cursor-pointer transition hover:scale-105  delay-100 w-[fit-content]'>
                <div className='flex flex-col items-center w-[200px] h-[200px] shadow-xl
                                justify-evenly p-5 rounded-xl border-2 border-amber-800'>
                    <MdOutlinePanorama className='text-[80px]'/>
                    <p className='text-[23px]'><span className={`${bannersNum === 0 ? 'text-red-600' : 'text-green-600'}`}>{bannersNum}</span> Bannières
                    </p>
                </div>
            </Link>
            <Link to='/messages' className='cursor-pointer transition hover:scale-105  delay-100 w-[fit-content]'>
                <div className='flex flex-col items-center w-[200px] h-[200px] shadow-xl
                                justify-evenly p-5 rounded-xl border-2 border-amber-800'>
                    <BiMessageDetail className='text-[80px]'/>
                    <p className='text-[23px]'><span className={`${messagesNum === 0 ? 'text-red-600' : 'text-green-600'}`}>{messagesNum}</span> Messages
                    </p>
                </div>
            </Link>
            <Link to='/resume' className='cursor-pointer transition hover:scale-105  delay-100 w-[fit-content]'>
                <div className='flex flex-col items-center w-[200px] h-[200px] shadow-xl
                                justify-evenly p-5 rounded-xl border-2 border-amber-800'>
                    <FaRegAddressCard className='text-[80px]'/>
                    <p className='text-[23px]'>Résumé
                    </p>
                </div>
            </Link>
        </div>
    )
}
export default Dashboard
