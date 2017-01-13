let stage;
let mask;
let dot;
let donkey;
let pinata;
let clicks = 0;

const resize = () => {
  stage.canvas.width = window.innerWidth;
  stage.canvas.height = window.innerHeight;
};

const handlePress = () => {
  addEventListener('mousemove', handleMove);
};

const handleMove = () => {
  mask.x = stage.mouseX;
  mask.y = stage.mouseY;
  stage.update();
};

/**
 * The next function simulates a swinging effect of an object with a click event effects.
 */
const swingSimulation = () => {
  let angle = 0;
  // let circ = new createjs.Graphics().beginFill('#0000FF').drawCircle(0, 0, 70);
  // let ball = new createjs.Shape(circ);
  // ball.regX = 20;
  // ball.regY = -200;
  // ball.x = window.innerWidth / 2;
  // ball.y = (window.innerHeight / 2) - 200;
  // createjs.Tween.get(ball, {loop:true})
  //   .to({rotation:30}, 1500, createjs.Ease.cubicOut)
  //   .to({rotation:0}, 1500, createjs.Ease.cubicIn)
  //   .to({rotation:-30},1500, createjs.Ease.cubicOut)
  //   .to({rotation:0}, 1500, createjs.Ease.cubicIn);
  // ball.cache(-70, -70, 140, 140);
  // stage.addChild(ball);


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
    .to({rotation:-15},1000, createjs.Ease.cubicOut)
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
  if (clicks > 10) {
    console.log('Clicks over 10 now...');
  }
};

/**
 * The next function can be used with click event to detect click at a specific coordinates and displaying
 * animation or any kind of visual effect at this particular position.
 * NOTE: clicks++ does not have relation to the animations, it is used only for storing the number
 * of clicks for later purposes.
 */
const clickParticle = (e) => {
  stage.removeChild(dot);
  let redDot = new createjs.Graphics().beginFill('#FF0000').drawCircle(0, 0, 10);
  dot = new createjs.Shape(redDot);
  dot.x = e.stageX;
  dot.y = e.stageY;
  stage.addChild(dot);
  createjs.Tween.get(dot).to({alpha:0}, 300);
  clicks++;

  console.log('Stage X: ' + e.stageX + ' Stage Y: ' + e.stageY);
};

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
  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", () => {
      stage.update();
  });
  swingSimulation();
  // reflection();
  // vectorMask();
  // vectorMaskWithBitmap();
  // vectorMaskDragDrop();
  resize();
};