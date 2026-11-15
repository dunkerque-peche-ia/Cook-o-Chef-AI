/**
 * Cookéo Chef AI - All-in-One Standalone Application
 * Fonctionne parfaitement avec serveur HTTP ou en local direct (file:///) sans restriction CORS.
 */
(function() {
  'use strict';

  // ==========================================
  // SECTION 1 : MOTEUR CULINAIRE COOKÉO
  // ==========================================
  /**
 * Cookéo Chef AI - Offline Culinary Engine & Knowledge Base
 * Spécialement calibré pour l'écosystème Moulinex Cookéo :
 * Modèles (Classique, +, Touch, Touch Pro avec balance, Mini 3L, Infinity),
 * Accessoires compatibles (Couvercle Extra Crisp, Panier vapeur, Moule gâteau, Verrines, etc.),
 * et Modes de cuisson (Dorer, Cuisson sous pression / Express, Vapeur, Mijoter, Réchauffer, Extra Crisp).
 */

// 1. Modèles de Cookéo supportés
const COOKEO_MODELS = {
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
const COOKEO_ACCESSORIES = {
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
const COOKEO_MODES = {
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
const COOKEO_GOLDEN_RULES = [
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
function scaleRecipeForGuests(recipe, newGuestCount) {
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


  // ==========================================
  // SECTION 2 : CATALOGUE DE RECETTES COOKÉO
  // ==========================================
  /**
 * Cookéo Chef AI - Catalogue Officiel de Recettes Pré-intégrées
 * Toutes calibrées pour les temps sous pression, modes de dorure et couvercle Extra Crisp.
 */

const COOKEO_RECIPES = [
  {
    id: "bourguignon-express",
    title: "Bœuf Bourguignon Fondant Express",
    category: "Viandes & Mijotés",
    prepTime: "15 min",
    cookTime: "35 min",
    pressureTime: "30 min",
    dorerTime: "5 min",
    totalTime: "50 min",
    guests: 4,
    difficulty: "Facile",
    cookeoModes: ["dorer", "sous_pression"],
    accessoriesUsed: ["cuve"],
    extraCrispOption: false,
    liquidVolume: "250 ml (vin rouge + bouillon)",
    description: "Le grand classique de la cuisine française avec une viande ultra-fondante en 35 minutes au lieu de 3 heures en cocotte traditionnelle !",
    ingredients: [
      { name: "Paleron ou gîte de bœuf en cubes", quantity: 750, unit: "g" },
      { name: "Lardons fumés", quantity: 150, unit: "g" },
      { name: "Carottes en rondelles", quantity: 4, unit: "pièces" },
      { name: "Champignons de Paris émincés", quantity: 200, unit: "g" },
      { name: "Oignon émincé", quantity: 1, unit: "pièce" },
      { name: "Gousse d'ail hachée", quantity: 2, unit: "gousses" },
      { name: "Farine (ou Maïzena)", quantity: 2, unit: "c. à soupe" },
      { name: "Vin rouge de Bourgogne", quantity: 200, unit: "ml" },
      { name: "Bouillon de bœuf chaud", quantity: 150, unit: "ml" },
      { name: "Bouquet garni (thym, laurier)", quantity: 1, unit: "pièce" },
      { name: "Huile de tournesol", quantity: 1, unit: "c. à soupe" },
      { name: "Sel et poivre du moulin", quantity: 1, unit: "pincée" }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Mode Dorer : Viande et Lardons",
        mode: "dorer",
        duration: "5 min",
        timerSeconds: 300,
        text: "Activez le mode Dorer. Dès le préchauffage terminé, versez l'huile et faites revenir les morceaux de bœuf avec les lardons et l'oignon émincé pendant 5 minutes jusqu'à belle coloration."
      },
      {
        stepNumber: 2,
        title: "Fariner & Déglacer les sucs",
        mode: "dorer",
        duration: "1 min",
        timerSeconds: 60,
        text: "Saupoudrez la farine sur la viande et mélangez 30 secondes. Versez ensuite le vin rouge pour déglacer en grattant énergiquement le fond de la cuve avec une spatule en bois pour décoller tous les sucs (indispensable pour éviter l'erreur 21 !)."
      },
      {
        stepNumber: 3,
        title: "Ajout des légumes et bouillon",
        mode: "manuel",
        duration: "2 min",
        timerSeconds: 0,
        text: "Ajoutez les carottes, les champignons émincés, l'ail, le bouquet garni, le sel, le poivre et le bouillon de bœuf chaud. Mélangez bien l'ensemble."
      },
      {
        stepNumber: 4,
        title: "Cuisson sous pression",
        mode: "sous_pression",
        duration: "30 min",
        timerSeconds: 1800,
        text: "Fermez et verrouillez le couvercle de votre Cookéo. Lancez la cuisson sous pression pour 30 minutes. À la sonnerie, laissez la vapeur s'échapper complètement."
      },
      {
        stepNumber: 5,
        title: "Dressage & Dégustation",
        mode: "maintien_chaud",
        duration: "Service",
        timerSeconds: 0,
        text: "Ouvrez le couvercle, retirez le bouquet garni. Si vous souhaitez une sauce encore plus nappante, activez le mode Dorer 2 minutes pour faire réduire. Servez avec des pommes de terre vapeur ou des tagliatelles."
      }
    ],
    chefTips: "Pour une viande encore plus moelleuse, préparez ce plat la veille et réchauffez-le 5 minutes sous pression : c'est toujours meilleur réchauffé !"
  },
  {
    id: "poulet-roti-extra-crisp",
    title: "Poulet Rôti Doré au Couvercle Extra Crisp",
    category: "Volailles & Extra Crisp",
    prepTime: "10 min",
    cookTime: "35 min",
    pressureTime: "15 min",
    extraCrispTime: "20 min",
    totalTime: "45 min",
    guests: 4,
    difficulty: "Très Facile",
    cookeoModes: ["sous_pression", "extra_crisp"],
    accessoriesUsed: ["cuve", "extra_crisp"],
    extraCrispOption: true,
    liquidVolume: "200 ml d'eau au fond de la cuve",
    description: "Le secret d'un poulet rôti parfait : chair ultra juteuse grâce à la cuisson sous pression, et peau dorée hyper croustillante grâce au couvercle Extra Crisp !",
    ingredients: [
      { name: "Poulet entier (fermier)", quantity: 1.2, unit: "kg" },
      { name: "Pommes de terre grenailles", quantity: 600, unit: "g" },
      { name: "Gousses d'ail en chemise", quantity: 4, unit: "gousses" },
      { name: "Paprika doux ou fumé", quantity: 1, unit: "c. à café" },
      { name: "Herbes de Provence", quantity: 1, unit: "c. à soupe" },
      { name: "Huile d'olive", quantity: 2, unit: "c. à soupe" },
      { name: "Beurre mou", quantity: 20, unit: "g" },
      { name: "Eau (pour fond de cuve)", quantity: 200, unit: "ml" },
      { name: "Sel fin et poivre", quantity: 1, unit: "pincée" }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Assaisonnement du poulet",
        mode: "manuel",
        duration: "5 min",
        timerSeconds: 0,
        text: "Massez le poulet avec l'huile d'olive, le beurre mou, le paprika, les herbes de Provence, le sel et le poivre. Glissez 2 gousses d'ail écrasées à l'intérieur du poulet."
      },
      {
        stepNumber: 2,
        title: "Cuisson sous pression (Tendreté)",
        mode: "sous_pression",
        duration: "15 min",
        timerSeconds: 900,
        text: "Versez 200 ml d'eau au fond de la cuve du Cookéo. Déposez le poulet au fond (ou sur le panier) avec les pommes de terre grenailles autour. Fermez et verrouillez. Lancez la cuisson sous pression pendant 15 minutes."
      },
      {
        stepNumber: 3,
        title: "Installation du Couvercle Extra Crisp",
        mode: "extra_crisp",
        duration: "2 min",
        timerSeconds: 0,
        text: "Ouvrez le Cookéo après évacuation complète de la vapeur. Égouttez l'excès de jus (gardez-en 3 cuillères au fond). Éteignez le Cookéo et posez directement le couvercle Extra Crisp sur la cuve."
      },
      {
        stepNumber: 4,
        title: "Programme Extra Crisp : Rôtir & Croustiller",
        mode: "extra_crisp",
        duration: "20 min",
        timerSeconds: 1200,
        text: "Sélectionnez le Programme 1 (Rôtir) de l'Extra Crisp à 200°C pendant 20 minutes. À mi-cuisson (10 min), retournez délicatement le poulet pour une coloration homogène sur toutes les faces."
      }
    ],
    chefTips: "La peau devient soufflée et craquante tandis que la chair reste incroyablement juteuse grâce aux 15 minutes sous pression préalables."
  },
  {
    id: "one-pot-pasta-poulet",
    title: "One-Pot Pasta Crémeux Poulet & Tomates Confites",
    category: "Pâtes & Express",
    prepTime: "8 min",
    cookTime: "6 min",
    pressureTime: "6 min",
    dorerTime: "3 min",
    totalTime: "17 min",
    guests: 4,
    difficulty: "Inratable",
    cookeoModes: ["dorer", "sous_pression"],
    accessoriesUsed: ["cuve"],
    extraCrispOption: false,
    liquidVolume: "500 ml d'eau ou bouillon",
    description: "Tout cuit ensemble dans la cuve ! Des pâtes imprégnées de toutes les saveurs avec une sauce liée onctueuse en 6 minutes chrono.",
    ingredients: [
      { name: "Pâtes courtes (Penne ou Fusilli)", quantity: 300, unit: "g" },
      { name: "Blancs de poulet émincés", quantity: 400, unit: "g" },
      { name: "Pétales de tomates séchées", quantity: 80, unit: "g" },
      { name: "Pousses d'épinards frais", quantity: 100, unit: "g" },
      { name: "Crème fraîche épaisse (ou mascarpone)", quantity: 3, unit: "c. à soupe" },
      { name: "Parmesan râpé", quantity: 50, unit: "g" },
      { name: "Eau ou bouillon de volaille", quantity: 500, unit: "ml" },
      { name: "Gousse d'ail émincée", quantity: 1, unit: "gousse" },
      { name: "Huile d'olive", quantity: 1, unit: "c. à soupe" },
      { name: "Basilic frais", quantity: 6, unit: "feuilles" }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Dorer : Poulet et aromates",
        mode: "dorer",
        duration: "3 min",
        timerSeconds: 180,
        text: "En mode Dorer, faites suer le poulet émincé avec l'huile d'olive et l'ail pendant 3 minutes jusqu'à ce que les dés soient dorés."
      },
      {
        stepNumber: 2,
        title: "Assemblage Express dans la cuve",
        mode: "manuel",
        duration: "2 min",
        timerSeconds: 0,
        text: "Ajoutez les pâtes crues, les tomates séchées coupées en lanières et les 500 ml de bouillon. Veillez à ce que les pâtes soient bien immergées sous le liquide."
      },
      {
        stepNumber: 3,
        title: "Cuisson sous pression (Règle de moitié de temps)",
        mode: "sous_pression",
        duration: "6 min",
        timerSeconds: 360,
        text: "Fermez le couvercle. Lancez la cuisson sous pression pour exactement la moitié du temps indiqué sur votre paquet de pâtes (ici 6 min pour des pâtes prévues à 11-12 min)."
      },
      {
        stepNumber: 4,
        title: "Liaison gourmande & Épinards",
        mode: "manuel",
        duration: "2 min",
        timerSeconds: 0,
        text: "À la fin de la cuisson, ouvrez la cuve. Incorporez la crème fraîche, le parmesan et les pousses d'épinards. Mélangez vivement : la chaleur résiduelle fait fondre le fromage et tomber les épinards en quelques secondes !"
      }
    ],
    chefTips: "La règle magique des pâtes au Cookéo : Temps sous pression = Temps paquet divisé par 2. Le liquide doit juste affleurer le dessus des pâtes."
  },
  {
    id: "risotto-champignons-parmesan",
    title: "Risotto Crémeux aux Champignons & Parmesan",
    category: "Riz & Risottos",
    prepTime: "10 min",
    cookTime: "10 min",
    pressureTime: "7 min",
    dorerTime: "3 min",
    totalTime: "20 min",
    guests: 4,
    difficulty: "Inratable",
    cookeoModes: ["dorer", "sous_pression"],
    accessoriesUsed: ["cuve"],
    extraCrispOption: false,
    liquidVolume: "600 ml (vin blanc + bouillon de volaille)",
    description: "Finie la corvée de touiller le risotto pendant 25 minutes devant la poêle ! Le Cookéo réussit un risotto d'un crémeux parfait en 7 minutes sous pression.",
    ingredients: [
      { name: "Riz spécial Risotto (Arborio ou Carnaroli)", quantity: 300, unit: "g" },
      { name: "Champignons de Paris émincés", quantity: 250, unit: "g" },
      { name: "Échalote finement ciselée", quantity: 2, unit: "pièces" },
      { name: "Vin blanc sec", quantity: 80, unit: "ml" },
      { name: "Bouillon de volaille chaud", quantity: 520, unit: "ml" },
      { name: "Parmesan râpé frais", quantity: 60, unit: "g" },
      { name: "Beurre doux", quantity: 30, unit: "g" },
      { name: "Huile d'olive", quantity: 1, unit: "c. à soupe" },
      { name: "Persil plat ciselé", quantity: 2, unit: "c. à soupe" }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Dorer : Échalotes, Champignons & Nacrage",
        mode: "dorer",
        duration: "3 min",
        timerSeconds: 180,
        text: "En mode Dorer, chauffez l'huile d'olive avec 10g de beurre. Faites suer les échalotes et les champignons 2 min. Ajoutez le riz Arborio et mélangez 1 minute jusqu'à ce que les grains deviennent translucides (nacrage)."
      },
      {
        stepNumber: 2,
        title: "Déglacer au vin blanc",
        mode: "dorer",
        duration: "1 min",
        timerSeconds: 60,
        text: "Versez le vin blanc sec dans la cuve. Laissez s'évaporer l'alcool pendant 1 minute tout en grattant le fond de la cuve avec une spatule."
      },
      {
        stepNumber: 3,
        title: "Cuisson sous pression",
        mode: "sous_pression",
        duration: "7 min",
        timerSeconds: 420,
        text: "Versez les 520 ml de bouillon chaud. Mélangez une seule fois. Fermez le couvercle et lancez la cuisson sous pression pour 7 minutes précises."
      },
      {
        stepNumber: 4,
        title: "Mantecatura (Le secret du crémeux)",
        mode: "manuel",
        duration: "2 min",
        timerSeconds: 0,
        text: "À l'ouverture du couvercle, le riz a absorbé le bouillon. Ajoutez immédiatement les 20g de beurre restant et le parmesan râpé. Mélangez vigoureusement pendant 1 minute pour créer une émulsion soyeuse."
      }
    ],
    chefTips: "Respectez scrupuleusement la proportion riz/liquide : 300g de riz pour 600ml de liquide au total (vin + bouillon). Le résultat est digne d'une trattoria italienne !"
  },
  {
    id: "saumon-legumes-vapeur",
    title: "Pavés de Saumon & Légumes Croquants au Panier Vapeur",
    category: "Poissons & Vapeur Saine",
    prepTime: "10 min",
    cookTime: "8 min",
    pressureTime: "8 min",
    totalTime: "18 min",
    guests: 4,
    difficulty: "Très Facile",
    cookeoModes: ["vapeur", "sous_pression"],
    accessoriesUsed: ["cuve", "panier_vapeur"],
    extraCrispOption: false,
    liquidVolume: "200 ml d'eau avec tranche de citron dans la cuve",
    description: "Une cuisson vapeur douce et diététique où le saumon reste ultra-moelleux et fondant, accompagné de carottes et brocolis aux couleurs éclatantes.",
    ingredients: [
      { name: "Pavés de saumon frais sans arêtes", quantity: 4, unit: "pièces" },
      { name: "Fleurettes de brocoli", quantity: 300, unit: "g" },
      { name: "Carottes en julienne", quantity: 2, unit: "pièces" },
      { name: "Courgette en rondelles", quantity: 1, unit: "pièce" },
      { name: "Citron jaune bio", quantity: 1, unit: "pièce" },
      { name: "Aneth fraîche", quantity: 4, unit: "brins" },
      { name: "Huile d'olive extra vierge", quantity: 2, unit: "c. à soupe" },
      { name: "Fleur de sel et poivre rose", quantity: 1, unit: "pincée" },
      { name: "Eau pour le fond de cuve", quantity: 200, unit: "ml" }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Préparation du fond de cuve",
        mode: "manuel",
        duration: "2 min",
        timerSeconds: 0,
        text: "Versez 200 ml d'eau dans la cuve du Cookéo et déposez 2 tranches de citron au fond pour parfumer la vapeur."
      },
      {
        stepNumber: 2,
        title: "Garnir le panier vapeur inox",
        mode: "manuel",
        duration: "5 min",
        timerSeconds: 0,
        text: "Disposez les légumes (brocolis, carottes, courgettes) dans le fond du panier vapeur inox. Posez les 4 pavés de saumon au-dessus des légumes. Arrosez d'un filet d'huile d'olive et parsemez d'aneth."
      },
      {
        stepNumber: 3,
        title: "Cuisson sous pression / Vapeur",
        mode: "sous_pression",
        duration: "8 min",
        timerSeconds: 480,
        text: "Déposez le panier dans la cuve. Fermez et verrouillez le couvercle. Lancez la cuisson sous pression (ou mode Vapeur selon votre modèle) pour 8 minutes."
      },
      {
        stepNumber: 4,
        title: "Assaisonnement & Dégustation",
        mode: "manuel",
        duration: "2 min",
        timerSeconds: 0,
        text: "Dépressurisez et ouvrez la cuve. Soulevez délicatement le panier vapeur. Parsemez le saumon de fleur de sel et de poivre rose concassé avant de servir."
      }
    ],
    chefTips: "Si vous aimez le saumon mi-cuit au cœur rosé, 6 minutes de cuisson sous pression suffiront largement !"
  },
  {
    id: "gratin-dauphinois-extra-crisp",
    title: "Gratin Dauphinois Express au Couvercle Extra Crisp",
    category: "Légumes & Extra Crisp",
    prepTime: "12 min",
    cookTime: "22 min",
    pressureTime: "10 min",
    extraCrispTime: "12 min",
    totalTime: "34 min",
    guests: 4,
    difficulty: "Moyen",
    cookeoModes: ["sous_pression", "extra_crisp"],
    accessoriesUsed: ["cuve", "extra_crisp"],
    extraCrispOption: true,
    liquidVolume: "350 ml (lait + crème)",
    description: "Le fameux gratin dauphinois prêt en 35 minutes au lieu d'1h30 au four traditionnel ! Pommes de terre fondantes et croûte gratinée dorée irrésistible.",
    ingredients: [
      { name: "Pommes de terre à chair ferme (Charlotte, Amandine)", quantity: 800, unit: "g" },
      { name: "Crème liquide entière", quantity: 200, unit: "ml" },
      { name: "Lait demi-écrémé", quantity: 150, unit: "ml" },
      { name: "Gousse d'ail pressée", quantity: 2, unit: "gousses" },
      { name: "Noix de muscade râpée", quantity: 0.5, unit: "c. à café" },
      { name: "Emmental ou Comté râpé (pour gratiner)", quantity: 100, unit: "g" },
      { name: "Beurre", quantity: 20, unit: "g" },
      { name: "Sel et poivre blanc", quantity: 1, unit: "pincée" }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Émincer les pommes de terre",
        mode: "manuel",
        duration: "8 min",
        timerSeconds: 0,
        text: "Épluchez et coupez les pommes de terre en fines rondelles de 3 mm d'épaisseur (à la mandoline). Ne les lavez pas après découpe afin de conserver leur fécule pour lier la crème."
      },
      {
        stepNumber: 2,
        title: "Cuisson sous pression dans le mélange lait-crème",
        mode: "sous_pression",
        duration: "10 min",
        timerSeconds: 600,
        text: "Dans la cuve beurrée, frottez l'ail au fond. Déposez les rondelles de pommes de terre. Versez le mélange lait, crème, muscade, sel et poivre. Les pommes de terre doivent être bien tassées et imprégnées. Fermez et cuisez sous pression 10 minutes."
      },
      {
        stepNumber: 3,
        title: "Finition Extra Crisp : Croûte gratinée dorée",
        mode: "extra_crisp",
        duration: "12 min",
        timerSeconds: 720,
        text: "Ouvrez le Cookéo. Parsemez généreusement de Comté râpé et quelques noisettes de beurre sur le dessus. Éteignez le Cookéo et posez l'Extra Crisp. Lancez le Programme 2 (Grill) à 200°C pendant 12 minutes jusqu'à croûte dorée et croustillante !"
      }
    ],
    chefTips: "La combinaison de la cuisson sous pression pour rendre la pomme de terre fondante et de l'Extra Crisp pour le gratiné évite d'allumer le grand four de la cuisine."
  },
  {
    id: "moelleux-chocolat-moule-cookeo",
    title: "Gâteau Moelleux Cœur Chocolat au Moule Cookéo",
    category: "Desserts & Pâtisserie",
    prepTime: "12 min",
    cookTime: "25 min",
    pressureTime: "25 min",
    totalTime: "37 min",
    guests: 6,
    difficulty: "Inratable",
    cookeoModes: ["sous_pression"],
    accessoriesUsed: ["cuve", "panier_vapeur", "moule_gateau"],
    extraCrispOption: false,
    liquidVolume: "350 ml d'eau dans la cuve pour la vapeur",
    description: "Une cuisson à la vapeur sous pression qui confère au gâteau une texture d'un moelleux incomparable, sans jamais dessécher la pâte !",
    ingredients: [
      { name: "Chocolat noir pâtissier (55% à 70%)", quantity: 150, unit: "g" },
      { name: "Beurre doux", quantity: 100, unit: "g" },
      { name: "Œufs entiers", quantity: 3, unit: "pièces" },
      { name: "Sucre en poudre", quantity: 80, unit: "g" },
      { name: "Farine de blé", quantity: 60, unit: "g" },
      { name: "Extrait naturel de vanille", quantity: 1, unit: "c. à café" },
      { name: "Pincée de fleur de sel", quantity: 1, unit: "pincée" },
      { name: "Eau pour le fond de cuve", quantity: 350, unit: "ml" }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Fonte du chocolat et préparation de la pâte",
        mode: "manuel",
        duration: "8 min",
        timerSeconds: 0,
        text: "Faites fondre le chocolat avec le beurre au micro-ondes ou au bain-marie. Dans un saladier, fouettez les œufs avec le sucre jusqu'à ce que le mélange blanchisse. Incorporez le chocolat fondu, puis la farine et la pincée de sel."
      },
      {
        stepNumber: 2,
        title: "Remplir le moule spécial Cookéo",
        mode: "manuel",
        duration: "4 min",
        timerSeconds: 0,
        text: "Beurrez et farinez votre moule rond Cookéo. Versez la pâte. Couvrez le moule de film étirable résistant à la chaleur ou d'aluminium bien serré pour empêcher la condensation de couler sur le gâteau."
      },
      {
        stepNumber: 3,
        title: "Cuisson vapeur sous pression",
        mode: "sous_pression",
        duration: "25 min",
        timerSeconds: 1500,
        text: "Versez 350 ml d'eau dans la cuve. Déposez le panier vapeur, puis placez le moule recouvert à l'intérieur à l'aide de l'anse. Verrouillez le couvercle et cuisez sous pression 25 minutes."
      },
      {
        stepNumber: 4,
        title: "Démoulage & Service",
        mode: "manuel",
        duration: "5 min",
        timerSeconds: 0,
        text: "Sortez le moule à l'aide d'un gant ou de la pince Cookéo. Retirez le film protecteur et laissez tiédir 10 minutes avant de démouler. Servez avec une boule de glace vanille ou de la crème anglaise."
      }
    ],
    chefTips: "Le secret absolu pour réussir les gâteaux vapeur au Cookéo est de bien fermer le dessus du moule avec du film thermo-résistant afin que les gouttes d'eau ne tombent pas dans la pâte."
  },
  {
    id: "verrines-creme-vanille",
    title: "Petits Pots de Crème Vanille en Verrines Vapeur",
    category: "Desserts & Verrines",
    prepTime: "10 min",
    cookTime: "12 min",
    pressureTime: "12 min",
    totalTime: "22 min",
    guests: 6,
    difficulty: "Très Facile",
    cookeoModes: ["sous_pression", "vapeur"],
    accessoriesUsed: ["cuve", "panier_vapeur", "verrines"],
    extraCrispOption: false,
    liquidVolume: "250 ml d'eau dans la cuve",
    description: "Des crèmes aux œufs onctueuses comme chez grand-mère, cuites délicatement en portions individuelles dans le set de 6 verrines Cookéo.",
    ingredients: [
      { name: "Lait entier", quantity: 500, unit: "ml" },
      { name: "Crème liquide entière", quantity: 100, unit: "ml" },
      { name: "Œufs entiers frais", quantity: 3, unit: "pièces" },
      { name: "Jaune d'œuf supplémentaire", quantity: 1, unit: "pièce" },
      { name: "Sucre de canne", quantity: 70, unit: "g" },
      { name: "Gousse de vanille Bourbon (ou extrait)", quantity: 1, unit: "pièce" },
      { name: "Eau pour la cuve", quantity: 250, unit: "ml" }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Infusion du lait vanillé",
        mode: "manuel",
        duration: "5 min",
        timerSeconds: 0,
        text: "Chauffez le lait et la crème avec les graines grattées de la gousse de vanille. Laissez tiédir 5 minutes."
      },
      {
        stepNumber: 2,
        title: "Mélange et remplissage des verrines",
        mode: "manuel",
        duration: "5 min",
        timerSeconds: 0,
        text: "Battez les œufs et le jaune avec le sucre sans trop faire mousser. Versez le lait tiédi sur les œufs en fouettant doucement. Répartissez dans les 6 verrines Cookéo et fermez avec leurs couvercles en silicone."
      },
      {
        stepNumber: 3,
        title: "Cuisson sous pression dans le panier",
        mode: "sous_pression",
        duration: "12 min",
        timerSeconds: 720,
        text: "Versez 250 ml d'eau au fond de la cuve. Déposez le panier vapeur et disposez les 6 verrines à l'intérieur. Lancez la cuisson sous pression pendant 12 minutes."
      },
      {
        stepNumber: 4,
        title: "Prise au frais",
        mode: "manuel",
        duration: "2h au frais",
        timerSeconds: 0,
        text: "Sortez les verrines. Les crèmes sont légèrement tremblotantes au centre, c'est normal ! Laissez refroidir puis placez au réfrigérateur au moins 2 heures avant de savourer."
      }
    ],
    chefTips: "Vous pouvez remplacer la vanille par 100g de chocolat fondu ou un trait de café pour varier les parfums selon vos envies !"
  },
  {
    id: "chili-con-carne-express",
    title: "Chili Con Carne Mexicain Express",
    category: "Viandes & Mijotés",
    prepTime: "10 min",
    cookTime: "15 min",
    pressureTime: "12 min",
    dorerTime: "3 min",
    totalTime: "25 min",
    guests: 4,
    difficulty: "Très Facile",
    cookeoModes: ["dorer", "sous_pression"],
    accessoriesUsed: ["cuve"],
    extraCrispOption: false,
    liquidVolume: "300 ml (sauce tomate + bouillon)",
    description: "Un chili réconfortant, épicé et parfumé où les haricots rouges et la viande s'imprègnent des épices en 12 minutes de pression.",
    ingredients: [
      { name: "Bœuf haché pur bœuf 5% ou 15%", quantity: 500, unit: "g" },
      { name: "Haricots rouges égouttés (conserve)", quantity: 400, unit: "g" },
      { name: "Maïs doux en grains", quantity: 150, unit: "g" },
      { name: "Poivron rouge en petits dés", quantity: 1, unit: "pièce" },
      { name: "Oignon haché", quantity: 1, unit: "pièce" },
      { name: "Gousses d'ail", quantity: 2, unit: "gousses" },
      { name: "Pulpe de tomates en boîte", quantity: 400, unit: "g" },
      { name: "Épices à chili (cumin, paprika, origan, piment)", quantity: 2, unit: "c. à café" },
      { name: "Huile d'olive", quantity: 1, unit: "c. à soupe" },
      { name: "Sel et poivre", quantity: 1, unit: "pincée" }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Dorer la viande et aromates",
        mode: "dorer",
        duration: "3 min",
        timerSeconds: 180,
        text: "En mode Dorer, versez l'huile et faites revenir l'oignon, l'ail et la viande hachée en l'écrasant à la cuillère en bois pendant 3 minutes."
      },
      {
        stepNumber: 2,
        title: "Ajout des légumes et épices",
        mode: "manuel",
        duration: "2 min",
        timerSeconds: 0,
        text: "Ajoutez les dés de poivron rouge, la pulpe de tomates, les haricots rouges égouttés, le maïs et les épices chili. Salez et poivrez. Mélangez bien."
      },
      {
        stepNumber: 3,
        title: "Cuisson sous pression",
        mode: "sous_pression",
        duration: "12 min",
        timerSeconds: 720,
        text: "Verrouillez le couvercle et lancez la cuisson sous pression pendant 12 minutes."
      },
      {
        stepNumber: 4,
        title: "Finition & Service",
        mode: "maintien_chaud",
        duration: "Service",
        timerSeconds: 0,
        text: "À la fin de la cuisson, ouvrez la cuve. Servez chaud avec du riz blanc, de la coriandre fraîche, une cuillère de crème fraîche et des chips de maïs tortillas."
      }
    ],
    chefTips: "Pour les amateurs de piquant, ajoutez quelques gouttes de Tabasco ou un piment jalapeño émincé dès le début."
  },
  {
    id: "frites-extra-crisp-maison",
    title: "Frites Maison Croustillantes à l'Extra Crisp",
    category: "Extra Crisp & Snacking",
    prepTime: "10 min",
    cookTime: "30 min",
    pressureTime: "0 min",
    extraCrispTime: "30 min",
    totalTime: "40 min",
    guests: 4,
    difficulty: "Facile",
    cookeoModes: ["extra_crisp"],
    accessoriesUsed: ["cuve", "extra_crisp"],
    extraCrispOption: true,
    liquidVolume: "Aucun liquide requis",
    description: "Des frites dorées avec seulement 1 cuillère à soupe d'huile grâce au flux d'air chaud pulsé de l'Extra Crisp directement dans la cuve du Cookéo !",
    ingredients: [
      { name: "Pommes de terre spéciales frites (Bintje, Agria)", quantity: 800, unit: "g" },
      { name: "Huile végétale (tournesol ou arachide)", quantity: 1.5, unit: "c. à soupe" },
      { name: "Paprika doux (facultatif)", quantity: 0.5, unit: "c. à café" },
      { name: "Sel fin", quantity: 1, unit: "c. à café" }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Découpe et séchage des frites",
        mode: "manuel",
        duration: "8 min",
        timerSeconds: 0,
        text: "Pelez et taillez les pommes de terre en frites régulières d'environ 1 cm de section. Rincez-les à l'eau froide puis séchez-les TRÈS soigneusement dans un torchon propre (le séchage est le secret du croustillant)."
      },
      {
        stepNumber: 2,
        title: "Enrobage d'huile",
        mode: "manuel",
        duration: "2 min",
        timerSeconds: 0,
        text: "Dans un saladier, mélangez les frites avec l'huile et le paprika pour que chaque bâtonnet soit très légèrement huilé."
      },
      {
        stepNumber: 3,
        title: "Programme Extra Crisp : Frire",
        mode: "extra_crisp",
        duration: "30 min",
        timerSeconds: 1800,
        text: "Versez les frites dans la cuve du Cookéo (sans eau). Posez l'Extra Crisp sur la cuve. Sélectionnez le Programme 3 (Frire) à 200°C pour 30 minutes. Secouez la cuve ou mélangez avec une spatule silicone à 10 min et 20 min."
      },
      {
        stepNumber: 4,
        title: "Salez et servez chaud",
        mode: "manuel",
        duration: "1 min",
        timerSeconds: 0,
        text: "Dès que les frites sont dorées et croustillantes, transvasez-les dans un plat et salez immédiatement."
      }
    ],
    chefTips: "Secouez bien la cuve deux fois pendant la cuisson pour que la circulation d'air chaud dore uniformément toutes les frites."
  }
];


  // ==========================================
  // SECTION 3 : CLIENT IA GEMINI
  // ==========================================
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
const BUILTIN_API_KEY = "AQ.Ab8RN6KfHNESFioOMp8bwtkF2cbFPuX4yWfVlMDpIGODK2oNZw";

