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
    private enemy2: EnemyArmoredOger;

    constructor() {
        super("main");
    }

    preload() {
        this.load.json('testMap', './assets/images/testMap.json');
        this.load.spritesheet('tileset', './assets/images/tileset.png', { frameWidth: 128, frameHeight: 64 });
    }
    create() {
        this.buildMap();
                
        this.enemy1 = new EnemyOger(this, 200, 550);
        this.startOnPath();
        this.enemy1.setDepth(1000);        
        this.add.existing(this.enemy1);

        this.enemy2 = new EnemyArmoredOger(this, 220, 550);
        // this.enemy2.startOnPath();
        this.enemy2.setDepth(999);        
        this.add.existing(this.enemy2);

        
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
    public startOnPath() {
        let follower: any = { t: 0, vec: new Phaser.Math.Vector2() };
        let path = new Phaser.Curves.Path(this.enemy1.x, this.enemy1.y);
        path.lineTo(this.enemy1.x += 2.5 * 128, this.enemy1.y -= 2.5 * 64);
        path.lineTo(this.enemy1.x += 2 * 128, this.enemy1.y += 2 * 64);
        path.lineTo(this.enemy1.x += 2.5 * 128, this.enemy1.y -= 2.5 * 64);
        path.lineTo(this.enemy1.x += 1.5 * 128, this.enemy1.y += 1.5 * 64);
        path.lineTo(this.enemy1.x += 2.5 * 128, this.enemy1.y -= 2.5 * 64);

        this.tweens.add({
            targets: follower,
            t: 1,
            ease: Phaser.Math.Easing.Linear.Linear,
            duration: 70000,
            // onComplete: () => {
            //     gameOver;
            // },
            onUpdate: () => {
                path.getPoint(follower.t, follower.vec);
                
                let initialY: number = this.enemy1.y;

                this.enemy1.x = follower.vec.x;
                this.enemy1.y = follower.vec.y;

                if (this.enemy1.y < initialY) {
                    this.enemy1.anims.play("ogerBack", true);
                } else if (this.enemy1.y > initialY) {
                    this.enemy1.anims.play("ogerFront", true);
                }
            }
        });
    }
}

export { Main }