(function(){ "use-strict";
    
    var count = 0;
	var Rox = this.Rox = this.Rox || {};

	var Board = Rox.Board = function(x, y, width, height, stoneSize){
        //set position
		this.x = x;
		this.y = y;
        //set width
		this.width = width;
        //set height
		this.height = height;
        //set size of stone in grid in pixels
		this.stoneSize = stoneSize;

	};

	var Stone = Rox.Stone;

	Board.preload = function(game){
		Stone.preload(game);
	};

    //Create a matrix of arrays and fill it with stones 
	Board.prototype.create = function(game){
		this.game = game;
		this.stoneGrid = [];
		this.stones = game.add.group();
		for(var r = 0; r < this.width; r++){
			this.stoneGrid.push([]);
			for(var c = 0; c < this.height; c++){
				var stone = new Stone(game, this.x + c*this.stoneSize, 
					this.y + r*this.stoneSize);
				_.last(this.stoneGrid).push(stone);
				this.stones.add(stone);
			}
		}
    };
                  
    //eventually make this into one giant awesome function. Rad. 
    function checkForHorizontalMatches(grid, height, width){
        xMatchList = [];
        for (var a = 0; a < grid.length; a++){
            for (var b = 0; b < grid[a].length; b++){
                if (grid[a][b-1]){
                    if (grid[a][b].stoneColor != grid[a][b-1].stoneColor){
                        if (grid[a][b+1]){
                            if (grid[a][b].stoneColor == grid[a][b + 1].stoneColor){
                                var count = 1;
                                var matches = [];
                                matches.push(grid[a][b]);
                                while (grid[a][b + count] != null && grid[a][b].stoneColor == grid[a][b + count].stoneColor){
                                    matches.push(grid[a][b + count]);
                                    count++;
                                }
                                if (matches.length >= 3){
                                    xMatchList.push(matches);
                                }
                            }
                        }
                    }
                }
            }
        }
        return xMatchList;
    };

                    
    
    function checkForVerticalMatches(grid, height, width){
        var yMatchList = []
        for (var a = 0; a < width; a++){
            for (var b = 0; b < grid.length; b++){
                if (grid[b-1]){
                    if (grid[b][a].stoneColor != grid[b-1][a].stoneColor){
                        if (grid[b+1]){
                            if (grid[b][a].stoneColor == grid[b+1][a].stoneColor){
                                var count = 1;
                                var matches = []
                                matches.push(grid[b][a]);
                                while (grid[b + count] != null && grid[b][a].stoneColor == grid[b + count][a].stoneColor){
                                    matches.push(grid[b + count][a]);   
                                    count++;
                                }
                                if (matches.length >= 3) {
                                    yMatchList.push(matches);
                                }
                            }
                        }
                    }
                }
            }
        }
        return yMatchList;     
    };
    
    //TODO: Add bonus for 4+ (geode)        
    function removeMatches(MatchList){
        for (item in MatchList){
            for (var i = 0; i < MatchList[item].length; i++){
                MatchList[item][i].kill()
            }
        }
    }
    
    function dropStonesDown(width, grid, game){
        //check board from top down. if missing on next line down, push stone down. check as many times as there are lines??
        for (var a = 0; a < width; a++){
            for (var b = 0; b < grid.length; b++){
                if (grid[b][a].alive == false){
                    console.log("FOUND AN EMPTY AT: " + b + " " + a);
                    console.log("Now it real.");
                    grid[b][a].visible == true;
                }
            }
        }           
    }
    
    Board.prototype.update = function(game){
        removeMatches(checkForHorizontalMatches(this.stoneGrid, this.height, this.width));
        removeMatches(checkForVerticalMatches(this.stoneGrid, this.height, this.width));
        dropStonesDown(this.width, this.stoneGrid, this.game);
    }
        
}).call(this);