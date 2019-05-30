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

    const player = this.player = this.physics.add.sprite(100, 450, 'dude');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.physics.add.collider(player, platforms);

    const stars = this.stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: {x: 12, y: 0, stepX: 70},
    });

    stars.children.iterate((child) => {
      child.setBounceY(this.randBetween('stars', 0.4, 0.8));
    });

    this.physics.add.collider(stars, platforms);

    this.physics.add.overlap(player, stars, this.collectStar, null, this);
  }

  setupAnimations() {
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{key: 'dude', frame: 4}],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
      frameRate: 10,
      repeat: -1,
    });
  }

  collectStar(player, star) {
    star.disableBody(true, true);
  }

  fixedUpdate(time, dt) {
    const {command, player} = this;

    if (command.left.held) {
      player.setVelocityX(-160);
      player.anims.play('left', true);
    } else if (command.right.held) {
      player.setVelocityX(160);
      player.anims.play('right', true);
    } else {
      player.setVelocityX(0);
      player.anims.play('turn');
    }

    if (command.jump.held && player.body.touching.down) {
      player.setVelocityY(-330);
    }
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
