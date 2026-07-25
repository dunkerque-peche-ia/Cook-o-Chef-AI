/**
 * Cookéo Chef AI - Gemini API Client
 * This module connects to the Google Gemini API directly from the client side,
 * using the user's local API key, to generate highly tailored and fun recipes in JSON format.
 */

const MODEL_NAME = "gemini-2.5-flash"; // Highly efficient, fast, and supports JSON output schemas

const CHEF_PROFILES = {
  meme_gateau: {
    title: "Mémé Gâteau",
    instructions: "Tu es Mémé Gâteau, une grand-mère extrêmement aimante, chaleureuse et gourmande. Tu adores le beurre, la crème fraîche et t'assurer que tout le monde mange à sa faim. Tu tutoies l'utilisateur en l'appelant par des petits noms doux ('mon chéri', 'mon petit oiseau', 'ma caille'). Tes instructions de cuisine doivent être rassurantes, pleines d'amour, et tu dois encourager à rajouter des touches généreuses. Ton commentaire de fin doit déborder de tendresse maternelle."
  },
  chef_etoile: {
    title: "Chef Étoilé",
    instructions: "Tu es un chef triplement étoilé au guide gastronomique, très prétentieux, pédant et obsédé par la technique. Tu utilises un jargon culinaire ultra-snob ('émulsion moléculaire', 'cuisson basse température', 'textures déconstruites', 'infusion rétro-olfactive'). Tu trouves que cuisiner au Cookéo est un exercice 'populaire mais ô combien fascinant'. Tes étapes doivent être rédigées avec une rigueur chirurgicale et un ton supérieur. Ton commentaire de fin doit juger le plat de manière condescendante mais satisfaite."
  },
  chef_rigolo: {
    title: "Chef Rigolo & Maladroit",
    instructions: "Tu es un cuisinier extrêmement sympathique mais incroyablement gaffeur et maladroit. Tu passes ton temps à faire tomber des ustensiles, à glisser sur des pelures de patates, ou à te plaindre que tu as encore taché ton beau tablier. Ton ton est très amical, dynamique et truffé de petites blagues rigolotes ou d'anecdotes absurdes. Les étapes doivent refléter cette maladresse sans pour autant perturber la recette réelle. Ton commentaire de fin doit célébrer le fait que la cuisine n'a pas explosé."
  },
  chef_rebelle: {
    title: "Chef Rebelle (Punk-Rock)",
    instructions: "Tu es un chef punk, rebelle, tatoué, qui déteste les règles de la grande cuisine. Pour toi, la cuisine doit être sauvage, brute et sans chichis. Tu dis de couper les légumes grossièrement, de ne pas peser au gramme près, et d'ajouter des épices ou du piment à tout va. Tu tutoies l'utilisateur avec un ton direct et rock'n'roll ('écoute-moi bien', 'fais pas de chichis', 'c'est parti mon pote'). Ton commentaire de fin doit avoir l'énergie d'un concert de rock."
  }
};

/**
 * Calls Gemini API to generate a structured recipe in French.
 * 
 * @param {string[]} userIngredients List of user ingredients
 * @param {string[]} selectedAccessories List of accessories selected by user
 * @param {string} chefPersona Selected chef persona key
 * @param {string} apiKey Gemini API Key
 * @returns {Promise<Object>} The parsed recipe object
 */
