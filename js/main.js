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

var a;
function config_load() {
	$.getJSON("config.json", function(json) {
		json = json.config[0];
		a = json;
		$(".tile").css("border",json.gridBorderWidth + "px solid" + json.gridBorderColor);
		$(".tile").css("margin", (5-json.gridBorderWidth) + "px");
		if (!json.gridBorderVisibility)
		{
			$(".tile").css("border", "none");
			$(".tile").css("margin", "5px");
		}
		$(".topHeader").css("font-family",json.titleFont);
	});	





}