const CHEF_PROFILES = {
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
async function generateCookeoRecipe({
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


  // ==========================================
  // SECTION 4 : CONTRÔLEUR D'INTERFACE & ACTIONS
  // ==========================================
  /**
 * Cookéo Chef AI - Application Controller
 * Gère l'interactivité, le moteur de génération IA Gemini, le catalogue de recettes,
 * le minuteur interactif, la synthèse vocale et les bips sonores Cookéo.
 */




// État global de l'application
const state = {
  selectedIngredients: new Set(["poulet", "pommes de terre", "oignon", "crème fraîche"]),
  selectedModel: "touch",
  selectedAccessories: new Set(["cuve", "panier_vapeur", "extra_crisp"]),
  selectedChef: "coach_cookeo",
  guests: 4,
  useExtraCrisp: true,
  currentRecipe: null,
  soundEnabled: true,
  liveStepIndex: 0,
  timerInterval: null,
  timerRemainingSeconds: 0
};

// Contexte audio Web Audio API pour les bips Cookéo
let audioCtx = null;
function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Bips sonores réalistes inspirés du Cookéo
function playCookeoBeep(type = "single") {
  if (!state.soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (type === "single") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1046.5, ctx.currentTime); // C6
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.18);
    } else if (type === "finish") {
      // Triple bip festif de fin de cuisson Cookéo
      [0, 0.22, 0.44].forEach(delay => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(1318.5, ctx.currentTime + delay); // E6
        gain.gain.setValueAtTime(0.2, ctx.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + delay + 0.16);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + 0.16);
      });
    }
  } catch (e) {
    console.warn("Audio non disponible :", e);
  }
}

