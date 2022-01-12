module.exports = {
    important: true,
    mode: 'jit',
    content: ['./src/**/*.{html,ts,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [require('daisyui')],
}
