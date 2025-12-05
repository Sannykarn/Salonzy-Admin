import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY || '';
  if (!apiKey) {
    console.warn("API_KEY not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateWhatsAppMessage = async (
  customerName: string,
  serviceName: string,
  time: string,
  type: 'confirmation' | 'cancellation' | 'promo'
): Promise<string> => {
  try {
    const ai = getClient();
    if (!process.env.API_KEY) {
      return `Hello ${customerName}, this is a manual message regarding your ${serviceName} appointment at ${time}.`;
    }

    const prompt = `Write a short, professional, and polite WhatsApp message for a salon named "Salonzy".
    Context:
    - Customer: ${customerName}
    - Service: ${serviceName}
    - Time: ${time}
    - Type: ${type}
    
    Requirements:
    - Include emojis appropriately.
    - Mention "Salonzy" clearly.
    - If confirmation: Ask them to arrive 5 mins early.
    - If cancellation: Apologize and offer to reschedule.
    - If promo: Make it catchy.
    - Keep it under 50 words.
    - Do not include subject lines or quotes.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error generating message:", error);
    return `Hi ${customerName}, your appointment for ${serviceName} at ${time} is updated. - Team Salonzy`;
  }
};
