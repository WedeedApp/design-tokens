import fs from "fs";
import path from "path";

// Lire le fichier unique avec tous les tokens
const allTokensPath = "./tokens/all.json";

if (!fs.existsSync(allTokensPath)) {
  console.log("ℹ️  Fichier tokens/all.json non trouvé, utilisation des fichiers individuels");
  process.exit(0);
}

console.log("📦 Séparation des tokens par brand depuis tokens/all.json...");

const allTokens = JSON.parse(fs.readFileSync(allTokensPath, "utf8"));

// Créer le dossier tokens s'il n'existe pas
if (!fs.existsSync("./tokens")) {
  fs.mkdirSync("./tokens", { recursive: true });
}

// Séparer les tokens par brand
const brands = Object.keys(allTokens);

brands.forEach((brand) => {
  const brandTokens = allTokens[brand];
  const outputPath = `./tokens/${brand.toLowerCase()}.json`;
  
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

