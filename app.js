const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const axios = require('axios');
const cheerio = require('cheerio');
const bodyParser = require('body-parser');
const OpenAI = require('openai');

dotenv.config();

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// POST endpoint to fetch and parse website content
app.post('/summarize', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const text = $('html *').contents().map(function() {
      return (this.type === 'text') ? $(this).text() + ' ' : '';
    }).get().join('');

    // Summarize the text using OpenAI
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: 'Summarize the following text: ' + text }],
      model: 'gpt-4',
      max_tokens: 100,
    });

    const summary = completion.choices[0].message.content;

    res.json({ summary });
  } catch (error) {
    console.error('Error fetching the URL or summarizing the content:', error);
    res.status(500).json({ error: 'Failed to fetch the URL or summarize the content' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});