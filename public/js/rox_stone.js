(function(){ "use-strict";

	var Rox = this.Rox = this.Rox || {};

	var stoneColors = [
		'red',
		'orange',
		'yellow',
		'green',
		'blue',
        'purple'
	];
    
    var selectedStone = null;
    var otherStone = null;

    //Set random colored stone--call game, call location, call color. 
	var Stone = Rox.Stone = function(game, x, y, color){
		this.stoneColor = _.sample(stoneColors);
		this.board = game.board;
        //Call the related sprite based on the random color call. 
		Phaser.Sprite.call(this, game, x, y, 'stone-' + this.stoneColor);
        //event handling stuff
        this.inputEnabled = true;
        this.events.onInputDown.add(stoneSelect, this);
		return this;
	};

	Stone.prototype = Object.create(Phaser.Sprite.prototype);
	Stone.prototype.constructor = Stone;
    
    Stone.preload = function(game){
		game.load.spritesheet('stone-red', 'img/pixel_red.png', 32,32);
		game.load.spritesheet('stone-orange', 'img/pixel_orange.png', 32,32);
        game.load.spritesheet('stone-yellow', 'img/pixel_yellow.png', 32,32);
        game.load.spritesheet('stone-green', 'img/pixel_green.png', 32,32);
		game.load.spritesheet('stone-blue', 'img/pixel_blue.png', 32,32);
        game.load.spritesheet('stone-purple', 'img/pixel_purple.png', 32,32);
	};
    
    function stoneSelect(stone, pointer){
        //some sort of selection mechanism
        //save that stone
        if (selectedStone == null){
            selectedStone = stone;
            console.log("select 1 stone " + selectedStone);
        }
        else if (selectedStone && !otherStone){
            if (stone != selectedStone){
                otherStone = stone;
                console.log("select 2 stone " + selectedStone + otherStone); 
                trySwap(selectedStone, otherStone);
                selectedStone = null;
                otherStone = null;
                
            }
            else {
                selectedStone = null;
                console.log("unselected");
            }
        }
        else {
            selectedStone = null;
            otherStone = null;
            console.log("unselect all stones " + selectedStone + otherStone);
        }
    }

    function trySwap(selectedStone, otherStone){
        if (selectedStone.x == otherStone.x || selectedStone.y == otherStone.y){
            if (selectedStone.x - otherStone.x == selectedStone.board.stoneSize){
                swap(selectedStone, otherStone);
            }
            else if (otherStone.x - selectedStone.x == selectedStone.board.stoneSize){
                swap(selectedStone, otherStone);
            }
            else if (otherStone.y - selectedStone.y == selectedStone.board.stoneSize){
                swap(selectedStone, otherStone);
            }
            else if (selectedStone.y - otherStone.y == selectedStone.board.stoneSize){
                swap(selectedStone, otherStone);
            }
            else{
                console.log("invalid swap");
            }
        }
        else {
            console.log("invalid swap");
        }  
    }
    
    function swap(selectedStone, otherStone){
        console.log(selectedStone.x + " " + selectedStone.y)
        console.log(otherStone.x + " " + otherStone.y)
        firstX = selectedStone.x
        firstY = selectedStone.y
        secondX = otherStone.x
        secondY = otherStone.y
        selectedStone.x = secondX
        selectedStone.y = secondY
        otherStone.x = firstX
        otherStone.y = firstY
    }
        
            
}).call(this);