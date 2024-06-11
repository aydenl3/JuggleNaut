class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'creeps',285);
        this.scene = scene;

        // Enable physics on this arrow
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);

        this.setActive(false);
        this.setVisible(false);
        this.body.setAllowGravity(true);
        this.setImmovable(false);
        this.body.setMass(0.05);
        this.rotation = 2.356;
        this.bounce = 1.5;
        this.sprite = this;
        this.spinCooldown = 100;
        this.spinCooldownCntr = 0;
        this.spinViolence = 0.05;
        this.spinSpeed = 0.05;
        this.spinoff = true;
        
    }

    update(){
        //if arrow leaves bottom of screen, destroy it
        if(this.y > 900){
            this.makeInactive();
        }
    }
    makeActive() {
        //enable arrow with spin functionality.
        this.spinoff = true;
        this.rotation = 2.356;
        this.setActive(true);
        this.setVisible(true);
        this.body.enable = true
        this.body.velocity.y = 0;
        this.body.velocity.x = 0;
        
    }

    makeInactive() {
        this.setActive(false);
        this.setVisible(false);
        this.body.enable = false;
    }
}
