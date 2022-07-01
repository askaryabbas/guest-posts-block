/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
 import {
		useBlockProps,
		RichText,
		getColorClassName,
 } from '@wordpress/block-editor';

 import classname from 'classnames';
 /**
  * The save function defines the way in which the different attributes should
  * be combined into the final markup, which is then serialized by the block
  * editor into `post_content`.
  *
  * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
  *
  * @return {WPElement} Element to render.
  */
 const Save = ( { attributes } ) => {
		const {
			title,
			alignment,
			backgroundColor,
			textColor,
			customBackgroundColor,
			customTextColor,
		} = attributes;
		const backgroundClass = getColorClassName(
			'background-color',
			backgroundColor
		);
		const textClass = getColorClassName( 'color', textColor );
		const classes = classname( `text-block-align-${ alignment }`, {
			[ backgroundClass ]: backgroundClass,
			[ textClass ]: textClass,
		} );
		console.log( { backgroundClass, textColor, classes } );
		return (
			<div>
				<RichText.Content
					{ ...useBlockProps.save( {
						className: classes,
						style: {
							backgroundColor: backgroundColor
								? undefined
								: customBackgroundColor,
							color: textColor ? undefined : customTextColor,
						},
					} ) }
					tagName="h2"
					value={ title }
				/>
			</div>
		);
 };
export default Save;
