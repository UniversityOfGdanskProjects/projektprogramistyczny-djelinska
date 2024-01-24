/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			white: '#d4d4d4',
			gray: {
				light: '#737373',
				dark: '#404040',
			},
			red: {
				light: '#ce1212',
				dark: '#810000',
			},
			green: '#a1ba89',
			black: {
				light: '#171717',
				dark: '#0a0a0a',
			},
		},
		extend: {
			padding: {
				navbar: '73px',
			},
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/aspect-ratio'),
	],
};
