const axios = require('axios');
require('dotenv').config();

const API_URL = "https://api.together.xyz/v1/chat/completions";
const API_KEY = process.env.TOGETHER_API_KEY;

async function generateOptimizedContent(personalInfo, jobDescription) {
  try {
    if (!API_KEY) {
      throw new Error('TOGETHER_API_KEY is not configured');
    }

    const messages = [
      {
        role: "system",
        content: "You are a professional resume writer. Generate LaTeX code for a professional resume."
      },
      {
        role: "user",
        content: `Create a LaTeX resume with the following information:
        
Personal Information:
${JSON.stringify(personalInfo, null, 2)}

Job Description:
${jobDescription}

Generate a professional LaTeX resume that highlights relevant skills and experience. Use a clean, modern LaTeX template.`
      }
    ];

    const response = await axios.post(API_URL, {
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: messages,
      temperature: 0.7,
      max_tokens: 2000
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000
    });

    if (!response.data?.choices?.[0]?.message?.content) {
      throw new Error('Invalid response from AI service');
    }

    // Extract LaTeX code from the response
    const latexCode = `
\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=2cm]{geometry}
\\usepackage{hyperref}
\\usepackage{enumitem}

\\begin{document}
${response.data.choices[0].message.content}
\\end{document}`;

    return latexCode;
  } catch (error) {
    console.error('AI Service Error:', error);
    if (error.response) {
      throw new Error(`AI service error: ${error.response.data?.error || error.message}`);
    }
    throw new Error(`Failed to generate resume content: ${error.message}`);
  }
}

module.exports = { generateOptimizedContent }; 