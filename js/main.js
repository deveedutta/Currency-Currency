

function baseCurrencyChanged (e) {
	
		
	// $("#displayTable").trigger("update");
	// loadAjax();
	return null;
}

function newCurrencyAdded () {
	console.log("newCurrencyAdded", arguments);
	$("#displayTable").trigger("update");		//I gave up, No more delegation
	return null;
}

function updateTable () {
	console.log("updateTable", arguments);
	return null;
}


function loadAjax() {
	$.getJSON( "https://openexchangerates.org/api/latest.json?app_id=f9009aea3ff84eceac990e86e968ce9d&callback=baba", function(data ) {
	  var items = [];
	  $.each( data, function( key, val ) {
		items.push( "<li id='" + key + "'>" + val + "</li>" );
	  });
	 
	  $( "<ul/>", {
		"class": "my-new-list",
		html: items.join( "" )
	  }).appendTo( "body" );
	});
}


//inspired by 'ErrorCeption by Rakesh ' + Math.PI :D
//Support : Chrome 13+ Firefox 6.0+ Internet Explorer 5.5+ Opera 11.60+ Safari 5.1+ 
window.onerror = function globalErrorListener() {
	var args = [].slice.call(arguments);
	console.log(args);
	
};

$(function () {
		void function (D) {
			var
				window			= this || (0, eval)('this')	
				//source		: http://stackoverflow.com/questions/14119988/return-this-0-evalthis/14120023#14120023
				//courtesy		: knockout-js
			,	undefined		= void 0
			,	_observables 	= []
			,	_items			= []
			,	_curr_data		= null
			,	dictionary	= null				//dictionary is a marker saying upcoming VARs are short-hands
			,	_AC			= "appendChild"
			,	CEL			= "createElement"
			,	QSA			= "querySelectorAll"
			,	GID			= "getElementById"
			,	_IH			= "innerHTML"
			
			;
			window._currencies		= [];
				
				
				
			
				
			function ObserverMapper () {
				var options = {};
				for ( var i = 0; i<_items.length; i++ ) {
					options['node'] 		= _items[i];
					options['handler'] 		= $(_items[i]).attr("data-action");
					options['event'] 		= $(_items[i]).attr("data-observe-event");
					_observables[i] 		= new ObservableItem(options);	
				}
			}
			
			function ObservableItem ( options) {
				//not doing null checks against options
				//I could map more properties, but it's cumbersome for this test
				this['0'] = options.node;
				$(this['0']).on(options.event, window[options.handler]);
			}

		}(document);
	// $.getJSON( "https://gist.githubusercontent.com/Fluidbyte/2973986/raw/9ead0f85b6ee6071d018564fa5a314a0297212cc/Common-Currency.json",
	$.getJSON( "js/currency-list.js",
	function(data ) {
		_curr_data = data;
		for ( var name in _curr_data ) {
			_currencies.push(name);
		}
	});
	$parentContainer = $("#parentContainer");
	_items 	 = $("[data-observable]", $parentContainer);
	
	
	$( "#baseCurrencyType" ).autocomplete({
		source: _currencies
	});
});