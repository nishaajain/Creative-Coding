/*

Nisha Jain
HCDE 524
Final Assignment
11/13/2021

Instructions to play the game:

Select tree type using 1, 2, 3
Press R to reset
Click on land to plant your selected tree
Click on water to start a boat on the river

*/

// variables
var mountX = 300;
var mountY = 600;
var cloudX = 250;
var cloudY = 250;
var treeX = 300;
var treeY = 600;

//Initializing global array for boat and tree
var boat = [];
var tree = [];
var treeType = -1;

function setup() {
  createCanvas(800, 800);
  
}

function draw() {

  background('black');
  noStroke();

//Print Instructions
  if (treeType === -1){
    fill('white');
    textSize(20);
    text ("Tree type not selected", 308, 50);
    text ("Select a tree using 1, 2, 3!", 290, 80);
  }
  else if (treeType === 0){
    fill('white');
    textSize(20);
    text ("Select tree type using 1, 2, 3!", 280, 60);
  }
   else if (treeType === 1){
    fill('white');
    textSize(20);
    text ("Tree type 1 selected!", 310, 50);
    text ("Press R to reset selection!", 290, 80);
    drawTree1 (550, 100);
  }
   else if (treeType === 2){
    fill('white');
    textSize(20);
    text ("Tree type 2 selected!", 310, 50);
    text ("Press R to reset selection!", 290, 80);
    drawTree2 (550, 100);
  }
   else if (treeType === 3){
    fill('white');
    textSize(20);
    text ("Tree type 3 selected!", 310, 50);
    text ("Press R to reset selection!", 290, 80);
    drawTree3 (550, 100);
  }
  
  fill('white');  
  text ("Click on water to sail boats!", 280, 760);
  
  
  // Draw sky
  var sky = color('#b3e0f2');
  noStroke();
  
  // loop for drawing the sky
  for (i = 600; i > 0; i -= 50) {
    fill(sky);
    sky = lerpColor(sky, color('#45b3e0'), 0.15);
    ellipse(400, 400, i);
  }
  
  // Draw different sizes of clouds in the sky
  drawCloud(250, 250, 1.0);
  drawCloud(450, 280, 0.6);
  drawCloud(380, 150, 1.2);
  drawCloud(1200, 500, 0.5);
  
  
  // Draw a mountain on the right side of the canvas
  fill('#8c6d62');
  triangle(mountX, mountY, mountX + 165, mountY - 335, mountX + 348, mountY);
  fill('#6c4b40');
  triangle(mountX+300, mountY, mountX + 165, mountY - 335, mountX + 348, mountY);
  fill('#fff');
  beginShape();
  vertex(425, 345);
  vertex(465, 265);
  vertex(515, 355);
  vertex(490, 325);
  vertex(464, 343);
  vertex(454, 334);
  endShape(CLOSE);

  
  // Draw a mountain on the left side of the canvas
  fill('#8c6d62');
  triangle(mountX - 150, mountY, mountX - 15, mountY - 265, mountX + 150, mountY);
  fill('#6c4b40');
  triangle(mountX + 50, mountY, mountX - 15, mountY - 265, mountX + 150, mountY);
  fill('#fff');
  beginShape();
  vertex(257, 390);
  vertex(285, 335);
  vertex(314, 380);
  vertex(298, 390);
  vertex(274, 380);
  endShape(CLOSE);
  

// Draw the waterbody
  noStroke();
  fill("#4ccfe0");
  rect(100, 650, 600, 80, 80);
  
  fill("#b1eaf1");
  rect(150, 660, 50, 10, 10);
  rect(600, 710, 50, 10, 10);

// Draw the land
  fill('#F9DE89');
  rect(100, 600, 600, 50, 25);
  
// Drawing trees from tree array
  for(let i = 0; i < tree.length; i++){
    //check treetype
    if (tree[i][0] === 1){
      drawTree1 (tree[i][1], tree[i][2]);
    }
    else if (tree[i][0] === 2){
      drawTree2 (tree[i][1], tree[i][2]);
    }
    else if (tree[i][0] === 3){
      drawTree3 (tree[i][1], tree[i][2]);
    }
  }

  
  //move boat on the river
  for(let i = 0; i < boat.length; i++){
    // display and move boat
    boat[i].display();
    boat[i].move();
  }

}

