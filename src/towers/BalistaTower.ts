import { Towers } from "./Towers";

class BalistaTower extends Towers {

    private nextAttackTime: number = 0;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "balista_tower1_idle",);
           
        this.range = 500;
        this.attackSpeed = 400;
        

        this.scene.anims.create({
            key: "balista_tower1_idle",
            frames: this.scene.anims.generateFrameNames("balistaAnim", { prefix: "ballista_tower_lvl1_idle_", start: 1, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.setScale(0.5);
        this.anims.play('balista_tower1_idle');
        this.setDepth(600);
    }

    public update(): void {
        if (this.scene.time.now >= this.nextAttackTime) {
            this.nextAttackTime = this.scene.time.now + this.attackSpeed;
          console.log("fire");
        } 
   
        
    }


}

export { BalistaTower }