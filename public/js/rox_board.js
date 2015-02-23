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
        checkForHorizontalMatches(this.stoneGrid, this.height, this.width);
        checkForVerticalMatches(this.stoneGrid, this.height, this.width);
    };
            
            
    //eventually make this into one giant awesome function. Rad. 
    function checkForHorizontalMatches(grid, height, width){
        xMatchList = {};
        for (var a = 0; a < grid.length; a++){
            console.log(grid[a]);
            for (var b = 0; b < grid[a].length; b++){
                if (grid[a][b+1]){
                    if (grid[a][b].stoneColor == grid[a][b+1].stoneColor){
                        if (xMatchList[grid[a][b].stoneColor + a]){
                            xMatchList[grid[a][b].stoneColor + a].push(grid[a][b]);
                        }
                        else {
                            xMatchList[grid[a][b].stoneColor + a] = [grid[a][b]];
                        }
                    }
                    else if (grid[a][b-1] && grid[a][b].stoneColor == grid[a][b-1].stoneColor){
                        if (xMatchList[grid[a][b].stoneColor + a]){
                            xMatchList[grid[a][b].stoneColor + a].push(grid[a][b]);
                        }
                        else {
                            xMatchList[grid[a][b].stoneColor + a] = [grid[a][b]];
                        }
                    }
                }
                else{
                    if (grid[a][b].stoneColor == grid[a][b-1].stoneColor){
                        if (xMatchList[grid[a][b].stoneColor + a]){
                            xMatchList[grid[a][b].stoneColor + a].push(grid[a][b]);
                        }
                        else {
                            xMatchList[grid[a][b].stoneColor + a] = [grid[a][b]];
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
        yMatchList = {};
        //check these variables...
        for (var a = 0; a < grid[a].length; a++){
            for (var b = 0; b < grid.length; b++){
                if (grid[b+1]){
                    if (grid[b][a].stoneColor == grid[b+1][a].stoneColor){
                        if (yMatchList[grid[b][a].stoneColor + a]){
                            yMatchList[grid[b][a].stoneColor + a].push(grid[b][a].position);
                        }
                        else {
                            yMatchList[grid[b][a].stoneColor + a] = [grid[b][a].position];
                        }
                    }
                    else if (grid[b-1]){
                        if (grid[b][a].stoneColor == grid[b-1][a].stoneColor){
                             if (yMatchList[grid[b][a].stoneColor + a]){
                                yMatchList[grid[b][a].stoneColor + a].push(grid[b][a].position);
                            }
                            else {
                                yMatchList[grid[b][a].stoneColor + a] = [grid[b][a].position];
                            }
                        }
                    }
                }
                else if (grid[b-1]){
                    if (grid[b][a].stoneColor == grid[b-1][a].stoneColor){
                        if (yMatchList[grid[b][a].stoneColor + a]){
                                yMatchList[grid[b][a].stoneColor + a].push(grid[b][a]);
                        }
                         else {
                                yMatchList[grid[b][a].stoneColor + a] = [grid[b][a]];
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
    
    //TODO: Add bonus for 4+ (geode)        
    function removeMatches(MatchList){
        for (item in MatchList){
            if (MatchList[item].length >= 3){
                for (var i = 0; i < MatchList[item].length; i++){
                    MatchList[item][i].destroy()
                }
            }
        }
    }
    
    function dropStonesDown(grid){
        //check board from top down. if missing on next line down, push stone down. check as many times as there are lines??
        for (var a = 0; a < grid.length-1; a++){
            for (var b = 0; b < grid[a].length; b++){
                if (grid[a+1][b].exists == false){
                    
                }
            }
        }
                
    }
        
}).call(this);