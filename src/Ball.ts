import { Scene } from "phaser";

interface Options {
  scene: Scene;
}

export class Ball {
  scene: Scene;
  gameObject?: Phaser.Physics.Arcade.Image;

  constructor({ scene }: Options) {
    this.scene = scene;
  }

  create() {
    this.gameObject = this.scene.physics.add.image(400, 300, "ball");
  }

  update() {}
}
