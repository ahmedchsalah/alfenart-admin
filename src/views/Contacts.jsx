import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axiosClient.js";
import {IoIosAddCircle} from "react-icons/io";
import Loading from "/Loading.gif";





const Contacts = () => {
    const [contacts,setCont] = useState([])
    const [loading,setLoading] = useState(false)

    const loadContacts = async () =>{
        setLoading(true)
        try{
            const result = await axiosClient.get('/contacts')
            setCont(result.data.data);
            // console.log(contacts)
        }catch (error){
            // console.log(error.response.data.errors)
        }finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        loadContacts()
        // console.log(contacts)
    }, []);

    const onDelete = async (id) =>{
        setLoading(true)
        try{
            await axiosClient.delete(`/contacts/${id}`)
            loadContacts()
        }catch (error){
            // console.log(error.response.data.errors)
        }finally {
            setLoading(false)
        }
    }


    return (
        <div className='flex flex-col justify-between items-center gap-16 w-full p-20 sm:pt-10  '>
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-5 rounded shadow-lg text-center">
                        <div className="spinner-border text-primary" role="status">
                            <img alt='Loading ...' src={Loading}/>
                        </div>
                    </div>
                </div>
            )}
            <div >
                <h2 className='text-[35px] text-amber-700 space-x-3.5 font-bold'>Contacts</h2>
            </div>
            <div className='m-auto flex  justify-between gap-4 mb-[-20px] sm:flex-col'>
                <Link to='/add-type' className='bg-transparent hover:bg-blue-500 text-blue-700
                                                    font-semibold hover:text-white py-2 px-4 border
                                                    border-blue-500 hover:border-transparent rounded sm:px-4'>
                    <IoIosAddCircle className='inline'/> Ajouter un type de contact
                </Link>
                <Link to='/add-contact' className='bg-transparent hover:bg-blue-500 text-blue-700
                                                    font-semibold hover:text-white py-2 px-4 border
                                                    border-blue-500 hover:border-transparent rounded sm:px-4'>
                    <IoIosAddCircle className='inline'/> Ajouter un contact
                </Link>
            </div>
            <div className='w-full h-full    m-auto mt-5 flex flex-col  items-center gap-9 py-5 sm:px-6'>
                <table
                    className='table-fixed w-full text-sm text-left rtl:text-right text-gray-500 min-w-[600px] overflow-x-scroll sm:relative sm:left-4'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                        <th scope="col" className='px-6 py-3 bg-gray-50 dark:bg-gray-800 sm:flex sm:justify-center'>ID</th>
                        <th scope="col" className='px-6 py-3'>Contact</th>
                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Type</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {contacts.map((contact, index) => (
                        <tr key={index} className='border border-gray-200 dark:border-gray-700'>
                            <td className='px-6 py-4 sm:flex sm:justify-center '>{index + 1}</td>
                            <td className={`px-6 py-4 bg-gray-50 dark:bg-gray-600 text-white `}>{contact.type === 'localisation' ? 'localisation de google map' : contact.value}</td>
                            <td className='px-6 py-4'>{contact.type}</td>
                            <td className=' px-6 py-4 flex justify-between flex-wrap sm:ml-3'>
                                <Link to={`/contacts/${contact.id}`} className='bg-transparent hover:bg-blue-500 text-blue-700
                                                                      font-semibold hover:text-white py-2 px-4 border
                                                                      border-blue-500 hover:border-transparent rounded
                                                                      sm:px-4'>
                                    Modifier
                                </Link>
                                <button onClick={() => onDelete(contact.id)} className='bg-transparent hover:bg-red-700 text-red-600
                                                                                font-semibold hover:text-white py-2 px-4 border
                                                                                border-red-600 hover:border-transparent rounded sm:px-4 '>Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>

        </div>
    )
}
export default Contacts
