class Main extends Phaser.Scene {
    private map: Phaser.Tilemaps.Tilemap;

    constructor() {
        super("main");
    }

    create() {
        this.map = this.make.tilemap({ key: "testMap" });

        let tileset: Phaser.Tilemaps.Tileset = this.map.addTilesetImage("tileset", "tileset");

        let groundLayer: Phaser.Tilemaps.StaticTilemapLayer = this.map.createStaticLayer("Groundlayer", tileset, 0, 0);
        
        console.log("MAIN");
    }

}

export { Main }