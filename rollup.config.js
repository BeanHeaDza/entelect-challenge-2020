import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { sync as globSync } from 'glob';
import { rmdirSync } from 'fs';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const base = {
    external: ['lodash', 'fs', 'canvas'],
    plugins: [
        // Allows node_modules resolution
        resolve({ extensions }),

        // Allow bundling cjs modules. Rollup doesn't understand cjs
        commonjs(),

        // Compile TypeScript/JavaScript files
        babel({ extensions, include: ['src/**/*'] }),
    ],
};
const files = globSync('./src/**/*.main.ts');

rmdirSync('./dist', { recursive: true });

export default files.map(path => {
    const file = path.replace(/^\.\/src\//g, './dist/').replace(/\.ts$/g, '.js');
    const output = [{ file, format: 'cjs', sourcemap: true }];
    return { ...base, input: path, output };
});
