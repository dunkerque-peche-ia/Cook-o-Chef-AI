/**
 * Cookéo Chef AI - Offline Culinary Engine (Restructured for guest portion scaling)
 * This module manages recipe templates, matches user ingredients/accessories,
 * and formats recipes and commentaries for the different chef personas.
 */

// List of built-in Cookéo recipe templates with ingredients structured PER PERSON
const RECIPE_TEMPLATES = [
  {
    id: "gratin_dauphinois",
    name: "Gratin Dauphinois Fondant & Doré",
    category: "plat",
    prepTime: 15,
    cookTime: 22,
    difficulty: "Facile",
    accessories: ["extra_crisp"],
    // List of match-mapping ingredients for matching algorithm
    matchIngredients: ["pomme de terre", "creme", "lait", "ail", "fromage", "muscade", "oignon"],
    ingredients: [
      { name: "Pommes de terre", quantity: 200, unit: "g", type: "required" },
      { name: "Crème fraîche liquide", quantity: 10, unit: "cl", type: "required" },
      { name: "Lait demi-écrémé", quantity: 5, unit: "cl", type: "optional" },
      { name: "Gousse d'ail", quantity: 0.25, unit: "", type: "optional" },
      { name: "Fromage râpé (Gruyère/Emmental)", quantity: 25, unit: "g", type: "optional" },
      { name: "Noix de muscade", quantity: 0.15, unit: "pincée", type: "optional" }
    ],
    steps: [
      "Épluchez les pommes de terre et coupez-les en fines rondelles uniformes (environ 3mm). Ne les lavez pas après la coupe pour garder l'amidon.",
      "Frottez le fond de la cuve du Cookéo (ou d'un moule adapté) avec l'ail.",
      "Dans un bol, mélangez la crème fraîche, le lait, le sel, le poivre et la muscade.",
      "Disposez une couche de pommes de terre, puis versez un peu du mélange de crème. Répétez l'opération jusqu'à épuisement des ingrédients.",
      "Lancez la cuisson sous pression (ou mode Cookéo classique) pendant 12 minutes.",
      "Parsemez généreusement de fromage râpé sur le dessus.",
      "Installez le couvercle **Extra Crisp** sur votre Cookéo. Sélectionnez le **programme 2 (Grill)** et laissez dorer pendant 10 minutes à 200°C pour obtenir une croûte bien croustillante."
    ],
    chefComments: {
      meme_gateau: "Oh mon petit oiseau, un bon gratin dauphinois ! Rajoute bien tout le fromage et encore un peu de crème si tu as peur d'avoir faim. C'est le secret du bonheur !",
      chef_etoile: "Nous recherchons ici une harmonie texturale entre la tendreté de la pomme de terre cuite à cœur et la réaction de Maillard sur la croûte de fromage. Sublime !",
      chef_rigolo: "J'ai essayé de jongler avec les rondelles de patates... Résultat, le chien en a mangé la moitié. Heureusement, c'est quand même super bon !",
      chef_rebelle: "Un gratin sans chichis. Pas besoin de couper droit, balance tout dans la cuve, fais péter l'Extra Crisp à fond et savoure le croustillant !"
    }
  },
  {
    id: "fondant_chocolat",
    name: "Cœur Coulant Chocolat Intense",
    category: "dessert",
    prepTime: 10,
    cookTime: 15,
    difficulty: "Moyen",
    accessories: ["moule_gateau"],
    matchIngredients: ["chocolat", "beurre", "oeuf", "sucre", "farine", "sel"],
    ingredients: [
      { name: "Chocolat noir pâtissier", quantity: 50, unit: "g", type: "required" },
      { name: "Beurre doux", quantity: 30, unit: "g", type: "required" },
      { name: "Œuf frais", quantity: 0.75, unit: "", type: "required" },
      { name: "Sucre en poudre", quantity: 20, unit: "g", type: "optional" },
      { name: "Farine de blé", quantity: 12, unit: "g", type: "optional" },
      { name: "Sel fin", quantity: 0.25, unit: "pincée", type: "optional" }
    ],
    steps: [
      "Dans un récipient adapté, faites fondre le chocolat et le beurre coupés en morceaux.",
      "Dans un saladier, battez les œufs avec le sucre jusqu'à ce que le mélange blanchisse.",
      "Incorporez le mélange chocolat/beurre fondu, puis ajoutez doucement la farine et une pincée de sel en mélangeant délicatement.",
      "Beurrez et farinez votre **moule à gâteau Cookéo XA609001**.",
      "Versez la pâte dans le moule et recouvrez-le de film étirable résistant à la chaleur pour éviter que la vapeur ne retombe dessus.",
      "Versez 200ml d'eau dans la cuve du Cookéo et déposez le panier vapeur. Placez le moule à gâteau dans le panier vapeur.",
      "Lancez la cuisson sous pression pendant 15 minutes. Laissez tiédir avant de démouler pour garder le cœur coulant !"
    ],
    chefComments: {
      meme_gateau: "Le chocolat, c'est le réconfort de l'âme ! Laisse-le un tout petit peu moins cuire si tu veux qu'il coule comme un ruisseau de tendresse dans l'assiette.",
      chef_etoile: "Une amertume chocolatée magnifiée par une cuisson vapeur qui préserve l'humidité moléculaire du biscuit. Une pièce maîtresse de la gastronomie décontractée.",
      chef_rigolo: "J'ai mis du chocolat partout sur mon tablier, on dirait que j'ai combattu un monstre de cacao. Mais ça vaut le coup, c'est une tuerie !",
      chef_rebelle: "Le gâteau des vrais rebelles. Rapide, chocolaté à mort, pas de déco instagrammable, juste du pur plaisir brut. Mange-le chaud !"
    }
  },
  {
    id: "mijete_poulet",
    name: "Mijoté de Poulet Express aux Légumes",
    category: "plat",
    prepTime: 15,
    cookTime: 15,
    difficulty: "Facile",
    accessories: [],
    matchIngredients: ["poulet", "carotte", "oignon", "pomme de terre", "bouillon", "ail", "huile", "creme"],
    ingredients: [
      { name: "Blanc de poulet", quantity: 150, unit: "g", type: "required" },
      { name: "Carotte", quantity: 100, unit: "g", type: "required" },
      { name: "Pommes de terre", quantity: 100, unit: "g", type: "optional" },
      { name: "Oignon", quantity: 0.25, unit: "", type: "optional" },
      { name: "Bouillon de volaille", quantity: 5, unit: "cl", type: "optional" },
      { name: "Huile d'olive", quantity: 0.5, unit: "cl", type: "optional" },
      { name: "Crème fraîche", quantity: 2, unit: "cl", type: "optional" }
    ],
    steps: [
      "Coupez les blancs de poulet en cubes réguliers. Émincez l'oignon et coupez les carottes et pommes de terre en morceaux.",
      "Allumez le Cookéo en **mode Doré**. Versez un filet d'huile et faites revenir les oignons et les morceaux de poulet pendant 4 à 5 minutes pour qu'ils soient bien colorés.",
      "Ajoutez les carottes, les pommes de terre et tout autre légume de votre choix.",
      "Versez le bouillon de légumes ou de volaille pour couvrir légèrement les ingrédients.",
      "Salez, poivrez et ajoutez vos herbes aromatiques préférées.",
      "Passez le Cookéo en **mode Cuisson sous pression** (cuisson rapide) pendant 10 minutes.",
      "Optionnel : À la fin de la cuisson, ajoutez une cuillère de crème fraîche pour lier la sauce avant de servir."
    ],
    chefComments: {
      meme_gateau: "Rien ne vaut un bon petit mijoté chaud pour réchauffer les cœurs. Accompagne-le de tranches de pain de campagne frottées à l'ail !",
      chef_etoile: "Les sucs du poulet caramélisés en mode Doré apportent une profondeur de goût indispensable, équilibrée par la sucrosité naturelle des carottes étuvées.",
      chef_rigolo: "J'ai pleuré toutes les larmes de mon corps en coupant l'oignon. Mais le poulet est si tendre qu'il s'excuse presque de m'avoir fait pleurer !",
      chef_rebelle: "La recette parfaite quand on a la flemme mais qu'on veut du lourd. Tout dans la cuve, bip-bip, et c'est prêt à être dévoré !"
    }
  },
  {
    id: "saumon_vapeur",
    name: "Pavé de Saumon et Légumes Vapeur Sauce Citronnée",
    category: "plat",
    prepTime: 10,
    cookTime: 8,
    difficulty: "Facile",
    accessories: ["panier_vapeur"],
    matchIngredients: ["saumon", "carotte", "pomme de terre", "citron", "creme", "courgette", "ail"],
    ingredients: [
      { name: "Pavé de saumon frais", quantity: 1, unit: "portion", type: "required" },
      { name: "Carotte", quantity: 100, unit: "g", type: "required" },
      { name: "Courgette", quantity: 100, unit: "g", type: "optional" },
      { name: "Pommes de terre", quantity: 100, unit: "g", type: "optional" },
      { name: "Citron jaune", quantity: 0.25, unit: "", type: "optional" },
      { name: "Crème fraîche épaisse", quantity: 2, unit: "cl", type: "optional" }
    ],
    steps: [
      "Versez 200ml d'eau au fond de la cuve du Cookéo.",
      "Épluchez les légumes et coupez-les en rondelles ou petits dés pour une cuisson rapide.",
      "Déposez les légumes au fond du **panier vapeur** du Cookéo.",
      "Placez les pavés de saumon par-dessus les légumes dans le panier vapeur. Assaisonnez de sel, poivre et déposez une rondelle de citron sur chaque pavé.",
      "Insérez le panier vapeur dans la cuve du Cookéo.",
      "Lancez la cuisson sous pression pendant 7 à 8 minutes selon l'épaisseur des pavés.",
      "Servez chaud en arrosant le poisson d'un filet de jus de citron et d'une touche de crème."
    ],
    chefComments: {
      meme_gateau: "La cuisson vapeur c'est tellement sain, mon grand ! Et le saumon reste si moelleux. N'oublie pas la petite pointe de fleur de sel à la fin.",
      chef_etoile: "La cuisson sous atmosphère saturée en humidité préserve les acides gras essentiels du saumon. Une texture nacrée d'une précision absolue.",
      chef_rigolo: "Le poisson a glissé dans la cuve la première fois, j'ai dû aller à la pêche ! Mais après ça, la cuisson était nickel, un régal.",
      chef_rebelle: "Vapeur ne veut pas dire ennuyeux ! Ajoute du piment d'Espelette ou du curry sur ton saumon pour lui donner un bon coup de fouet !"
    }
  },
  {
    id: "frites_extra_crisp",
    name: "Frites Maison Dorées & Légères",
    category: "plat",
    prepTime: 15,
    cookTime: 25,
    difficulty: "Facile",
    accessories: ["extra_crisp"],
    matchIngredients: ["pomme de terre", "huile", "sel", "paprika", "ail"],
    ingredients: [
      { name: "Pommes de terre de type Bintje", quantity: 200, unit: "g", type: "required" },
      { name: "Huile de tournesol", quantity: 0.5, unit: "cl", type: "optional" },
      { name: "Sel de mer", quantity: 0.25, unit: "pincée", type: "optional" },
      { name: "Paprika en poudre", quantity: 0.25, unit: "pincée", type: "optional" }
    ],
    steps: [
      "Épluchez les pommes de terre et coupez-les en frites (environ 1cm d'épaisseur).",
      "Lavez abondamment les frites à l'eau froide pour enlever l'amidon, puis séchez-les très soigneusement avec un torchon propre.",
      "Dans un saladier, mélangez les frites avec l'huile végétale, le sel et les épices de votre choix.",
      "Déposez les frites directement dans la cuve sèche du Cookéo.",
      "Positionnez le couvercle **Extra Crisp** sur la cuve.",
      "Sélectionnez le **programme 3 (Friture / Air Fry)** à 200°C pour 25 minutes.",
      "Pensez à remuer les frites à mi-cuisson (à l'aide de pinces en bois pour ne pas rayer la cuve) pour une dorure uniforme."
    ],
    chefComments: {
      meme_gateau: "Des frites avec presque pas d'huile, c'est magique pour régaler les enfants sans culpabiliser. Elles sont si croustillantes !",
      chef_etoile: "L'Extra Crisp crée une convection forcée d'air chaud qui sublime l'amidon périphérique. Une alternative diététique très intéressante.",
      chef_rigolo: "J'ai essayé d'en manger une à mi-cuisson, je me suis brûlé la langue... Attends bien la fin du bip Cookéo, crois-moi !",
      chef_rebelle: "La frite sans friture grasse, c'est de l'anarchie culinaire ! Balance du piment de Cayenne dessus pour relever tout ça !"
    }
  },
  {
    id: "gateau_pommes",
    name: "Moelleux aux Pommes d'Antan",
    category: "dessert",
    prepTime: 15,
    cookTime: 25,
    difficulty: "Facile",
    accessories: ["moule_gateau"],
    matchIngredients: ["pomme", "farine", "oeuf", "sucre", "beurre", "levure", "cannelle", "sel"],
    ingredients: [
      { name: "Pommes jaunes", quantity: 0.75, unit: "", type: "required" },
      { name: "Farine de blé", quantity: 35, unit: "g", type: "required" },
      { name: "Œuf", quantity: 0.5, unit: "", type: "required" },
      { name: "Sucre en poudre", quantity: 25, unit: "g", type: "required" },
      { name: "Beurre doux", quantity: 20, unit: "g", type: "optional" },
      { name: "Levure chimique", quantity: 2, unit: "g", type: "optional" },
      { name: "Cannelle moulue", quantity: 0.25, unit: "pincée", type: "optional" }
    ],
    steps: [
      "Épluchez les pommes et coupez-les en dés ou fines lamelles.",
      "Dans un grand bol, fouettez les œufs et le sucre jusqu'à obtenir un mélange mousseux. Ajoutez le beurre fondu.",
      "Incorporez la farine et la levure chimique tamisées. Ajoutez une pincée de cannelle si vous aimez.",
      "Ajoutez délicatement les morceaux de pommes à la pâte.",
      "Beurrez le **moule à gâteau Cookéo XA609001** et versez-y la préparation.",
      "Couvrez le moule de papier aluminium ou de film étirable résistant à la chaleur.",
      "Versez 200ml d'eau dans la cuve du Cookéo, placez le panier vapeur et déposez-y le moule.",
      "Lancez la cuisson sous pression pour 25 minutes. Laissez refroidir avant de démouler."
    ],
    chefComments: {
      meme_gateau: "L'odeur de la pomme chaude et de la cannelle... Ça sent bon les dimanches après-midi en famille. Une vraie douceur d'automne.",
      chef_etoile: "La pomme apporte une acidité bienvenue qui vient structurer le moelleux du biscuit cuit sous pression. Simple mais rigoureux.",
      chef_rigolo: "J'ai croqué dans une pomme pendant la préparation, il m'en manquait une moitié pour la pâte. Oups ! Le gâteau est quand même super gonflé.",
      chef_rebelle: "Un gâteau de grand-mère revisité en version rapide. Pas besoin d'attendre 1 heure au four. À dévorer tiède avec une boule de glace !"
    }
  }
];

