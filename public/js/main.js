function urlParam(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    } else {
       return results[1] || 0;
    }
}

function config_load(config) {
    if (config == null) return;

    $(".tile").css("border", config.gridBorderWidth + "px solid " + config.gridBorderColor);
    $(".tile").css("margin", (5-config.gridBorderWidth) + "px");

    if (!config.gridBorderVisibility) {
	      $(".tile").css("border", "none");
	      $(".tile").css("margin", "5px");
    }

    $(".topHeader").css("font-family", config.titleFont);
}


function grid_init(grid) {
    if (grid == null) return;

    var xOrigin = 0;
    var yOrigin = 120;
    var baseSize = 360;

    $.each(grid, function(grid, tile) {
        if (tile == null) return true;

        var left = xOrigin + ((tile.origin % 3) * baseSize);
        var top = yOrigin + (Math.floor(tile.origin/3) * baseSize);

        var div = $('<div/>', {
            id: name,
            style: "left: " + left + "px; top: " + top + "px;",
            class: "tile " + tile.width + " " + tile.height
        }).appendTo('.main-grid');

        $('<iframe/>', {
            src: tile.link
        }).appendTo(div);
    });
}

function init(user) {
    if ((user == null) || (user == '')) user = 'noUser';
    console.log(user);

    var xhr = $.getJSON('user/'+user, function(json) {
        if (json[0].grid) grid_init(json[0].grid);
        if (json[0].config) config_load(json[0].config);
    })
      .fail(function() {
          if (user != 'noUser') init('noUser')
      });
    
}

