
import {MdOutlineDone} from "react-icons/md";
import {useEffect, useRef, useState} from "react";
import axiosClient from "../axiosClient.js";
import { IoMdAdd } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import {useNavigate} from "react-router-dom";
import Loading from "/Loading.gif";
const AddContact = () => {
    const [showList , setShowList] = useState(false)
    const [list,setList] = useState([])
    const [showField,setShowField] = useState(false)
    const [selected,setSelected] = useState('')
    const dropdownRef = useRef(null);
    const [typeId, setId] = useState()
    const valueRef = useRef()
    const navigate = useNavigate()
    const [valueError,setValueError] = useState('')
    const [loading,setLoading] = useState(false)

    const loadTypes = async () =>{
        setLoading(true)
        try {
            const result = await axiosClient.get('/types')
            setList(result.data.types)
        }catch (error){
            // console.log(error.response.data.errors)
        }finally {
            setLoading(false)
        }
    }
    const clearError = (setError) => {
        setTimeout(() => setError(''), 2000); // Clear the error after 3 seconds
    };

    useEffect(() => {
        loadTypes()
    }, []);


    const onClick = (ev) =>{
        ev.preventDefault()
        setShowList(!showList)
        setShowField(false)
    }
    const click = () =>{
        setShowField(false)
    }
    const OnChoose = (type,id) =>{
        setShowField(true)
        setSelected(type)
        setShowList(false)
        setId(id)
        // console.log(type)
        // console.log(selected)
    }
    const onSubmit = async (ev) =>{
        ev.preventDefault()
        if(!valueRef.current || valueRef.current.value===''){
            setValueError('Contact est obligatoire')
            clearError(setValueError)
            return
        }
        setLoading(true)
        const payload = {
            value : valueRef.current.value,
            type_id : typeId
        }
        try{
            await axiosClient.post('/contacts/add',payload)
            // console.log(result)
            navigate('/contacts')

        }catch (error){
            // console.log(error.response.data.errors)
        }finally {
            setLoading(false)
        }

    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowList(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);
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
            <form className='flex flex-col justify-between items-center mt-0  gap-9 rounded border-amber-800 p-7 min-h-[500px]' onSubmit={onSubmit}>
                <div className='flex flex-col justify-between my-[30px] min-h-[80%]'>
                    <h2 className='text-[40px] font-bold text-amber-700'>Ajouter un contact</h2>
                </div>
                <div className='relative'>
                    <button className='bg-transparent hover:bg-blue-500 text-blue-700
                                   font-semibold hover:text-white py-2 px-4 border w-[fit-content]
                                   border-blue-500 hover:border-transparent rounded sm:px-4' onClick={onClick}>
                        <IoMdAdd className='inline'/>
                        Nouveau
                    </button>
                    {showList &&
                        <ul className='absolute rounded  w-full  left-0 mt-2' ref={dropdownRef} >{list.map((type,index) => (
                                <li key={type.id}  onClick={()=>OnChoose(type.name,type.id)}
                                    className={`cursor-pointer ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'} p-2`}>{type.name}</li>
                    ))}</ul>
                    }

                </div>
                {showField && selected === 'tel' ?
                    <div className='w-full bg-gray-100 p-4 rounded flex flex-col gap-5 '>
                        <label className='flex justify-between gap-9'>Téléphone <span className='rounded bg-red-700 text-white flex justify-center items-center cursor-pointer'><IoIosClose onClick={click}/></span></label>
                        <input type='tel' className='border-2 border-amber-800 rounded p-[12px]' ref={valueRef} placeholder='Saisir votre numero'/>
                        {valueError && <p className='text-red-600'>{valueError}</p>}
                    </div>
                    : showField && selected === 'localisation'
                        ? <div className='w-full bg-gray-100 p-4 rounded flex flex-col gap-5'>
                            <label className='flex justify-between gap-9'>Localisation <span className='rounded bg-red-700 text-white flex justify-center items-center cursor-pointer'><IoIosClose onClick={click}/></span></label>
                            <textarea placeholder='Saisir un iframe HTML tag ' ref={valueRef} className='border-2 border-amber-800 rounded p-[12px]'/>
                            {valueError && <p className='text-red-600'>{valueError}</p>}
                        </div>


                        : (showField && selected !== '' ) &&
                        <div className='w-full bg-gray-100 p-4 rounded flex flex-col gap-5'>
                            <label className='flex justify-between gap-9'>{selected} <span className='rounded bg-red-700 text-white flex justify-center items-center cursor-pointer'><IoIosClose onClick={click}/></span></label>
                            <textarea  placeholder={`Saisir votre ${selected}`} ref={valueRef} className='border-2 border-amber-800 rounded p-[12px]'/>
                            {valueError && <p className='text-red-600'>{valueError}</p>}
                        </div>}


                <button type='submit' className='bg-green-500 text-center text-white w-[fit-content] py-[10px]
                px-[30px] m-auto mb-[10px] text-[21px] rounded flex justify-between items-baseline gap-2 sm:py-[6px] sm:px-[20px] sm:text-[15px]'>
                <MdOutlineDone/> submit
                </button>


            </form>
        </div>
    )
}
export default AddContact
