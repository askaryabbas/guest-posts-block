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
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
	PanelColorSettings,
	ContrastChecker,
	withColors,
} from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @param {any} [attributes] Edit Attributes
 *
 * @return {WPElement} Element to render.
 */
const Edit = ( props ) => {
	const {
		attributes,
		setAttributes,
		backgroundColor,
		textColor,
		setBackgroundColor,
		setTextColor,
	} = props;
	const { title, alignment } = attributes;
	const alignmentHandler = ( newAlignment ) => {
		setAttributes( { alignment: newAlignment } );
	};
	const onAlignmentChangeTitle = ( newTitle ) => {
		setAttributes( { title: newTitle } );
	};

	return (
		<div>
			<InspectorControls>
				<PanelColorSettings
					title={ __( 'Color Settings', 'guest-posts-block' ) }
					icon="admin-appearance"
					initialOpen
					colorSettings={ [
						{
							label: __(
								'Background Color',
								'guest-posts-block'
							),
							value: backgroundColor.color,
							onChange: setBackgroundColor,
						},
						{
							label: __( 'Text Color', 'guest-posts-block' ),
							value: textColor.color,
							onChange: setTextColor,
						},
					] }
				>
					<ContrastChecker
						textColor={ textColor.color }
						backgroundColor={ backgroundColor.color }
					/>
				</PanelColorSettings>
			</InspectorControls>
			<BlockControls>
				<AlignmentToolbar
					value={ alignment }
					onChange={ alignmentHandler }
				/>
			</BlockControls>
			<RichText
				{ ...useBlockProps( {
					className: `text-block-align-${ alignment }`,
					style: {
						backgroundColor: backgroundColor.color,
						color: textColor.color,
					},
				} ) }
				placeholder={ __( 'Post Title', 'guest-posts-block' ) }
				onChange={ onAlignmentChangeTitle }
				tagName="h4"
				value={ title }
				allowedFormats={ [] }
			/>
		</div>
	);
};
export default withColors( {
	backgroundColor: 'backgroundColor',
	textColor: 'color',
} )( Edit );
