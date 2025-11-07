import fs from "fs";
import path from "path";

const brands = fs
  .readdirSync("./tokens")
  .filter((f) => f.endsWith(".json") && f !== "all.json")
  .map((f) => f.replace(".json", ""));

brands.forEach((brand) => {
  const jsonPath = `./build/${brand}/${brand}.json`;

  if (!fs.existsSync(jsonPath)) {
    console.log(`⚠️  Fichier ${jsonPath} non trouvé, exécutez d'abord npm run build`);
    return;
  }

  const tokens = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  const outputPath = `./build/${brand}/${brand}-tailwind-theme.css`;

  let themeConfig = `/**\n * Configuration Tailwind 4 @theme\n * Généré automatiquement depuis ${brand}.json\n * Ne pas éditer manuellement\n */\n\n@theme {\n  /* Désactiver toutes les couleurs par défaut de Tailwind */\n  --color-*: initial;\n\n`;

  // Trier les tokens pour un meilleur affichage
  const sortedKeys = Object.keys(tokens).sort();

  sortedKeys.forEach((key) => {
    // Convertir la clé JSON (ex: "neutral-50") en variable Tailwind (--color-neutral-50)
    const tailwindVar = `--color-${key}`;
    const cssVar = `--${key}`;
    themeConfig += `  ${tailwindVar}: var(${cssVar});\n`;
  });

  themeConfig += "}\n";

  // Créer le dossier build s'il n'existe pas
  const buildDir = path.dirname(outputPath);
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, themeConfig);
  console.log(`✅ ${brand}: Configuration @theme générée → ${outputPath}`);
});

console.log("✅ Génération terminée !");
