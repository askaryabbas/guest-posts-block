/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType, createBlock } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import metadata from './block.json';
import v1 from './v1';
import v2 from './v2';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
	/**
	 * @see ./edit.js
	 */
	edit, // this can be edit: edit (imported function), both are same that's why we can use like this
	/**
	 * @see ./save.js
	 */
	save, // this can be save: save (imported function), both are same that's why we can use like this
	depricated: [ v2, v1 ],
	variations: [
		{
			name: `${ metadata.name }-gradient`,
			title: __( 'Gradient Text Block', 'guest-posts-block' ),
			icon: 'wprdpress',
			attributes: {
				gradient: 'red-to-blue',
			},
		},
	],
	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				transform: ( { content, align } ) => {
					return createBlock( metadata.name, {
						title: content,
						textAlignment: align,
					} );
				},
			},
			{
				type: 'enter',
				regExp: /textbox/i,
				transform: () => {
					return createBlock( metadata.name, {
						shadow: true,
						gradient: 'red-to-blue',
					} );
				},
			},
			{
				type: 'prefix',
				prefix: 'textblock',
				transform: () => {
					return createBlock( metadata.name );
				},
			},
		],
		to: [
			{
				type: 'block',
				blocks: 'core/paragraph',
				isMatch: ( { title } ) => {
					return title ? true : false;
				},
				transform: ( { title, textAlignment } ) => {
					return createBlock( 'core/paragraph', {
						content: title,
						align: textAlignment,
					} );
				},
			},
		],
	},
} );
