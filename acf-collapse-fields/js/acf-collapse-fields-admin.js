jQuery(document).ready(function($) {

	/**
	 * set up the buttons on the entire form
	 */
	function acfRepeaterCollapserInit() {
		// HTML to put above each repeater instance & flexible instance
		collapseRepeaterButton = '<button type="button" role="button" class="button field-repeater-toggle field-repeater-toggle-all">'+collapsetranslation.collapseAll+'</button>';
		collapseFlexButton = '<button type="button" role="button" class="button field-flexible-toggle field-flexible-toggle-all">'+collapsetranslation.collapseAll+'</button>';

		// find each repeater instance and add the button
		$('.acf-field-repeater').each( function() {
			repeater = $(this);

			repeater.children('.acf-input').children('.acf-repeater:not(.-table)').each(function() {
				affectedRepeater = $(this).parent().parent();

				affectedRepeater.data('acf-rowset-collapsed', false).attr('aria-expanded', false);
				
				affectedRepeater.prepend( collapseRepeaterButton )
					.data('acf-rowset-collapsed', false);
			});

			var collapsedRows	= $('.acf-row').not(".acf-clone").length;
			var allRows  		=  $('.acf-row.-collapsed').not(".acf-clone").length;
			if ( collapsedRows == allRows ) {
				button = repeater.find('.field-repeater-toggle');
				button.addClass('collapsed-row');
				button.text(collapsetranslation.expandAll);
			}
		});

		// Bind click events to the toggle functions for the Repeater Fileds
		$('.field-repeater-toggle-all', '.acf-field-repeater' ).on('click', function() {
			acfRepeaterToggleAll($(this), '.acf-row')
		});

		// find each flexible instance and add the button
		$('.acf-field-flexible-content').each( function() {
			repeater = $(this);
			repeater.data('acf-rowset-collapsed', false).attr('aria-expanded', false);
			repeater.prepend( collapseFlexButton ).data('acf-rowset-collapsed', false);

			var collapsedRows	= $('.values .layout.-collapsed').length;
			var allRows			= $('.values .layout').length;
			if ( collapsedRows == allRows ) {
				button = repeater.find('.field-flexible-toggle');
				button.addClass('collapsed-row');
				button.text(collapsetranslation.expandAll);
			}

		});

		// Bind click events to the toggle functions for the Flexible Content Fileds
		$('.field-flexible-toggle-all', '.acf-field-flexible-content' ).on('click', function() {
			acfRepeaterToggleAll($(this), '.layout')
		});
	}

	/**
	 * toggles Repeater or Flexible Content rows
	 */
	function acfRepeaterToggleAll(button, acf_element) {
		button = button;
		console.log(button)

		if ( button.hasClass('collapsed-row') ) {
			button.removeClass('collapsed-row');
			button.text(collapsetranslation.collapseAll);
			button.parent().find($(acf_element)).removeClass('-collapsed');
		} else {
			button.addClass('collapsed-row');
			button.text(collapsetranslation.expandAll);
			button.parent().find($(acf_element)).addClass('-collapsed');
		}

		// prevent bubbling up to parent repeater rowset
		event.stopPropagation();
	}

	// Initiatilize the plugin
	acfRepeaterCollapserInit();


});
