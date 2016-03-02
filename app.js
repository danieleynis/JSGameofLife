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
		
		if(array[drawX][drawY] == 1){
			draw(0, drawX, drawY);
			array[drawX][drawY] = 0;
		}
		else{
			draw(1, drawX, drawY);
			array[drawX][drawY] = 1;
		}
	});
	
	$('button').on('click', function(){
		simStat = 1;
		while(simStat){
			
		}
	});
	
	var returnNeighbors = function(x, y){
		
	}
	
	var draw = function(state, x, y){
		if(state)
			can.fillStyle = "#333333";
		else
			can.fillStyle = "#ffffff";
		can.fillRect((x*sec)-19, (y*sec)-19, sec-2, sec-2);
	}
});