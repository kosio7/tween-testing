let stage;
let mask;
let dot;
let objDraw;
let donkey;
let pinata;
let clicks = 0;
let colors = ['#FF0000', '#00FF00', '#0000FF', '#787d84', '#e3e5e8'];
let loaderBar;
let loadInterval;
let percentLoaded = 0;

const resize = () => {
  stage.canvas.width = window.innerWidth;
  stage.canvas.height = window.innerHeight;
};

/**
 * Not used, created only for some test purposes.
 */
const handlePress = () => {
  addEventListener('mousemove', handleMove);
};

/**
 * Not used, created only for some test purposes.
 */
const handleMove = () => {
  mask.x = stage.mouseX;
  mask.y = stage.mouseY;
  stage.update();
};

/**
 * The next function simulates a swinging effect of an object with a click event effects.
 */
const swingSimulation = () => {

  donkey = new Image();
  donkey.src = 'img/pinata.png';
  pinata = new createjs.Bitmap(donkey);
  pinata.regX = 80;
  pinata.regY = -200;
  pinata.x = window.innerWidth / 2;
  pinata.y = (window.innerHeight / 2) - 200;
  createjs.Tween.get(pinata, {loop:true})
    .to({rotation:15}, 1000, createjs.Ease.cubicOut)
    .to({rotation:0}, 1000, createjs.Ease.cubicIn)
    .to({rotation:-15}, 1000, createjs.Ease.cubicOut)
    .to({rotation:0}, 1000, createjs.Ease.cubicIn);
  pinata.cache(-160, -186, 320, 372);
  stage.addChild(pinata);

  // const tick = (event) => {
  //     angle += 0.050;
  //     let scale = Math.cos(angle);
  //     ball.setTransform(ball.x, ball.y, scale, scale);
  //     stage.update(event); 
  // };
  // createjs.Ticker.addEventListener('tick', tick);

  pinata.on('click', clickParticle);
};

/**
 * The next function can be used with click event to detect click at a specific coordinates and displaying
 * animation or any kind of visual effect at this particular position.
 * NOTE: clicks++ does not have relation to the animations, it is used only for storing the number
 * of clicks for later purposes.
 * NOTE: There is some more logic inside for now. Tweening of random object to a specific position based on
 * the object's color.
 */
const clickParticle = (e) => {
  stage.removeChild(dot);
  let color = colors.splice(Math.floor(Math.random()*colors.length), 1);    //TODO: We have a total of 21 icons

  let redDot = new createjs.Graphics().beginFill('#FF0000').drawCircle(0, 0, 10);
  dot = new createjs.Shape(redDot);
  dot.x = e.stageX;
  dot.y = e.stageY;
  stage.addChild(dot);
  createjs.Tween.get(dot).to({alpha:0}, 300);

  let object = new createjs.Graphics().beginFill(color[0]).drawCircle(0, 0, 10);
  objDraw = new createjs.Shape(object);
  objDraw.regX = 5;
  objDraw.regY = 5;
  objDraw.x = window.innerWidth / 2;
  objDraw.y = (window.innerHeight / 2) + 100;

  if (color[0] === '#FF0000') {
    createjs.Tween.get(objDraw).to({x: (objDraw.x) - 50, y: (objDraw.y) - 20}, 400)
      .wait(300)
      .to({x: 40, y: 150}, 400);
    stage.addChild(objDraw);
  } else if (color[0] === '#00FF00') {
    createjs.Tween.get(objDraw).to({x: (objDraw.x) - 50, y: (objDraw.y) - 35}, 400)
      .wait(300)
      .to({x: 40, y: 180}, 400);
    stage.addChild(objDraw);
  } else if (color[0] === '#787d84') {
    createjs.Tween.get(objDraw).to({x: (objDraw.x) - 50, y: (objDraw.y) - 10}, 400)
      .wait(300)
      .to({x: 40, y: 210}, 400);
    stage.addChild(objDraw);
  } else if (color[0] === '#e3e5e8') {
    createjs.Tween.get(objDraw).to({x: (objDraw.x) - 50, y: (objDraw.y) - 10}, 400)
      .wait(300)
      .to({x: 40, y: 240}, 400);
    stage.addChild(objDraw);
  } else {
    createjs.Tween.get(objDraw).to({x: (objDraw.x) - 50, y: (objDraw.y) - 10}, 400)
      .wait(300)
      .to({x: 40, y: 270}, 400);
    stage.addChild(objDraw);
  }
  console.log('Stage X: ' + e.stageX + ' Stage Y: ' + e.stageY);
  clicks++;
  console.log(clicks);
};

