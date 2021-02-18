module.exports = {
	env: {
		browser: true,
	},
	extends: [
		'53js/react',
		'plugin:jest/recommended',
	],
	rules: {
		'linebreak-style': ["error", "windows"],
		'react/jsx-one-expression-per-line': 0, // Buggy
		'import/prefer-default-export': 0,
		'react/react-in-jsx-scope': 'warn',
		//'import/no-extraneous-dependencies': noExtraneousDependenciesRule,
		//'no-underscore-dangle': noUnderscoreDangleRule,
		'no-multiple-empty-lines': 'warn',
		'react/jsx-indent': 'warn',
		'max-len': 'warn',
		'arrow-parens': 'warn',
		indent: 'warn',
		'object-curly-newline': 'warn',
		semi: 'warn',
	},
	settings: {
		'import/resolver': 'webpack',
	},
};
