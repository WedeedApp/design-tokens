import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hooksDir = path.join(__dirname, ".git", "hooks");
const postMergeHook = path.join(hooksDir, "post-merge");
const sourceHook = path.join(__dirname, "git-hooks", "post-merge");

// Vérifier que .git existe
const gitDir = path.join(__dirname, ".git");
if (!fs.existsSync(gitDir)) {
  console.log("⚠️  Dossier .git non trouvé. Assurez-vous d'être dans un repo git.");
  process.exit(0);
}

// Créer le dossier .git/hooks s'il n'existe pas
if (!fs.existsSync(hooksDir)) {
  fs.mkdirSync(hooksDir, { recursive: true });
}

// Copier le hook
try {
  fs.copyFileSync(sourceHook, postMergeHook);
  fs.chmodSync(postMergeHook, "755");
  console.log("✅ Hook post-merge installé avec succès !");
  console.log("   Le build se fera automatiquement après chaque `git pull`.");
} catch (error) {
  console.error("❌ Erreur lors de l'installation du hook:", error.message);
  process.exit(1);
}
