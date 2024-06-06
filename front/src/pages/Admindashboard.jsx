import DragDrop from '../components/DragDrop/DragDrop';

const Admin = () => {
    return (
        <>
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center">
                    <h1 className="text-2xl mb-4 text-indigo-600 font-semibold">
                        Carica un nuovo file:
                    </h1>
                    <div className="w-full max-w-md h-96 p-6 bg-white rounded-lg shadow-lg flex items-center justify-center mt-8">
                        <DragDrop />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin;