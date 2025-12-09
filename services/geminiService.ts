import { GoogleGenAI, Type } from "@google/genai";
import { AdCopy } from "../types";

/**
 * Converts a File object to a base64 string (raw data without prefix).
 */
const fileToGenerativePart = async (file: File): Promise<{ mimeType: string; data: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64Data = base64String.split(',')[1];
      resolve({
        mimeType: file.type,
        data: base64Data,
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const generateAdCopy = async (mediaFile: File): Promise<AdCopy[]> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const mediaPart = await fileToGenerativePart(mediaFile);
    
    const prompt = `
      You are an elite direct-response copywriter and media buyer.
      Your task is to write high-converting ad copy for the uploaded creative (Image/Video).
      
      **Expertise Requirements:**
      - Model your copy after winning ads found in the **Meta Ads Library** (Facebook/Instagram).
      - Incorporate psychological triggers and high-intent keywords relevant to **Google Search** trends.
      - Focus on performance: Click-through Rate (CTR) and Conversion Rate (CVR).

      **Deliverables:**
      Generate 5 distinct ad variations. Each variation must have a unique tone:
      1. **Direct Response** (Sales-focused, clear CTA, "Buy Now" mentality)
      2. **Problem-Solution** (Agitate pain points, offer the product as the hero)
      3. **Storytelling** (Narrative-driven, relatable, builds brand affinity)
      4. **Social Proof/Trust** (Uses testimonials, numbers, or authority bias)
      5. **Urgency/FOMO** (Scarcity, limited time, exclusive offer)

      For EACH variation, provide:
      1. **Headline**: Short, punchy (max 40 chars).
      2. **Description**: Link description (e.g., "Free Shipping", "4.9 Stars").
      3. **Primary Text (Paragraph)**: Engaging prose with emojis, optimized for reading flow.
      4. **Primary Text (Bullets)**: A punchy list of benefits/hooks with emojis, optimized for skimmers.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          { inlineData: mediaPart },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              tone: { type: Type.STRING, description: "The marketing angle used" },
              headline: { type: Type.STRING, description: "Bold headline (max 40 chars)" },
              description: { type: Type.STRING, description: "Link description/sub-headline" },
              primaryTextParagraph: { type: Type.STRING, description: "Main copy in paragraph format with emojis" },
              primaryTextBullets: { type: Type.STRING, description: "Main copy in bullet-point format with emojis" }
            },
            required: ["tone", "headline", "description", "primaryTextParagraph", "primaryTextBullets"],
          }
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("No response received from Gemini.");
    }

    const data = JSON.parse(jsonText) as AdCopy[];
    return data;

  } catch (error) {
    console.error("Error generating ad copy:", error);
    throw error;
  }
};
