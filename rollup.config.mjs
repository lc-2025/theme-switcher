import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

const output = {
  file: 'dist/src/theme-switcher.js',
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
      commonjs(),
      resolve(),
      babel({ babelHelpers: 'bundled' }),
      external({ includeDependencies: true }),
      postcss(),
      terser(),
      typescript({
        tsconfig: './tsconfig.json',
      }),
    ],
  },
];
