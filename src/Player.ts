import { Physics, Scene } from "phaser";

interface Options {
  scene: Scene;
  startX: number;
}

export class Player {
  scene: Scene;
  gameObject?: Physics.Arcade.Image;
  startX: number;

  constructor({ scene, startX }: Options) {
    this.scene = scene;
    this.startX = startX;
  }

  create() {
    // draw left player
    this.gameObject = this.scene.physics.add.image(this.startX, 300, "paddle");
    this.gameObject.setCollideWorldBounds(true);
    this.gameObject.setPushable(false);
  }

  update() {}
}
