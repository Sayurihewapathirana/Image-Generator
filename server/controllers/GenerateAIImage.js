import axios from 'axios';
import FormData from 'form-data';
import * as dotenv from 'dotenv';
import { createError } from "../error.js";

dotenv.config();

// Controller function to generate AI image using Stability AI (v2beta endpoint)
export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;
    console.log('Prompt received:', prompt);

    if (!prompt || prompt.trim() === "") {
      return next(createError(400, "Prompt cannot be empty"));
    }

    const apiKey = process.env.STABILITY_API_KEY;

    // Construct form data
    const form = new FormData();
    form.append('prompt', prompt);
    form.append('output_format', 'jpeg');

    const response = await axios.post(
      'https://api.stability.ai/v2beta/stable-image/generate/core',
      form,
      {
        headers: {
          ...form.getHeaders(),
          Authorization: `Bearer ${apiKey}`,
        }
      }
    );

    const imageBase64 = response.data?.image;
    if (!imageBase64) {
      return next(createError(500, "No image returned from Stability API"));
    }

    res.status(200).json({ photo: imageBase64 });
  } catch (error) {
    if (error.response) {
      console.error('Stability API error:', error.response.status, error.response.data);
      next(createError(error.response.status, error.response.data.message || "Stability API Error"));
    } else {
      console.error('Error:', error.message);
      next(createError(500, error.message));
    }
  }
};
