/**
 * Cookéo Chef AI - Application Controller
 * Orchestrates user interactions, ingredient tag management, UI transitions,
 * Web Audio API sound effects, and API generation bindings.
 */

import { generateOfflineRecipe } from "./chef-engine.js";
import { generateGeminiRecipe } from "./gemini-api.js";

// --- Application State ---
const state = {
  ingredients: [],
  accessories: [],
  chefPersona: "meme_gateau",
  guests: 4,
  apiKey: localStorage.getItem("cookeo_gemini_api_key") || "",
  soundEnabled: true,
  currentRecipe: null
};

// --- Web Audio API Sound Synthesizer ---
let audioCtx = null;
let bubblingInterval = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

// Synthesizes a sweet click/pop sound
function playPopSound() {
  if (!state.soundEnabled) return;
  initAudio();
  
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.type = "sine";
  osc.frequency.setValueAtTime(400, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1);
  
  gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.start();
  osc.stop(audioCtx.currentTime + 0.1);
}

// Synthesizes a liquid bubble sound (for adding tags)
function playBubbleSound() {
  if (!state.soundEnabled) return;
  initAudio();
  
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.type = "sine";
  osc.frequency.setValueAtTime(150, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.15);
  
  gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.start();
  osc.stop(audioCtx.currentTime + 0.15);
}

// Synthesizes a mechanical double bip (like the Cookéo menu)
function playBipCookeo() {
  if (!state.soundEnabled) return;
  initAudio();
  
  const now = audioCtx.currentTime;
  
  // First bip
  const osc1 = audioCtx.createOscillator();
  const gain1 = audioCtx.createGain();
  osc1.frequency.setValueAtTime(2000, now);
  gain1.gain.setValueAtTime(0.05, now);
  gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
  osc1.connect(gain1);
  gain1.connect(audioCtx.destination);
  osc1.start(now);
  osc1.stop(now + 0.09);

  // Second bip
  const osc2 = audioCtx.createOscillator();
  const gain2 = audioCtx.createGain();
  osc2.frequency.setValueAtTime(2000, now + 0.12);
  gain2.gain.setValueAtTime(0.05, now + 0.12);
  gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
  osc2.connect(gain2);
  gain2.connect(audioCtx.destination);
  osc2.start(now + 0.12);
  osc2.stop(now + 0.21);
}

// Synthesizes a celebratory cooking chime
function playSuccessChime() {
  if (!state.soundEnabled) return;
  initAudio();
  
  const now = audioCtx.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
  
  notes.forEach((freq, idx) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, now + idx * 0.1);
    
    gain.gain.setValueAtTime(0.08, now + idx * 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.4);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start(now + idx * 0.1);
    osc.stop(now + idx * 0.1 + 0.45);
  });
}

// Background bubbling sound synthesis loop during cooking progress
function startBubblingSound() {
  if (!state.soundEnabled) return;
  initAudio();
  
  stopBubblingSound();
  
  bubblingInterval = setInterval(() => {
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    // Bubble sound sweep
    const baseFreq = 80 + Math.random() * 60;
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 2.5, now + 0.15);
    
    gain.gain.setValueAtTime(0.03 + Math.random() * 0.03, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start(now);
    osc.stop(now + 0.16);
  }, 180);
}

function stopBubblingSound() {
  if (bubblingInterval) {
    clearInterval(bubblingInterval);
    bubblingInterval = null;
  }
}

