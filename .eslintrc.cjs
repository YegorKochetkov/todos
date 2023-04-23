module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
	],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["react", "@typescript-eslint"],
	parser: "@typescript-eslint/parser",
	root: true,
	rules: {
		indent: "off",
		"linebreak-style": ["error", "unix"],
		quotes: "off",
		"@typescript-eslint/quotes": "off",
		semi: ["error", "always"],
		"capitalized-comments": "off",
		"arrow-parens": "off",
		"object-curly-spacing": "off",
		"@typescript-eslint/object-curly-spacing": "off",
		"comma-dangle": "off",
	},
};
