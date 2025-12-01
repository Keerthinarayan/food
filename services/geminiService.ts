import { GoogleGenAI, Type } from "@google/genai";
import { MENU_ITEMS, RESTAURANTS } from '../constants';

// We initialize this lazily to avoid errors if API key is missing during render
let ai: GoogleGenAI | null = null;

const getAIClient = () => {
  if (!ai && process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

export const getFoodRecommendations = async (userQuery: string) => {
  const client = getAIClient();
  if (!client) {
    console.warn("Gemini API Key missing. Returning mock response.");
    // Fallback if no API key
    return MENU_ITEMS.slice(0, 3).map(item => item.id);
  }

  // Prepare a lightweight context of available items to send to the model
  const itemsContext = MENU_ITEMS.map(item => ({
    id: item.id,
    name: item.name,
    description: item.description,
    restaurant: RESTAURANTS.find(r => r.id === item.restaurantId)?.name,
    isVeg: item.isVeg
  }));

  const prompt = `
    You are a helpful food delivery assistant.
    User Query: "${userQuery}"
    
    Here is the list of available menu items:
    ${JSON.stringify(itemsContext)}

    Select up to 5 items that best match the user's query.
    Return ONLY a JSON array of item IDs strings.
  `;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    const jsonStr = response.text;
    if (!jsonStr) return [];
    
    const recommendedIds = JSON.parse(jsonStr);
    return recommendedIds;
  } catch (error) {
    console.error("Error fetching recommendations from Gemini:", error);
    return [];
  }
};