// --- UI Element References ---
const elements = {
  soundToggleBtn: document.getElementById("sound-toggle-btn"),
  settingsBtn: document.getElementById("settings-btn"),
  settingsModal: document.getElementById("settings-modal"),
  closeModalBtn: document.getElementById("close-modal-btn"),
  settingsForm: document.getElementById("settings-form"),
  apiKeyInput: document.getElementById("api-key-input"),
  testApiBtn: document.getElementById("test-api-btn"),
  apiKeyStatus: document.getElementById("api-key-status"),
  currentModeBadge: document.getElementById("current-mode-badge"),
  
  // Inputs
  chipBtns: document.querySelectorAll(".chip-btn"),
  customIngredientInput: document.getElementById("custom-ingredient-input"),
  addIngredientBtn: document.getElementById("add-ingredient-btn"),
  ingredientsTagsList: document.getElementById("ingredients-tags-list"),
  accessoryCheckboxes: document.querySelectorAll(".accessory-checkbox"),
  chefCards: document.querySelectorAll(".chef-card"),
  generateRecipeBtn: document.getElementById("generate-recipe-btn"),
  
  // Loading
  cookingLoader: document.getElementById("cooking-loader"),
  loaderStatusTitle: document.getElementById("loader-status-title"),
  loaderStatusSubtitle: document.getElementById("loader-status-subtitle"),
  loaderProgressFill: document.getElementById("loader-progress-fill"),
  
  // Recipe
  recipeDisplayArea: document.getElementById("recipe-display-area"),
  recipeTitle: document.getElementById("recipe-title"),
  recipeCategoryBadge: document.getElementById("recipe-category-badge"),
  recipePrepTime: document.getElementById("recipe-prep-time"),
  recipeCookTime: document.getElementById("recipe-cook-time"),
  recipeDifficulty: document.getElementById("recipe-difficulty"),
  recipeAccessoriesBadges: document.getElementById("recipe-accessories-badges"),
  recipeAccMetaItem: document.getElementById("recipe-acc-meta-item"),
  recipeIngredientsList: document.getElementById("recipe-ingredients-list-ul"),
  recipeStepsList: document.getElementById("recipe-steps-list-ol"),
  commentaryChefAvatar: document.getElementById("commentary-chef-avatar"),
  commentaryChefName: document.getElementById("commentary-chef-name"),
  commentaryText: document.getElementById("commentary-text"),
  printRecipeBtn: document.getElementById("print-recipe-btn"),
  shareRecipeBtn: document.getElementById("share-recipe-btn"),
  cookAgainBtn: document.getElementById("cook-again-btn")
};

// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
  // Setup Lucide icons replacement
  if (window.lucide) {
    window.lucide.createIcons();
  }
  
  // Set initial settings state
  updateApiBadge();
  if (state.apiKey) {
    elements.apiKeyInput.value = state.apiKey;
    testGeminiKey(state.apiKey, false);
  }
  
  // Bind all event listeners
  setupEventListeners();
  renderTags();
});

