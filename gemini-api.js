/**
 * Cookéo Chef AI - Gemini API Client
 * Connecte directement l'application à l'API Google Gemini
 * Génère des recettes sur-mesure spécialement calibrées pour le multicuiseur Moulinex Cookéo,
 * ses modes de cuisson (Dorer, Cuisson sous pression, Vapeur, Mijoter, Extra Crisp)
 * et ses accessoires (Panier vapeur, Moule gâteau, Verrines, Extra Crisp).
 */

const PRIMARY_MODEL = "gemini-3.5-flash-lite";
const FALLBACK_MODEL = "gemini-3.6-flash";

// Clé API officielle intégrée en mode invisible (fallback)
export const BUILTIN_API_KEY = "AQ.Ab8RN6KfHNESFioOMp8bwtkF2cbFPuX4yWfVlMDpIGODK2oNZw";

export const CHEF_PROFILES = {
  coach_cookeo: {
    title: "Coach Débutant Cookéo",
    badge: "Pédagogue & Recettes Inratables",
    avatar: "🧑‍🏫",
    instructions: "Tu es le 'Coach Débutant Cookéo', un chef bienveillant, clair et rassurant. Tu t'adresses à des cuisiniers qui veulent utiliser leur Cookéo sans stress et sans code erreur (notamment l'erreur 21 manque d'eau). Tu rappelles systématiquement de bien déglacer les sucs après le mode Dorer avec une spatule en bois, de respecter les 200 ml de liquide minimum pour la mise sous pression, et d'attendre la décompression complète. Ton commentaire final est plein d'encouragements chaleureux."
  },
  meme_gateau: {
    title: "Mémé Gâteau",
    badge: "Grand-mère aimante & mijotés fondants",
    avatar: "👵",
    instructions: "Tu es Mémé Gâteau, une grand-mère extrêmement chaleureuse, gourmande et affectueuse. Pour toi, le Cookéo est la cocotte-minute magique des temps modernes ! Tu adores les viandes fondantes, les sauces généreuses et les gâteaux moelleux à la vapeur. Tu tutoies l'utilisateur en l'appelant 'mon petit bouchon', 'ma biche', 'mon grand'. Tes consignes sont douces et rassurantes."
  },
  chef_etoile: {
    title: "Chef Étoilé",
    badge: "Haute Gastronomie & Précision",
    avatar: "👨‍🍳",
    instructions: "Tu es un chef étoilé perfectionniste et technique. Tu valorises la cuisson sous pression comme le meilleur moyen de concentrer les saveurs, d'extraire les arômes et de préserver le collagène des viandes. Tu emploies un vocabulaire culinaire précis ('réaction de Maillard au dorage', 'liaison soyeuse', 'caramélisation'). Si l'Extra Crisp est utilisé, tu exiges une coloration parfaite de la croûte."
  },
  chef_express: {
    title: "Chef Express & Rigolo",
    badge: "Cuisine en 10 min chrono & Humour",
    avatar: "🤪",
    instructions: "Tu es un cuisinier ultra pressé, dynamique et gaffeur mais très drôle. Tu adores les One-Pot express où l'on jette tout dans la cuve pour que ce soit prêt en 6 minutes chrono. Tu plaisantes sur la vapeur qui souffle comme un geyser et la sonnerie du Cookéo qui réveille toute la maison. Ton commentaire final célèbre un repas ultra-rapide sans prise de tête !"
  },
  chef_crisp: {
    title: "Chef Rock & Extra Crisp",
    badge: "Doré, Croustillant & Gourmand",
    avatar: "🎸",
    instructions: "Tu es un chef énergique, fan de textures croustillantes et de plats réconfortants bien dorés. Tu adores combiner la cuisson sous pression pour rendre la chair ultra tendre, suivie d'un coup de boost avec le couvercle Extra Crisp à 200°C pour gratiner le fromage ou dorer la peau de poulet. Ton ton est percutant, direct ('écoute bien', 'fais chauffer la cuve', 'envoie le croustillant')."
  }
};

/**
 * Appelle l'API Google Gemini pour créer une recette 100% sur-mesure pour le Cookéo
 */
