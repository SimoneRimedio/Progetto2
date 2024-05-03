import React, { useState } from 'react';
import axios from 'axios';

const DragAndDrop = () => {
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleDragEnter = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        setFile(droppedFile);
        // Here you can handle the dropped file, for example, read its contents
        // You can use FileReader API or any other suitable method to read the file
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('DBfile', file);
        await axios.put('http://localhost:3000/admin/settings', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    };

    return (
        <div
            className={`border-2 border-gray-300 border-dashed rounded-lg p-8 text-center ${isDragging ? 'bg-gray-100' : ''}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {file ? (
                <div>
                    <p className="text-lg font-semibold mb-4">File selezionato:</p>
                    <p className="text-gray-600">{file.name}</p>
                    <form onSubmit={handleSubmit} className="space-y-4" action='/settings'>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Carica file</button>
                    </form>
                </div>
            ) : (
                <div>
                    <p className="text-lg font-semibold mb-4">Trascina e rilascia un file CSV qui</p>
                    <p className="text-gray-600">oppure</p>
                    <form className="space-y-4">
                        <input
                            type="file"
                            className="hidden"
                            name="DBfile"
                            id="fileInput"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <label htmlFor="fileInput" className="cursor-pointer text-blue-600 hover:underline">Seleziona un file CSV</label>
                    </form>
                </div>
            )}
        </div>
    );
};

export default DragAndDrop;