// Synthèse vocale française pour lire les étapes
function speakText(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "fr-FR";
  utterance.rate = 1.0;
  window.speechSynthesis.speak(utterance);
}

function safeRenderIcons() {
  if (typeof window !== 'undefined' && window.lucide && typeof window.lucide.createIcons === 'function') {
    try { window.lucide.createIcons(); } catch(e) { console.warn("Lucide:", e); }
  }
}

// Initialisation au chargement du DOM ou immédiatement si le DOM est déjà prêt
function init() {
  renderIngredientsTags();
  renderCatalogModal();
  renderGuideModal();
  setupEventListeners();
  
  // Charge une première recette par défaut sans forcer de défilement brusque
  const defaultRecipe = COOKEO_RECIPES.find(r => r.id === "poulet-roti-extra-crisp") || COOKEO_RECIPES[0];
  displayRecipe(defaultRecipe, false);

  safeRenderIcons();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

// 4. Rendu des Tags d'Ingrédients
function renderIngredientsTags() {
  const list = document.getElementById("ingredients-tags-list");
  const countEl = document.getElementById("tags-count");
  if (!list || !countEl) return;

  const count = state.selectedIngredients.size;
  countEl.textContent = count;

  // Mise à jour des pastilles rapides
  document.querySelectorAll(".chip-btn").forEach(btn => {
    const ing = btn.getAttribute("data-ingredient");
    if (state.selectedIngredients.has(ing)) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  if (count === 0) {
    list.innerHTML = `<span class="empty-tags-hint">Aucun ingrédient sélectionné. Cliquez sur les pastilles ci-dessus !</span>`;
    return;
  }

  list.innerHTML = Array.from(state.selectedIngredients).map(ing => `
    <span class="tag-item">
      <span>${ing}</span>
      <button type="button" data-remove-ingredient="${ing}" title="Supprimer">×</button>
    </span>
  `).join("");
}

// 5. Rendu du Catalogue dans la Modal
function renderCatalogModal(filterText = "") {
  const grid = document.getElementById("catalog-grid");
  const countBadge = document.getElementById("catalog-count-badge");
  if (!grid) return;

  let recipes = COOKEO_RECIPES;
  if (filterText.trim()) {
    const query = filterText.toLowerCase();
    recipes = recipes.filter(r => 
      r.title.toLowerCase().includes(query) ||
      r.category.toLowerCase().includes(query) ||
      r.description.toLowerCase().includes(query) ||
      r.ingredients.some(i => i.name.toLowerCase().includes(query))
    );
  }

  if (countBadge) countBadge.textContent = COOKEO_RECIPES.length;

  if (recipes.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">Aucune recette trouvée pour "${filterText}".</div>`;
    return;
  }

  grid.innerHTML = recipes.map(recipe => `
    <div class="catalog-item-card" data-recipe-id="${recipe.id}">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
        <span class="cat-label">${recipe.category}</span>
        ${recipe.extraCrispOption ? '<span class="cookeo-mode-pill pill-crisp" style="font-size: 10px; padding: 2px 6px;"><i data-lucide="zap"></i> Extra Crisp</span>' : ''}
      </div>
      <h4 class="cat-item-title">${recipe.title}</h4>
      <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 10px; line-height: 1.4;">${recipe.description}</p>
      <div class="cat-item-meta" style="display: flex; gap: 10px;">
        <span><i data-lucide="clock" style="width: 12px; height: 12px; display: inline;"></i> ${recipe.cookTime}</span>
        <span><i data-lucide="gauge" style="width: 12px; height: 12px; display: inline;"></i> Pression : ${recipe.pressureTime}</span>
        <span><i data-lucide="users" style="width: 12px; height: 12px; display: inline;"></i> ${recipe.guests} pers.</span>
      </div>
    </div>
  `).join("");

  safeRenderIcons();
}

// 6. Rendu du Guide des Accessoires
function renderGuideModal() {
  const container = document.getElementById("guide-accessories-list");
  if (!container) return;

  container.innerHTML = Object.values(COOKEO_ACCESSORIES).map(acc => `
    <div style="background: var(--dark-surface); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 14px;">
      <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
        <span style="color: ${acc.id === 'extra_crisp' ? 'var(--crisp-gold)' : 'var(--primary-red)'};"><i data-lucide="${acc.icon || 'layers'}"></i></span>
        <strong style="font-size: 14px;">${acc.name}</strong>
      </div>
      <span class="acc-badge" style="margin-bottom: 6px;">${acc.badge}</span>
      <p style="font-size: 12px; color: var(--text-secondary); line-height: 1.4;">${acc.description}</p>
    </div>
  `).join("");

  safeRenderIcons();
}

// 7. Affichage complet d'une Recette
function displayRecipe(recipe, shouldScroll = true) {
  state.currentRecipe = recipe;
  const container = document.getElementById("recipe-result-container");
  if (!container) return;

  container.style.display = "block";

  // Badges de modes Cookéo
  const modePills = (recipe.cookeoModes || ["sous_pression"]).map(m => {
    if (m === "dorer") return `<span class="cookeo-mode-pill pill-dorer"><i data-lucide="flame"></i> Dorer (160°C)</span>`;
    if (m === "sous_pression") return `<span class="cookeo-mode-pill pill-pression"><i data-lucide="gauge"></i> Sous pression (${recipe.pressureTime || "Rapide"})</span>`;
    if (m === "extra_crisp") return `<span class="cookeo-mode-pill pill-crisp"><i data-lucide="zap"></i> Extra Crisp (${recipe.extraCrispTime || "Dorure"})</span>`;
    if (m === "vapeur") return `<span class="cookeo-mode-pill pill-vapeur"><i data-lucide="soup"></i> Panier Vapeur</span>`;
    return "";
  }).join("");

  const goldenRule = recipe.goldenRuleAlert || `Quantité de liquide vérifiée : ${recipe.liquidVolume || "200 ml min."} pour assurer la montée sous pression sans erreur 21.`;

  container.innerHTML = `
    <div class="recipe-display-card">
      <div class="recipe-header-area">
        <div class="recipe-top-meta">
          ${modePills}
          <span class="tech-badge"><i data-lucide="clock"></i> Total : ${recipe.totalTime || recipe.cookTime}</span>
          <span class="tech-badge"><i data-lucide="users"></i> ${recipe.guests} Convives</span>
          <span class="tech-badge"><i data-lucide="award"></i> ${recipe.difficulty || "Facile"}</span>
        </div>
        <h2 class="recipe-title">${recipe.title}</h2>
        <p class="recipe-summary">${recipe.description || ""}</p>
      </div>

      <!-- Golden Rule Banner -->
      <div class="golden-rule-banner">
        <i data-lucide="droplet"></i>
        <div class="golden-rule-text">
          <strong>Règle d'or Cookéo respectée :</strong> ${goldenRule}
        </div>
      </div>

      <div class="recipe-body-grid">
        <!-- Sidebar Ingredients -->
        <div class="recipe-ingredients-sidebar">
          <div class="sidebar-title">
            <span>Ingrédients (${recipe.guests} pers.)</span>
            <i data-lucide="shopping-bag" style="width: 18px; height: 18px; color: var(--primary-red);"></i>
          </div>
          <ul class="ingredients-list-check">
            ${(recipe.ingredients || []).map(ing => `
              <li class="ing-item">
                <input type="checkbox" id="check-${ing.name.replace(/\s+/g, '-')}">
                <label for="check-${ing.name.replace(/\s+/g, '-')}">
                  ${ing.quantity ? `<strong>${ing.quantity} ${ing.unit || ''}</strong>` : ''} ${ing.name}
                </label>
              </li>
            `).join("")}
          </ul>
        </div>

        <!-- Steps Container -->
        <div class="steps-container">
          ${(recipe.steps || []).map((step, idx) => `
            <div class="step-card-item">
              <div class="step-card-header">
                <div class="step-left">
                  <span class="step-num">${step.stepNumber || idx + 1}</span>
                  <span class="step-name">${step.title}</span>
                </div>
                ${step.duration ? `
                  <span class="step-timer-badge">
                    <i data-lucide="clock"></i> ${step.duration}
                  </span>
                ` : ''}
              </div>
              <p class="step-text">${step.text}</p>
            </div>
          `).join("")}

          <!-- Chef Commentary & Advice -->
          <div class="recipe-chef-advice">
            <div class="advice-avatar">${CHEF_PROFILES[state.selectedChef]?.avatar || '👨‍🍳'}</div>
            <div class="advice-content">
              <h4>Le Conseil de ${CHEF_PROFILES[state.selectedChef]?.title || 'Chef Cookéo'}</h4>
              <p>${recipe.chefTips || recipe.chefPersonaComment || "Prenez plaisir à cuisiner avec votre Cookéo et dégustez bien chaud !"}</p>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="recipe-actions-bar">
            <button id="start-live-cooking-btn" class="btn-live-cooking">
              <i data-lucide="play-circle"></i> Mode Pas-à-Pas (Live Cooking)
            </button>
            <button id="print-recipe-btn" class="pill-btn">
              <i data-lucide="printer"></i> Imprimer
            </button>
            <button id="copy-recipe-btn" class="pill-btn">
              <i data-lucide="copy"></i> Copier
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  safeRenderIcons();

  // Scroll smooth vers la recette uniquement lors de la génération
  if (shouldScroll) {
    try {
      container.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (e) {}
  }

  // Bind boutons d'action
  document.getElementById("start-live-cooking-btn")?.addEventListener("click", () => openLiveCooking(recipe));
  document.getElementById("print-recipe-btn")?.addEventListener("click", () => window.print());
  document.getElementById("copy-recipe-btn")?.addEventListener("click", () => copyRecipeToClipboard(recipe));
}

// 8. Copier la recette dans le presse-papier
function copyRecipeToClipboard(recipe) {
  const text = `🍳 ${recipe.title} (Cookéo & Extra Crisp)\n\n` +
    `👥 Convives : ${recipe.guests} pers.\n` +
    `⏱️ Cuisson : ${recipe.cookTime} (Pression : ${recipe.pressureTime || 'N/A'})\n\n` +
    `Ingrédients :\n` +
    recipe.ingredients.map(i => `- ${i.quantity ? i.quantity + ' ' + (i.unit || '') + ' ' : ''}${i.name}`).join('\n') +
    `\n\nÉtapes :\n` +
    recipe.steps.map(s => `${s.stepNumber}. ${s.title} : ${s.text}`).join('\n\n');

  navigator.clipboard.writeText(text).then(() => {
    alert("Recette copiée dans le presse-papier !");
  }).catch(() => {
    alert("Impossible de copier automatiquement.");
  });
}

// 9. Gestion du Mode Pas-à-Pas (Live Cooking)
function openLiveCooking(recipe) {
  if (!recipe || !recipe.steps || recipe.steps.length === 0) return;
  state.liveStepIndex = 0;
  clearInterval(state.timerInterval);

  const modal = document.getElementById("live-cooking-modal");
  modal.classList.add("active");
  playCookeoBeep("single");
  updateLiveStepView();
}

function updateLiveStepView() {
  const recipe = state.currentRecipe;
  const step = recipe.steps[state.liveStepIndex];
  if (!step) return;

  const counterEl = document.getElementById("live-step-counter");
  const badgeEl = document.getElementById("live-step-mode-badge");
  const textEl = document.getElementById("live-step-text");
  const prevBtn = document.getElementById("live-prev-btn");
  const nextBtn = document.getElementById("live-next-btn");

  counterEl.textContent = `Étape ${state.liveStepIndex + 1} sur ${recipe.steps.length} : ${step.title}`;
  textEl.textContent = step.text;

  // Mise à jour du badge mode
  if (step.mode === "dorer") {
    badgeEl.className = "cookeo-mode-pill pill-dorer";
    badgeEl.innerHTML = `<i data-lucide="flame"></i> Mode Dorer (160°C)`;
  } else if (step.mode === "sous_pression") {
    badgeEl.className = "cookeo-mode-pill pill-pression";
    badgeEl.innerHTML = `<i data-lucide="gauge"></i> Cuisson sous pression`;
  } else if (step.mode === "extra_crisp") {
    badgeEl.className = "cookeo-mode-pill pill-crisp";
    badgeEl.innerHTML = `<i data-lucide="zap"></i> Couvercle Extra Crisp`;
  } else {
    badgeEl.className = "cookeo-mode-pill";
    badgeEl.innerHTML = `<i data-lucide="chef-hat"></i> Préparation`;
  }

  // Timer
  clearInterval(state.timerInterval);
  const seconds = step.timerSeconds || (step.duration ? parseInt(step.duration) * 60 : 0) || 0;
  state.timerRemainingSeconds = seconds;
  formatTimerDisplay(seconds);

  // Boutons navigation
  prevBtn.style.visibility = state.liveStepIndex > 0 ? "visible" : "hidden";
  nextBtn.innerHTML = state.liveStepIndex < recipe.steps.length - 1 ? 
    `<span>Étape suivante</span> <i data-lucide="arrow-right"></i>` : 
    `<span>Terminer la Recette</span> <i data-lucide="check"></i>`;

  safeRenderIcons();

  // Lecture vocale automatique si activée
  speakText(step.text);
}

function formatTimerDisplay(seconds) {
  const display = document.getElementById("live-timer-display");
  if (!display) return;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function startTimer() {
  if (state.timerRemainingSeconds <= 0) return;
  clearInterval(state.timerInterval);
  playCookeoBeep("single");

  state.timerInterval = setInterval(() => {
    state.timerRemainingSeconds--;
    formatTimerDisplay(state.timerRemainingSeconds);

    if (state.timerRemainingSeconds <= 0) {
      clearInterval(state.timerInterval);
      playCookeoBeep("finish");
      speakText("Temps écoulé ! Cuisson Cookéo terminée.");
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(state.timerInterval);
  playCookeoBeep("single");
}

function resetTimer() {
  clearInterval(state.timerInterval);
  const step = state.currentRecipe?.steps[state.liveStepIndex];
  state.timerRemainingSeconds = step?.timerSeconds || 0;
  formatTimerDisplay(state.timerRemainingSeconds);
  playCookeoBeep("single");
}

// 10. Génération IA de la recette
async function handleGenerateRecipe() {
  const genBtn = document.getElementById("generate-recipe-btn");
  const userIngredients = Array.from(state.selectedIngredients);

  if (userIngredients.length === 0) {
    alert("Veuillez sélectionner ou ajouter au moins un ingrédient !");
    return;
  }

  const cookeoModel = COOKEO_MODELS[state.selectedModel] || COOKEO_MODELS.touch;
  const selectedAccessories = Array.from(state.selectedAccessories).map(id => COOKEO_ACCESSORIES[id]).filter(Boolean);
  const chefPersona = state.selectedChef;
  const guests = parseInt(document.getElementById("select-guests")?.value || "4", 10);
  const mealType = document.getElementById("select-meal-type")?.value || "plat";
  const maxTime = document.getElementById("select-max-time")?.value || "30";
  const diet = document.getElementById("select-diet")?.value || "tous";
  const useExtraCrisp = state.useExtraCrisp;

  const originalContent = genBtn.innerHTML;
  genBtn.disabled = true;
  genBtn.innerHTML = `<i data-lucide="loader-2" class="spin"></i> <span>Génération Cookéo en cours...</span>`;
  safeRenderIcons();
  playCookeoBeep("single");

  const apiKey = localStorage.getItem("cookeo_gemini_api_key");

  try {
    const generatedRecipe = await generateCookeoRecipe({
      userIngredients,
      cookeoModel,
      selectedAccessories,
      chefPersona,
      guests,
      mealType,
      diet,
      maxTime,
      useExtraCrisp,
      apiKey
    });

    displayRecipe(generatedRecipe);
    playCookeoBeep("finish");
  } catch (error) {
    console.warn("Échec génération IA Gemini, utilisation du catalogue hors-ligne :", error.message);
    
    // Fallback intelligent sur le catalogue
    const matchingRecipe = COOKEO_RECIPES.find(r => 
      r.ingredients.some(i => userIngredients.some(ui => i.name.toLowerCase().includes(ui.toLowerCase())))
    ) || COOKEO_RECIPES[0];

    const scaled = scaleRecipeForGuests(matchingRecipe, guests);
    displayRecipe(scaled);
    alert(`Note : L'IA Gemini étant inaccessible hors-ligne, nous avons adapté une excellente recette de notre catalogue pour vos ${guests} convives !`);
  } finally {
    genBtn.disabled = false;
    genBtn.innerHTML = originalContent;
    safeRenderIcons();
  }
}

// 11. Configuration des Écouteurs d'Événements
function setupEventListeners() {
  // Chips ingrédients rapides
  document.querySelectorAll(".chip-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const ing = btn.getAttribute("data-ingredient");
      if (!ing) return;
      if (state.selectedIngredients.has(ing)) {
        state.selectedIngredients.delete(ing);
      } else {
        state.selectedIngredients.add(ing);
      }
      playCookeoBeep("single");
      renderIngredientsTags();
    });
  });

  // Ajout ingrédient libre
  const addIngBtn = document.getElementById("add-ingredient-btn");
  const customInput = document.getElementById("custom-ingredient-input");
  function addCustomIngredient() {
    const val = customInput ? customInput.value.trim().toLowerCase() : "";
    if (val) {
      state.selectedIngredients.add(val);
      customInput.value = "";
      playCookeoBeep("single");
      renderIngredientsTags();
    }
  }
  addIngBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    addCustomIngredient();
  });
  customInput?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addCustomIngredient();
    }
  });

  // Suppression d'ingrédients
  document.getElementById("ingredients-tags-list")?.addEventListener("click", (e) => {
    const removeBtn = e.target.closest("[data-remove-ingredient]");
    if (removeBtn) {
      e.preventDefault();
      const ing = removeBtn.getAttribute("data-remove-ingredient");
      state.selectedIngredients.delete(ing);
      playCookeoBeep("single");
      renderIngredientsTags();
    }
  });

  document.getElementById("clear-all-tags-btn")?.addEventListener("click", (e) => {
    e.preventDefault();
    state.selectedIngredients.clear();
    playCookeoBeep("single");
    renderIngredientsTags();
  });

  // --- Gestion du Modèle Cookéo (Sélectionnable et Décochable) ---
  let currentSelectedModel = "touch";
  const modelInputs = document.querySelectorAll('input[name="cookeo_model"]');
  modelInputs.forEach(input => {
    input.addEventListener("click", () => {
      if (currentSelectedModel === input.value) {
        // Deuxième clic : permet de décocher le modèle
        input.checked = false;
        currentSelectedModel = null;
        state.selectedModel = null;
        playCookeoBeep("single");
      } else {
        // Premier clic ou changement de modèle
        currentSelectedModel = input.value;
        state.selectedModel = input.value;
        playCookeoBeep("single");

        // Adaptation automatique pour Cookéo Mini 3L
        const guestsSelect = document.getElementById("select-guests");
        if (state.selectedModel === "mini" && guestsSelect) {
          guestsSelect.innerHTML = `
            <option value="1">1 personne</option>
            <option value="2" selected>2 personnes (Idéal 3L)</option>
            <option value="3">3 personnes</option>
            <option value="4">4 personnes (Max 3L)</option>
          `;
        } else if (guestsSelect) {
          guestsSelect.innerHTML = `
            <option value="2">2 personnes</option>
            <option value="4" selected>4 personnes</option>
            <option value="6">6 personnes (Max 6L)</option>
          `;
        }
      }
    });
  });

  // --- Gestion des Accessoires Disponibles (Cochable & Décochable librement) ---
  const accessoryInputs = document.querySelectorAll('input[name="cookeo_accessory"]');
  accessoryInputs.forEach(input => {
    input.addEventListener("change", () => {
      const accId = input.value;
      if (input.checked) {
        state.selectedAccessories.add(accId);
      } else {
        state.selectedAccessories.delete(accId);
      }
      playCookeoBeep("single");

      // Synchronisation de l'Extra Crisp
      if (accId === "extra_crisp") {
        state.useExtraCrisp = input.checked;
        const toggle = document.getElementById("toggle-extra-crisp");
        if (toggle) toggle.checked = input.checked;
      }
    });
  });

  // --- Gestion du Chef Persona (Sélectionnable et Décochable) ---
  let currentSelectedChef = "coach_cookeo";
  const chefInputs = document.querySelectorAll('input[name="chef_persona"]');
  chefInputs.forEach(input => {
    input.addEventListener("click", () => {
      if (currentSelectedChef === input.value) {
        input.checked = false;
        currentSelectedChef = null;
        state.selectedChef = "coach_cookeo";
        playCookeoBeep("single");
      } else {
        currentSelectedChef = input.value;
        state.selectedChef = input.value;
        playCookeoBeep("single");
      }
    });
  });

  // Toggle Extra Crisp dans le bandeau inférieur
  const crispToggle = document.getElementById("toggle-extra-crisp");
  crispToggle?.addEventListener("change", (e) => {
    const isChecked = e.target.checked;
    state.useExtraCrisp = isChecked;
    playCookeoBeep("single");

    const crispCheckbox = document.getElementById("acc-extra-crisp");
    if (crispCheckbox) {
      crispCheckbox.checked = isChecked;
      if (isChecked) {
        state.selectedAccessories.add("extra_crisp");
      } else {
        state.selectedAccessories.delete("extra_crisp");
      }
    }
  });

  // Bouton génération
  document.getElementById("generate-recipe-btn")?.addEventListener("click", handleGenerateRecipe);

  // --- Modals : Catalogue des Recettes Cookéo ---
  const catModal = document.getElementById("catalog-modal");
  const openCatalog = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    renderCatalogModal();
    catModal?.classList.add("active");
    playCookeoBeep("single");
  };
  document.getElementById("catalog-modal-btn")?.addEventListener("click", openCatalog);
  document.getElementById("browse-catalog-btn")?.addEventListener("click", openCatalog);
  document.getElementById("close-catalog-modal-btn")?.addEventListener("click", (e) => {
    if (e && e.preventDefault) e.preventDefault();
    catModal?.classList.remove("active");
    playCookeoBeep("single");
  });

  // Recherche dans le catalogue
  document.getElementById("catalog-search-input")?.addEventListener("input", (e) => {
    renderCatalogModal(e.target.value);
  });

  // Clic sur une recette du catalogue pour la charger
  document.getElementById("catalog-grid")?.addEventListener("click", (e) => {
    const card = e.target.closest("[data-recipe-id]");
    if (card) {
      if (e && e.preventDefault) e.preventDefault();
      const recipeId = card.getAttribute("data-recipe-id");
      const found = COOKEO_RECIPES.find(r => r.id === recipeId);
      if (found) {
        catModal?.classList.remove("active");
        displayRecipe(found);
        playCookeoBeep("finish");
      }
    }
  });

  // --- Modals : Guide des Modèles & Accessoires ---
  const guideModal = document.getElementById("guide-modal");
  const openGuide = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    renderGuideModal();
    guideModal?.classList.add("active");
    playCookeoBeep("single");
  };
  document.getElementById("guide-modal-btn")?.addEventListener("click", openGuide);
  document.getElementById("close-guide-modal-btn")?.addEventListener("click", (e) => {
    if (e && e.preventDefault) e.preventDefault();
    guideModal?.classList.remove("active");
    playCookeoBeep("single");
  });

  // Fermeture universelle des modals au clic extérieur et touche Échap
  document.querySelectorAll(".modal-overlay").forEach(modal => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
        playCookeoBeep("single");
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-overlay.active").forEach(m => m.classList.remove("active"));
    }
  });

  // Modals : Paramètres
  const settingsModal = document.getElementById("settings-modal");
  const apiKeyInput = document.getElementById("user-api-key-input");
  document.getElementById("settings-btn")?.addEventListener("click", () => {
    if (apiKeyInput) apiKeyInput.value = localStorage.getItem("cookeo_gemini_api_key") || "";
    settingsModal.classList.add("active");
    playCookeoBeep("single");
  });
  document.getElementById("close-settings-modal-btn")?.addEventListener("click", () => {
    settingsModal.classList.remove("active");
  });
  document.getElementById("save-settings-btn")?.addEventListener("click", () => {
    if (apiKeyInput) {
      localStorage.setItem("cookeo_gemini_api_key", apiKeyInput.value.trim());
      alert("Clé API Gemini enregistrée !");
      settingsModal.classList.remove("active");
    }
  });

  // Sound toggle
  const soundBtn = document.getElementById("sound-toggle-btn");
  soundBtn?.addEventListener("click", () => {
    state.soundEnabled = !state.soundEnabled;
    soundBtn.innerHTML = state.soundEnabled ? `<i data-lucide="volume-2"></i>` : `<i data-lucide="volume-x"></i>`;
    safeRenderIcons();
    if (state.soundEnabled) playCookeoBeep("single");
  });

  // Live Cooking Navigation & Timers
  const liveModal = document.getElementById("live-cooking-modal");
  document.getElementById("close-live-modal-btn")?.addEventListener("click", () => {
    clearInterval(state.timerInterval);
    liveModal.classList.remove("active");
  });

  document.getElementById("live-prev-btn")?.addEventListener("click", () => {
    if (state.liveStepIndex > 0) {
      state.liveStepIndex--;
      playCookeoBeep("single");
      updateLiveStepView();
    }
  });

  document.getElementById("live-next-btn")?.addEventListener("click", () => {
    const total = state.currentRecipe?.steps?.length || 0;
    if (state.liveStepIndex < total - 1) {
      state.liveStepIndex++;
      playCookeoBeep("single");
      updateLiveStepView();
    } else {
      clearInterval(state.timerInterval);
      playCookeoBeep("finish");
      alert("Félicitations ! Votre plat Cookéo est prêt à être dégusté ! Bon appétit ! 🎉");
      liveModal.classList.remove("active");
    }
  });

  document.getElementById("timer-start-btn")?.addEventListener("click", startTimer);
  document.getElementById("timer-pause-btn")?.addEventListener("click", pauseTimer);
  document.getElementById("timer-reset-btn")?.addEventListener("click", resetTimer);
  document.getElementById("timer-speak-btn")?.addEventListener("click", () => {
    const step = state.currentRecipe?.steps[state.liveStepIndex];
    if (step) speakText(step.text);
  });
}


})();
