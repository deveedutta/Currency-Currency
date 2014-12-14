//Support : Chrome 13+ Firefox 6.0+ Internet Explorer 5.5+ Opera 11.60+ Safari 5.1+ 
window.onerror = function globalErrorListener() {
	var args = [].slice.call(arguments);
	console.log(args);
	
};

$(function () {
	window._currencies		= [];
	window._ratesWRTUSD		= [];
	var _listedCurrencies	= [];
	
	var _baseCurrencyName 	= "";
	var _baseCurrencyValue 	= 1;
	
	var _otherCurrenciesSelected 	= [];
	
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
		data = data['rates'];
		for ( var key in data) {
			_otherCurrenciesSelected.push( key );
			_ratesWRTUSD.push(data[key]);
		}
	});
	

	
	$("#currencyAmount").on("change", function () {
		_baseCurrencyName = $("#currencyType").val();
		_baseCurrencyValue = $(this).val() * 1;
		drawTable();
	});
	
	$( "#baseCurrencyType" ).autocomplete({
		source: _currencies,
		select: function( event, ui ) {
			var val = $(this).val();
			_baseCurrencyName = val;
			$("#currencyType").val(val);
			drawTable();
		}
	});
	$( "#comparisonCurrency" ).autocomplete({
		source: _currencies,
		select: function( event, ui ) {
			var val = $(this).val();
			var idx = _otherCurrenciesSelected.indexOf(val);
			_listedCurrencies.push(val);
			
			drawTable();
			
		}
	});
	
	function drawTable( ) {
		$("#displayTable").empty();
		_baseCurrencyValue = ($("#currencyAmount").val() * 1);	//integer conversion hack
		
		for ( var i=0; i<_listedCurrencies.length; i++) {
			var idx = _otherCurrenciesSelected.indexOf(_listedCurrencies[i]);
			if(_baseCurrencyName != _listedCurrencies[i])
				$("#displayTable").append("<tr><td>" + _ratesWRTUSD[idx] * _baseCurrencyValue  + "<td>" + _listedCurrencies[i] + "</td>") ;
			else
				$("#displayTable").append("<tr><td>" + _baseCurrencyValue  + "<td>" + _listedCurrencies[i] + "</td>") ;
		}	
		
	}
});