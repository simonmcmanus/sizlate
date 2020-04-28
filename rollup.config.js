import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';


import alias from '@rollup/plugin-alias';


export default [
	{
		input: 'sizlate.js',
		output: {
			name: 'sizlate',
			file: pkg.module,
            format: 'es' 
		},
		plugins: [
            alias({
                entries: [

                  {  find: '../server/dom', replacement: '../client/dom' }
                
                ]
            }),
			resolve(), // so Rollup can find node modules
            commonjs(), // so Rollup can convert node modules to an ES module
    
		]
	}
];