import SuperScene from './scaffolding/SuperScene';
import prop from './props';
import analytics from './scaffolding/lib/analytics';

import skyImage from './assets/sky.png';
import groundImage from './assets/platform.png';
import starImage from './assets/star.png';
import bombImage from './assets/bomb.png';
import dudeImage from './assets/dude.png';

export default class PlayScene extends SuperScene {
  constructor() {
    super({
      input: {
        gamepad: true,
      },
      physics: {
        arcade: {
          fps: 60,
          gravity: {y: 300},
        },
      },
    });

    this.performanceProps = [];
    this.mapsAreRectangular = true;
  }

  initialSaveState() {
    return {
      createdAt: Date.now(),
    };
  }

  saveStateVersion() {
    return 1;
  }

  migrateSaveStateVersion1(save) {
  }

  init(config) {
    super.init(config);
  }

  preload() {
    super.preload();

    this.load.image('sky', skyImage);
    this.load.image('ground', groundImage);
    this.load.image('star', starImage);
    this.load.image('bomb', bombImage);
    this.load.spritesheet('dude',
      dudeImage,
      {frameWidth: 32, frameHeight: 48});
  }

  create(config) {
    super.create(config);

    this.add.image(400, 300, 'sky');

    const platforms = this.platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
  }

  setupAnimations() {
  }

  fixedUpdate(time, dt) {
  }

  launchTimeSight() {
    super.launchTimeSight();
  }

  renderTimeSightFrameInto(scene, phantomDt, time, dt, isLast) {
    const objects = [];

    return objects;
  }

  debugHandlePointerdown(event) {
    let {x, y} = event;

    x += this.cameras.main.scrollX;
    y += this.cameras.main.scrollY;

  }

  _hot() {
  }
}
