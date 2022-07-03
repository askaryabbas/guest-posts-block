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
} from '@wordpress/block-editor';

import {
	//eslint-disable-next-line
	__experimentalBoxControl as BoxControl,
	PanelBody,
	RangeControl,
} from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import classname from 'classnames';
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @param {any} props prop attributes
 *
 * @return {WPElement} Element to render.
 */
const Edit = ( props ) => {
	const { attributes, setAttributes } = props;
	const { title, textAlignment, style, shadow, shadowOpacity } = attributes;
	const { __Visualizer: BoxControlVisualizer } = BoxControl;
	const classes = classname( `text-block-align-${ textAlignment }`, {
		'has-shadow': shadow,
		[ `shadow-opacity-${ shadowOpacity }` ]: shadow && shadowOpacity,
	} );
	const alignmentHandler = ( newAlignment ) => {
		setAttributes( { textAlignment: newAlignment } );
	};
	const onAlignmentChangeTitle = ( newTitle ) => {
		setAttributes( { title: newTitle } );
	};
	const onChangeShadowOpacity = ( newShadowOpacity ) => {
		setAttributes( { shadowOpacity: newShadowOpacity } );
	};
	const toggleShadow = () => {
		setAttributes( { shadow: ! shadow } );
	};
	return (
		<div>
			<InspectorControls>
				{ shadow && (
					<PanelBody
						title={ __( 'Shadow Setting', 'guest-posts-block' ) }
					>
						<RangeControl
							label={ __(
								'Shadow Opacity',
								'guest-posts-block'
							) }
							value={ shadowOpacity }
							min={ 10 }
							max={ 100 }
							step={ 10 }
							onChange={ onChangeShadowOpacity }
						/>
					</PanelBody>
				) }
			</InspectorControls>
			<BlockControls
				controls={ [
					{
						icon: 'admin-page',
						title: __( 'Shadow', 'guest-posts-block' ),
						onClick: toggleShadow,
						isActive: shadow,
					},
				] }
			>
				<AlignmentToolbar
					value={ textAlignment }
					onChange={ alignmentHandler }
				/>
			</BlockControls>
			<div
				{ ...useBlockProps( {
					className: classes,
				} ) }
			>
				<RichText
					className="title-box"
					placeholder={ __( 'Post Title', 'guest-posts-block' ) }
					onChange={ onAlignmentChangeTitle }
					tagName="p"
					value={ title }
					allowedFormats={ [] }
				/>
				<BoxControlVisualizer
					values={ style && style.spacing && style.spacing.padding }
					showValues={
						style && style.visualizers && style.visualizers.padding
					}
				/>
			</div>
		</div>
	);
};
export default Edit;
