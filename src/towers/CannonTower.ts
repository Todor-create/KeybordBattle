import { Towers } from "./Towers";

class CannonTower extends Towers {
    
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "cannon_tower1_idle",);
           
        this.range = 500;
        this.attackSpeed = 400;

        this.scene.anims.create({
            key: "cannon_tower1_idle",
            frames: this.scene.anims.generateFrameNames("cannonAnim", { prefix: "Cannon_tower_lvl1_idle_", start: 1, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.setScale(0.5);
        this.anims.play('cannon_tower1_idle');
        this.setDepth(600);
    } 
}

export { CannonTower }