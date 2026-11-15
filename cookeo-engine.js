/**
 * Cookéo Chef AI - Offline Culinary Engine & Knowledge Base
 * Spécialement calibré pour l'écosystème Moulinex Cookéo :
 * Modèles (Classique, +, Touch, Touch Pro avec balance, Mini 3L, Infinity),
 * Accessoires compatibles (Couvercle Extra Crisp, Panier vapeur, Moule gâteau, Verrines, etc.),
 * et Modes de cuisson (Dorer, Cuisson sous pression / Express, Vapeur, Mijoter, Réchauffer, Extra Crisp).
 */

// 1. Modèles de Cookéo supportés
export const COOKEO_MODELS = {
  touch: {
    id: "touch",
    name: "Cookéo Touch / Touch WiFi",
    capacity: "6 Litres (2 à 6 convives)",
    power: "1600 W",
    screen: "Écran tactile couleur inclinable",
    features: ["Connexion WiFi", "Recherche par ingrédients", "13 modes de cuisson"],
    minLiquidMl: 200,
    badge: "Tactile & Connecté"
  },
  touch_pro: {
    id: "touch_pro",
    name: "Cookéo Touch Pro (avec Balance)",
    capacity: "6 Litres (2 à 6 convives)",
    power: "1600 W",
    screen: "Écran tactile inclinable + Balance intégrée",
    features: ["Balance intégrée au gramme près", "Connexion WiFi", "Guidage pas-à-pas vidéo"],
    minLiquidMl: 200,
    badge: "Balance Intégrée"
  },
  classique: {
    id: "classique",
    name: "Cookéo + / Classique / Bluetooth",
    capacity: "6 Litres (2 à 6 convives)",
    power: "1600 W",
    screen: "Écran couleur + Molette de navigation 'Turn & Click'",
    features: ["Molette rotative centrale", "6 à 150 recettes préprogrammées", "Cuisson sous pression haute fiabilité"],
    minLiquidMl: 200,
    badge: "Le Grand Classique"
  },
  mini: {
    id: "mini",
    name: "Cookéo Mini (Format Compact)",
    capacity: "3 Litres (1 à 3 convives)",
    power: "1200 W",
    screen: "Écran couleur compact",
    features: ["Faible encombrement", "Idéal couples ou célibataires", "Chauffe ultra-rapide"],
    minLiquidMl: 150, // Cuve plus petite : 150 ml suffisent
    badge: "Ultra Compact 3L"
  },
  infinity: {
    id: "infinity",
    name: "Cookéo Gourmet / Infinity",
    capacity: "6 Litres (2 à 6 convives)",
    power: "1600 W",
    screen: "Écran rétroéclairé design",
    features: ["Finitions premium inox brossé", "Revêtement cuve haute résistance", "Maintien au chaud prolongé"],
    minLiquidMl: 200,
    badge: "Édition Premium"
  }
};

// 2. Accessoires officiels et compatibles Cookéo
export const COOKEO_ACCESSORIES = {
  cuve: {
    id: "cuve",
    code: "ACC-01",
    name: "Cuve de cuisson antiadhésive (6L / 3L)",
    category: "Essentiel",
    isDefault: true,
    icon: "layers",
    badge: "Indispensable (Fournie)",
    description: "Cuve avec revêtement céramique anti-rayures et poignées thermo-isolantes. Compatible lave-vaisselle."
  },
  panier_vapeur: {
    id: "panier_vapeur",
    code: "ACC-02",
    name: "Panier Vapeur Inox avec trépied",
    category: "Essentiel",
    isDefault: true,
    icon: "soup",
    badge: "Inclus d'origine",
    description: "Panier perforé en acier inoxydable pour cuisson vapeur saine des légumes, poissons et papillotes sans contact avec l'eau de fond."
  },
  extra_crisp: {
    id: "extra_crisp",
    code: "ACC-03",
    name: "Couvercle Extra Crisp (Air Fryer)",
    category: "Extension Croustillant",
    isDefault: true,
    icon: "flame",
    badge: "Option Croustillant Star",
    description: "Couvercle amovible 1300W qui se pose directement sur la cuve. 4 programmes automatiques : Rôtir (viandes), Griller (gratins), Frire (nuggets, frites) et Cuire au four (gâteaux)."
  },
  moule_gateau: {
    id: "moule_gateau",
    code: "ACC-04",
    name: "Moule à Gâteau Cookéo (Antiadhésif avec anse)",
    category: "Pâtisserie",
    isDefault: false,
    icon: "cake",
    badge: "Accessoire Officiel Moulinex",
    description: "Moule rond Ø18cm avec anse en silicone escamotable. Permet de cuire des gâteaux moelleux, fondants et marbrés à la vapeur ou avec l'Extra Crisp."
  },
  verrines: {
    id: "verrines",
    code: "ACC-05",
    name: "Set de 6 Verrines / Pots en verre avec couvercles",
    category: "Desserts & Entrées",
    isDefault: false,
    icon: "cup-soda",
    badge: "Flans, Crèmes & Compotes",
    description: "6 pots en verre trempé avec couvercles hermétiques en silicone pour flans aux œufs, crèmes brûlées, cheesecakes et compotes individuelles."
  },
  couvercle_silicone: {
    id: "couvercle_silicone",
    code: "ACC-06",
    name: "Couvercle de conservation en silicone",
    category: "Conservation",
    isDefault: false,
    icon: "shield-check",
    badge: "Pratique Anti-Gaspillage",
    description: "Se clipse hermétiquement sur la cuve pour placer les restes directement au réfrigérateur sans transvaser."
  },
  pince_cuve: {
    id: "pince_cuve",
    code: "ACC-07",
    name: "Pince de retrait thermo-isolante",
    category: "Sécurité & Prise en main",
    isDefault: false,
    icon: "hand",
    badge: "Sécurité Chaleur",
    description: "Pince inox et silicone pour saisir le moule à gâteau ou les verrines brûlantes au fond de la cuve sans risque de brûlure."
  },
  separateur_cuve: {
    id: "separateur_cuve",
    code: "ACC-08",
    name: "Séparateur de cuve / Grille 2 Étages",
    category: "Cuisson Double",
    isDefault: false,
    icon: "split",
    badge: "Plat complet 2-en-1",
    description: "Grille surélevée pour cuire simultanément la viande/sauce au fond et les légumes/pommes de terre au dessus dans le panier."
  }
};