/**
 * Normalizes input string for search
 */
function normalize(str) {
  let normalized = str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .trim();
  
  const synonyms = {
    "patate": "pomme de terre",
    "patates": "pomme de terre",
    "pommes de terre": "pomme de terre",
    "blancs de poulet": "poulet",
    "blanc de poulet": "poulet",
    "escalope de poulet": "poulet",
    "escalopes de poulet": "poulet",
    "filet de poulet": "poulet",
    "filets de poulet": "poulet",
    "creme fraiche": "creme",
    "creme liquide": "creme",
    "fromage rape": "fromage",
    "gruyere": "fromage",
    "emmental": "fromage",
    "parmesan": "fromage",
    "cheddar": "fromage",
    "oeufs": "oeuf",
    "pommes": "pomme",
    "carottes": "carotte",
    "pates": "pate",
    "oignons": "oignon"
  };
  
  for (const key in synonyms) {
    if (normalized === key || normalized.includes(key)) {
      return synonyms[key];
    }
  }
  
  return normalized;
}

/**
 * Searches and ranks recipe templates based on user ingredients and accessories.
 */
export function generateOfflineRecipe(userIngredients, selectedAccessories, chefPersona) {
  const normalizedUserIngredients = userIngredients.map(normalize);
  
  let bestRecipe = null;
  let bestScore = -1;

  for (const template of RECIPE_TEMPLATES) {
    // Calculate match based on ingredients intersection
    const requiredMatchCount = template.ingredients.filter(ing => 
      ing.type === "required" && 
      normalizedUserIngredients.some(userIng => normalize(ing.name).includes(userIng) || userIng.includes(normalize(ing.name)))
    ).length;

    const totalRequired = template.ingredients.filter(i => i.type === "required").length;
    if (requiredMatchCount === 0) continue;

    const requiredScore = requiredMatchCount / totalRequired;

    const optionalMatchCount = template.ingredients.filter(ing => 
      ing.type === "optional" && 
      normalizedUserIngredients.some(userIng => normalize(ing.name).includes(userIng) || userIng.includes(normalize(ing.name)))
    ).length;
    const totalOptional = template.ingredients.filter(i => i.type === "optional").length;
    const optionalScore = totalOptional > 0 ? (optionalMatchCount / totalOptional) * 0.5 : 0;

    // Accessory compatibility
    let accessoryScore = 1;
    let accessoryMismatch = false;

    for (const reqAcc of template.accessories) {
      if (!selectedAccessories.includes(reqAcc)) {
        accessoryScore = 0.1;
        accessoryMismatch = true;
      } else {
        accessoryScore += 0.5;
      }
    }

    // Boost if accessory matched
    let userAccessoryUsageBoost = 0;
    selectedAccessories.forEach(acc => {
      if (template.accessories.includes(acc)) {
        userAccessoryUsageBoost += 0.3;
      }
    });

    const totalScore = (requiredScore + optionalScore) * accessoryScore + userAccessoryUsageBoost;

    if (totalScore > bestScore && !accessoryMismatch) {
      bestScore = totalScore;
      bestRecipe = template;
    }
  }

  if (bestRecipe && bestScore > 0.4) {
    return customizeRecipe(bestRecipe, userIngredients, selectedAccessories, chefPersona);
  }

  // Fallback: Generate Improvised Recipe
  return generateImprovisedRecipe(userIngredients, selectedAccessories, chefPersona);
}

