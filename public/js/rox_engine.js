/*
Rox& Main Documentation

Functions in this file:
    - Create game with Phaser variables--what gets preloaded, what is created, and the update function.
    - This code mostly taken from tutorials. ~*phaser*~
    
 */

(function(){ "use-strict";
    
    var Rox = this.Rox = this.Rox || {};        
            
    //substantiates variable "game" --> let's get started!
    var game = new Phaser.Game(590, 590, Phaser.CANVAS, 'rox-box', {
        preload:    preload,
        create:     create,
        update:     update
    });
        
    function preload(){
        //preloads determined board asset from board.js file
        Rox.Board.preload(game);
        
    }
    
    function create(){
        game.score = 0;
        game.board = new Rox.Board(10, 10, 15, 15, 38);
        game.board.create(game);
    
    }
    
    function update(){
        game.board.update(game);
    }
            
}).call(this);
            