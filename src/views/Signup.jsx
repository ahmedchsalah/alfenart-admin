import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import axiosClient from "../axiosClient.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";


const Signup = () => {
    const {setUser,setToken} = useStateContext()
    const nameRef = useRef()
    const emailRef = useRef()
    const passRef = useRef()
    const passConfirmRef = useRef()
    const [err,setError] = useState('');
    const onSubmit = async (ev) =>{
        ev.preventDefault()
        if (!nameRef.current || nameRef.current.value===''){
            setError('Veuillez saisir  votre nom')
        }
        const payload = {
            name : nameRef.current.value,
            email : emailRef.current.value,
            password : passRef.current.value,
            password_confirmation : passConfirmRef.current.value,
        }
        // console.log(payload)
        try {
            const result = await axiosClient.post('/signup',payload)
            console.log(result)
            setUser(result.data.user)
            setToken(result.data.token)
        }catch (error){
            const response = error.response
            if(response && response.status === 422){
                console.log(response.data.errors)
            }
            setError(error.response)
        }
    }
    return (
        <div className='h-[100vh] flex justify-center items-center'>
            <div className='p-[34px] relative w-[360px] z-1 bg-white shadow-xl rounded border-2 border-amber-800'>
                <form onSubmit={onSubmit} className='flex flex-col'>
                    <h1 className='text-center font-bold text-[20px] text-amber-900 mb-4'>
                        Signup
                    </h1>
                    <input ref={nameRef} type='text' placeholder='Full Name' className='border-2 border-amber-700
                    p-3 rounded mb-5 focus:border-amber-800'/>
                    <input ref={emailRef} type='email' placeholder='Email Adress' className='border-2 border-amber-700 p-3 rounded
                    mb-5 focus:border-amber-800'/>
                    <input ref={passRef} type='password' placeholder='Password' className='border-2 border-amber-700 p-3 rounded
                    mb-5 focus:border-amber-800'/>
                    <input ref={passConfirmRef} type='password' placeholder='Confirm Password' className='border-2 border-amber-700 p-3 rounded
                    mb-5 focus:border-amber-800'/>
                    {err && <p className='text-red-600 text-[16px]'>{{err}}</p>}
                    <button className='text-white bg-gradient-to-r from-amber-800 via-amber-900
                            to-amber-900 hover:bg-gradient-to-br focus:outline-none
                             dark:focus:ring-amber-900 font-medium
                            rounded-lg text-sm px-5 py-2.5 text-center  mb-2 w-[fit-content] mx-auto'>Signup</button>
                    <p className='mt-[15px] mb-0 mx-[0] text-center text-[#b3b3b3] text-[16px]'>
                        Already registered ? <Link to='/login' className='text-amber-700'>Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
export default Signup
