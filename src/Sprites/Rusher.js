class Rusher extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'creeps',276);
        this.scene = scene;

        // Enable physics on this rusher
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);

        this.setActive(false);
        this.setVisible(false);
        this.body.setAllowGravity(false);
        this.setImmovable(true);
        this.atkCooldown = 100;
        this.atkCooldownCntr = 100;
        this.hunt = false;
    }

    update(){
        //keep within game bounds
        if(this.x > 1600){
            this.body.setVelocityX(-400);
        }
        else if(this.x < 50){
            this.body.setVelocityX(400);
        }
        else if(this.y > 900 ){
            this.body.setVelocityY(-400);
        }
        else if(this.y < 50 ){
            this.body.setVelocityY(400);
        }
        //if hunting, dont move, and let juggleNaut rusherAttack() move this rusher.
        else if(this.hunt == true){
            let x = 0;
        }
         //if not hunting, buzz around randomly
        else{
            let behav = Math.floor(Math.random() * 25);
            if(behav == 0){
                this.body.setVelocityX(-300);
            }
            else if (behav == 1){
                this.body.setVelocityX(300);
            }
            else if (behav == 2){
                this.body.setVelocityY(-150);
            }
            else if (behav == 3){
                this.body.setVelocityY(150);
            }
        }
    }
    makeActive() {
        this.hunt = false;
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