//a new boat will appear at every click from the start of the river and go across the screen
  function mouseClicked() {
    if (checkWater(mouseX, mouseY)){
      boat.push(new Boat(180, 700));
    } 
    else if (checkLand(mouseX, mouseY)){
      if (treeType === 1){
        tree.push([treeType,mouseX, mouseY]);
      }
      else if (treeType === 2){
        tree.push([treeType,mouseX, mouseY]);
      }
      else if (treeType === 3){
        tree.push([treeType,mouseX, mouseY]);
      }
    }
}

//key pressed function for selection of trees (3 treeTypes)
  function keyPressed() {
    if (key === "1"){
      treeType = 1;
    } 
    else if (key === "2"){
      treeType = 2;
    }
    else if (key === "3"){
      treeType = 3;
    }
    else if (key === "r"){
      treeType = 0;
    }
    else {
      treeType = -1;
    }
  }

//Function to check if click in on the water area

  function checkWater(mouseX, mouseY){
    if ((mouseX < 700) && (mouseX > 100) && (mouseY > 650) && (mouseY < 730)){
      return true;
    }
    else {
      return false;
    }
}

//Function to check if click is on the land area
  function checkLand(mouseX, mouseY){
    if ((mouseX < 700) && (mouseX > 100) && (mouseY > 600) && (mouseY < 650)){
      return true;
    }
    else {
      return false;
    }
}

  //Function for drawing a cloud
  function drawCloud (cloudX, cloudY, scaleX){
    
    fill('#f6f6f6');
    noStroke();
    push();
    scale(scaleX);
    ellipse(cloudX, cloudY + 30, 180, 20);
    ellipse(cloudX - 35, cloudY + 20, 60, 30);
    ellipse(cloudX + 35, cloudY + 20, 60, 30);
    ellipse(cloudX, cloudY +10, 80, 60);
    pop();
  }
  

  // Function for tree type 1
  function drawTree1 (treeX, treeY){
    
    fill('#4d332d');
    rect(treeX, treeY - 20, 5, 20, 3);
    fill("#FC7933");
    ellipse(treeX + 3, treeY - 50, 50, 70);
    fill("#CF4C06");
    arc(treeX + 3, treeY - 50, 50, 70, -HALF_PI, HALF_PI); 
  }
  
  // Function for tree type 2
  function drawTree2 (treeX, treeY){
    
    fill('#4d332d');
    rect(treeX, treeY - 20, 5, 20, 3);
    fill("#C3C1C1");
    triangle(treeX-15, treeY-15, treeX+3, treeY-70, treeX+18, treeY-15);
    fill("#FEF8F4");
    triangle(treeX-15, treeY-15, treeX+3, treeY-70, treeX+3, treeY-15);
  }
  
  // Function for tree type 3
  function drawTree3 (treeX, treeY){
    
    fill('#4d332d');
    rect(treeX, treeY - 20, 5, 20, 3);
    fill("#587239");
    rect(treeX-18, treeY-85, 40, 70, 6);
    fill("#ABD27D");
    rect(treeX-18, treeY-85, 20, 70, 6, 0, 0, 6);
  }

  // Function for boat
  function drawBoat(boatX, boatY){
  
  fill("#F8CD28");
  noStroke();
  quad(boatX-74, boatY-14, boatX, boatY-14, boatX-11, boatY, boatX-65, boatY)
  
  //mainsail
  fill("white");
  noStroke();
  triangle(boatX-33, boatY-68, boatX-33, boatY-20, boatX-67, boatY-20);
  triangle(boatX-32, boatY-74, boatX-11, boatY-20, boatX-32, boatY-20);
  
  //mast
  stroke("#946D42");
  strokeWeight(2);
  line(boatX-34, boatY-79, boatX-34, boatY-14);
    
}

//object class for boat
  class Boat{
    constructor(x, y) {
      this.x = x;
      this.y = y;
  }
  
// if boat reaches end of water, make it disappear
  display() {
    if (this.x < 700){
      drawBoat(this.x, this.y);
    }
  }

// move boat only till end of water stream
  move() {
    if (this.x < 700){
      this.x++;
    }
  }
}
  
  
  

