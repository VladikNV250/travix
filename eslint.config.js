// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

// @ts-check
import eslint from '@eslint/js';
import prettier from 'eslint-config-prettier/flat';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import preferArrow from 'eslint-plugin-prefer-arrow';
import prettierPlugin from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [{
    ignores: [
        'tmp',
        '**/pnpm-lock.yaml',
        '.pnpm-store',
        '**/.react-router',
        '**/build',
        '**/dist',
        '**/coverage',
        '**/.gitlab',
        '**/.vscode',
        '**/node_modules',
        '!.storybook',
        'server.js',
        'api',
    ],
}, eslint.configs.recommended, ...tseslint.configs.recommended, reactHooks.configs['recommended-latest'], react.configs.flat.recommended, react.configs.flat['jsx-runtime'], reactRefresh.configs.vite, prettier, jsxA11y.flatConfigs.recommended, // {
// 	files: [
// 		'libs/**/*.spec.ts',
// 		'libs/**/*.spec.tsx',
// 		'src/**/*.spec.ts',
// 		'src/**/*.spec.tsx'
// 	],
// 	rules: {
// 		'i18next/no-literal-string': 'off'
// 	}
// }
{
    plugins: {
        'prefer-arrow': preferArrow,
        prettier: prettierPlugin,
    },
    languageOptions: {
        globals: {
            ...globals.browser,
        },
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        'no-unused-vars': 'off',
        'no-restricted-syntax': [
            'error',
            {
                selector:
                    'ImportDeclaration[source.value=/\\u002Esvg/] ImportDefaultSpecifier[local.name!=/Icon/]',
                message:
                    'Not allowed to import SVG icons as components without the "Icon" suffix at the end.',
            },
            {
                selector: "CallExpression[callee.name='structuredClone']",
                message:
                    'Avoid using structuredClone, as it does not preserve prototype chain.',
            },
            // We need this rule because standard `toISOString` use `timezone` for find date
            // It means if we have date `2025-03-25 00:00:00 GTM+02` after `toISOString`
            // it be `2025-03-24`
            // But in most cases we want to `25` instead of `24`
            {
                selector: "CallExpression[callee.property.name='toISOString']",
                message: 'Use `formatISO` from `date-fns` instead.',
            },
        ],
        'prefer-arrow-callback': [
            'error',
            {
                allowNamedFunctions: true,
            },
        ],
        'func-style': [
            'error',
            'expression',
            {
                allowArrowFunctions: true,
            },
        ],
        'array-callback-return': 'error',
        'no-await-in-loop': 'error',
        'no-constant-binary-expression': 'error',
        'no-duplicate-imports': 'error',
        'no-template-curly-in-string': 'error',
        'no-unmodified-loop-condition': 'error',
        'no-unreachable-loop': 'error',
        'no-use-before-define': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'prettier/prettier': 'warn',
        camelcase: 'error',
        'id-length': [
            'error',
            {
                exceptions: [
                    '_',
                    'w',
                    'h',
                    'e',
                    'i',
                    'j',
                    'k',
                    'p',
                    'm',
                    't',
                    'x',
                    'y',
                ],
            },
        ],
        eqeqeq: ['error', 'smart'],
        'dot-notation': 'error',
        'no-lonely-if': 'error',
        'no-return-assign': 'error',
        'no-multi-str': 'error',
        'no-implicit-coercion': 'error',
        'no-console': [
            'error',
            {
                allow: ['warn', 'error'],
            },
        ],
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_',
            },
        ],
        '@typescript-eslint/no-empty-function': 'error',
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'typeLike',
                format: ['PascalCase'],
            },
        ],
        'react/no-array-index-key': 'error',
        'prefer-arrow/prefer-arrow-functions': [
            'error',
            {
                disallowPrototype: true,
                singleReturnOnly: false,
                classPropertiesAllowed: false,
            },
        ],
        // 'i18next/no-literal-string': [
        // 	'error',
        // 	{
        // 		message: 'Disallow literal string. Use i18next instead!'
        // 	}
        // ]
    },
}, ...storybook.configs["flat/recommended"]];
