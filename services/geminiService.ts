
import { GoogleGenAI } from "@google/genai";
import { MOCK_PRODUCTS } from "../constants";

export async function getStyleAdvice(query: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const productContext = MOCK_PRODUCTS.map(p => 
    `- ${p.name}: ${p.description} (${p.category}, $${p.price})`
  ).join('\n');

  const systemInstruction = `
    You are "RagvynnAI", a luxury footwear consultant for RAGVYNN.
    You help users find the perfect shoes from our proprietary master collection.
    Be professional, stylish, and concise.
    
    Catalog Details:
    ${productContext}
    
    Guidelines:
    1. Recommend specific shoes from the collection based on the user's needs.
    2. Mention unique architectural features (e.g., Kinetic Sole-V, high-fidelity mesh).
    3. Never mention the exact total number of items in the catalog.
    4. Focus on the archive's exclusivity and engineering.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "Our digital archive is currently syncing. How else can I assist with your selection?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The AI consultant is optimizing its neural pathways. Please feel free to explore the archive manually.";
  }
}

export async function generateCustomShoe(userPrompt: string, history: string[]): Promise<string | null> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const historyContext = history.length > 0 ? `Avoid any designs or color palettes similar to: ${history.join(', ')}.` : '';
  
  const prompt = `
    Create a high-resolution, professional commercial photograph of ONE SINGLE unique luxury shoe. 
    Rule 1: The image must contain exactly one shoe.
    Rule 2: The design must be completely original and different from common footwear.
    Rule 3: Use a unique and vivid color palette.
    Concept: ${userPrompt}.
    ${historyContext}
    The shoe should be centered against a clean, minimalist studio background.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image Generation Error:", error);
    return null;
  }
}
