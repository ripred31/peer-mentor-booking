export default function Button({ method }) {
    const handleClick = () => {
        if (method === 'confirm') {
            // Call the confirm method
        } else if (method === 'cancel') {
            // Call the cancel method
        }
    };

    return (
        <button 
            className="text-white bg-rose-900 hover:bg-rose-700 px-6 py-2 rounded-md"
            onClick={handleClick}
        >
            {method === 'confirm' ? 'Confirm' : 'Cancel'}
        </button>
    );
}
