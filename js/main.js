void function (D) {
	var
		window			= this || (0, eval)('this')	
		//source		: http://stackoverflow.com/questions/14119988/return-this-0-evalthis/14120023#14120023
		//courtesy		: knockout-js
	,	undefined		= void 0
	,	_observables 	= []
	,	_items			= []
	,	dictionary	= null				//dictionary is a marker saying upcoming VARs are short-hands
	,	_AC			= "appendChild"
	,	CEL			= "createElement"
	,	QSA			= "querySelectorAll"
	,	GID			= "getElementById"
	,	_IH			= "innerHTML"
	
	;
	
	var s 		= D[CEL]("script");
	s.async 	= true;
	// s.src 	= "//code.jquery.com/jquery-2.1.1.js";			//production
	s.src 		= "bower_components/jquery/dist/jquery.min.js";	//dev
	D["body"][_AC](s);
	s.onload = function () {
		$(function () {
			$parentContainer = $("#parentContainer");
			_items 	 = $("[data-observable]", $parentContainer);
			ObserverMapper();
		});
	};
		
	function ObserverMapper () {
		var options = {};
		for ( var i = 0; i<_items.length; i++ ) {
			options['node'] 		= _items[i];
			options['handler'] 		= $(_items[i]).attr("data-action");
			options['event'] 		= $(_items[i]).attr("data-observe-event");
			_observables[i] 		= new ObservableItem(_items[i], options);	
		}
	}
	
	function ObserverFactory(node, options) {
		var type = node.nodeName == "INPUT" && node.type || node.nodeName ;
		var obj = null;
		switch (type) {
			case "text":
			obj = new ObservableTextInput(options);
			break;
			case "TABLE":
			obj = new ObservableTextInput(options);
			break;
			
			case "...":
			// ...
			break;
			
			default:
			break;
		}
		return obj;
	
	};
	function ObservableItem ( options) {
		//not doing null checks against options
		//I could map more properties, but it's cumbersome for this test
		this['0'] = options.node;
		$(this['0']).on(options.event, window[options.handler]);
	}

}(document);

function baseCurrencyChanged () {
	console.log("baseCurrencyChanged", arguments);
	
	// loadAjax();
	return null;
}

function newCurrencyAdded () {
	console.log("newCurrencyAdded", arguments);
	$.trigger("update");
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
window.globalErrorListener = (function () {
	var args = [].slice.call(arguments);
	console.log(args);
	
});

//inspired by 'ErrorCeption by Rakesh ' + Math.PI :D
//Support : Chrome 13+ Firefox 6.0+ Internet Explorer 5.5+ Opera 11.60+ Safari 5.1+ 
window.onerror = globalErrorListener;