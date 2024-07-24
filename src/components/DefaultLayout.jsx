import {useState} from 'react'
import {Link, Navigate, Outlet, useLocation} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import { IoLogOutOutline } from "react-icons/io5";
import axiosClient from "../axiosClient.js";
import { IoMenuSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

const DefaultLayout = () => {
    const {user,token} =useStateContext()
    const location = useLocation();
    const [showMenu,setShowMenu] = useState(false)
    if(!token) {
        return <Navigate to='/login' />
    }

    const toggle = () =>{
        setShowMenu(!showMenu)
    }
    const onHide = () =>{
        setShowMenu(!showMenu)
    }
    const onLogout = async (ev)=>{
        ev.preventDefault()
        try {
            const result = await axiosClient.post('/logout')
            localStorage.removeItem('ACCESS_TOKEN');
            localStorage.removeItem('USER');
            console.log(result)
            // return <Navigate to='/' />

        }catch (error){
            const response = error.response
            if(response && response.status === 422){
                console.log(response.data.errors)
            }
        }
        window.location.reload()
    }

    const linkClasses = (path) => {
        const baseClasses = 'py-[0.75rem] px-[1rem] transition rounded text-white text-[21px]';
        return location.pathname === path ? `${baseClasses} bg-amber-900` : `${baseClasses} hover:bg-amber-900`;
    };
    return (
        <div className='flex h-screen '>
            <aside className='w-[20%] bg-amber-800 p-[1rem] flex flex-col pt-[90px] fixed h-full sm:hidden'>
                <Link to='/dashboard' className={linkClasses('/dashboard')}>Accueil</Link>
                <Link to='/categories' className={linkClasses('/categories')}>Catégories</Link>
                <Link to='/products' className={linkClasses('/products')}>Produits</Link>
                <Link to='/contacts' className={linkClasses('/contacts')}>Contacts</Link>
                <Link to='/banners' className={linkClasses('/banners')}>Bannières</Link>
                <Link to='/messages' className={linkClasses('/messages')}>Messages</Link>
                <Link to='/references' className={linkClasses('/references')}>Références</Link>
                <Link to='/resume' className={linkClasses('/resume')}>Description</Link>
            </aside>
            {showMenu && <aside className='hidden sm:flex sm:flex-col sm:fixed sm:top-[90px] bg-amber-700 z-40 w-[130px] transition delay-700'>
                <Link to='/dashboard' className={linkClasses('/dashboard')} onClick={onHide}>Accueil</Link>
                <Link to='/categories' className={linkClasses('/categories')} onClick={onHide}>Catégories</Link>
                <Link to='/products' className={linkClasses('/products')} onClick={onHide}>Produits</Link>
                <Link to='/contacts' className={linkClasses('/contacts')} onClick={onHide}>Contacts</Link>
                <Link to='/banners' className={linkClasses('/banners')} onClick={onHide}>Bannières</Link>
                <Link to='/messages' className={linkClasses('/messages')} onClick={onHide}>Messages</Link>
                <Link to='/references' className={linkClasses('/references')} onClick={onHide}>Références</Link>
                <Link to='/resume' className={linkClasses('/resume')}>Description</Link>
            </aside>}
            <div className='flex-1 overflow-y-auto pl-[20%] sm:w-full sm:pl-0 '>
                <header
                    className='h-[80px] bg-amber-700 px-[2rem] py-[3rem] shadow-inner flex justify-between items-center fixed top-0 w-[80%] z-40 sm:w-full sm:left-0'>
                    <div className='hidden sm:flex text-white text-[25px]  sm:items-center sm:justify-center'>
                        <button onClick={toggle}>{!showMenu ? <IoMenuSharp/> : <IoMdClose/>}</button>
                    </div>
                    <div className='text-white text-[20px] flex items-center justify-center sm:hidden'>

                        {user.email}
                    </div>
                    <div className='flex items-center justify-center'>
                        <button className='btn-logout' onClick={onLogout}>
                            <IoLogOutOutline className='text-white text-[20px]'/>
                        </button>
                    </div>
                </header>
                <main
                    className='flex justify-center items-center   pt-[80px] sm:left-0 sm:w-full sm:m-auto sm:flex-col'>
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}
export default DefaultLayout