// --- Event Listeners Setup ---
function setupEventListeners() {
  // Sound controls
  elements.soundToggleBtn.addEventListener("click", () => {
    state.soundEnabled = !state.soundEnabled;
    const icon = elements.soundToggleBtn.querySelector("i");
    if (state.soundEnabled) {
      elements.soundToggleBtn.innerHTML = '<i data-lucide="volume-2"></i>';
      playPopSound();
    } else {
      elements.soundToggleBtn.innerHTML = '<i data-lucide="volume-x"></i>';
    }
    if (window.lucide) window.lucide.createIcons();
  });

  // Modal Settings toggling
  elements.settingsBtn.addEventListener("click", () => {
    playPopSound();
    elements.settingsModal.classList.remove("hidden");
  });

  elements.closeModalBtn.addEventListener("click", () => {
    playPopSound();
    elements.settingsModal.classList.add("hidden");
  });

  elements.settingsModal.addEventListener("click", (e) => {
    if (e.target === elements.settingsModal) {
      elements.settingsModal.classList.add("hidden");
    }
  });

  // Settings Save Form
  elements.settingsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const key = elements.apiKeyInput.value.trim();
    localStorage.setItem("cookeo_gemini_api_key", key);
    state.apiKey = key;
    playSuccessChime();
    updateApiBadge();
    elements.settingsModal.classList.add("hidden");
  });

  // API key connection testing
  elements.testApiBtn.addEventListener("click", () => {
    const key = elements.apiKeyInput.value.trim();
    testGeminiKey(key, true);
  });

  // Popular ingredient chips toggling
  elements.chipBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const ing = btn.getAttribute("data-ingredient");
      const index = state.ingredients.indexOf(ing);
      
      if (index === -1) {
        state.ingredients.push(ing);
        btn.classList.add("active");
        playBubbleSound();
      } else {
        state.ingredients.splice(index, 1);
        btn.classList.remove("active");
        playPopSound();
      }
      renderTags();
    });
  });

  // Add custom ingredients typing
  elements.customIngredientInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addCustomIngredient();
    }
  });

  elements.addIngredientBtn.addEventListener("click", addCustomIngredient);

  // Accessories checkboxes selection change
  elements.accessoryCheckboxes.forEach(cb => {
    cb.addEventListener("change", () => {
      playBubbleSound();
      state.accessories = Array.from(elements.accessoryCheckboxes)
        .filter(c => c.checked)
        .map(c => c.value);
    });
  });

  // Chef Card Selection click
  elements.chefCards.forEach(card => {
    card.addEventListener("click", () => {
      elements.chefCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      state.chefPersona = card.getAttribute("data-chef");
      playPopSound();
    });
  });

  // Generate recipe execution click
  elements.generateRecipeBtn.addEventListener("click", triggerRecipeGeneration);

  // Restart Button click
  elements.cookAgainBtn.addEventListener("click", () => {
    playPopSound();
    elements.recipeDisplayArea.classList.add("hidden");
    document.getElementById("ingredients-section").scrollIntoView({ behavior: "smooth" });
  });

  // Printing trigger
  elements.printRecipeBtn.addEventListener("click", () => {
    playPopSound();
    window.print();
  });

  // Sharing trigger
  elements.shareRecipeBtn.addEventListener("click", shareRecipe);

  // Guests selector pills click
  document.querySelectorAll(".guest-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      document.querySelectorAll(".guest-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      state.guests = parseInt(pill.getAttribute("data-guests"), 10);
      playPopSound();
      updateMiniGuestSwitcher(state.guests);
      // If a recipe is already active, live re-render ingredients quantities!
      if (state.currentRecipe) {
        renderIngredientsList();
      }
    });
  });

  // Recipe panel mini portion selector clicks
  document.querySelectorAll(".guest-pill-mini").forEach(pill => {
    pill.addEventListener("click", () => {
      const guests = parseInt(pill.getAttribute("data-guests"), 10);
      state.guests = guests;
      playPopSound();
      updateMiniGuestSwitcher(guests);
      // Sync main form pills too
      document.querySelectorAll(".guest-pill").forEach(p => {
        if (parseInt(p.getAttribute("data-guests"), 10) === guests) {
          p.classList.add("active");
        } else {
          p.classList.remove("active");
        }
      });
      renderIngredientsList();
    });
  });
}

// --- Ingredients Tag UI Management ---
function addCustomIngredient() {
  const value = elements.customIngredientInput.value.trim().toLowerCase();
  if (!value) return;

  if (!state.ingredients.includes(value)) {
    state.ingredients.push(value);
    playBubbleSound();
    renderTags();
    
    // Highlight chip if it matches an existing popular ingredient chip
    elements.chipBtns.forEach(btn => {
      if (btn.getAttribute("data-ingredient") === value) {
        btn.classList.add("active");
      }
    });
  }

  elements.customIngredientInput.value = "";
}

function removeIngredient(ing) {
  const index = state.ingredients.indexOf(ing);
  if (index !== -1) {
    state.ingredients.splice(index, 1);
    playPopSound();
    renderTags();
    
    // Deactivate popular chips if any
    elements.chipBtns.forEach(btn => {
      if (btn.getAttribute("data-ingredient") === ing) {
        btn.classList.remove("active");
      }
    });
  }
}

function renderTags() {
  if (state.ingredients.length === 0) {
    elements.ingredientsTagsList.innerHTML = '<span class="no-tags-placeholder">Aucun ingrédient sélectionné</span>';
    return;
  }

  elements.ingredientsTagsList.innerHTML = "";
  state.ingredients.forEach(ing => {
    const tag = document.createElement("span");
    tag.className = "ingredient-tag";
    tag.innerHTML = `
      ${ing.charAt(0).toUpperCase() + ing.slice(1)}
      <button type="button" aria-label="Supprimer ${ing}">&times;</button>
    `;
    
    tag.querySelector("button").addEventListener("click", () => {
      removeIngredient(ing);
    });
    
    elements.ingredientsTagsList.appendChild(tag);
  });
}

