module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // 1. Separate plugin for handling the dynamic import syntax
      "babel-plugin-transform-dynamic-import",
      
      // 2. Separate array block dedicated strictly to module-resolver
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            "@": "./src",
            "@components": "./src/components",
            "@constants": "./src/constants",
            "@assets": "./assets",
          },
        },
      ],
    ],
  };
};
