export default function BookingModal({ isVisible, onClose }) {

    if( !isVisible ) return null;

    const handleClose = (e) => {
        if( e.target.id === "wrapper") onClose()
    }

    return(
        <div 
            className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
            id="wrapper" 
            onClick={handleClose}
        >
            <div className="w-[600px] flex flex-col">
                <button 
                    className="text-white text-xl place-self-end"
                    onClick={() => onClose()}
                >
                    X
                </button>
                <div className="bg-white p-2 rounded-md">
                    <div className="p-6 text-left">
                        <h3 className="font-medium">
                            Create Booking
                        </h3>
                        <form className="mt-6">
                            <div>
                                <label>
                                    Selected Date: 
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}