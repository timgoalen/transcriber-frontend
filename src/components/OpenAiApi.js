import { useState } from "react";

import axios from "axios";
import { faWandMagicSparkles, faSpinner } from "@fortawesome/free-solid-svg-icons";

import Button from "./Button.js";

export default function OpenAiApi({ textAreaInput, handleTextAreaUserInput }) {
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function sendToOpenAiApi() {
    // Handle when text area is empty
    // if (textAreaInput === "") {
    //   return;
    // }

    try {
      setIsLoading(true);
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
      setIsLoading(false);
      handleTextAreaUserInput(reply);
      // setResponse(response.data.choices[0].text);
    } catch (error) {
      console.error("OpenAI API Error:", error);
      setIsLoading(false);
    }
  }

  return (
    <div id="ai-btn" onClick={() => sendToOpenAiApi()}>
      {isLoading ? (
        <Button name={""} icon={faSpinner} />
      ) : (
        <Button name={""} icon={faWandMagicSparkles} />

      )}
    </div>
  );
}
