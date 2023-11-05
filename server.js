const express = require('express');
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('AI Portfolio Builder Server is running!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


//Open Ai code starts Here


app.post('/generate-portfolio', async (req, res) => {
  // Extract the data from the request body
  const { templateSelection, personalInfo, customization, contactInfo } = req.body;
  
  // Format the prompt
  const prompt = `Create a ${templateSelection.type} portfolio website with the following details: ${JSON.stringify(personalInfo)}, customization: ${JSON.stringify(customization)}, contact: ${JSON.stringify(contactInfo)}`;
  
  // Initialize OpenAI
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  
  try {
    // Send the prompt to OpenAI
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 1500
    });
    
    // Send the response back to the frontend
    res.json({ generatedCode: response.data.choices[0].text });
  } catch (error) {
    res.status(500).send("Error generating portfolio");
  }
});
