import fs from "fs";
import fetch from "node-fetch";

const FIGMA_FILE_ID = process.env.FIGMA_FILE_ID;
const FIGMA_TOKEN = process.env.FIGMA_TOKEN;

if (!FIGMA_FILE_ID || !FIGMA_TOKEN) {
  console.error("❌ FIGMA_FILE_ID et FIGMA_TOKEN doivent être définis");
  process.exit(1);
}

async function fetchVariables() {
  console.log(
    `🔍 Extraction des variables depuis Figma (file: ${FIGMA_FILE_ID})...`
  );

  // Essayer d'abord l'endpoint /variables/local (variables locales)
  console.log("🔄 Tentative avec l'endpoint /variables/local...");
  let res = await fetch(
    `https://api.figma.com/v1/files/${FIGMA_FILE_ID}/variables/local`,
    {
      headers: { "X-FIGMA-TOKEN": FIGMA_TOKEN },
    }
  );

  // Si 404, essayer l'endpoint /variables/published (variables publiées)
  if (res.status === 404) {
    console.log("⚠️  Endpoint /variables/local non trouvé, tentative avec /variables/published...");
    res = await fetch(
      `https://api.figma.com/v1/files/${FIGMA_FILE_ID}/variables/published`,
      {
        headers: { "X-FIGMA-TOKEN": FIGMA_TOKEN },
      }
    );
  }

  // Si toujours 404, essayer l'ancien endpoint /variables
  if (res.status === 404) {
    console.log("⚠️  Endpoint /variables/published non trouvé, tentative avec /variables...");
    res = await fetch(
      `https://api.figma.com/v1/files/${FIGMA_FILE_ID}/variables`,
      {
        headers: { "X-FIGMA-TOKEN": FIGMA_TOKEN },
      }
    );
  }

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Erreur API Figma ${res.status}: ${errorText}`);
  }

  const data = await res.json();

  // Debug: afficher la structure reçue
  console.log("📊 Structure reçue:", Object.keys(data));
  console.log(
    `📊 Collections trouvées: ${data.meta?.collections?.length || 0}`
  );
  console.log(`📊 Variables trouvées: ${data.meta?.variables?.length || 0}`);

  if (!data.meta?.collections || !data.meta?.variables) {
    console.warn(
      "⚠️  Aucune collection ou variable trouvée dans la réponse Figma"
    );
    console.log("Structure complète:", JSON.stringify(data, null, 2));
    return;
  }

  processVariables(data);
}

function extractVariablesFromFile(fileData) {
  console.log("📊 Extraction des variables depuis le fichier complet...");
  // Si le fichier contient des variables dans une structure différente
  // Cette fonction peut être adaptée selon la structure réelle
  console.warn("⚠️  Extraction depuis fichier complet non implémentée");
  console.log("Structure disponible:", Object.keys(fileData));
}

function processVariables(data) {
  // Transformer les données Figma en format Style Dictionary
  const collections = {};

  data.meta.collections.forEach((coll) => {
    collections[coll.name] = {};
  });

  data.meta.variables.forEach((v) => {
    const collection = data.meta.collections.find(
      (c) => c.id === v.variableCollectionId
    );
    if (!collection) {
      console.warn(`⚠️  Collection introuvable pour la variable ${v.name}`);
      return;
    }

    // Extraire la valeur du premier mode (ou le mode par défaut)
    let value = null;
    if (v.valuesByMode && Object.keys(v.valuesByMode).length > 0) {
      const firstMode = Object.keys(v.valuesByMode)[0];
      const modeValue = v.valuesByMode[firstMode];

      // Gérer les différents types de valeurs Figma
      if (typeof modeValue === "object" && modeValue !== null) {
        // Pour les couleurs, Figma retourne { r, g, b, a }
        if (modeValue.r !== undefined) {
          const r = Math.round(modeValue.r * 255);
          const g = Math.round(modeValue.g * 255);
          const b = Math.round(modeValue.b * 255);
          const a = modeValue.a !== undefined ? modeValue.a : 1;
          value =
            a < 1 ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;
        } else if (modeValue.type === "VARIABLE_ALIAS") {
          // Référence à une autre variable
          value = `{${modeValue.id}}`;
        } else {
          // Autres types d'objets
          value = JSON.stringify(modeValue);
        }
      } else {
        value = modeValue;
      }
    }

    // Créer une structure hiérarchique pour Style Dictionary
    // Ex: "color-primary" -> { color: { primary: { value: ... } } }
    const parts = v.name.split("-");
    let current = collections[collection.name];

    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) {
        current[parts[i]] = {};
      }
      current = current[parts[i]];
    }

    const lastPart = parts[parts.length - 1];
    current[lastPart] = {
      value: value !== null ? value : "undefined",
    };
  });

  // Écrire les fichiers
  fs.mkdirSync("./tokens", { recursive: true });

  for (const [name, tokens] of Object.entries(collections)) {
    const path = `./tokens/${name.toLowerCase()}.json`;
    const tokenCount = countTokens(tokens);
    fs.writeFileSync(path, JSON.stringify(tokens, null, 2));
    console.log(`✅ Exporté ${tokenCount} tokens → ${path}`);
  }
}

function countTokens(obj, count = 0) {
  for (const key in obj) {
    if (obj[key].value !== undefined) {
      count++;
    } else if (typeof obj[key] === "object") {
      count = countTokens(obj[key], count);
    }
  }
  return count;
}

fetchVariables().catch((error) => {
  console.error("❌ Erreur:", error.message);
  process.exit(1);
});