// 3. Modes de cuisson emblématiques du Cookéo
export const COOKEO_MODES = {
  dorer: {
    id: "dorer",
    name: "Dorer / Rissoler",
    icon: "flame",
    color: "#E30613",
    description: "Cuve ouverte, 160°C. Pour colorer les viandes, faire suer les oignons et créer des sucs de cuisson savoureux."
  },
  sous_pression: {
    id: "sous_pression",
    name: "Cuisson sous pression (Rapide)",
    icon: "gauge",
    color: "#0066CC",
    description: "Couvercle verrouillé, ~109°C à 115°C. Réduit les temps de cuisson par 3. Nécessite au moins 200 ml de liquide !"
  },
  vapeur: {
    id: "vapeur",
    name: "Cuisson Vapeur (Panier Inox)",
    icon: "soup",
    color: "#00A86B",
    description: "Panier vapeur posé sur 200 ml d'eau. Préserve vitamines, textures croquantes et couleurs des aliments."
  },
  mijoter: {
    id: "mijoter",
    name: "Mijoter (Doux / Moyen / Fort)",
    icon: "timer",
    color: "#D97706",
    description: "Cuve fermée sans haute pression, 75°C à 90°C. Pour sauces épaissies, navarins et plats fondants."
  },
  extra_crisp: {
    id: "extra_crisp",
    name: "Extra Crisp (Air Fryer)",
    icon: "zap",
    color: "#F59E0B",
    description: "Couvercle soufflant 1300W pour gratiner des pâtes, rôtir une peau de poulet ou frire sans matière grasse."
  },
  rechauffer: {
    id: "rechauffer",
    name: "Réchauffer & Maintien au chaud",
    icon: "sun",
    color: "#8B5CF6",
    description: "Automatique en fin de cuisson (64°C), évite que le plat ne refroidisse sans continuer de cuire."
  }
};

// 4. Règles d'or du Cookéo pour la sécurité et la réussite
export const COOKEO_GOLDEN_RULES = [
  {
    title: "La Règle des 200 ml de liquide",
    desc: "Pour cuire sous pression, le Cookéo a besoin d'eau, bouillon ou sauce fluide pour générer la vapeur. En dessous, l'appareil affiche le Code Erreur 21 (Manque d'eau)."
  },
  {
    title: "Toujours déglacer après avoir doré",
    desc: "Après avoir fait revenir des viandes ou oignons en mode Dorer, versez un fond d'eau ou vin blanc et grattez les sucs avec une spatule en bois. Cela évite que le fond n'accroche et ne déclenche l'alarme 'Aliment brûlé'."
  },
  {
    title: "Temps de cuisson divisé par 2 ou 3",
    desc: "La cuisson sous pression va 3 fois plus vite qu'en casserole. Des pommes de terre cuisent en 10-12 min, des pâtes en la moitié du temps indiqué sur le paquet !"
  },
  {
    title: "Décompression complète avant ouverture",
    desc: "Attendez toujours la fin de l'évacuation de la vapeur par la valve avant de déverrouiller la poignée. Ne forcez jamais l'ouverture."
  },
  {
    title: "Extra Crisp : Toujours appareil Cookéo éteint",
    desc: "Le couvercle Extra Crisp s'utilise avec le Cookéo éteint ou débranché, simplement posé sur la cuve pour apporter le croustillant final."
  }
];

/**
 * Calcule l'ajustement dynamique des quantités selon les convives
 */
export function scaleRecipeForGuests(recipe, newGuestCount) {
  if (!recipe || !recipe.ingredients) return recipe;
  const baseGuests = recipe.guests || 4;
  const ratio = newGuestCount / baseGuests;

  const scaledIngredients = recipe.ingredients.map(ing => {
    // Si quantité numérique détectée
    if (typeof ing.quantity === "number") {
      let scaledQty = Math.round(ing.quantity * ratio * 10) / 10;
      // Pour les petites doses (ex: sel, épices), éviter 0
      if (ing.quantity > 0 && scaledQty === 0) scaledQty = ing.quantity;
      return {
        ...ing,
        quantity: scaledQty,
        displayText: `${scaledQty} ${ing.unit || ""} ${ing.name}`.trim()
      };
    }
    return ing;
  });

  // Calcul du volume minimal de liquide requis
  let scaledWaterMl = Math.max(200, Math.round(200 * (newGuestCount / 4)));

  return {
    ...recipe,
    guests: newGuestCount,
    ingredients: scaledIngredients,
    minLiquidMl: scaledWaterMl
  };
}
