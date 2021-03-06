import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';
import alias from '@rollup/plugin-alias';
import { terser } from "rollup-plugin-terser";
const plugins = [
	alias({
		entries: [
			{ find: '../server/dom', replacement: '../client/dom' }
		
		]
	}),
	resolve(), // so Rollup can find node modules
	commonjs(), // so Rollup can convert node modules to an ES module
]
export default [
	{  // client side consumable es module containing all modules
		input: 'sizlate.js',
		output: {
			name: 'sizlate',
			file: pkg.module,
            format: 'es' 
		},
		plugins 
	},
	{  // client side consumable es module containing all modules
		input: 'sizlate.js',
		output: {
			name: 'sizlate',
			file: 'sizlate-module-min.mjs',
            format: 'es' 
		},
		plugins: [...plugins, terser()] 
	}
];