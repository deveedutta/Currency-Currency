void function (D) {
	var
		window			= this || (0, eval)('this')	
		//source		: http://stackoverflow.com/questions/14119988/return-this-0-evalthis/14120023#14120023
		//courtesy		: knockout-js
	,	undefined		= void 0
	,	_observables 	= []
	,	_observers		= []
	,	_observableProp	= []
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
			//alert($ instanceof jQuery); //false
			$parentContainer = $("#parentContainer");
			_observables 	 = $("[data-observable]",$parentContainer);
			_observers 		 = $("[data-observer]", $parentContainer);
			_observableProp	 = $("[data-observable-prop]", $parentContainer);
			
			if(_observables.length === _observers.length) {
				for ( var i = 0; i<_observables.length; i++ ) {
					Object.defineProperty ( _observables[i], _observableProp[i], {
						get : function () {
							return _observables[i][_observableProp[i]];
						},
						set : function () {
							return window[ _observers[i] ].call(_observables[i], arguments);
						}
					});
				}
			} else {
				throw "Fewer Observers mapped to Observables";
			}
			
			console.log(_observables, _observers);
			
			$.getJSON( "ajax/test.json", function(data ) {
			  var items = [];
			  $.each( data, function( key, val ) {
				items.push( "<li id='" + key + "'>" + val + "</li>" );
			  });
			 
			  $( "<ul/>", {
				"class": "my-new-list",
				html: items.join( "" )
			  }).appendTo( "body" );
			});
		});
	};
}(document);

function baseCurrencyChanged () {
	console.log(arguments);
	return 
}
window.globalErrorListener = (function () {
	var args = [].slice.call(arguments);
	console.log(args);
	
});

//inspired by 'ErrorCeption by Rakesh ' + Math.PI :D
//Support : Chrome 13+ Firefox 6.0+ Internet Explorer 5.5+ Opera 11.60+ Safari 5.1+ 
window.onerror = globalErrorListener;