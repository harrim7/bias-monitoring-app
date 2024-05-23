import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [analysisResults, setAnalysisResults] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('user_id', 'example_user_id'); // Example user ID
        formData.append('document_type', 'example_document_type'); // Example document type
        formData.append('content', 'example_content'); // Example content

        console.log('Uploading file with formData:', formData);
        axios.post('http://127.0.0.1:5000/upload', formData, {
//        axios.post('https://bias-monitoring-backend-17bd6452f016.herokuapp.com/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        })
        .then(response => {
            console.log('Upload response:', response.data);
            setAnalysisResults(response.data.analysis_results);
            setError(null);
        })
        .catch(error => {
            console.error('Upload error:', error);
            setError('An error occurred while uploading the file.');
        });
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {error && <p style={{color: 'red'}}>{error}</p>}
            {analysisResults && (
                <div>
                    <h2>Bias Analysis Results</h2>
                    <pre>{JSON.stringify(analysisResults, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
