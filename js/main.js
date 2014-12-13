void function (D) {
	var
		window		= this || (0, eval)('this')	
		//source	: http://stackoverflow.com/questions/14119988/return-this-0-evalthis/14120023#14120023
		//courtesy	: knockout-js
	,	undefined	= void 0
	,	dictionary	= null				//dictionary is a marker saying upcoming VARs are short-hands
	,	_AC			= "appendChild"
	,	CEL			= "createElement"
	,	QSA			= "querySelectorAll"
	,	GID			= "getElementById"
	,	_IH			= "innerHTML"
	
	;
	
	var s = D[CEL]("script");
	// s.src = "//code.jquery.com/jquery-2.1.1.js";			//production
	s.src = "bower_components/jquery/dist/jquery.min.js";	//dev
	D["body"][_AC](s);
	s.onload = function () {
		$(function () {
			alert($ instanceof jQuery); //false
			
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

