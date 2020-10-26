import { Enemy } from "./Enemy";

class EnemyArmoredOger extends Enemy{
    private readonly baseSpeed: number = 1;
    private readonly baseHP: number = 1;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "Armored Ogre_Front-Walking-Right");

        this.movementSpeed = this.baseSpeed;
        this.hitPoints = this.baseHP;

        if (this.scene.textures.exists("Armored Ogre_Front-Walking-Right") == false) {
            this.scene.textures.addSpriteSheetFromAtlas("Armored Ogre_Front-Walking-Right", {
                frameWidth: 68,
                frameHeight: 102,
                atlas: "enemies",
                frame: "Armored Ogre_Front-Walking-Right"
            } as Phaser.Types.Textures.SpriteSheetFromAtlasConfig);
    
            this.scene.anims.create({
                key: "Armored Ogre_Front-Walking-Right.png",
                frames: this.scene.anims.generateFrameNames("Armored Ogre", { prefix: "Front-Walking-Right", start: 0, end: 30 }),
                frameRate: 20,
                repeat: -1
            });
        }    
        this.anims.play("Armored Ogre_Front-Walking-Right");
    }
}


export { EnemyArmoredOger }