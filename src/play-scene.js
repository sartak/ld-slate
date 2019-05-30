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

    this.score = 0;
    this.scoreText = this.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#000'});

    const bombs = this.bombs = this.physics.add.group();

    this.physics.add.collider(bombs, platforms);

    this.physics.add.collider(player, bombs, this.hitBomb, null, this);
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
    const {stars, bombs} = this;

    star.disableBody(true, true);

    this.score += 10;
    this.scoreText.setText(`Score: ${this.score}`);

    if (stars.countActive(true) === 0) {
      stars.children.iterate((child) => {
        child.enableBody(true, child.x, 0, true, true);
      });

      const x = (player.x < 400) ? this.randBetween('bomb', 400, 800) : this.randBetween('bomb', 0, 400);

      const bomb = bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(this.randBetween('bomb', -200, 200), 20);
    }
  }

  hitBomb(player, bomb) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');

    // gameOver in the example is undefined…
    this.time.addEvent({
      delay: 1000,
      callback: () => this.replaceWithSelf(),
    });
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
