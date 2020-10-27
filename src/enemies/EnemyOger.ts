import { Enemy } from "./Enemy";

class EnemyOger extends Enemy{
    private readonly baseSpeed: number = 1;
    private readonly baseHP: number = 1;
    

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "ogerFront");

        this.movementSpeed = this.baseSpeed;
        this.hitPoints = this.baseHP;
       
        
        // if (this.scene.textures.exists("Ogre_Front-Walking.png") == false) {
        //     this.scene.textures.addSpriteSheetFromAtlas("Ogre_Front-Walking.png", {
        //         frameWidth: 34,
        //         frameHeight: 51,
        //         atlas: "ogers",
        //         frame: "Ogre_Front-Walking.png"
        //     } as Phaser.Types.Textures.SpriteSheetFromAtlasConfig);
    
        //     this.scene.anims.create({
        //         key: "Ogre_Front-Walking.png",
        //         frames: this.scene.anims.generateFrameNames("Ogre_Front-Walking.png"),
        //         frameRate: 20,
        //         repeat: -1
        //     });
        // }    
        this.scene.anims.create({
            key: "ogerFront",
            frames: this.scene.anims.generateFrameNames("ogerFront"),
            frameRate: 20,
            repeat: -1
        }as Phaser.Types.Animations.Animation);

        this.scene.anims.create({
            key: "ogerBack",
            frames: this.scene.anims.generateFrameNames("ogerBack"),
            frameRate: 20,
            repeat: -1
        }as Phaser.Types.Animations.Animation);

        // this.anims.play("ogerFront");
        if (this.y--){
            this.anims.play("ogerBack");
        } else if(this.y++) {
            this.anims.stop();
            this.anims.play("ogerFront");
        }
    }

    public startOnPath() {
        let follower: any = { t: 0, vec: new Phaser.Math.Vector2() };
        let path = new Phaser.Curves.Path(this.x, this.y);
        path.lineTo(this.x += 2 * 128, this.y -= 2 * 64);
        path.lineTo(this.x += 2 * 128, this.y += 2 * 64);
        path.lineTo(this.x += 2.5 * 128, this.y -= 2.5 * 64);
        path.lineTo(this.x += 1.5 * 128, this.y += 1.5 * 64);
        path.lineTo(this.x += 3 * 128, this.y -= 3 * 64);

        this.scene.tweens.add({
            targets: follower,
            t: 1,
            ease: Phaser.Math.Easing.Linear.Linear,
            duration: 60000,
            // onComplete: () => {
            //     gameOver;
            // },
            onUpdate: () => {
                path.getPoint(follower.t, follower.vec);
                
                this.x = follower.vec.x;
                this.y = follower.vec.y;
            }
        });
    }
}


export { EnemyOger }