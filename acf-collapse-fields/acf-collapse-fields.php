<?php
/**
 * Plugin Name: Advanced Custom Fields: Collapse Fields
 * Plugin URI: http://www.dreihochzwo.de
 * Description: Provides a way to collapse and expand Repeater & Flexible Content fields in order to enable better sorting.
 * Version: 1.1.0
 * Author: Thomas Meyer
 * Author URI: http://www.dreihochzwo.de
 */

define( 'ACF_COLLAPSER_VERSION', '1.1.0' );

load_plugin_textdomain( 'acf-collapse-fields', false, dirname( plugin_basename(__FILE__) ) . '/lang/' );

/* Load the javascript and CSS files on the ACF admin pages */
// 11 helps take precedence over core styles
add_action( 'acf/input/admin_enqueue_scripts', 'acf_collapse_fields_assets', 11 );
function acf_collapse_fields_assets() {
	$acf_version = acf()->settings['version'];
	
	if ( version_compare( $acf_version, '5.3.1', '>=' ) ) {
		
		wp_register_script( 
			'acf-collapse-fields-admin-js',
			esc_url( plugins_url( 'js/acf-collapse-fields-admin.js', __FILE__ ) ),
			array( 'jquery' ),
			ACF_COLLAPSER_VERSION
		);

		// Localize the script with new data
		$translation_array = array(
			'expandAll'			=> __( 'Expand All Elements', 'acf-collapse-fields' ),
			'collapseAll'		=> __( 'Collapse All Elements', 'acf-collapse-fields' )
		);
		wp_localize_script( 'acf-collapse-fields-admin-js', 'collapsetranslation', $translation_array );

		wp_enqueue_script('acf-collapse-fields-admin-js');

		wp_enqueue_style(
			'acf-collapse-fields_admin-css',
			esc_url( plugins_url( 'css/acf-collapse-fields-admin.css', __FILE__ ) ),
			false,
			ACF_COLLAPSER_VERSION
		);
	}
}