/**
 * Adjusts a template recipe based on user input
 */
function customizeRecipe(template, userIngredients, selectedAccessories, chefPersona) {
  const recipe = JSON.parse(JSON.stringify(template));
  
  // Find extra user ingredients to suggest adding
  const matchedNames = recipe.ingredients.map(i => normalize(i.name));
  
  const extraIngredients = userIngredients.filter(userIng => {
    const norm = normalize(userIng);
    return !matchedNames.some(matched => matched.includes(norm) || norm.includes(matched));
  });

  if (extraIngredients.length > 0) {
    extraIngredients.forEach(ing => {
      const details = estimateIngredientDetails(ing);
      recipe.ingredients.push({
        name: ing.charAt(0).toUpperCase() + ing.slice(1),
        quantity: details.quantity,
        unit: details.unit,
        type: "custom"
      });
    });

    const formattedExtras = extraIngredients.map(ing => ing.charAt(0).toUpperCase() + ing.slice(1)).join(', ');
    if (recipe.category === "plat") {
      recipe.steps.splice(3, 0, `💡 **Touche Chef AI** : Intégrez vos ingrédients bonus (**${formattedExtras}**) coupés en morceaux à la cuisson !`);
    } else {
      recipe.steps.splice(3, 0, `💡 **Touche Chef AI** : Accompagnez votre dessert avec : **${formattedExtras}** !`);
    }
  }

  recipe.commentary = recipe.chefComments[chefPersona] || "Régalez-vous avec Cookéo !";
  delete recipe.chefComments;

  return recipe;
}

