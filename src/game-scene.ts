import "phaser";
import ballUrl from "../assets/ball.png";
import paddleUrl from "../assets/paddle.png";

export class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: "GameScene",
    });
  }

  preload(): void {
    this.load.image("ball", ballUrl);
    this.load.image("paddle", paddleUrl);
  }

  create(): void {
    this.add.image(400, 300, "ball");

    const playerL = this.physics.add.image(50, 300, "paddle");
    playerL.setCollideWorldBounds(true);

    const playerR = this.physics.add.image(750, 300, "paddle");
    playerR.setCollideWorldBounds(true);
  }

  update(): void {}
}
