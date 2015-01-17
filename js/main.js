function grid_init() {

    var grid = new Array(0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0)

	$.getJSON("grid.json", function(json) {
	    console.log(json);
	    $.each(json, function( key, val ) {
            var works = false;

            var heigth = val.height;
            var width = val.width;

            //place in array to place the first block
            var startPosition = 0;

            for (var i = 0; 0 < 15; i++) {

                //Something is there, so look at next place
                if (grid[i] == 1) {
                    continue;

                //Nothing is there, so check surrounding spots
                } else if (grid[i] == 0) {

                    //Check if height is available
                    var heightWorks = true;
                    for (var j = 1; j <= heigth; j++) {

                        //Computes the spot we're checking
                        //Multiply be 3 to offset to the next row
                        var idx = i + (j*3);

                        //Make sure we're not checking a place
                        //that doesn't exist
                        if (idx >= 15) {
                            heightWorks = false;
                            break;
                        }

                        //Finally, check if the spot won't work
                        if (grid[idx] == 1) {
                            heightWorks = false;
                            break;
                        }
                    }

                    //Check if width is available
                    var widthWorks = true;
                    for (var j = 1; j <= width; j++) {
                        //Computes the spot we're checking
                        var idx = i + j;

                        //Make sure we're not checking a place
                        //that doesn't exist
                        if (idx >= 15) {
                            widthWorks = false;
                            break;
                        }

                        //Make sure we don't go over
                        //into the next row (wouldn't make sense)
                        var startRow = Math.floor(i/3);
                        var currentRow = Math.floor(idx/3);

                        if (currentRow > startRow) {
                            widthWorks = false;
                            break;
                        }

                        //Finally, check if the spot won't work
                        if (grid[idx] == 1) {
                            widthWorks = false;
                            break;
                        }
                    }

                    //if width and height works, it's a valid spot
                    if (widthWorkds && heightWorks) {
                        startPosition = i;
                        console.log(i);
                    }
                }
            }
	    });
	});
}