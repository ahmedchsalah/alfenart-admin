import {Link} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import {useRef, useState} from "react";
import axiosClient from "../axiosClient.js";
import Loading from "/Loading.gif";



const Login = () => {
    const {setUser,setToken} = useStateContext()
    const emailRef = useRef();
    const passRef = useRef();
    const [loading,setLoading] = useState(false)
    const [err,setError] = useState('')

    const clearError = () =>{
        setTimeout(() => setError(''), 5000);
    }
    const onSubmit = async (ev) =>{
        ev.preventDefault()
        if ((!emailRef.current || emailRef.current.value==='') && (!passRef.current || passRef.current.value==='')){
            setError('Veuillez saisir votre email et votre mot de passe.')
            clearError()
            return
        }
        if(!emailRef.current || emailRef.current.value === ''){
            setError('Veuillez saisir  votre email.')
            clearError()
            return
        }
        if (!passRef.current || passRef.current.value===''){
            setError('Veuillez saisir votre mot de passe.')
            clearError()
            return
        }

        setLoading(true)
        const payload = {
            email : emailRef.current.value,
            password : passRef.current.value,
        }
        // console.log(payload)
        try {
            const result = await axiosClient.post('/login',payload)
            // console.log(result)
            setUser(result.data.user)
            setToken(result.data.token)
        }catch (error){
            if(error.response.status === 422 || error.response.status === 401){
                setError("Les informations fournies, l'email ou le mot de passe, sont incorrectes.")
                clearError()
            }
        }finally {
            setLoading(false)
        }
    }
    return (
        <div className='h-[100vh] flex justify-center items-center'>
            <div className='p-[34px] relative w-[360px] z-1 bg-white shadow-xl rounded border-2 border-amber-800'>
                {loading && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-5 rounded shadow-lg text-center">
                            <div className="spinner-border text-primary" role="status">
                                <img alt='Loading ...' src={Loading}/>
                            </div>
                        </div>
                    </div>
                )}
                <form onSubmit={onSubmit} className='flex flex-col'>
                    <h1 className='text-center font-bold text-[20px] text-amber-900 mb-4'>
                        Connectez-vous à votre compte
                    </h1>
                    <input type='email' placeholder='Email' ref={emailRef}
                           className='border-2 border-amber-700 p-3 rounded mb-5 focus:border-amber-800'/>
                    <input type='password' placeholder='Mot de passe' ref={passRef}
                           className='border-2 border-amber-700 p-3 rounded mb-5 focus:border-amber-800'/>
                    {err && <p className='text-red-600'>{err}</p>}
                    <button type="submit"
                            className="text-white bg-gradient-to-r from-amber-800 via-amber-900
                            to-amber-900 hover:bg-gradient-to-br focus:outline-none
                             dark:focus:ring-amber-900 font-medium
                            rounded-lg text-sm px-5 py-2.5 text-center  mb-2 w-[fit-content] mx-auto" >
                        Connexion
                    </button>
                </form>
            </div>
        </div>
    )
}
export default Login
