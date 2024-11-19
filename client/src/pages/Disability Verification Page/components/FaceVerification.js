/* eslint-disable no-unused-vars */
// client/src/components/FaceVerification.js
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const FaceVerification = () => {
  const webcamRef = useRef(null);
  const [verified, setVerified] = useState(false);

  const captureAndVerify = async () => {
    const imageSrc = webcamRef.current.getScreenshot(); // Base64 format
    if (!imageSrc) {
      console.error('No image captured');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/user-face-verify',
        {
          image: imageSrc.split(',')[1], // Extract base64 data after the comma
          email: 'mazen@heard-group.com', // Replace with actual email
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error('Verification error:', error);
    }
  };

  return (
    <div>
      <h1>Face Verification</h1>
      {!verified ? (
        <>
          <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
          <button onClick={captureAndVerify}>Verify Face</button>
        </>
      ) : (
        <h2>Verified! Welcome to the dashboard.</h2>
      )}
    </div>
  );
};

export default FaceVerification;
