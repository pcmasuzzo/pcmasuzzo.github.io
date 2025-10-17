// open the console and paste this commands
var canvas = document.getElementsByTagName('canvas')[0];
var img = canvas.toDataURL('image/png');
var filterHeader = document.getElementsByClassName("filter-header")[0];
filterHeader.innerHTML = '<img src="' + img + '">';