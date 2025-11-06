import fs from "fs";
import fetch from "node-fetch";

const FIGMA_FILE_ID = process.env.FIGMA_FILE_ID;
const FIGMA_TOKEN = process.env.FIGMA_TOKEN;

async function fetchVariables() {
  const res = await fetch(
    `https://api.figma.com/v1/files/${FIGMA_FILE_ID}/variables`,
    {
      headers: { "X-FIGMA-TOKEN": FIGMA_TOKEN },
    }
  );

  if (!res.ok) throw new Error("Erreur API Figma " + res.status);
  const data = await res.json();

  const collections = data.meta.collections.reduce((acc, coll) => {
    acc[coll.name] = [];
    return acc;
  }, {});

  data.meta.variables.forEach((v) => {
    const collection = data.meta.collections.find(
      (c) => c.id === v.variableCollectionId
    );
    if (!collection) return;
    collections[collection.name].push({
      name: v.name,
      type: v.resolvedType,
      value: v.valuesByMode,
    });
  });

  for (const [name, vars] of Object.entries(collections)) {
    const path = `./tokens/${name.toLowerCase()}.json`;
    fs.mkdirSync("./tokens", { recursive: true });
    fs.writeFileSync(path, JSON.stringify(vars, null, 2));
    console.log(`✅ Exporté ${vars.length} tokens → ${path}`);
  }
}

fetchVariables().catch(console.error);