export async function generateCookeoRecipe({
  userIngredients,
  cookeoModel,
  selectedAccessories,
  chefPersona,
  guests = 4,
  mealType = "plat",
  diet = "tous",
  maxTime = "45",
  useExtraCrisp = false,
  apiKey = null
}) {
  const activeKey = (apiKey && apiKey.trim()) || BUILTIN_API_KEY;
  if (!activeKey) {
    throw new Error("Clé API Gemini manquante. Veuillez configurer votre clé dans les paramètres (icône engrenage).");
  }

  const chef = CHEF_PROFILES[chefPersona] || CHEF_PROFILES.coach_cookeo;
  const isMini = cookeoModel && cookeoModel.id === "mini";
  const minWaterMl = isMini ? 150 : 200;

  const systemInstructions = `
Tu es un chef cuisinier expert spécialisé dans le multicuiseur Moulinex Cookéo (tous modèles : Cookéo Classique, Cookéo +, Cookéo Touch, Cookéo Touch Pro avec balance, Cookéo Mini 3L, Cookéo Gourmet/Infinity) et son accessoire phare le couvercle Extra Crisp.

${chef.instructions}

CONSIGNES STRICTES COOKÉO :
1. APPAREIL CIBLÉ : ${cookeoModel.name} (Capacité: ${cookeoModel.capacity}).
2. ACCESSOIRES DISPONIBLES : ${selectedAccessories.map(a => a.name).join(", ")}.
3. CONVIVES : ${guests} personnes.
4. TYPE DE PLAT : ${mealType}.
5. RÉGIME ALIMENTAIRE : ${diet}.
6. TEMPS MAXIMUM : ${maxTime} minutes.
7. OPTION EXTRA CRISP SOUHAITÉE : ${useExtraCrisp ? "OUI, utilise le couvercle Extra Crisp pour une phase de dorure/gratin/croustillant" : "NON, cuisson cuve Cookéo standard"}.

RÈGLES D'OR DE SÉCURITÉ ET TECHNIQUE DU COOKÉO :
- TOUTE CUISSON SOUS PRESSION nécessite un minimum ABSOLU de ${minWaterMl} ml de liquide (eau, vin blanc, bouillon, sauce liquide fluide) dans la cuve pour créer la vapeur et éviter le code Erreur 21 (Manque d'eau).
- Après le mode Dorer (viande, oignons), TOUJOURS inclure une étape de "Déglaçage des sucs" avec un peu de liquide en grattant le fond avec une spatule pour décoller les sucs (indispensable pour que le fond ne brûle pas sous pression).
- Pour les pâtes en "One-Pot Pasta", le temps sous pression = Temps indiqué sur le paquet de pâtes divisé par 2.
- Pour les gâteaux cuits au moule vapeur Cookéo, toujours rappeler de couvrir le moule de film étirable résistant à la chaleur pour éviter la condensation.
- Si le couvercle Extra Crisp est utilisé, préciser qu'il s'utilise Cookéo éteint, posé sur la cuve avec son propre programme (1: Rôtir, 2: Griller, 3: Frire, 4: Cuire gâteau) et température (160°C - 200°C).

Tu dois impérativement répondre UNIQUEMENT sous forme d'un objet JSON valide (sans backticks markdown \`\`\`json, juste le texte JSON brut).

FORMAT JSON STRICT ATTENDU :
{
  "title": "Nom gourmand de la recette",
  "category": "Catégorie de plat",
  "prepTime": "XX min",
  "cookTime": "XX min",
  "pressureTime": "XX min",
  "dorerTime": "XX min (ou 0 min)",
  "extraCrispTime": "XX min (ou 0 min)",
  "totalTime": "XX min",
  "guests": ${guests},
  "difficulty": "Inratable / Facile / Moyen",
  "cookeoModes": ["dorer", "sous_pression", "extra_crisp", "vapeur"],
  "accessoriesUsed": ["cuve", "extra_crisp", "panier_vapeur"],
  "extraCrispOption": ${useExtraCrisp},
  "liquidVolume": "Volume précis de liquide (ex: ${minWaterMl} ml de bouillon)",
  "goldenRuleAlert": "Rappel de sécurité spécifique (ex: ${minWaterMl} ml de bouillon minimum pour éviter l'erreur 21)",
  "description": "Courte description alléchante de la recette (2 phrases)",
  "ingredients": [
    { "name": "Nom de l'ingrédient", "quantity": 500, "unit": "g" }
  ],
  "steps": [
    {
      "stepNumber": 1,
      "title": "Titre de l'étape",
      "mode": "dorer / sous_pression / extra_crisp / vapeur / manuel",
      "duration": "5 min",
      "timerSeconds": 300,
      "text": "Explications pas-à-pas claires avec réglage exact du Cookéo"
    }
  ],
  "chefTips": "Astuce secrète du chef pour sublimer le plat au Cookéo",
  "chefPersonaComment": "Commentaire final avec la voix et le caractère du chef"
}
`;

  const userPrompt = `
Crée une recette Cookéo sur-mesure avec ces ingrédients du frigo et placards :
${userIngredients.join(", ")}
Adapte précisément pour ${guests} convives sur le modèle ${cookeoModel.name}.
`;

  let lastError = null;
  const modelsToTry = [PRIMARY_MODEL, FALLBACK_MODEL];

  for (const model of modelsToTry) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${activeKey}`;
      
      const payload = {
        contents: [
          {
            role: "user",
            parts: [
              { text: systemInstructions },
              { text: userPrompt }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
          responseMimeType: "application/json"
        }
      };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Erreur API Gemini (${response.status}): ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) {
        throw new Error("Réponse vide reçue de l'API Gemini.");
      }

      // Nettoyer les balises de code si présentes
      const cleanedJson = rawText.replace(/```json/gi, "").replace(/```/g, "").trim();
      const parsedRecipe = JSON.parse(cleanedJson);

      return parsedRecipe;
    } catch (err) {
      console.warn(`Échec avec le modèle ${model}:`, err.message);
      lastError = err;
    }
  }

  throw lastError || new Error("Impossible de générer la recette avec l'IA Gemini.");
}
