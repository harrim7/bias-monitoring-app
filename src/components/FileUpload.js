import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [biasResults, setBiasResults] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('user_id', 'example_user_id'); // Example user ID
        formData.append('document_type', 'example_document_type'); // Example document type
        formData.append('content', 'example_content'); // Example content

        axios.post('https://bias-monitoring-backend-17bd6452f016.herokuapp.com/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        })
        .then(response => {
            setMessage(response.data.message);
            setBiasResults(response.data.bias_results);
        })
        .catch(error => {
            console.error(error);
        });
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {message && <p>{message}</p>}
            {biasResults && (
                <div>
                    <h3>Bias Evaluation Results</h3>
                    <pre>{JSON.stringify(biasResults, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
