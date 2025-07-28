import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
    plugins: [
        handlebars({
            partialDirectory: './src/components', // Directory for reusable components/partials
            context: {
                navigation: require('./src/data/navigation-data.json'),
                blogs: require('./src/data/blog-data.json'),
                carousel: require('./src/data/carousel-data.json'),
            },
            helpers: {
                'newline-to-br': function (text) {
                    // Replace `\n` with `<br>` for rendering
                    return text.replace(/\n/g, '<br>');
                },
            },
        }),
    ],
    build: {
        outDir: 'web', // Change the output directory to 'web'
        rollupOptions: {
            input: {
                main: 'index.html',
            },
        },
    },
});
