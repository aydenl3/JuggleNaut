class Archer extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'creeps',26);
        this.scene = scene;

        // Enable physics on this archer
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);

        this.setActive(false);
        this.setVisible(false);
        this.body.setAllowGravity(false);
        this.setImmovable(true);
        this.atkCooldown = 100;
        this.atkCooldownCntr = 100;
        
    }

    update(){
        
        if(this.x > this.gameScreenWidth || this.x < 0){
            this.makeInactive();
        }
    }
    makeActive() {
        //set a random attack cooldown that archerAttack() in juggleNaut.js can use
        this.body.setVelocityX(0);
        this.atkCooldown = 300;
        this.atkCooldownCntr = Math.floor(Math.random() * 50) + 50;
        this.setActive(true);
        this.setVisible(true);
        this.body.enable = true;
        
    }

    makeInactive() {
        //disable archer
        this.setActive(false);
        this.setVisible(false);
        this.body.enable = false;
    }
}
