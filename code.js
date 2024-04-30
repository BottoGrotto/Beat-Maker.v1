var width = 320;
var height = 320;

var j = 0;

var rows = 7;
var cols = 7;

var calculatedHeight = height - (rows*2);
var calculatedWidth = width - (cols*2);

var boxWidth = calculatedWidth/cols;
var boxHeight = calculatedHeight/rows;

var type = [["assets/high-string-Fs3.mp3", 
              "assets/high-string-Ds3.mp3", 
              "assets/high-string-C3.mp3",
              "assets/low-string-A2.mp3",
              "assets/low-string-Fs2.mp3",
              "assets/low-string-Ds2.mp3",
              "assets/low-string-C2.mp3"],
              ["assets/high-string-Fs5.mp3", 
              "assets/high-string-Ds5.mp3", 
              "assets/high-string-C5.mp3",
              "assets/high-string-A4.mp3",
              "assets/low-string-Fs4.mp3",
              "assets/low-string-Ds4.mp3",
              "assets/low-string-C4.mp3"],
              ["assets/low-marimba-Fs3.mp3", 
              "assets/low-marimba-Ds3.mp3", 
              "assets/low-marimba-C3.mp3",
              "assets/low-marimba-A2.mp3",
              "assets/low-marimba-Fs2.mp3",
              "assets/low-marimba-Ds2.mp3",
              "assets/low-marimba-C2.mp3"],
              ["assets/high-marimba-Fs5.mp3", 
              "assets/high-marimba-Ds5.mp3", 
              "assets/high-marimba-C5.mp3",
              "assets/high-marimba-A4.mp3",
              "assets/high-marimba-Fs4.mp3",
              "assets/high-marimba-Ds4.mp3",
              "assets/high-marimba-C4.mp3"]
              ];

var colorList = ["assets/black.png",
                "assets/purple.png",
                "assets/green.png",
                "assets/orange.png",
                "assets/pink.png",
                "assets/cyan.png",
                "assets/yellow.png",
                "assets/red.png"];

var iconList = ["",
                "assets/string-instruments-guitar-white-clip-art-png-favpng-r1vu718uSbMrCAnSLjAbhqYZH-removebg-preview.png",
                "assets/pngtree-marimba-solid-vector-icon-png-image_5045017-removebg-preview.png",
                ""];
                
var octiveList = ["",
                  "icon://fa-caret-down",
                  "icon://fa-caret-up",
                  ];

setStyle("screen1", "background: linear-gradient(purple,blue);");

function onClick(index) {
  return function () {
    var state = changeState(index);
    playIndividualSound(index, state);
  };
}

function playIndividualSound(index, state) {
  if (state != 0) {
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < cols; j++) {
        var location = grid[i][j][1];
        if (location == index){
          playSound(type[state-1][i]);
        }
      }
    }
  }
}

function create2DArray(rows, cols) {
  var arr = new Array(rows);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(cols);
    for (var j = 0; j < arr[i].length; j++) {
      arr[i][j] = new Array(2);
      arr[i][j][0] = 0;
      arr[i][j][1] = "" + i + j;
    }
  }
  return arr;
}

var instrumentIconIndex = 1;
function changeIandC(state, instrumentIconIndex, location, index) {
  var color = colorList[index+1];
  var icon = iconList[instrumentIconIndex];
  var upOrDown = (state % 2 == 0) ? 2: 1;
  var octive = octiveList[upOrDown];
  
  if (state == 0) {
    color = colorList[0];
    icon = iconList[0];
    octive = octiveList[0];
    console.log(color)
  }
  setProperty("octive" + location, "image", octive);
  setProperty("instrument" + location, "image", icon);
  setProperty("image" + location, "image", color);
}

function checkIfLast() {
  var count = 0;
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      var state = grid[i][j][0];
      if (state >= 1) {
        count++;
      }
    }
  }
  if (count >= 1) {
    showElement("clearButton");
    return false;
  } else {
    hideElement("clearButton");
    return true;
  }
}

function changeState(index) {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      var state = grid[i][j][0];
      var location = grid[i][j][1];
      var currentIcon = getProperty("instrument" + location, "image");
      if (location == index) {
        // console.log(index);
        // console.log(getProperty("image" + index, "width"));
        if ((state + 1 > type.length) != true) {
          if (state == 0) {
            if(instrumentIconIndex == 1) {
              state = 1;
            } else if (instrumentIconIndex == 2) {
              state = 3;
            }
          } else if ((state + 1) % 2 == 1 && currentIcon == iconList[instrumentIconIndex]){
            state = 0;
          } else {
            if (currentIcon != iconList[instrumentIconIndex]) {
              if(instrumentIconIndex == 1) {
                state = 1;
              } else if (instrumentIconIndex == 2) {
                state = 3;
              }
            } else {
              state++;
            }
          }
          grid[i][j][0] = state;
          changeIandC(state, instrumentIconIndex, location, i);
          checkIfLast();
          return state;
        } else {
          state = 0;
          grid[i][j][0] = state;
          changeIandC(state, instrumentIconIndex, location, i);
          checkIfLast();
          return state;
        }
      }
    }
  }
}

