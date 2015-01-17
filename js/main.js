function grid_init() {
    var grid = $.getJSON("grid.json", function(data) {
        $.each(data, function(key){
            console.log(key);
        });




    });

}