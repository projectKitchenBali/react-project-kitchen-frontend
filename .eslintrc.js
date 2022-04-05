module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:prettier/recommended",
	],
	parserOptions: {
		requireConfigFile: false,
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["react"],
	rules: {
		"react/react-in-jsx-scope": "off",
		"react/prop-types": "off",
		//Правило для того что убрать ошибку на устаревшие компоненты в новой версии реакта
		"react/no-deprecated": "off",
		//Правило для того чтобы убрать лексическое объявление в switch
		"no-case-declarations": "off",
	},
};
