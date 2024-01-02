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
