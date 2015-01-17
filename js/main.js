function grid_init() {
	var a;
	$.getJSON("grid.json", function(json) {
	    console.log(json);
	    $.each(json, function( key, val ) {
	    	console.log(val)


	    });
	});
	return true;
}