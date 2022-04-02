module.exports = {
    presets: [
        ["@babel/preset-env", {targets: {node: "current"}}],
        "@babel/preset-typescript"
    ],
    plugins: [
        [
         "module-resolver",
        {
          alias: {
            "@modules": ["./src/modules"],
            "@configs": ["./src/configs"],
            "@shared": ["./src/shared"],
            "@error]": ["./src/error"],
            "@utils": ["./src/utils"]
          }
        }
      ],
      "babel-plugin-transform-typescript-metadata",
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      ["@babel/plugin-proposal-class-properties", { loose: true }],
    ]
}