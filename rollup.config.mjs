import alias from '@rollup/plugin-alias';
import autoprefixer from 'autoprefixer';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import path from 'path';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const output = {
  file: 'dist/src/index.js',
  sourcemap: true,
};

export default [
  {
    external: ['react', '@headlessui/react'],
    input: 'src/index.ts',
    output: [
      {
        ...output,
        format: 'cjs',
      },
      {
        ...output,
        format: 'es',
      },
    ],
    plugins: [
      alias({
        entries: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
      }),
      resolve({
        extensions: ['.ts', '.tsx', '.css'],
      }),
      commonjs(),
      typescript({
        outputToFilesystem: true,
        tsconfig: './tsconfig.json',
      }),
      babel({
        babelHelpers: 'bundled',
      }),
      external({
        includeDependencies: true,
      }),
      postcss({
        extensions: ['.css'],
        minimize: true,
        plugins: [autoprefixer()],
        sourceMap: true,
      }),
      terser(),
    ],
  },
];
