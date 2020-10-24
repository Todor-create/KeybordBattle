import { Enemy } from "./Enemy";

class EnemyOger extends Enemy{
    private readonly baseSpeed: number = 1;
    private readonly baseHP: number = 1;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "Ogre_Front-Walking.png");

        this.movementSpeed = this.baseSpeed;
        this.hitPoints = this.baseHP;

        if (this.scene.textures.exists("Ogre_Front-Walking.png") == false) {
            this.scene.textures.addSpriteSheetFromAtlas("Ogre_Front-Walking.png", {
                frameWidth: 34,
                frameHeight: 51,
                atlas: "ogers",
                frame: "Ogre_Front-Walking.png"
            } as Phaser.Types.Textures.SpriteSheetFromAtlasConfig);
    
            this.scene.anims.create({
                key: "Ogre_Front-Walking.png",
                frames: this.scene.anims.generateFrameNames("Ogre_Front-Walking.png"),
                frameRate: 20,
                repeat: -1
            });
        }    
        this.anims.play("Ogre_Front-Walking.png");
    }
}


export { EnemyOger }