function clearGrid() {
  grid = create2DArray(rows, cols);
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      setProperty("image" + i + j, "image", colorList[0]);
      setProperty("instrument" + i + j, "image", iconList[0]);
      setProperty("octive" + i + j, "image", octiveList[0]);
    }
  }
}

var grid = create2DArray(rows, cols);

function createButtons(rows, cols) {
  var x = 0;
  var y = 60;
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      var imgName = "image" + i + j;
      image(imgName, "assets/download.png");
      hideElement(imgName);
      setProperty(imgName, "fit", "none");
      setPosition(imgName, x, y, boxWidth, boxHeight);
      onEvent(imgName, "click", onClick("" + i + j));
      x += boxWidth + 2;
      showElement(imgName);
      // console.log(imgName);
    }
    x = 0;
    y += boxHeight + 2;
  }
  
  
  createPlayer();
  
  var xx = 0;
  var yy = 60;
  for (var ii = 0; ii < rows; ii++) {
    for (var jj = 0; jj < cols; jj++) {
      image("instrument" + ii + jj, "");
      setPosition("instrument" + ii + jj, xx, yy, boxWidth, boxHeight);
      setProperty("instrument" + ii + jj, "border-width", 0);
      onEvent("instrument" + ii + jj, "click", onClick("" + ii + jj));
      
      image("octive" + ii + jj, "");
      setPosition("octive" + ii + jj, xx, yy, boxWidth/3, boxHeight/3);
      setProperty("octive" + ii + jj, "border-width", 0);
      setProperty("octive" + ii + jj, "icon-color", "black");
      onEvent("octive" + ii + jj, "click", onClick("" + ii + jj));
      xx += boxWidth + 2;
    }
    xx = 0;
    yy += boxHeight + 2;
  }
  clearGrid();
}

function movePlayerLocation(index) {
  var newLocation = getProperty("image" + index, "x");
  setProperty("playerLocation", "x", newLocation);
}

function convertBPM() {
  var bps = getProperty("bpmSlider", "value") / 60;
  var spb = 1 / bps;
  return spb * 1000;
}

var running;
function run() {
  var index;
  var state;
  for(var i = 0; i < rows; i++) {
    state = grid[i][j][0];
    if (state >= 1) {
      index = grid[i][j][1];
      playIndividualSound(index, state);
    }
    movePlayerLocation("" + i + j);
  }
  if (j + 1 >= cols) {
    j = 0;
  } else {
    j++;
  }
}

function createPlayer() {
  textLabel("playerLocation", "");
  setPosition("playerLocation", 0, 60, boxWidth + 1, height);
  setProperty("playerLocation", "background-color", "rgba(98, 208, 230, 0.4)");
  setProperty("playerLocation", "font-size", 0);
  setProperty("playerLocation", "border-width", 0);
  setProperty("playerLocation", "border-radius", 0);
  hideElement("playerLocation");
}

start();
function start() {
  createButtons(rows, cols);
}
var playerMoving = false;
function play() {
  console.log("Play Button Clicked!");
  var calculatedMs = convertBPM();
  running = setInterval(run, calculatedMs);
  playerMoving = true;
  showElement("stopButton");
  hideElement("playButton");
  showElement("playerLocation");
}

function stop() {
  console.log("Stop Button Clicked!");
  clearInterval(running);
  playerMoving = false;
  showElement("playButton");
  hideElement("stopButton");
  hideElement("playerLocation");
  movePlayerLocation("" + 0 + 0);
  j = 0;
}

onEvent("clearButton", "click", function () {
  clearGrid();
  hideElement("clearButton");
});

onEvent("stopButton", "click", function () {
  stop();
});

onEvent("playButton", "click", function() {
  play();
});

onEvent("bpmSlider", "input", function() {
  var sliderVal = getProperty("bpmSlider", "value");
  setProperty("bpmLabel", "text", "BPM: " + sliderVal);
});

onEvent("instrumentButton", "click", function () {
  if (instrumentIconIndex + 1 >= iconList.length - 1) {
    instrumentIconIndex = 1;
  } else {
    instrumentIconIndex++;
  }
  setProperty("instrumentButton", "image", iconList[instrumentIconIndex]);
});

onEvent("colsSlider", "change", function() {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      deleteElement("image" + i + j);
      deleteElement("instrument" + i + j);
      deleteElement("octive"+ i + j);
    }
  }
  
  deleteElement("playerLocation");
  
  cols = getProperty("colsSlider", "value");
  calculatedWidth = width - (cols*2);
  boxWidth = calculatedWidth/cols;
  
  grid = create2DArray(rows, cols);
  createButtons(rows, cols);
  if (playerMoving) {
    stop();
  }
});

onEvent("colsSlider", "input", function () {
  setProperty("colDisplay", "text", "Columns: " + getProperty("colsSlider", "value"));
});

