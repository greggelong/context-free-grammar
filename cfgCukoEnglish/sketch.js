//  the contex free grammar expansion algorithm is based on
//  david shiffman's from the coding train



let rules = {
  "S": [
    ["PosP", "VP"], ["VP"]
  ],

  "VP": [
    ["Adv_mode", "VI"],
  ],

  "PosP": [
    ["Adv_mode", "Pos"],

  ],
  "Pos": [
    ["moves up"], ["moves down"], ["moves left"], ["moves right"]
  ],

  "Adv_mode": [
    ["loudly"], ["abruptly"], ["firmly"], ["lightly"], ["quickly"], ["wearily"], ["weirdly"], ["wholeheartedly"], ["crazily"],
  ],

  "VI": [
    ["sniffs"], ["licks"], ["whines"], ["scratches"], ["chews"], ["presents paw"], ["barks"], ["pants"], ["drinks"],
  ]
};



let button;
let para;
let img;
let cvs;
let pointCan;
let cuko;
let step=20;
let sz=20;
let tog = 0;
function preload() {
  img = loadImage('chewkoTrans.png');
  
}


function setup() {
  
  cvs = select('#canvasHolder');
  cvs = createCanvas(400, 400);
  //cnvs.background(93, 0, 172);
  cvs.parent('canvasHolder');  // sticks the canvas into this html div set in index
  pointCan = createGraphics(400,400);
  pointCan.clear()
  background(111, 234, 44);
  imageMode(CENTER);
  button = select('#button');
  noLoop();
  button.mousePressed(toggle);
  //para = createP("Cuko's communication");
  para = select('#output');
  
  cuko = createVector(width/2, height/2);
  pointCan.fill(0);
  pointCan.ellipse(cuko.x, cuko.y, sz, sz);
  image(img,cuko.x,cuko.y,sz*2,sz*2);
  frameRate(1);
  

}

// not using this center canvas function instead putting directly into html and selecting it
function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cvs.position(x, y);
  button.position(x,y+height+10);
  
}

function toggle(){
  
 if (tog === 0){
  loop(); 
  tog = 1;
  button.html("Pause Cuko");
 }else{
   noLoop();
   tog =0;
   button.html("Start Cuko");
 }
  
 
  
}

function draw(){
  background(111, 234, 44);
  
  image(pointCan,200,200); // for the point canvas here beacuse image mode is center
  cfg();
  //noLoop();
  
}


function expand(start, expansion) {
  if (rules[start]) {
    var pick = random(rules[start]);
    //console.log(pick);
    for (var i = 0; i < pick.length; i++) {
      expand(pick[i], expansion);
    }
  } else {
    expansion.push(start); // pushes the terminal rule to the sentence
    vizTerm(start); // visualizes that part of the sentence
    }
  
  return expansion.join(" ");
}


function vizTerm(term){
  
  switch (term) {
      case "moves up":
        // code block
        cuko.y = cuko.y-step;
        pointCan.fill(153,0,0);
        break;
      case "moves down":
        // code block
        cuko.y= cuko.y+step%(height*sz);
        pointCan.fill(148, 0, 255);
        break;
        
      case "moves left":
        // code block
        cuko.x = cuko.x-step%(width*sz);
        pointCan.fill(186, 180, 20);
        break;
      case "moves right":
        // code block
        cuko.x = cuko.x+step%(width*sz);
        pointCan.fill(0, 242, 255);
        break;
        
      case "barks":
        // code block
        //
        pointCan.fill(255,0,0,100);
        pointCan.rect(cuko.x,cuko.y,40,40);
        break;
      default:
        // code block
  
  }
}


function cfg() {

  var start = "S";
  var expansion = [];
  var result = expand(start, expansion);
  // console.log(result);
  para.html(result+"\n", "- ");
  console.log(result);
  pointCan.ellipse(abs(cuko.x%width), abs(cuko.y%height), sz, sz);
  image(img,abs(cuko.x%width),abs(cuko.y%height),sz*2,sz*2);


}