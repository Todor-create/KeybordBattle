import { EnemyOger } from "../enemies/EnemyOger";

class Main extends Phaser.Scene {
    private map: Phaser.Tilemaps.Tilemap;

    constructor() {
        super("main");
    }

    // var tileWidthHalf;
    // var tileHeightHalf;
    

    create() {
    
        let enemyOger1: Phaser.Physics.Arcade.Sprite = new EnemyOger(this, 100, 100);

        this.add.existing(enemyOger1);        

        // this.map = this.make.tilemap({ key: "testMap" });

        // let tileset: Phaser.Tilemaps.Tileset = this.map.addTilesetImage("tileset", "tileset");

        // let groundLayer: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("GroundLayer", tileset, 0, 0);
        


        console.log("MAIN");
    }

}

export { Main }