const fs = require("fs");
const StyleDictionary = require("style-dictionary");

// Format personnalisé pour CSS sans préfixes
StyleDictionary.registerFormat({
  name: "css/variables-custom",
  formatter: function ({ dictionary, options }) {
    return (
      "/**\n * Do not edit directly\n * Generated on " +
      new Date().toUTCString() +
      "\n */\n\n:root {\n" +
      dictionary.allTokens
        .map((token) => {
          let name = token.name;
          // Retirer les préfixes color- et theme-
          name = name.replace(/^color-/, "");
          name = name.replace(/^theme-/, "");
          // Retirer les groupes comme feedback- et brand- (au début ou au milieu)
          name = name.replace(/^feedback-/, "");
          name = name.replace(/^brand-/, "");
          name = name.replace(/-feedback-/g, "-");
          name = name.replace(/-brand-/g, "-");
          return `  --${name}: ${token.value};`;
        })
        .join("\n") +
      "\n}\n"
    );
  },
});

// Format personnalisé pour JSON sans préfixes
StyleDictionary.registerFormat({
  name: "json/flat-custom",
  formatter: function ({ dictionary }) {
    const output = {};
    dictionary.allTokens.forEach((token) => {
      let name = token.name;
      // Retirer les préfixes color- et theme-
      name = name.replace(/^color-/, "");
      name = name.replace(/^theme-/, "");
      // Retirer les groupes comme feedback- et brand- (au début ou au milieu)
      name = name.replace(/^feedback-/, "");
      name = name.replace(/^brand-/, "");
      name = name.replace(/-feedback-/g, "-");
      name = name.replace(/-brand-/g, "-");
      output[name] = token.value;
    });
    return JSON.stringify(output, null, 2);
  },
});

const brands = fs
  .readdirSync("./tokens")
  .filter((f) => f.endsWith(".json") && f !== "all.json")
  .map((f) => f.replace(".json", ""));

module.exports = {
  source: brands.map((b) => `tokens/${b}.json`),
  platforms: brands.reduce((acc, brand) => {
    acc[brand] = {
      transformGroup: "css",
      buildPath: `build/${brand}/`,
      files: [
        { destination: `${brand}.css`, format: "css/variables-custom" },
        { destination: `${brand}.json`, format: "json/flat-custom" },
      ],
    };
    return acc;
  }, {}),
};
