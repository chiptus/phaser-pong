import { Physics, Scene } from "phaser";

interface CursorOptions {
  keyUp: number;
  keyDown: number;
}

interface Options {
  scene: Scene;
  startX: number;
  cursors: CursorOptions;
}

export class Player {
  scene: Scene;
  startX: number;
  cursorOptions: CursorOptions;

  gameObject?: Physics.Arcade.Image;
  keyUp?: Phaser.Input.Keyboard.Key;
  keyDown?: Phaser.Input.Keyboard.Key;

  constructor({ scene, startX, cursors }: Options) {
    this.scene = scene;
    this.startX = startX;
    this.cursorOptions = cursors;
  }

  create() {
    this.gameObject = this.scene.physics.add.image(this.startX, 300, "paddle");
    this.gameObject.setCollideWorldBounds(true);
    this.gameObject.setPushable(false);

    this.keyUp = this.scene.input.keyboard.addKey(this.cursorOptions.keyUp);
    this.keyDown = this.scene.input.keyboard.addKey(this.cursorOptions.keyDown);
  }

  update() {
    if (!this.gameObject) {
      return;
    }

    this.gameObject?.setVelocity(0);

    if (this.keyUp?.isDown) {
      this.gameObject?.setVelocityY(-300);
    } else if (this.keyDown?.isDown) {
      this.gameObject?.setVelocityY(300);
    }
  }

  destroy() {
    this.gameObject?.destroy();
    this.gameObject = undefined;
  }
}
