import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

const output = {
  file: 'dist/src/index.js',
  sourcemap: true,
};

export default [
  {
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
      resolve(),
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
        minimize: true,
        sourceMap: true,
      }),
      terser(),
    ],
  },
];
