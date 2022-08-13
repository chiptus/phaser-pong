import "phaser";
import ballUrl from "../assets/ball.png";
import paddleUrl from "../assets/paddle.png";

export class GameScene extends Phaser.Scene {
  playerL?: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  playerR?: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;

  cursors?: {
    keyW: Phaser.Input.Keyboard.Key;
    keyS: Phaser.Input.Keyboard.Key;
    keyUp: Phaser.Input.Keyboard.Key;
    keyDown: Phaser.Input.Keyboard.Key;
  };

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
    // draw the ball
    this.add.image(400, 300, "ball");

    // draw left player
    this.playerL = this.physics.add.image(50, 300, "paddle");
    this.playerL.setCollideWorldBounds(true);

    // draw right player
    this.playerR = this.physics.add.image(750, 300, "paddle");
    this.playerR.setCollideWorldBounds(true);

    const keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    const keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    const keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    const keyDown = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.DOWN
    );

    this.cursors = {
      keyW,
      keyS,
      keyUp,
      keyDown,
    };
  }

  update(): void {
    // make sure all relevant properties are defined
    if (!this.playerL || !this.playerR || !this.cursors) {
      return;
    }

    // handle left player movement
    this.playerL.setVelocity(0);

    if (this.cursors.keyW.isDown) {
      this.playerL.setVelocityY(-300);
    } else if (this.cursors.keyS.isDown) {
      this.playerL.setVelocityY(300);
    }

    // handle right player movement
    this.playerR.setVelocity(0);

    if (this.cursors.keyUp.isDown) {
      this.playerR.setVelocityY(-300);
    } else if (this.cursors.keyDown.isDown) {
      this.playerR.setVelocityY(300);
    }
  }
}
