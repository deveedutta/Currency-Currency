window._currencies	= [];
window._rates		= [];

//Support : Chrome 13+ Firefox 6.0+ Internet Explorer 5.5+ Opera 11.60+ Safari 5.1+ 
window.onerror = function globalErrorListener() {
	var args = [].slice.call(arguments);
	console.log(args);
	
};

$(function () {
	// $.getJSON( "https://gist.githubusercontent.com/Fluidbyte/2973986/raw/9ead0f85b6ee6071d018564fa5a314a0297212cc/Common-Currency.json",
	$.getJSON( "js/currency-list.js",
	function(data ) {
		for ( var name in data ) {
			_currencies.push(name);
		}
	});
	
	// $.getJSON( "https://openexchangerates.org/api/latest.json?app_id=f9009aea3ff84eceac990e86e968ce9d",
	$.getJSON( "js/latest.json",
	function(data) {
		for ( var name in data['rates'] ) {
			_rates.push(name);
		}
	});
	$parentContainer = $("#parentContainer");
	_items 	 = $("[data-observable]", $parentContainer);
	
	
	$( "#baseCurrencyType" ).autocomplete({
		source: _currencies,
		select: function( event, ui ) {
			var url = "http://openexchangerates.org/api/latest.json?app_id=f9009aea3ff84eceac990e86e968ce9d";
			$("#currencyType").val($(this).val());
			$("#currencyAmount");
			getRes ( url );
		}
	});
	$( "#comparisonCurrency" ).autocomplete({
		source: _currencies,
		select: function( event, ui ) {
				
		}
	});
	
	function getRes ( URL ) {
		$.getJSON( URL, function(data ) {
			var items = data['rates'];
			$.each( data, function( key, val ) {
				items.push( "<tr> <td>" + key + "</td><td>" + val + "</td> </tr>" );
			});
			$("#displayTable").empty().html(items.join(""));
		})
		.done(function() {
			console.log( "second success" );
		})
		.fail(function() {
			console.log( "error" );
		})
		.always(function() {
			console.log( "complete" );
		});
	}
});