abstract class Towers extends Phaser.GameObjects.Sprite {

    protected range: number;
    protected attackSpeed: number;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string,) {
        super(scene, x, y, texture, frame);

        this.range = 0;
        this.attackSpeed = 0; 
    }

}

export { Towers }