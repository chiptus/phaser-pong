import "phaser";
import ballUrl from "../assets/ball.png";
import paddleUrl from "../assets/paddle.png";
import { Player } from "./Player";
import { Ball } from "./Ball";

export class GameScene extends Phaser.Scene {
  ball: Ball;
  playerL: Player;
  playerR: Player;

  constructor() {
    super({
      key: "GameScene",
    });

    this.playerL = new Player({
      scene: this,
      startX: 50,
      cursors: {
        keyDown: Phaser.Input.Keyboard.KeyCodes.S,
        keyUp: Phaser.Input.Keyboard.KeyCodes.W,
      },
    });
    this.playerR = new Player({
      scene: this,
      startX: 750,
      cursors: {
        keyDown: Phaser.Input.Keyboard.KeyCodes.DOWN,
        keyUp: Phaser.Input.Keyboard.KeyCodes.UP,
      },
    });
    this.ball = new Ball({
      scene: this,
      players: [this.playerL, this.playerR],
    });
  }

  preload(): void {
    this.load.image("ball", ballUrl);
    this.load.image("paddle", paddleUrl);
  }

  create() {
    this.playerL.create();
    this.playerR.create();
    this.ball.create();
  }

  update() {
    this.playerL.update();
    this.playerR.update();
    this.ball.update();
  }
}
