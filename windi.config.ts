import { defineConfig, transform } from 'windicss/helpers'

export default defineConfig({
    important: true,
    plugins: [transform('daisyui')],
})
