import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
    plugins: [
        tailwindcss(),
        handlebars({
            partialDirectory: './src/components', // Directory for reusable components/partials
            context: {
                navigation: require('./src/data/navigation-data.json'),
                blogs: require('./src/data/blog-data.json'),
                carousel: require('./src/data/carousel-data.json'),
                prices: require('./src/data/price-data.json'),
            },
            helpers: {
                newlineToBr: function (text) {
                    // Replace `\n` with `<br>`
                    return text.replace(/\n/g, '<br>');
                },
            },
        }),
    ],
    build: {
        outDir: 'web',
        rollupOptions: {
            input: {
                main: 'index.html',
            },
        },
    },
});
