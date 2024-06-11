class Peon extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'creeps',27);
        this.scene = scene;

        // Enable physics on this peon
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);

        this.setActive(false);
        this.setVisible(false);
        this.body.setAllowGravity(false);
        this.setImmovable(true);
        this.atkCooldown = 100;
        this.atkCooldownCntr = 100;
        this.spawnX = -1;
    }
    //keep peon tied to where it spawned
    update(){
        if(this.x >  this.spawnX + 50){
            this.body.setVelocityX(-100);
        }
        if(this.x < this.spawnX - 50){
            this.body.setVelocityX(100);
        }
    }
    makeActive() {
        //give a random initial velocity so not all peons move in synch.
        let init = Math.floor(Math.random() * 2);
        if(init == 0){
            this.body.setVelocityX(-100);
        }
        else{
            this.body.setVelocityX(100);
        }
        this.atkCooldown = 500;
        this.atkCooldownCntr = Math.floor(Math.random() * 50) + 50;
        this.setActive(true);
        this.setVisible(true);
        this.body.enable = true;
        
    }

    makeInactive() {
        this.setActive(false);
        this.setVisible(false);
        this.body.enable = false;
    }
    setSpawnX(spawn){
        this.spawnX = spawn;
    }
}
