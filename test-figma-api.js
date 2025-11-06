import fetch from "node-fetch";

const FIGMA_FILE_ID = process.env.FIGMA_FILE_ID || "V8S5nAxsLa1JVy82RxL9uz";
const FIGMA_TOKEN = process.env.FIGMA_TOKEN;

if (!FIGMA_TOKEN) {
  console.error("❌ FIGMA_TOKEN doit être défini");
  process.exit(1);
}

async function testEndpoints() {
  console.log(`🔍 Test des endpoints API Figma pour le fichier: ${FIGMA_FILE_ID}\n`);

  const endpoints = [
    { name: "Fichier complet", url: `https://api.figma.com/v1/files/${FIGMA_FILE_ID}` },
    { name: "Variables", url: `https://api.figma.com/v1/files/${FIGMA_FILE_ID}/variables` },
    { name: "Variables locales", url: `https://api.figma.com/v1/files/${FIGMA_FILE_ID}/variables/local` },
  ];

  for (const endpoint of endpoints) {
    console.log(`📡 Test: ${endpoint.name}`);
    console.log(`   URL: ${endpoint.url}`);

    try {
      const res = await fetch(endpoint.url, {
        headers: { "X-FIGMA-TOKEN": FIGMA_TOKEN },
      });

      console.log(`   Status: ${res.status} ${res.statusText}`);

      if (res.ok) {
        const data = await res.json();
        console.log(`   ✅ Succès! Structure:`, Object.keys(data));

        if (data.meta) {
          console.log(`   📊 Meta:`, Object.keys(data.meta));
          if (data.meta.collections) {
            console.log(`   📦 Collections: ${data.meta.collections.length}`);
          }
          if (data.meta.variables) {
            console.log(`   🔧 Variables: ${data.meta.variables.length}`);
          }
        }
      } else {
        const errorText = await res.text();
        console.log(`   ❌ Erreur: ${errorText.substring(0, 200)}`);
      }
    } catch (error) {
      console.log(`   ❌ Exception: ${error.message}`);
    }

    console.log("");
  }
}

testEndpoints().catch(console.error);
