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
        console.log(checkForHorizontalMatches(this.stoneGrid, this.height, this.width));
        console.log(checkForVerticalMatches(this.stoneGrid, this.height, this.width));
    };
    
    function checkForHorizontalMatches(grid, height, width){
        xMatchList = {};
        for (var a = 0; a < grid.length; a++){
            console.log(grid[a]);
            for (var b = 0; b < grid[a].length; b++){
                if (grid[a][b+1]){
                    if (grid[a][b].stoneColor == grid[a][b+1].stoneColor){
                        if (xMatchList[grid[a][b].stoneColor + a]){
                            xMatchList[grid[a][b].stoneColor + a].push(grid[a][b].position);
                        }
                        else {
                            xMatchList[grid[a][b].stoneColor + a] = [grid[a][b].position];
                        }
                    }
                    else if (grid[a][b-1] && grid[a][b].stoneColor == grid[a][b-1].stoneColor){
                        if (xMatchList[grid[a][b].stoneColor + a]){
                            xMatchList[grid[a][b].stoneColor + a].push(grid[a][b].position);
                        }
                        else {
                            xMatchList[grid[a][b].stoneColor + a] = [grid[a][b].position];
                        }
                    }
                }
                else{
                    if (grid[a][b].stoneColor == grid[a][b-1].stoneColor){
                        if (xMatchList[grid[a][b].stoneColor + a]){
                            xMatchList[grid[a][b].stoneColor + a].push(grid[a][b].position);
                        }
                        else {
                            xMatchList[grid[a][b].stoneColor + a] = [grid[a][b].position];
                        }
                    }
                }  
            }      
        }
        console.log(xMatchList);
        if (_.isEmpty(xMatchList)){
            console.log("HORIZONTAL GAME OVER MAN")
        }
    }
    
    function checkForVerticalMatches(grid, height, width){
    //is this just a switch over b and a?????
        yMatchList = {};
        for (var a = 0; a < width; a++){
            for (var b = 0; b < height; b++){
                if (grid[b+1][a]){
                    if (grid[b][a].stoneColor == grid[b+1][a].stoneColor){
                        if (yMatchList[grid[b][a].stoneColor + a]){
                            yMatchList[grid[b][a].stoneColor + a].push(grid[b][a].position);
                        }
                        else {
                            yMatchList[grid[b][a].stoneColor + a] = [grid[b][a].position];
                        }
                    }
                    //this line is broken--not sure why
                    else if (grid[b-1][a] && grid[b][a].stoneColor == grid[b-1][a].stoneColor){
                        if (yMatchList[grid[b][a].stoneColor + a]){
                            yMatchList[grid[b][a].stoneColor + a].push(grid[b][a].position);
                        }
                        else {
                            yMatchList[grid[b][a].stoneColor + a] = [grid[b][a].position];
                        }                        
                    }
                }
            }
        }
        console.log(yMatchList);
        if (_.isEmpty(yMatchList)){
            console.log("VERTICAL GAME OVER MAN")
        }
    }
    
            
    function removeMatches(game){
        //remove any matches found with checkForMatches
    }
    
    function refillBoard(game){
        //put stones back in board
    }
        
}).call(this);