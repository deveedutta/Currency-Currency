//Support : Chrome 13+ Firefox 6.0+ Internet Explorer 5.5+ Opera 11.60+ Safari 5.1+ 
window.onerror = function globalErrorListener() {var args = [].slice.call(arguments);console.log(args);};
$(function () {
	window._allCurrencies	= [];
	window._allRatesWRTUSD	= [];
	
	var _baseCurrencyName 	= "";
	var _baseCurrencyRate 	= 1;
	var _baseCurrencyAmount = 1;
	
	var _otherCurrenciesSelected 	= [];
	
	// $.getJSON( "https://gist.githubusercontent.com/Fluidbyte/2973986/raw/9ead0f85b6ee6071d018564fa5a314a0297212cc/Common-Currency.json",
	// $.getJSON( "js/currency-list.js",
	// function(data ) {
		// for ( var name in data ) {
			// _allCurrencies.push(name);
		// }
	// });
	
	
	// $.getJSON( "https://openexchangerates.org/api/latest.json?app_id=f9009aea3ff84eceac990e86e968ce9d",
	$.getJSON( "js/latest.json",
	function(data) {
		data = data['rates'];
		for ( var key in data) {
			_allCurrencies.push( key );
			_allRatesWRTUSD.push(data[key]);
		}
	});

	//1
	$( "#baseCurrencyType" ).autocomplete({
		source: _allCurrencies,
		select: function( event, ui ) {
			_baseCurrencyName = $(this).val();
			$("#currencyType").val(_baseCurrencyName);
			var idx = _allCurrencies.indexOf(_baseCurrencyName);
			_baseCurrencyRate	= _allRatesWRTUSD[idx];
			drawTable();
		}
	});

	//2
	$("#baseCurrencyAmount").on("change", function () {
		_baseCurrencyAmount = parseInt( $(this).val() ,10);
		drawTable();
	});
	
	
	$( "#comparisonCurrency" ).autocomplete({
		source: _allCurrencies,
		select: function( event, ui ) {
			var val = $(this).val();
			if(_baseCurrencyName == val) return;
			
			var idx;
			if (_otherCurrenciesSelected.length > 0) {
				idx = _otherCurrenciesSelected.indexOf(val);
				if(idx == -1)	_otherCurrenciesSelected.push(val);
			} else {
				_otherCurrenciesSelected.push(val);
			}
			
			drawTable();
		}
	});
	
	function drawTable( ) {
		$("#displayTable").empty();
		_baseCurrencyAmount = ($("#baseCurrencyAmount").val() * 1);	//integer conversion hack
		_baseCurrencyName	= $( "#baseCurrencyType" ).val();
		
		for ( var i=0; i<_otherCurrenciesSelected.length; i++) {
			var idx 	= _allCurrencies.indexOf(_otherCurrenciesSelected[i]);
			var rate 	= _allRatesWRTUSD[idx];
			
			
			if(_baseCurrencyName == _otherCurrenciesSelected[i]) {
				$("#displayTable").append("<tr><td>" + _baseCurrencyAmount  + "<td>" + _otherCurrenciesSelected[i] + "</td></tr>");
				
			} else {
				if(_baseCurrencyName != "USD") {
					var rateIndex 		= _allCurrencies.indexOf(_baseCurrencyName);
					var currencyRate 	= _allRatesWRTUSD[rateIndex];
					$("#displayTable").append("<tr><td>" + (1/currencyRate) * rate * _baseCurrencyAmount  + "<td>" + _otherCurrenciesSelected[i] + "</td></tr>");
					
				} else {
					$("#displayTable").append("<tr><td>" + rate * _baseCurrencyAmount  + "<td>" + _otherCurrenciesSelected[i] + "</td></tr>");
				}
			}	
		}	
		
	}
});