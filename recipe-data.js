/**
 * Cookéo Chef AI - Catalogue Officiel de Recettes Pré-intégrées
 * Toutes calibrées pour les temps sous pression, modes de dorure et couvercle Extra Crisp.
 */

export const COOKEO_RECIPES = [
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
