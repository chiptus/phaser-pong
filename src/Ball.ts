import { Scene } from "phaser";
import { Player } from "./Player";

type PlayerTuple = [Player, Player];

interface Options {
  scene: Scene;
  players: PlayerTuple;
}

export class Ball {
  scene: Scene;
  players: PlayerTuple;

  gameObject?: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;

  constructor({ scene, players }: Options) {
    this.scene = scene;
    this.players = players;
  }

  setCallback(onCollideWithWorldBound: (winner: "left" | "right") => void) {
    this.scene.physics.world.on(
      Phaser.Physics.Arcade.Events.WORLD_BOUNDS,
      (
        body: Phaser.Physics.Arcade.Body,
        _up: boolean,
        _down: boolean,
        left: boolean,
        right: boolean
      ) => {
        if (body.gameObject !== this.gameObject) {
          return;
        }

        if (right || left) {
          // destroy the ball
          this.gameObject.destroy();
          // call the provided callback
          onCollideWithWorldBound(left ? "right" : "left");
        }
      }
    );
  }

  create() {
    this.gameObject = this.scene.physics.add.image(400, 300, "ball");
    this.gameObject.setVelocity(200, 200);
    this.gameObject.setCollideWorldBounds(true);
    this.gameObject.setBounce(1);
    this.players.forEach((p) => {
      if (p.gameObject && this.gameObject) {
        this.scene.physics.add.collider(this.gameObject, p.gameObject);
      }
    });

    this.gameObject.body.onWorldBounds = true;
  }

  update() {}
}
