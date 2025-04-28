import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY);

// Helper: clean & safely extract JSON from text
// function extractJsonFromResponse(text) {
//   try {
//     // Remove code block markers if present
//     text = text.replace(/```json|```/gi, "").trim();

//     const start = text.indexOf("{");
//     const end = text.lastIndexOf("}");
//     if (start === -1 || end === -1) throw new Error("JSON block not found");

//     let jsonStr = text.slice(start, end + 1);

//     // Attempt to fix common issues:
//     jsonStr = jsonStr
//       .replace(/(\r\n|\n|\r)/gm, "") // remove newlines
//       .replace(/'/g, '"')            // convert single quotes to double
//       .replace(/,\s*}/g, '}')        // remove trailing commas before }
//       .replace(/,\s*]/g, ']')        // remove trailing commas before ]
//       .replace(/(["}]),(["{])/g, '$1,$2'); // ensure comma between objects/arrays

//     return JSON.parse(jsonStr);
//   } catch (err) {
//     console.error("❌ extractJsonFromResponse failed:", err);
//     throw err;
//   }
// }

// function extractJsonFromResponse(text) {
//   try {
//     // Remove ```json or any markdown formatting
//     text = text.replace(/```json|```/gi, "").trim();

//     const start = text.indexOf("{");
//     const end = text.lastIndexOf("}");
//     if (start === -1 || end === -1) throw new Error("JSON block not found");

//     let jsonStr = text.slice(start, end + 1);

//     // Fix common issues:
//     jsonStr = jsonStr
//       .replace(/\\n/g, "")                        // remove \n
//       .replace(/\\'/g, "'")                       // fix escaped single quotes
//       .replace(/,\s*([}\]])/g, "$1")              // remove trailing commas
//       .replace(/:(\s*[^",\}\]\s]+)/g, ': "$1"');  // fix unquoted values

//     return JSON.parse(jsonStr);
//   } catch (err) {
//     console.error("❌ extractJsonFromResponse failed:", err);
//     throw err;
//   }
// }

function extractJsonFromResponse(text) {
  try {
    // Remove ```json ... ``` wrapper if present
    if (text.startsWith("```json") || text.startsWith("```")) {
      text = text.replace(/```json|```/g, "").trim();
    }

    const json = JSON.parse(text);
    return json;
  } catch (err) {
    console.error("❌ extractJsonFromResponse failed:", err);
    throw err;
  }
}




export async function sendPromptToGemini(promptText) {
  const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

  // 🧠 Force model to respond ONLY in JSON format
  const fullPrompt = `
    ${promptText}

    ⚠️ Please respond ONLY with a valid JSON object using double quotes.
    Do not include explanations, markdown, or any text outside the JSON object.
  `;

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: fullPrompt.trim() }] }],
  });

  const rawText = result.response.text();

  try {
    const parsed = extractJsonFromResponse(rawText);
    return parsed; // ✅ returning actual JS object
  } catch (err) {
    console.error("❌ Failed to parse JSON:", err);
    return rawText; // fallback to raw Gemini response
  }
}



/*import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY);

// Helper function to extract JSON string from messy AI response
function extractJsonFromResponse(text) {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error("JSON not found in response");
  const jsonString = text.slice(start, end + 1);
  return JSON.parse(jsonString);
}

export async function sendPromptToGemini(promptText) {
  const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: promptText }] }],
  });

  const rawText = result.response.text();

  try {
    const parsed = extractJsonFromResponse(rawText);
    return parsed; // ✅ returning actual JS object
  } catch (err) {
    console.error("Failed to parse JSON:", err);
    return rawText; // fallback to raw text
  }
}


*/