// --- Gemini API Key Testing ---
async function testGeminiKey(key, showFeedback = true) {
  if (!key) {
    elements.apiKeyStatus.className = "api-status-indicator";
    elements.apiKeyStatus.innerHTML = '<span class="status-dot"></span> <span class="status-text">Mode Hors-ligne (clé non configurée)</span>';
    return;
  }

  if (showFeedback) {
    elements.apiKeyStatus.className = "api-status-indicator";
    elements.apiKeyStatus.innerHTML = '<span class="status-dot flash"></span> <span class="status-text">Vérification de la clé...</span>';
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`;
  const requestBody = {
    contents: [{ parts: [{ text: "Reponds simplement par le mot OK" }] }]
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody)
    });

    if (res.ok) {
      elements.apiKeyStatus.className = "api-status-indicator connected";
      elements.apiKeyStatus.innerHTML = '<span class="status-dot"></span> <span class="status-text">Clé API Connectée & Valide ! Mode IA activé.</span>';
    } else {
      const errData = await res.json().catch(() => ({}));
      const errMsg = errData.error?.message || `Erreur HTTP ${res.status}`;
      
      // Attempt to query allowed models list to display them
      let supportedModels = "";
      try {
        const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
        const listRes = await fetch(listUrl);
        if (listRes.ok) {
          const listData = await listRes.json();
          const names = (listData.models || [])
            .filter(m => m.supportedGenerationMethods.includes("generateContent"))
            .map(m => m.name.replace("models/", ""));
          supportedModels = ` | Modèles disponibles : ${names.join(", ")}`;
        }
      } catch (listErr) {
        console.warn("Failed to list models", listErr);
      }
      
      throw new Error(`${errMsg}${supportedModels}`);
    }
  } catch (err) {
    elements.apiKeyStatus.className = "api-status-indicator error";
    elements.apiKeyStatus.innerHTML = `<span class="status-dot"></span> <span class="status-text">Clé API non fonctionnelle : ${err.message}</span>`;
  }
}

function updateApiBadge() {
  if (state.apiKey) {
    elements.currentModeBadge.className = "mode-indicator live-active";
    elements.currentModeBadge.innerHTML = '<i data-lucide="sparkles"></i> Mode : IA en Live (Gemini)';
  } else {
    elements.currentModeBadge.className = "mode-indicator";
    elements.currentModeBadge.innerHTML = '<i data-lucide="cpu"></i> Mode : Générateur Intégré';
  }
  if (window.lucide) window.lucide.createIcons();
}

// --- Chef AI Recipe Generation Logic ---
async function triggerRecipeGeneration() {
  if (state.ingredients.length === 0) {
    playPopSound(); // play pop as soft fail warning
    alert("Veuillez sélectionner ou saisir au moins un ingrédient pour mijoter votre recette !");
    return;
  }

  // 1. Reset Displays & Scroll to loader
  elements.recipeDisplayArea.classList.add("hidden");
  elements.cookingLoader.classList.remove("hidden");
  elements.cookingLoader.scrollIntoView({ behavior: "smooth" });
  
  // Start Bubble Sound loop
  startBubblingSound();
  playBipCookeo();

  // 2. Perform Cooking Steps Animation
  const funnyStages = [
    { progress: 15, title: "Préchauffage de la cuve virtuelle... 🌡️", desc: "Le chef frotte l'ail et rassemble vos épices." },
    { progress: 35, title: "Découpe des ingrédients en morceaux rigolos... 🥕🔪", desc: "Ne mettez pas vos doigts sous le couteau !" },
    { progress: 55, title: "Ajout d'une bonne louche de fantaisie... 🪄", desc: "Saupoudrage d'épices insolites et secret de grand-mère." },
    { progress: 75, title: "Mijotage intense dans la cuve Cookéo... 💨", desc: "La vapeur monte, ça sent divinement bon !" },
    { progress: 95, title: "Dressage de l'assiette et critique du Chef... 🍽️", desc: "Presque prêt à déguster !" }
  ];

  let currentStageIndex = 0;
  const duration = 4000; // 4 seconds loading animation
  const stepsCount = 100;
  const stepTime = duration / stepsCount;
  let currentProgress = 0;

  const animationInterval = setInterval(() => {
    currentProgress++;
    elements.loaderProgressFill.style.width = `${currentProgress}%`;

    const stage = funnyStages[currentStageIndex];
    if (stage && currentProgress >= stage.progress) {
      elements.loaderStatusTitle.innerText = stage.title;
      elements.loaderStatusSubtitle.innerText = stage.desc;
      currentStageIndex++;
    }

    if (currentProgress >= 100) {
      clearInterval(animationInterval);
    }
  }, stepTime);

  // 3. Request logic (Parallel to animations)
  let generatedRecipe = null;
  let generationError = null;

  try {
    if (state.apiKey) {
      // Live Mode
      generatedRecipe = await generateGeminiRecipe(
        state.ingredients,
        state.accessories,
        state.chefPersona,
        state.apiKey
      );
    } else {
      // Local Fallback Mode
      generatedRecipe = generateOfflineRecipe(
        state.ingredients,
        state.accessories,
        state.chefPersona
      );
    }
  } catch (error) {
    console.warn("Gemini Live Generation failed, falling back to local database.", error);
    generationError = error;
    // Auto fallback to local recipe generator so the user experience doesn't break
    generatedRecipe = generateOfflineRecipe(
      state.ingredients,
      state.accessories,
      state.chefPersona
    );
  }

  // 4. Wrap up loading & show recipe
  setTimeout(() => {
    stopBubblingSound();
    playSuccessChime();
    
    // Hide Loader
    elements.cookingLoader.classList.add("hidden");

    if (generationError && state.apiKey) {
      alert(`⚠️ Mode IA Live : Impossible de contacter Gemini (${generationError.message}).\nL'application a automatiquement généré une délicieuse recette avec son moteur hors-ligne pour ne pas vous faire attendre !`);
    }

    // Render & Display Recipe
    if (generatedRecipe) {
      renderRecipe(generatedRecipe);
      elements.recipeDisplayArea.classList.remove("hidden");
      elements.recipeDisplayArea.scrollIntoView({ behavior: "smooth" });
    }
  }, duration + 200);
}

