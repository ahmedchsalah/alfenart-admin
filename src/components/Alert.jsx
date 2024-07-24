import parse from 'html-react-parser';
// eslint-disable-next-line react/prop-types
const Alert = ({ description , onClose, content='', message = ''}) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div className="absolute w-full h-full bg-gray-800 opacity-20"></div>
            <div className="bg-white w-3/4 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                <div className="py-4 px-6 max-h-[80vh] overflow-y-auto">
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-5 text-green-600 ">{content ? 'Résumé' : (message ? 'Message Complete' : 'Description complete')}</h2>
                        <p>{message ? message : description}</p>
                        {content && <h2 className='text-xl font-semibold my-5 text-green-600'>Contenu de résumé</h2>}
                        {content && parse(content)}
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                        onClick={onClose}
                    >
                        Quitter
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Alert;
