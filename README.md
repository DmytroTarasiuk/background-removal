This project provides an API for removing the background from images using the `@imgly/background-removal-node` library.

## Getting Started

Follow these steps to run the app locally:

1. **Clone the repository**:
   `https://github.com/DmytroTarasiuk/background-removal.git`

2. **Navigate to the project directory**:
   `cd background-removal`

3. **Install Dependencies**:
   `npm install`

4. **Start the Development Server**:
   `npm start`

## Features

- Remove background from images through a simple API endpoint.
- Supports image uploads using the `multipart/form-data` format.
- Configurable background removal settings.

## API

### POST /remove-background

Remove the background from an image.

**Request:**

- Method: `POST`
- Endpoint: `/remove-background`
- Form Data:
  - `image`: File (image file to be processed)

**Response:**

- Status: `200 OK`
- Body: Base64-encoded image data with the background removed.

## React Example

Here's an example of how you can use the API in a React component:

```jsx
import React, { useState } from 'react';
import axios from 'axios';

const RemoveBg = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [processedImageDataURL, setProcessedImageDataURL] = useState(null);

  const handleFileChange = event => {
    setSelectedFile(event.target.files[0]);
    setProcessedImageDataURL(null);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      const response = await axios.post('http://localhost:5001/remove-background', formData);
      const imageDataURL = `data:image/png;base64,${response.data}`;
      setProcessedImageDataURL(imageDataURL);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleDownload = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = processedImageDataURL;
    downloadLink.download = 'processed_image.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload and Remove Background</button>
        {processedImageDataURL && (
          <div>
            <h2>Processed Image:</h2>
            <img src={processedImageDataURL} alt="Processed" style={{ maxWidth: '100%' }} />
            <button onClick={handleDownload}>Download Image</button>
          </div>
        )}
      </div>
    </>
  );
};

export default RemoveBg;
```
