function grid_init() {

    var xOrigin = 0;
    var yOrigin = 120;
    var baseSize = 360;

    $.getJSON("grid.json", function(json) {
        console.log(json);
        $.each(json, function(name, grid) {
            var left = xOrigin + ((grid.origin % 3) * baseSize);
            var top = yOrigin + (Math.floor(grid.origin/3) * baseSize);

            $('<div/>', {
                id: name,
                style: "left: " + left + "px; top: " + top + "px;",
                class: "tile " + grid.width + " " + grid.height
            }).appendTo('.main-grid');

	    });
	});

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
