abstract class Enemy extends Phaser.Physics.Arcade.Sprite {
    protected hitPoints: number;
    protected movementSpeed: number;
    private movementTween: Phaser.Tweens.Tween;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string, hp: number = 1, speed: number = 100) {
        super(scene, x, y, texture, frame);

        this.hitPoints = hp;
        this.movementSpeed = speed;

        this.scene.physics.add.existing(this);
    }

    public get isAlive(): boolean {
        return this.hitPoints > 0;
    }

    public get hp(): number {
        return this.hitPoints;
    }

    public enemyPath() {
        let follower: any = { t: 0, vec: new Phaser.Math.Vector2() };
        let path = new Phaser.Curves.Path(this.x, this.y);
        path.lineTo(this.x += 4 * 128, this.y += 4 * 64);
        path.lineTo(this.x += 4 * 128, this.y -= 4 * 64);
        path.lineTo(this.x += 5 * 128, this.y += 5 * 64);
        path.lineTo(this.x += 3 * 128, this.y -= 3 * 64);
        path.lineTo(this.x += 5 * 128, this.y += 5 * 64);

        this.movementTween = this.scene.tweens.add({
            targets: follower,
            t: 1,
            ease: Phaser.Math.Easing.Linear.Linear,
            duration: 12000,
            // onComplete: () => {
            //     gameOver;
            // },
            onUpdate: () => {
                path.getPoint(follower.t, follower.vec);
                
                this.x = follower.vec.x;
                this.y = follower.vec.y;
            }
        });
    }
    
}

export { Enemy }
