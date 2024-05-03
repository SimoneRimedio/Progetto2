import DragDrop from '../components/DragDrop/DragDrop';

const Admin = () => {
    return (
        <>
            <div className="flex flex-col items-center min-h-screen ">
            <h1 className="text-xl sm:mb-8 sm:mt-30 mt-8 mb-4">Carica un nuovo file:</h1>
            <DragDrop />
            </div>
        </>
    )
}

export default Admin;
