/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

import classname from 'classnames';

const Save = ( { attributes } ) => {
	const { title, textAlignment, shadow, shadowOpacity } = attributes;

	const classes = classname( `text-block-align-${ textAlignment }`, {
		'has-shadow': shadow,
		[ `shadow-opacity-${ shadowOpacity }` ]: shadow && shadowOpacity,
	} );
	return (
		<div>
			<RichText.Content
				{ ...useBlockProps.save( {
					className: classes,
				} ) }
				tagName="p"
				value={ title }
			/>
		</div>
	);
};
export default Save;
