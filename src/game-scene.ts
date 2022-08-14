import "phaser";
import ballUrl from "../assets/ball.png";
import paddleUrl from "../assets/paddle.png";
import { Player } from "./Player";
import { Ball } from "./Ball";

export class GameScene extends Phaser.Scene {
  ball: Ball;

  playerL: Player;
  playerR: Player;
  score: {
    left: number;
    leftText?: Phaser.GameObjects.Text;

    right: number;
    rightText?: Phaser.GameObjects.Text;
  };

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

    this.score = {
      left: 0,
      right: 0,
    };
  }

  preload(): void {
    this.load.image("ball", ballUrl);
    this.load.image("paddle", paddleUrl);

    this.score.leftText = this.add.text(16, 16, "Left: 0", {
      fontSize: "32px",
      color: "#fff",
    });

    this.score.rightText = this.add.text(800 - 400, 16, "Right: 0", {
      fontSize: "32px",
      color: "#fff",
    });
  }

  create() {
    this.playerL.create();
    this.playerR.create();

    this.ball.setCallback((winner) => {
      this.addPoint(winner);
      if (this.score[winner] < 10) {
        this.ball.create();
      }
    });

    this.ball.create();
  }

  update() {
    this.playerL.update();
    this.playerR.update();
    this.ball.update();
  }

  addPoint(winner: "left" | "right") {
    this.score[winner]++;
    this.score[`${winner}Text`]?.setText(
      `${capitalize(winner)}: ${this.score[winner]}`
    );
  }
}

function capitalize(word = "") {
  if (!word) {
    return word;
  }

  return word.charAt(0).toUpperCase() + word.slice(1);
}
