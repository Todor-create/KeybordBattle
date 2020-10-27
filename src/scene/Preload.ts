import { Boot } from "./Boot";

class Preload extends Phaser.Scene {

    constructor() {
        super("preload");
    }

    create() {
        this.load.on("progress", this.onProgressUpdated, this);
        this.load.on("load", this.onFileLoaded, this);
        this.load.on("complete", this.onComplete, this);

        this.load.spritesheet("ogerFront", "./assets/images/ogerFront.png", {frameWidth: 37, frameHeight: 64});
        this.load.atlas("balistaAnim", "./assets/images/balistaAnim.png", "./assets/images/balistaAnim.json");
        this.load.atlas("cannonAnim", "./assets/images/cannonAnim.png", "./assets/images/cannonAnim.json");
        this.load.atlas("ogers", "./assets/images/ogers.png", "./assets/images/ogers.json");
                  
        this.load.start();
    }

    private onProgressUpdated(value: number): void {
        console.log("progress update:", value);
    }

    private onFileLoaded(file: Phaser.Loader.File): void {
        console.log("file loaded: ", file);
    }

    private onComplete(): void {
        console.log("load complete");

        this.scene.start("main");
    }
}

export { Preload }