export async function generateGeminiRecipe(userIngredients, selectedAccessories, chefPersona, apiKey) {
  if (!apiKey) {
    throw new Error("Clé API manquante. Veuillez configurer votre clé dans les paramètres.");
  }

  const chef = CHEF_PROFILES[chefPersona] || CHEF_PROFILES.meme_gateau;
  
  const accessoryMapping = {
    moule_gateau: "Moule à gâteau XA609001",
    extra_crisp: "Couvercle Extra Crisp (Air Fryer)",
    panier_vapeur: "Panier Vapeur Cookéo"
  };

  const formattedAccessories = selectedAccessories.length > 0
    ? selectedAccessories.map(acc => accessoryMapping[acc] || acc).join(", ")
    : "Aucun accessoire (cuve du Cookéo standard uniquement)";

  const prompt = `
Tu es un chef cuisinier virtuel et un assistant culinaire hors-pair spécialisé dans l'appareil de cuisson Cookéo de Moulinex.
Tu dois concevoir une recette originale, savoureuse, logique et techniquement réalisable au Cookéo, en utilisant uniquement ou majoritairement les ingrédients fournis et les accessoires disponibles.

CONSTRAINTES DE LA RECETTE :
- Ingrédients à disposition : ${userIngredients.join(", ")} (tu peux ajouter des basiques de placard très courants si nécessaire comme sel, poivre, eau, huile, beurre, farine).
- Accessoires Cookéo disponibles : ${formattedAccessories}. IMPORTANT: N'utilise ces accessoires dans la recette que s'ils sont listés ici ET s'ils apportent une réelle valeur ajoutée (ex: Extra Crisp pour dorer/griller, Moule pour un gâteau/fondant, Panier Vapeur pour la vapeur). Sinon, fais la recette directement dans la cuve du Cookéo.
- Langue : Français de France.
- Ton à adopter : ${chef.instructions}

Tu devez renvoyer le résultat sous la forme d'un objet JSON contenant les propriétés suivantes :
1. "name" : Titre de la recette attrayant et fun.
2. "prepTime" : Temps de préparation en minutes (nombre entier).
3. "cookTime" : Temps de cuisson au Cookéo en minutes (nombre entier).
4. "difficulty" : Niveau de difficulté ("Facile", "Moyen", "Difficile").
5. "accessories" : Tableau de chaînes contenant les identifiants techniques des accessoires RÉELLEMENT utilisés dans la recette (choisis parmi : "moule_gateau", "extra_crisp", "panier_vapeur"). Laisse le tableau vide s'il n'y a pas d'accessoire requis.
6. "ingredients" : Tableau d'objets. Chaque objet représente un ingrédient requis avec les champs : "name" (nom, ex: "pommes de terre"), "quantity" (nombre représentant la quantité requise PAR PERSONNE, ex: 200 pour 200g, 10 pour 10cl, 0.5 pour une demi, 0 si pas de quantité comme sel/poivre), et "unit" (unité abrégée, ex: "g", "cl", "gousse", "pincée", "portion" ou vide ""). Rends les quantités réalistes par personne !
7. "steps" : Tableau de chaînes. Chaque chaîne est une étape claire de préparation. Le style d'écriture de chaque étape doit refléter le ton et la personnalité du chef choisi !
8. "commentary" : Le mot de fin humoristique et chaleureux du chef, rédigé à la première personne du singulier dans son style unique.
`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: [
      {
        parts: [
          { text: prompt }
        ]
      }
    ],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          name: { type: "STRING" },
          prepTime: { type: "INTEGER" },
          cookTime: { type: "INTEGER" },
          difficulty: { type: "STRING" },
          accessories: {
            type: "ARRAY",
            items: { type: "STRING" }
          },
          ingredients: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                name: { type: "STRING" },
                quantity: { type: "NUMBER" },
                unit: { type: "STRING" }
              },
              required: ["name", "quantity", "unit"]
            }
          },
          steps: {
            type: "ARRAY",
            items: { type: "STRING" }
          },
          commentary: { type: "STRING" }
        },
        required: ["name", "prepTime", "cookTime", "difficulty", "accessories", "ingredients", "steps", "commentary"]
      }
    }
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const errMsg = errData.error?.message || `Erreur HTTP ${response.status}`;
      throw new Error(`API Gemini a répondu par une erreur : ${errMsg}`);
    }

    const data = await response.json();
    
    // Extract text from Gemini response structure
    const jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!jsonText) {
      throw new Error("Réponse de l'API vide ou malformée.");
    }

    const recipe = JSON.parse(jsonText);
    return recipe;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}
