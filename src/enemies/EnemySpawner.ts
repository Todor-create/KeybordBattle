import { Enemy } from "./Enemy";
import { EnemyOger } from "../enemies/EnemyOger";
import { EnemyArmoredOger } from "../enemies/EnemyArmoredOger";

class EnemySpawner extends Phaser.GameObjects.Container {
    private readonly newWaveTimeStep: number = 3000;
    private readonly maxWaveCount: number = 5;

    public scene: Phaser.Scene;
    private enemiesArr: Enemy[];

    private lastWaveSpawnTime: number;
    private waveCount: number = 0;

    constructor(scene: Phaser.Scene) {
        super(scene);

        this.enemiesArr = [];
    }

    public get allEnemies(): Enemy[] {
        return this.enemiesArr;
    }

    public update(): void {
        if (this.waveCount >= this.maxWaveCount) {
            //TODO: end of level
            // console.warn("LEVEL ENDED!");
        } else {
            if ((this.enemiesArr.length == 0) || (this.scene.time.now > this.lastWaveSpawnTime + this.newWaveTimeStep && this.enemiesArr.length < 20)) {
                this.spawn();
            }
        }

        let i: number = 0;
        while (i < this.enemiesArr.length) {
            if (this.enemiesArr[i].active == false) {
                let enemy: Enemy = this.enemiesArr.splice(i, 1)[0];
                enemy.destroy();
            } else {
                i++;
            }
        }
        
    }

    public spawn(): void {
        this.waveCount++;

        this.lastWaveSpawnTime = this.scene.time.now;

        let choice: number = Math.random() - this.waveCount;

        if (choice < 0.95) {
            this.spawnOger();
        } else {
            this.spawnArmoredOger();
        }
    }

    private spawnOger(): void {
        let e: EnemyOger = new EnemyOger (this.scene, 200, 580);
            this.scene.add.existing(e);     
            this.enemiesArr.push(e);
    }
    private spawnArmoredOger(): void {
        let e: EnemyArmoredOger = new EnemyArmoredOger (this.scene, 200, 580);
            this.scene.add.existing(e);    
            this.enemiesArr.push(e);
    }
}

export { EnemySpawner }