/**
 * Generates an improvised recipe
 */
function generateImprovisedRecipe(userIngredients, selectedAccessories, chefPersona) {
  const ingredientsList = userIngredients.map(ing => ing.charAt(0).toUpperCase() + ing.slice(1));
  const hasSweet = userIngredients.some(ing => {
    const norm = normalize(ing);
    return ["chocolat", "pomme", "sucre", "fraise", "banane", "poire", "farine", "miel", "citron", "abricot"].some(sweet => norm.includes(sweet));
  });

  const recipeName = hasSweet 
    ? "Méli-Mélo Sucré Improvisé" 
    : "Mijoté Surprise 'Vide-Frigo' au Cookéo";

  const accessoriesToUse = [];
  let cookMode = "Cuisson sous pression";
  let cookTime = 10;
  const steps = [];

  // Generate structured ingredients list per person
  const ingredients = userIngredients.map(ing => {
    const details = estimateIngredientDetails(ing);
    return {
      name: ing.charAt(0).toUpperCase() + ing.slice(1),
      quantity: details.quantity,
      unit: details.unit,
      type: "required"
    };
  });

  if (hasSweet) {
    if (selectedAccessories.includes("moule_gateau")) {
      accessoriesToUse.push("moule_gateau");
      steps.push("Dans un récipient, mélangez vos ingrédients sucrés disponibles (fruits coupés, chocolat fondu, liants).");
      steps.push("Graissez votre **moule à gâteau Cookéo** et versez-y la préparation.");
      if (selectedAccessories.includes("extra_crisp")) {
        accessoriesToUse.push("extra_crisp");
        steps.push("Posez le couvercle **Extra Crisp** sur votre Cookéo et lancez le **Mode 4 (Gâteau)** à 180°C pendant 20 minutes.");
        cookTime = 20;
      } else {
        steps.push("Recouvrez le moule de film étirable, versez 200ml d'eau dans la cuve, puis déposez-y le moule dans le panier vapeur.");
        steps.push("Lancez la cuisson sous pression pendant 15 minutes.");
        cookTime = 15;
      }
    } else {
      steps.push("Coupez vos fruits et ingrédients sucrés en morceaux uniformes.");
      steps.push("Déposez-les dans la cuve avec 3 cuillères d'eau ou de beurre fondu.");
      steps.push("Lancez la cuisson sous pression pendant 6 minutes pour une compotée express.");
      cookTime = 6;
    }
  } else {
    steps.push("Découpez vos légumes et protéines en morceaux réguliers.");
    steps.push("Mettez votre Cookéo en **mode Doré**.");
    
    const hasOnion = userIngredients.some(ing => normalize(ing).includes("oignon") || normalize(ing).includes("ail"));
    steps.push(`Versez un filet d'huile ou de beurre${hasOnion ? " et faites colorer vos oignons/ail" : ""} pendant 2 minutes.`);
    steps.push("Ajoutez les protéines et les légumes fermes. Faites dorer le tout pendant 4 minutes.");
    steps.push("Versez environ 150ml de liquide (eau, bouillon ou sauce) pour assurer la pression.");
    
    if (selectedAccessories.includes("extra_crisp")) {
      accessoriesToUse.push("extra_crisp");
      steps.push("Passez en cuisson sous pression pendant 8 minutes, puis ouvrez, parsemez de fromage et posez le couvercle **Extra Crisp**.");
      steps.push("Lancez le **programme 2 (Grill)** pendant 8 minutes.");
      cookTime = 16;
    } else if (selectedAccessories.includes("panier_vapeur")) {
      accessoriesToUse.push("panier_vapeur");
      steps.length = 0;
      steps.push("Versez 200ml d'eau au fond de la cuve.");
      steps.push("Déposez tous vos ingrédients découpés dans le **panier vapeur**.");
      steps.push("Lancez la cuisson sous pression pendant 9 minutes pour une cuisson saine et légère.");
      cookTime = 9;
    } else {
      steps.push("Fermez et lancez la cuisson sous pression pour 10 minutes.");
      cookTime = 10;
    }
  }

  steps.push("Dressez joliment et dégustez bien chaud !");

  const commentaries = {
    meme_gateau: `Mon trésor, avec tes ingrédients (${ingredientsList.join(', ')}), j'ai préparé ce que j'appelle un plat d'amour improvisé. C'est simple, c'est généreux, et ça remplit le ventre ! Régale-toi !`,
    chef_etoile: `Une création spontanée. Face à la contrainte de votre réfrigérateur, nous avons structuré une assiette conceptuelle articulée autour de : ${ingredientsList.join(', ')}. Une improvisation de haute voltige.`,
    chef_rigolo: `Abracadabra ! J'ai mélangé tes ingrédients dans mon chapeau de magicien (enfin, le Cookéo) et paf ! Ça fait une super recette. Promis, j'ai pas fait exploser l'appareil cette fois !`,
    chef_rebelle: `Pas de livre de recettes, pas de règles, juste toi, tes ingrédients (${ingredientsList.join(', ')}) et ta bécane Cookéo. C'est ça la vraie cuisine sauvage. Bon appétit !`
  };

  return {
    id: "improvised_recipe",
    name: recipeName,
    category: hasSweet ? "dessert" : "plat",
    prepTime: 10,
    cookTime: cookTime,
    difficulty: "Facile",
    accessories: accessoriesToUse,
    ingredients: ingredients,
    steps: steps,
    commentary: commentaries[chefPersona] || "Une belle improvisation Cookéo !"
  };
}

