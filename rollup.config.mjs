import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import path from 'path';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const output = {
  file: 'dist/src/index.js',
  sourcemap: true,
};

export default [
  {
    external: ['@headlessui/react', 'react', 'tailwindcss'],
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
      terser(),
    ],
  },
];
