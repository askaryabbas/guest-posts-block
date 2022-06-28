<?php
/**
 * Plugin Name:       Guest Posts Block
 * Description:       This plugin will allow authors to submit post on frontend.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            Askary Abbas
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       guest-posts-block
 *
 * @package           gpb
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function gpb_guest_posts_block_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'gpb_guest_posts_block_block_init' );
