import { useState } from 'react';

const DisabilityVerificationForm = () => {
  const [documents, setDocuments] = useState([]);
  const handleFileChange = (e) => setDocuments([...e.target.files]);
  const handleSubmit = async () => {
    const formData = new FormData();
    documents.forEach((doc) => formData.append('documents', doc));
    const response = await fetch('/api/seller/verify', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    alert(data.message);
  };

  return (
    <div>
      <h3>Upload Disability Documents</h3>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleSubmit}>Submit for Verification</button>
    </div>
  );
};

export default DisabilityVerificationForm;
