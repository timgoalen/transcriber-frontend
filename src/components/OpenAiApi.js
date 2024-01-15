import { useState } from "react";
import axios from "axios";

export default function OpenAiApi({ textAreaInput, handleTextAreaUserInput }) {
  const [response, setResponse] = useState("");

  // for spinner
  const [loading, setLoading] = useState(false);

  async function sendToOpenAiApi() {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          prompt: `Format this text (use UK spelling): ${textAreaInput}`,
          max_tokens: 500,
          temperature: 0.5,
          n: 1,
          model: "gpt-3.5-turbo-instruct",
        },

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );
      const reply = response.data.choices[0].text.trim();
      handleTextAreaUserInput(reply);
      // setResponse(response.data.choices[0].text);
    } catch (error) {
      console.error("OpenAI API Error:", error);
    }
  }

  return <div onClick={() => sendToOpenAiApi()}>ChatGPT</div>;
}
