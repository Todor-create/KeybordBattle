import { EnemyOger } from "../enemies/EnemyOger";
import { EnemyArmoredOger } from "../enemies/EnemyArmoredOger";
import { CustomKeyboardInput } from "../utils/CustomKeyboardInput";

class Main extends Phaser.Scene {
    private tileWidthHalf: number;
    private tileHeightHalf: number;
    private keys: CustomKeyboardInput;
    private mapwidth: number = 15;
    private mapheight: number = 15;
    private enemy1: EnemyOger;
    constructor() {
        super("main");
    }

    preload() {
        this.load.json('testMap', './assets/images/testMap.json');
        this.load.spritesheet('tileset', './assets/images/tileset.png', { frameWidth: 128, frameHeight: 64 });
    }
    create() {
        this.buildMap();

        let enemyOger1: Phaser.Physics.Arcade.Sprite = new EnemyOger(this, 240, 555);
        // let enemyArmoredOger1: Phaser.Physics.Arcade.Sprite = new EnemyArmoredOger(this, 280, 595);
        this.add.existing(enemyOger1);
        enemyOger1.setDepth(700);
        
        this.enemy1 = new EnemyOger(this, 220, 550);
        this.enemy1.startOnPath();
        this.enemy1.setDepth(1000);        
        this.add.existing(this.enemy1);

        
        this.cameras.main.setBounds(0, -15, this.mapwidth * 128, this.mapheight * 64, true);
        this.keys = new CustomKeyboardInput(this);
        
        console.log("MAIN");
    }

    update() {
        this.handleKeyboardInput();
        
    }

    buildMap(): void {
        //  Parse the data out of the map
        let data = this.cache.json.get('testMap');

        let tilewidth = data.tilewidth;
        let tileheight = data.tileheight;

        this.tileWidthHalf = tilewidth / 2;
        this.tileHeightHalf = tileheight / 2;

        let layer = data.layers[0].data;

        let mapwidth = data.layers[0].width;
        let mapheight = data.layers[0].height;

        let centerX = mapwidth * this.tileWidthHalf;
        let centerY = 16;

        let i = 0;

        for (let y = 0; y < mapheight; y++) {
            for (let x = 0; x < mapwidth; x++) {
                let id = layer[i] - 1;

                let tx = (x - y) * this.tileWidthHalf;
                let ty = (x + y) * this.tileHeightHalf;

                let tile = this.add.image(centerX + tx, centerY + ty, 'tileset', id);

                tile.depth = centerY + ty;

                i++;
            }
        }

    }

    // add controls for the camera
    private handleKeyboardInput(): void {
        
        if (this.keys.up.isDown || this.keys.w.isDown) {
            this.cameras.main.scrollY -= 7;
        } else if (this.keys.down.isDown || this.keys.s.isDown) {
            this.cameras.main.scrollY += 7;
        }

        if (this.keys.left.isDown || this.keys.a.isDown) {
            this.cameras.main.scrollX -= 7;
        } else if (this.keys.right.isDown || this.keys.d.isDown) {
            this.cameras.main.scrollX += 7;
        }

    }
}

export { Main }