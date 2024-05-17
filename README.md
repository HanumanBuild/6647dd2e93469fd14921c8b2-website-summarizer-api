# Website Summarizer API

This API takes in a website URL, fetches the content of the page, and uses OpenAI's GPT-4 to summarize the contents of the page.

## Base URL

The API is served at: `$WEBSITE_SUMMARIZER_API_URL`

## Endpoints

### POST /summarize

This endpoint accepts a website URL and returns a summary of the content.

#### Request

- Method: `POST`
- URL: `/summarize`
- Headers: `Content-Type: application/json`
- Body:
  ```json
  {
    "url": "https://example.com"
  }
  ```

#### Response

- Success: `200 OK`
  ```json
  {
    "summary": "This is a summary of the content."
  }
  ```

- Error: `400 Bad Request`
  ```json
  {
    "error": "URL is required"
  }
  ```

- Error: `500 Internal Server Error`
  ```json
  {
    "error": "Failed to fetch the URL or summarize the content"
  }
  ```

## Example Usage

### cURL

```bash
curl -X POST $WEBSITE_SUMMARIZER_API_URL/summarize \
-H "Content-Type: application/json" \
-d '{"url": "https://example.com"}'
```

### JavaScript (Axios)

```javascript
const axios = require('axios');

const url = 'https://example.com';
const apiUrl = process.env.WEBSITE_SUMMARIZER_API_URL + '/summarize';

axios.post(apiUrl, { url })
  .then(response => {
    console.log('Summary:', response.data.summary);
  })
  .catch(error => {
    console.error('Error:', error.response ? error.response.data : error.message);
  });
```

## Environment Variables

- `MONGODB_URI`: The URI to connect to the MongoDB database.
- `WEBSITE_SUMMARIZER_API_URL`: The URL that the repo website-summarizer-api will be deployed to.
- `MONGODB_DBNAME`: The name of the MongoDB database to connect to.
- `OPENAI_API_KEY`: API key for accessing OpenAI's services. You can get it from your OpenAI account.

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd website-summarizer-api
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file and add the required environment variables:
   ```env
   MONGODB_URI=<your-mongodb-uri>
   WEBSITE_SUMMARIZER_API_URL=<your-api-url>
   MONGODB_DBNAME=<your-mongodb-dbname>
   OPENAI_API_KEY=<your-openai-api-key>
   ```

5. Start the server:
   ```bash
   node app.js
   ```

## License

This project is licensed under the MIT License.
