import {Link} from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";
import {useEffect, useState} from "react";
import axiosClient from "../axiosClient.js";
import { MdOutlineDescription, MdOutlineEdit} from "react-icons/md";
import {BiSolidErrorAlt} from "react-icons/bi";
import Loading from "/Loading.gif";
import Alert from "../components/Alert.jsx";



const Resume = () => {
    const [resume,setResume] = useState([])
    const [loading,setLoading] = useState(false)
    const [showAlert,setShowAlert] = useState(false)

    const loadResume = async () =>{
        setLoading(true)
        try{
            const result = await axiosClient.get('/resumes')
            setResume(result.data.resumes)
        }catch(error){
            // console.log(error.response.data.errors)
        }finally {
            setLoading(false)
        }
    }
    const handleOnClose = () => {
        setShowAlert(false)
    }
    const handleSeeMore = () =>{
        setShowAlert(true)
    }

    useEffect(() => {
        loadResume()
    }, []);



    return (
        <div className='flex flex-col justify-between items-center gap-16 w-full p-12 sm:px-4 sm:pt-10  '>
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
                <h2 className='text-[35px] text-amber-700 space-x-3.5 font-bold'>Description</h2>
            </div>
            <div
                className='  h-full mx-auto mt-5 flex flex-col justify-start gap-12    '>
                {resume.length !== 0 ? resume.map((res) => (
                        <div key={res.id} className='  bg-white border border-gray-200
                                                                rounded-lg shadow flex flex-col relative h-[480px] w-[400px] m-auto '>
                            <div className='overflow-hidden h-full w-full rounded'>
                                <img src={res.image} alt='' loading={"lazy"}
                                     className=' w-full h-full rounded-lg transform   '/>
                            </div>
                            <div className='p-5 justify-self-center absolute'>
                                <h2 className='text-[30px] tracking-wider text-white bg-amber-900 font-semibold mb-[10px] mix-blend-plus-darker p-2 rounded-lg'>{res.title}</h2>

                            </div>
                            <div
                                className='px-5  py-2 justify-self-start bg-gray-100 h-[25%] sm:h-[25%] flex flex-col justify-between relative top-0'>

                                <p className='line-clamp-3 text-gray-700 w-full'><MdOutlineDescription
                                    className='inline'/> {res.resume}</p>
                                <button onClick={() => handleSeeMore(res)}
                                        className='self-end p-1 rounded bg-blue-700 text-white'>voir plus
                                </button>
                            </div>
                            <div
                                className='p-5   flex justify-between  w-full sm:flex-col sm:items-center sm:justify-between sm:gap-4'>
                                <Link to={`/resumes/${res.id}`} className=' bg-blue-500
                                                                                 font-semibold text-white py-2 px-4
                                                                                  rounded sm:px-2  transform transition-transform duration-300 hover:scale-110 sm:w-[fit-content] sm:text-[14px]'>
                                    <MdOutlineEdit className='inline'/> Modifier
                                </Link>

                            </div>
                            {showAlert && <Alert description={res.resume} onClose={handleOnClose} content={res.content}/>}
                        </div>
                    )) :
                    <p className='flex justify-center items-center m-auto text-[30px] text-red-600 text-center'>
                        <BiSolidErrorAlt
                            className='mr-3'/> Aucun Résultat Trouvé</p>}
            </div>
            {resume.length === 0 && <Link to='/add-resume' className='bg-amber-700 text-white text-[30px] rounded px-[20px] w-[fit-content]
            transition m-auto flex justify-center items-center hover:bg-amber-800'><IoIosAddCircle
                className='inline'/> Ajouter </Link>}
        </div>
    )
}
export default Resume
