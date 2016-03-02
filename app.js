/*
Author: Daniel Eynis

This is a JS implementation of Conway's Game of Life
*/

$(document).ready(function(){
	
	var canvas = $('canvas')[0];
	var can = canvas.getContext("2d");
	var width = canvas.width;
	var height = canvas.height;
	var sec = 20;
	var secW = width/sec;
	var secH = height/sec;
	var rectObj = canvas.getBoundingClientRect();
	var simStat = 0;
	
	for(var i = 0; i <= width; i+= sec){
		can.beginPath();
		can.moveTo(i, 0);
		can.lineTo(i, 500);
		can.strokeStyle = "#d3d3d3";
		can.stroke();
	}
	
	for(var i = 0; i <= height; i+= sec){
		can.beginPath();
		can.moveTo(0, i);
		can.lineTo(500, i);
		can.strokeStyle = "#d3d3d3";
		can.stroke();
	}
	
	var array = [];
	var array2 = []
	for(var i = 0; i < secW; i++){
		array.push([]);
		array2.push([]);
		for(var j = 0; j < secH; j++){
			array[i].push(0);
			array2[i].push(0);
		}
	}
	
	$('canvas').on('click', function(){
		var cX = event.clientX - rectObj.left;
		var cY = event.clientY - rectObj.top;
		
		var drawX = Math.ceil(cX/sec);
		var drawY = Math.ceil(cY/sec);
		
		if(array[drawX-1][drawY-1] == 1){
			draw(0, drawX, drawY);
			array[drawX-1][drawY-1] = 0;
		}
		else{
			draw(1, drawX, drawY);
			array[drawX-1][drawY-1] = 1;
		}
	});
	
	$('button').on('click', function(){
		var numN;
		setInterval(function(){
			for(var i = 0; i < secW; i++){
				for(var j = 0; j < secH; j++){
					numN = returnNeighbors(i, j);
					if(array[i][j]){
						if((numN < 2) || (numN > 3))
							array2[i][j] = 0;
						else
							array2[i][j] = 1;
					}
					else if(!array[i][j]){
						if((numN == 3))
							array2[i][j] = 1;
						else
							array2[i][j] = 0;
					}
				}
			}
			
			for(var i = 0; i < secW; i++){
				for(var j = 0; j < secH; j++){
					draw(array2[i][j], i+1, j+1);
				}
			}
			
			array = JSON.parse(JSON.stringify(array2));
			
		}, 200);
	});
	
	var returnNeighbors = function(x, y){
		var liveN = 0;
		var YB = y-1;
		var YT = y+1;
		var XB = x-1;
		var XT = x+1;
		
		if(!(YB < 0)){
			if(array[x][y-1]) liveN++;
			if(!(XB < 0))
				if(array[x-1][y-1]) liveN++;
			if(!(XT == secW))
				if(array[x+1][y-1]) liveN++;
		}
		
		if(!(YT == secH)){
			if(array[x][y+1]) liveN++;
			if(!(XB < 0))
				if(array[x-1][y+1]) liveN++;
			if(!(XT == secW))
				if(array[x+1][y+1]) liveN++;
		}
		
		if(!(XB < 0))
			if(array[x-1][y]) liveN++;
		if(!(XT == secW))
			if(array[x+1][y]) liveN++;
		
		return liveN;
	}
	
	var draw = function(state, x, y){
		if(state)
			can.fillStyle = "#333333";
		else
			can.fillStyle = "#ffffff";
		can.fillRect((x*sec)-19, (y*sec)-19, sec-2, sec-2);
	}
});