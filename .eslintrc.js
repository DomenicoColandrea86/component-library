module.exports =  {
    parser:  '@typescript-eslint/parser',
    plugins: ["@typescript-eslint", "react","prettier"],
    extends: [
        "prettier",
        "prettier/react",
        "prettier/@typescript-eslint",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    parserOptions:  {
      ecmaVersion:  2018,
      sourceType:  'module',
      ecmaFeatures:  {
        jsx:  true,
      },
    },
    env: {
        es6: true,
        browser: true,
        jest: true
    },
    settings:  {
      react:  {
        version:  'detect',
      },
    },
    rules: {
      "prettier/prettier": "error",
      "react/jsx-filename-extension": [
        1, { "extensions": [".js", ".ts", "tsx"] }
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-member-accessibility": "off",
      "@typescript-eslint/indent": "off",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/interface-name-prefix": [
        "error", "always"
      ],
      "react/prop-types": "off"
    }
  };
