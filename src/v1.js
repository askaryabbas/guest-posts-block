import { useBlockProps, RichText } from '@wordpress/block-editor';
import { omit } from 'lodash';
import classname from 'classnames';
import blockData from './block.json';

const v1 = {
	supports: {
		html: false,
		color: {
			background: true,
			text: true,
			gradient: true,
		},
		spacing: {
			padding: true,
		},
	},
	attributes: {
		...omit( blockData.attributes, [ 'textAlignment' ] ),
		alignment: {
			type: 'string',
			default: 'left',
		},
		title: {
			type: 'string',
			source: 'html',
			selector: 'h2',
		},
	},
	migrate: ( attributes ) => {
		return {
			...omit( attributes, [ 'alignment' ] ),
			textAlignment: attributes.alignment,
		};
	},
	save: ( { attributes } ) => {
		const { title, alignment, shadow, shadowOpacity } = attributes;

		const classes = classname( `text-block-align-${ alignment }`, {
			'has-shadow': shadow,
			[ `shadow-opacity-${ shadowOpacity }` ]: shadow && shadowOpacity,
		} );
		return (
			<div>
				<RichText.Content
					{ ...useBlockProps.save( {
						className: classes,
					} ) }
					tagName="h2"
					value={ title }
				/>
			</div>
		);
	},
};
export default v1;
