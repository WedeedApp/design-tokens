const fs = require("fs");

const brands = fs.readdirSync("./tokens").map(f => f.replace(".json", ""));

module.exports = {
  source: brands.map(b => `tokens/${b}.json`),
  platforms: brands.reduce((acc, brand) => {
    acc[brand] = {
      transformGroup: "css",
      buildPath: `build/${brand}/`,
      files: [
        { destination: `${brand}.css`, format: "css/variables" },
        { destination: `${brand}.json`, format: "json/flat" }
      ]
    };
    return acc;
  }, {})
};