// --- Render Recipe details on layout ---
function renderRecipe(recipe) {
  state.currentRecipe = recipe;

  // Title & Badges
  elements.recipeTitle.innerText = recipe.name;
  elements.recipeCategoryBadge.innerText = recipe.category === "dessert" ? "🍮 Dessert Cookéo" : "🍲 Plat principal";
  elements.recipeCategoryBadge.className = recipe.category === "dessert" ? "recipe-badge dessert" : "recipe-badge";
  
  // Prep & Cook stats
  elements.recipePrepTime.innerText = `${recipe.prepTime} min`;
  elements.recipeCookTime.innerText = `${recipe.cookTime} min`;
  elements.recipeDifficulty.innerText = recipe.difficulty;

  // Accessories badges
  const accessoryNames = {
    moule_gateau: "Moule à gâteau 🥮",
    extra_crisp: "Extra Crisp 🔥",
    panier_vapeur: "Panier Vapeur 💨"
  };

  const requiredAccs = recipe.accessories || [];
  if (requiredAccs.length > 0) {
    elements.recipeAccessoriesBadges.innerHTML = requiredAccs
      .map(acc => `<span class="chef-style-badge meme" style="margin-right:0.35rem">${accessoryNames[acc] || acc}</span>`)
      .join("");
    elements.recipeAccMetaItem.classList.remove("hidden");
  } else {
    elements.recipeAccessoriesBadges.innerText = "Aucun";
    elements.recipeAccMetaItem.classList.add("hidden");
  }

  // Set portion switcher active button in recipe card panel
  updateMiniGuestSwitcher(state.guests);

  // Render the structured ingredients list
  renderIngredientsList();

  // Cooking Steps Checklist
  elements.recipeStepsList.innerHTML = "";
  recipe.steps.forEach((step, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <label class="recipe-step-item">
        <input type="checkbox" class="step-checkbox" id="step-check-${index}">
        <span class="recipe-step-number">${index + 1}</span>
        <span class="recipe-step-text">${step}</span>
      </label>
    `;
    li.querySelector("input").addEventListener("change", () => {
      playBubbleSound();
    });
    elements.recipeStepsList.appendChild(li);
  });

  // Chef commentary speech bubble details
  const chefAvatars = {
    meme_gateau: "👵",
    chef_etoile: "🧑‍🍳",
    chef_rigolo: "🤪",
    chef_rebelle: "🌶️"
  };

  const chefNames = {
    meme_gateau: "Mémé Gâteau dit :",
    chef_etoile: "Le Chef Étoilé commente :",
    chef_rigolo: "Le Chef Gaffeur s'exclame :",
    chef_rebelle: "Le Chef Rebelle lance :"
  };

  elements.commentaryChefAvatar.innerText = chefAvatars[state.chefPersona] || "🧑‍🍳";
  elements.commentaryChefName.innerText = chefNames[state.chefPersona] || "Le Chef dit :";
  elements.commentaryText.innerText = `"${recipe.commentary}"`;

  // Re-draw Lucide icons on generated items
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// --- Recipe Sharing Utility ---
function shareRecipe() {
  playPopSound();
  if (!state.currentRecipe) return;

  const shareText = `Regardez cette superbe recette Cookéo générée par Cookéo Chef AI : "${state.currentRecipe.name}" ! Préparée avec mes ingrédients grâce à l'IA !`;
  
  if (navigator.share) {
    navigator.share({
      title: state.currentRecipe.name,
      text: shareText,
      url: window.location.href
    }).catch(console.error);
  } else {
    // Web sharing API fallback (copy to clipboard)
    navigator.clipboard.writeText(`${shareText}\n${window.location.href}`)
      .then(() => alert("Lien de partage copié dans le presse-papiers !"))
      .catch(() => alert("Impossible de partager automatiquement. Copiez l'adresse URL du navigateur pour partager."));
  }
}

// --- Dynamic Portion Calculation & Rendering ---
function renderIngredientsList() {
  if (!state.currentRecipe || !state.currentRecipe.ingredients) return;
  
  elements.recipeIngredientsList.innerHTML = "";
  
  state.currentRecipe.ingredients.forEach((ing, index) => {
    const li = document.createElement("li");
    
    // Calculate scaled quantity
    let qtyText = "";
    if (ing.quantity > 0) {
      const totalQty = ing.quantity * state.guests;
      // Round to 1 decimal place if float, else keep as integer
      const roundedQty = Math.round(totalQty * 10) / 10;
      qtyText = `<strong>${roundedQty} ${ing.unit}</strong> de `;
    } else if (ing.unit) {
      qtyText = `<strong>${ing.unit}</strong> de `;
    }
    
    const formattedName = ing.name.charAt(0).toUpperCase() + ing.name.slice(1);
    
    li.innerHTML = `
      <label class="ingredient-check-item">
        <input type="checkbox" class="item-check-input" id="ing-check-${index}">
        <div class="item-check-indicator"><i data-lucide="check" style="width:12px;height:12px"></i></div>
        <span class="item-check-label">${qtyText}${formattedName}</span>
      </label>
    `;
    
    li.querySelector("input").addEventListener("change", () => {
      playPopSound();
    });
    
    elements.recipeIngredientsList.appendChild(li);
  });
  
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function updateMiniGuestSwitcher(guests) {
  document.querySelectorAll(".guest-pill-mini").forEach(p => {
    if (parseInt(p.getAttribute("data-guests"), 10) === guests) {
      p.classList.add("active");
    } else {
      p.classList.remove("active");
    }
  });
}

