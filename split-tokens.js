import fs from "fs";
import path from "path";

// Lire le fichier unique avec tous les tokens
const allTokensPath = "./tokens/all.json";

if (!fs.existsSync(allTokensPath)) {
  console.log(
    "ℹ️  Fichier tokens/all.json non trouvé, utilisation des fichiers individuels"
  );
  process.exit(0);
}

console.log("📦 Séparation des tokens par brand depuis tokens/all.json...");

const allTokens = JSON.parse(fs.readFileSync(allTokensPath, "utf8"));

// Créer le dossier tokens s'il n'existe pas
if (!fs.existsSync("./tokens")) {
  fs.mkdirSync("./tokens", { recursive: true });
}

// Mapping des noms de brands (avec tirets vers sans tirets)
const brandMapping = {
  "cert-ivote": "certivote",
  "soluce-pay": "solucepay",
  certivote: "certivote",
  solucepay: "solucepay",
};

// Transformer la structure pour Style Dictionary
const transformedBrands = {};

// Traiter les couleurs par brand
if (allTokens.colors) {
  Object.keys(allTokens.colors).forEach((brandKey) => {
    const normalizedBrand =
      brandMapping[brandKey] || brandKey.toLowerCase().replace(/-/g, "");

    if (!transformedBrands[normalizedBrand]) {
      transformedBrands[normalizedBrand] = {};
    }

    // Transformer les couleurs en format Style Dictionary
    const brandColors = allTokens.colors[brandKey];
    transformedBrands[normalizedBrand].color = {};

    Object.keys(brandColors).forEach((colorKey) => {
      // Ajouter un tiret avant les chiffres (ex: neutral50 -> neutral-50)
      const normalizedColorKey = colorKey.replace(/([a-z])(\d)/gi, "$1-$2");
      transformedBrands[normalizedBrand].color[normalizedColorKey] = {
        value: brandColors[colorKey],
      };
    });
  });
}

// Traiter le theme (ajouter à tous les brands)
if (allTokens.theme) {
  const themeValue = allTokens.theme.value || allTokens.theme;

  // Ajouter le theme à tous les brands existants
  Object.keys(transformedBrands).forEach((brand) => {
    transformedBrands[brand].theme = {};
    Object.keys(themeValue).forEach((themeKey) => {
      // Ajouter un tiret avant les chiffres si nécessaire
      const normalizedThemeKey = themeKey.replace(/([a-z])(\d)/gi, "$1-$2");
      transformedBrands[brand].theme[normalizedThemeKey] = {
        value: themeValue[themeKey],
      };
    });
  });
}

// Si la structure est déjà au format attendu (avec brands en clés racine)
if (
  !allTokens.colors &&
  Object.keys(allTokens).some((key) => brandMapping[key] || key.includes("-"))
) {
  Object.keys(allTokens).forEach((brandKey) => {
    const normalizedBrand =
      brandMapping[brandKey] || brandKey.toLowerCase().replace(/-/g, "");
    transformedBrands[normalizedBrand] = allTokens[brandKey];
  });
}

// Écrire les fichiers séparés
Object.keys(transformedBrands).forEach((brand) => {
  const brandTokens = transformedBrands[brand];
  const outputPath = `./tokens/${brand}.json`;

  fs.writeFileSync(outputPath, JSON.stringify(brandTokens, null, 2));
  const tokenCount = countTokens(brandTokens);
  console.log(`✅ ${brand}: ${tokenCount} tokens → ${outputPath}`);
});

function countTokens(obj, count = 0) {
  for (const key in obj) {
    if (obj[key].value !== undefined) {
      count++;
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      count = countTokens(obj[key], count);
    }
  }
  return count;
}

console.log("✅ Séparation terminée !");
