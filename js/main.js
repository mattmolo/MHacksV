function urlParam(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    } else {
       return results[1] || 0;
    }
}

function grid_init() {

    var xOrigin = 0;
    var yOrigin = 120;
    var baseSize = 360;

    var gridJson = (urlParam('user') != null) ? "http://" + location.host + ":4050/user/" + urlParam('user') : "grid.json";

    $.getJSON(gridJson, function(json) {
        json = json[0].grid;
        $.each(json, function(name, grid) {
            if(grid == null) return true;
                var left = xOrigin + ((grid.origin % 3) * baseSize);
                var top = yOrigin + (Math.floor(grid.origin/3) * baseSize);

                var div = $('<div/>', {
                    id: name,
                    style: "left: " + left + "px; top: " + top + "px;",
                    class: "tile " + grid.width + " " + grid.height
                }).appendTo('.main-grid');

                $('<iframe/>', {
                    src: grid.link
                }).appendTo(div);
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
