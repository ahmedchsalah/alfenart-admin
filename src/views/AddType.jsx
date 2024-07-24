
import {MdOutlineDone} from "react-icons/md";
import {useRef, useState} from "react";
import axiosClient from "../axiosClient.js";
import {useNavigate} from "react-router-dom";
import Loading from "/Loading.gif";
const AddType = () => {
    const typeRef = useRef(null)
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [loading,setLoading] = useState(false)

    const clearError = (setError) => {
        setTimeout(() => setError(''), 2000); // Clear the error after 3 seconds
    };
    const onSubmit = async (ev) =>{
        ev.preventDefault()
        if(!typeRef.current || typeRef.current.value===''){
            setError('type est obligatoire')
            clearError(setError)
            return
        }
        setLoading(true)
        const payload = {
            name : typeRef.current.value
        }
        try {
            const result = await axiosClient.post('/types/add',payload)
            // console.log(result)
            navigate('/contacts')
        }catch(error){
            // console.log(error.response.data.errors)
            if (error.response.status===422){
                setError('ce type deja existe')
                clearError(setError)
            }

        }finally {
            setLoading(false)
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
            <form className='flex flex-col justify-between mt-0  gap-2 rounded border-amber-800 p-7 min-h-[500px]' onSubmit={onSubmit}>
                <div className='flex flex-col justify-between my-[30px] min-h-[80%]'>
                    <h2 className='text-[40px] font-bold space-x-3 text-amber-700'>Ajouter un type de contact</h2>
                </div>
                <div className='flex flex-col justify-between gap-4'>
                    <label htmlFor='type'>Type</label>
                    <input id='type' type='text' placeholder='Saisir le nouveau type de contact' className='border-2 border-amber-800 rounded p-[12px]' ref={typeRef}/>
                </div>
                <div className='flex flex-wrap w-full'>
                    <p className='w-full whitespace-normal break-words'>utiliser <span className='text-[17px] text-amber-600'>tel</span> pour téléphone , et <span className='text-[17px] text-amber-600'>adresse</span> pour une adresse exacte, et <span className='text-[17px] text-amber-600'>localisation</span> si vous avez un map de google ...ect</p>
                </div>
                {error && <p className=' text-red-600 '>{error}</p>}
                <button type='submit' className='bg-green-500 text-center text-white w-[fit-content] py-[10px]
                px-[30px] m-auto mb-[10px] text-[21px] rounded flex justify-between items-baseline gap-2 sm:py-[6px] sm:px-[20px] sm:text-[15px]'>
                    <MdOutlineDone/> submit
                </button>

            </form>
        </div>
    )
}
export default AddType