/**
 * Eventually to be used for the Pinata side feature?
 */
const loadingBar = () => {
  loaderBar = new createjs.Shape();
  loaderBar.x = window.innerWidth - 100;
  loaderBar.y = window.innerHeight - 500;
  loaderBar.graphics.setStrokeStyle(2);
  loaderBar.graphics.beginStroke("#00f");
  loaderBar.graphics.drawRect(20, 20, 40, 400);
  stage.addChild(loaderBar);
  console.log('Loading bar function fired!');
};

/**
 * The next three functions are for the filling of the loading bar at a predetermined interval.
 */
const updateLoadingBar = () => {
  loaderBar.graphics.clear();
  loaderBar.graphics.beginFill('#00ff00');
  loaderBar.graphics.drawRect(20, 20, 40, 400 * percentLoaded);
  loaderBar.graphics.endFill();
  loaderBar.graphics.setStrokeStyle(2);
  loaderBar.graphics.beginStroke("#00f");
  loaderBar.graphics.drawRect(20, 20, 40, 400);
  loaderBar.graphics.endStroke();
};

const startLoad = () => {
  loadInterval = setInterval(updateLoad, 10);
};

const updateLoad = () => {
  percentLoaded += .0005;
  updateLoadingBar();

  if (percentLoaded >= 1) {
    clearInterval(loadInterval);
    //stage.removeChild(loaderBar);
  }
};

/**
 * Not used, created only for some test purposes.
 */
const reflection = () => {
  let image = new Image();
  image.src = 'img/ace4.png';


  let bitmap = new createjs.Bitmap(image);
  let width = 150;
  let height = 225;
  bitmap.x = 200;
  bitmap.y = 200;
  bitmap.skewY = -10;

  let reflected = bitmap.clone();
  reflected.regY = height;
  reflected.rotation = 180;

  reflected.y = height + 202;
  reflected.scaleX = -1;

  let maskShape = new createjs.Shape();
  let graphics = maskShape.graphics;
  graphics.beginLinearGradientFill(['rgba(255, 255, 255 , 0)', 'rgba(255, 255, 255, 0.6'],
  [0.5, 1], 0, 10, 0, height);

  graphics.drawRect(0, 0, width, height);
  graphics.endFill();
  maskShape.cache(0, 0, width, height);

  reflected.filters = [new createjs.AlphaMaskFilter(maskShape.cacheCanvas)];
  reflected.cache(0, 0, width, height);

  stage.addChild(bitmap);
  stage.addChild(reflected);
  stage.update();

};

/**
 * Not used, created only for some test purposes.
 */
const vectorMask = () => {
  let mask = new createjs.Shape();
  mask.graphics.drawCircle(0, 0, 30);
  mask.x = 100;
  mask.y = 100;

  let bg = new createjs.Shape();
  bg.graphics.clear().beginFill('red').rect(0, 0, 400, 200);
  bg.mask = mask;
  stage.addChild(bg);
};

/**
 * Not used, created only for some test purposes.
 */
const vectorMaskWithBitmap = () => {
  let mask = new createjs.Shape();
  mask.graphics.drawCircle(0, 0, 70);

  let img = new Image();
  img.src = 'img/ace4.png';
  mask.x = img.width / 2;
  mask.y = img.height / 2;
  let bg = new createjs.Bitmap(img);
  bg.filters = [new createjs.BlurFilter(5, 5, 10)];
  bg.cache(0, 0, 150, 225);
  bg.mask = mask;
  stage.addChild(bg);
};

/**
 * Not used, created only for some test purposes.
 */
const vectorMaskDragDrop = () => {
  mask = new createjs.Shape();
  mask.graphics.drawCircle(0, 0, 30);
  mask.x = 100;
  mask.y = 100;

  let bg = new createjs.Shape();
  bg.graphics.clear().beginFill('red').rect(0, 0, 400, 400);
  bg.mask = mask;

  bg.addEventListener('mousedown', handlePress);

  stage.addChild(bg);
};

const init = () => {
  stage = new createjs.Stage('canvas');
  createjs.Ticker.setFPS(60); //TODO: Get more info about the ticker settings, TIMEOUT, RAF, RAF_SYNCHED?
  createjs.Ticker.addEventListener("tick", () => {
    stage.update();
  });
  swingSimulation();
  loadingBar();
  startLoad();
  // reflection();
  // vectorMask();
  // vectorMaskWithBitmap();
  // vectorMaskDragDrop();
  resize();
};