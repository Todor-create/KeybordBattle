import { Boot } from "./Boot";

class Preload extends Phaser.Scene {

    constructor() {
        super("preload");
    }

    create() {
        this.load.on("progress", this.onProgressUpdated, this);
        this.load.on("load", this.onFileLoaded, this);
        this.load.on("complete", this.onComplete, this);

        this.load.atlas("balistaAnim", "./assets/images/balistaAnim.png", "./assets/images/balistaAnim.json");
        this.load.atlas("cannonAnim", "./assets/images/cannonAnim.png", "./assets/images/cannonAnim.json");
        this.load.atlas("ogers", "./assets/images/ogers.png", "./assets/images/ogers.json");

        this.load.image("128x64", "./assets/images/128x64.png");
        this.load.image("desert128x64", "./assets/images/desert128x64.png");
        this.load.image("grass128x64", "./assets/images/grass128x64.png");
        this.load.image("buildingIcon", "./assets/images/buildingIcon.png");
        this.load.image("pointer", "./assets/images/pointer.png");
        this.load.tilemapTiledJSON("testMap", "./assets/images/testMap.json");
        
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