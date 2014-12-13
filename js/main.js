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

			ObserverMapper();

			
			
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
	Observer.prototype = {
		type : null
	,	value : null
	,	observation :  {"observableProperty" : "Observer"}
	};
	
	function ObserverFactory(node, options) {
		var type = node.type;
		var obj = null;
		switch (type) {
			case "text":
			obj = new ObservableTextInput(options);
			break;
			
			default:
			break;
		}
		return obj;
	
	};
	
	
	function ObserverMapper () {
		if(_observables.length === _observers.length) {
			for ( var i = 0; i<_observables.length; i++ ) {
				_observers[i] 		= _observables.attr("data-observer");
				_observableProp[i] 	= _observableProp.attr("data-observable-prop");
				var obj 	= _observables[i];
				var handler	= _observers[i];		//intentionally set to SETTER
				var prop 	= _observableProp[i];	//property that we should observe
				
				obj.addEventListener("change", function() {
					this.value = this.value;
				}, false);
				Object.defineProperty ( obj, prop, {
					get : function () {
						return this[prop];
					},
					set : function () {
						return window[ handler ].call(this, arguments);
					}
				});
			}
			// console.log("_observables", _observables);
			// console.log("_observers", _observers);
			obj = handler = prop = null;
		} else {
			throw "Fewer Observers mapped to Observables";
		}
	}
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