/**
 * Estimates quantity and unit for custom user ingredients per person
 */
function estimateIngredientDetails(ingName) {
  const norm = normalize(ingName);
  let qty = 100; // default 100g
  let unit = "g";

  if (norm.includes("poulet") || norm.includes("boeuf") || norm.includes("viande") || norm.includes("poisson") || norm.includes("saumon") || norm.includes("porc") || norm.includes("dinde")) {
    qty = 120;
    unit = "g";
  } else if (norm.includes("creme") || norm.includes("lait") || norm.includes("sauce") || norm.includes("bouillon") || norm.includes("vin") || norm.includes("eau")) {
    qty = 5;
    unit = "cl";
  } else if (norm.includes("huile") || norm.includes("beurre")) {
    qty = 0.5;
    unit = "cl";
  } else if (norm.includes("sucre") || norm.includes("farine") || norm.includes("chocolat") || norm.includes("fromage")) {
    qty = 25;
    unit = "g";
  } else if (norm.includes("oeuf")) {
    qty = 0.5;
    unit = "";
  } else if (norm.includes("sel") || norm.includes("poivre") || norm.includes("epice") || norm.includes("paprika") || norm.includes("herbe") || norm.includes("cannelle")) {
    qty = 0.25;
    unit = "pincée";
  } else if (norm.includes("moutarde") || norm.includes("miel")) {
    qty = 0.5;
    unit = "c.à.s.";
  } else if (norm.includes("citron") || norm.includes("oignon") || norm.includes("ail") || norm.includes("echalote")) {
    qty = 0.25;
    unit = "";
  }
  return { quantity: qty, unit: unit };
}
