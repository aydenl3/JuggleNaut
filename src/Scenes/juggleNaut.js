class juggleNaut extends Phaser.Scene {
    constructor() {
        super("juggleNaut");
        this.my = {sprite: {}};

        // Set Global variables
        this.gameScreenWidth = 1650;
        this.gameScreenHeight = 900;
        this.level = 0;
        this.inGame = false;
        this.maxHp = 3;
        this.hp = 3;
        this.maxSlot = 3;
        this.slot = 3;
        this.hpCooldown = 40;
        this.hpCooldownCounter = 0;
        this.paused = false;

    }

    preload() {
        //load assets
        this.load.setPath("./assets/");
        this.load.audio("shoot", "diceThrow1.ogg");
        this.load.audio("throw1", "cloth2.ogg");
        this.load.audio("throw2", "cloth3.ogg");
        this.load.audio("throw3", "cloth4.ogg");
        this.load.audio("helmet1", "metalPot1.ogg");
        this.load.audio("helmet2", "metalPot3.ogg");
        this.load.audio("dagger1", "drawKnife2.ogg");
        this.load.audio("dagger2", "drawKnife3.ogg");
        this.load.audio("chicken1", "Recording.ogg");
        this.load.audio("chicken2", "chicken.ogg");
        this.load.spritesheet("creeps", "colored-transparent_packed.png",{ frameWidth: 16, frameHeight: 16 });

    }

    create ()
    {
        //yo
        //WORLD SETTINGS
        this.physics.world.setBoundsCollision(true, true, true, false);
        this.physics.world.gravity.y = 1100;
        //Turn off Cursor so we can replace with custom cursor
        let canvas = this.sys.canvas;
        canvas.style.cursor = 'none';
        //ANIMATIONS
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('creeps', { frames: [ 459, 460,461,460] }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('creeps', { frames: [ 459] }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'throw',
            frames: this.anims.generateFrameNumbers('creeps', { frames: [ 463] }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'helmet',
            frames: this.anims.generateFrameNumbers('creeps', { frames: [34] }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'dagger',
            frames: this.anims.generateFrameNumbers('creeps', { frames: [329] }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'chicken',
            frames: this.anims.generateFrameNumbers('creeps', { frames: [369] }),
            frameRate: 6,
            repeat: -1
        });
        //RETICLE
        this.reticle = this.add.image(0,0,'creeps', 711);
        this.reticle.setScale(2);

        //HEARTS
        this.heart3 = this.add.sprite(100,game.config.height - 60,"creeps",529);
        this.heart3.setScale(3);
        this.heart3.visible = true;
        this.heart2 = this.add.sprite(60,game.config.height - 60,"creeps",529);
        this.heart2.setScale(3);
        this.heart2.visible = true;
        this.heart1 = this.add.sprite(20,game.config.height - 60,"creeps",529);
        this.heart1.setScale(3);
        this.heart1.visible = true;

        //BALL SLOTS
        this.slot3 = this.add.sprite(100,game.config.height - 20,"creeps",34);
        this.slot3.setScale(2);
        this.slot3.visible = true;
        this.slot2 = this.add.sprite(60,game.config.height - 20,"creeps",34);
        this.slot2.setScale(2);
        this.slot2.visible = true;
        this.slot1 = this.add.sprite(20,game.config.height - 20,"creeps",34);
        this.slot1.setScale(2);
        this.slot1.visible = true;

        //TITLE TEXT
        this.textGroup = this.physics.add.group();
        this.j = this.textGroup.create(500, 95, 'creeps',926);

        this.textGroup.create(570, 100, 'creeps',973);
        this.textGroup.create(640, 100, 'creeps',923);
        this.textGroup.create(710, 100, 'creeps',923);
        this.textGroup.create(780, 100, 'creeps',928);
        this.textGroup.create(850, 100, 'creeps',921);
        this.n = this.textGroup.create(920, 95, 'creeps',966);
   
        this.textGroup.create(990, 100, 'creeps',917);
        this.textGroup.create(1060, 100, 'creeps',973);
        this.textGroup.create(1130, 100, 'creeps',972);
        this.clk = this.textGroup.create(1500, 850, 'creeps',764);
        this.w = this.textGroup.create(1600, 810, 'creeps',975);
        this.a = this.textGroup.create(1560, 850, 'creeps',917);
        this.s = this.textGroup.create(1600, 850, 'creeps',971);
        this.d = this.textGroup.create(1640, 850, 'creeps',920);
        
        this.box1 = this.textGroup.create(1600, 810, 'creeps',725);
        this.box2 = this.textGroup.create(1560, 850, 'creeps',725);
        this.box3 = this.textGroup.create(1600, 850, 'creeps',725);
        this.box4 = this.textGroup.create(1640, 850, 'creeps',725);
        
        this.sShift = this.textGroup.create(1400, 850, 'creeps',971);
        this.hShift = this.textGroup.create(1410, 850, 'creeps',924);
        this.iShift = this.textGroup.create(1420, 850, 'creeps',925);
        this.fShift = this.textGroup.create(1430, 850, 'creeps',922);
        this.tShift = this.textGroup.create(1440, 850, 'creeps',972);
        this.box5 = this.textGroup.create(1420, 850, 'creeps',725);
        for (let letter of this.textGroup.children.entries){
            letter.setScale(3);
            letter.body.setAllowGravity(false);
            //letter.setCollideWorldBounds(true);
            letter.setImmovable(true);
        }
        this.n.setScale(5);
        this.j.setScale(5);
        this.clk.setScale(3);
        this.w.setScale(2);
        this.a.setScale(2);
        this.s.setScale(2);
        this.d.setScale(2);
        this.box1.setScale(2);
        this.box2.setScale(2);
        this.box3.setScale(2);
        this.box4.setScale(2);
        this.box5.setScale(5);
        this.sShift.setScale(1);
        this.hShift.setScale(1);
        this.iShift.setScale(1);
        this.fShift.setScale(1);
        this.tShift.setScale(1);

        //PLAY BUTTON
        this.playButton = this.physics.add.sprite(200, 500, 'creeps',434).setCollideWorldBounds(true);
        this.playButton.setScale(4);
        this.playButton.body.setAllowGravity(false);
        this.playButton.setImmovable(true);
        this.playText = this.add.text(280, 500, 'Play', {font: 'bold 20px Times', color: "tan"});

        //CREDITS BUTTON
        this.creditsButton = this.physics.add.sprite(1400, 500, 'creeps',768).setCollideWorldBounds(true);
        this.creditsButton.setScale(4);
        this.creditsButton.body.setAllowGravity(false); 
        this.creditsButton.setImmovable(true);
        this.creditsText = this.add.text(1250, 500, 'Credits', {font: 'bold 20px Times', color: "tan"});
        this.actualCredits = this.add.text(450, 100, 'JuggleNaut \n\n\nGame by Ayden Le\n\nFinal Project for Prof. Jim Whitehead\n\nCMPM 120 at UCSC\n\nAssets from Kenny.nl\n\nSpecial thanks to Neel, Toby, Paige and Cho', {font: 'bold 40px Times', color: "tan"});
        this.actualCredits.visible = false;
        this.waveText = this.add.text(450, 100, 'WAVE X', {font: 'bold 40px Times', color: "tan"});
        this.waveText.visible = false;

        //RETURN BUTTON
        this.returnButton = this.physics.add.sprite(100, 300, 'creeps',504).setCollideWorldBounds(true);
        this.returnButton.setScale(4);
        this.returnButton.body.setAllowGravity(false); 
        this.returnButton.setImmovable(true);
        this.returnButton.visible = false;
        this.returnText = this.add.text(150, 300, 'Return', {font: 'bold 20px Times', color: "tan"});
        this.returnText.visible = false;

        //ENEMIES----------------------------------------------------------------------------------------------------------------------
        this.archerGroup = this.add.group({
            active: true,
            defaultKey:"chess_pawn",
            maxSize: 20,
            runChildUpdate: true,
        });
        this.archerGroup.createMultiple({
            classType: Archer,
            active: false,
            visible:false,
            key: 'creeps',
            frame:26,
            setScale: { x: 3, y: 3},
            repeat: this.archerGroup.maxSize-1
        });

        this.peonGroup = this.add.group({
            active: true,
            defaultKey:"chess_pawn",
            maxSize: 10,
            runChildUpdate: true,
        });
        this.peonGroup.createMultiple({
            classType: Peon,
            active: false,
            visible:false,
            key: 'creeps',
            frame:27,
            setScale: { x: 3, y: 3},
            repeat: this.peonGroup.maxSize-1
        });

        this.rusherGroup = this.add.group({
            active: true,
            defaultKey:"chess_pawn",
            maxSize: 20,
            runChildUpdate: true,
        });
        this.rusherGroup.createMultiple({
            classType: Rusher,
            active: false,
            visible:false,
            key: 'creeps',
            frame:123,
            setScale: { x: 2.4, y: 2.4},
            repeat: this.rusherGroup.maxSize-1
        });

        this.bulletGroup = this.add.group({
            active: true,
            defaultKey:"bullets",
            maxSize: 30,
            runChildUpdate: true,
        });
        this.bulletGroup.createMultiple({
            classType: Bullet,
            active: false,
            visible:false,
            key: 'creeps',
            frame:285,
            setScale: { x: 2, y: 2},
            repeat: this.bulletGroup.maxSize-1
        });

        //POWERUPS
        //powerup screen text
        
        this.title1 = this.add.text(this.gameScreenWidth/4-50, this.gameScreenHeight/2 - 90, 'Powerup1', { font: 'bold 40px Times',color: "white" });
        this.title2 = this.add.text(this.gameScreenWidth/4*3-50, this.gameScreenHeight/2 - 90, 'Powerup2', { font: 'bold 40px Times', color: "white"});
        this.title3 = this.add.text(this.gameScreenWidth/4*3-50, this.gameScreenHeight/2 - 90, 'Powerup3', { font: 'bold 40px Times', color: "white"});
        this.text1 = this.add.text(this.gameScreenWidth/4-50, this.gameScreenHeight/2 + 75, 'Powerup1 desc', { font: 'bold 20px Times', color: "tan"});
        this.text2 = this.add.text(this.gameScreenWidth/4*3-50, this.gameScreenHeight/2 + 75, 'Powerup2 desc', { font: 'bold 20px Times',color: "tan" });
        this.text3 = this.add.text(this.gameScreenWidth/4*3-50, this.gameScreenHeight/2 + 75, 'Powerup3 desc', { font: 'bold 20px Times', color: "tan"});
        this.disableText(this.title1,this.text1);
        this.disableText(this.title2,this.text2);
        this.disableText(this.title3,this.text3);

        //power array
        this.powList = [];
        this.helmetPowObj = {
            button: this.physics.add.sprite(100, 500, 'creeps',34).setScale(3).setImmovable(true),
            title: 'Helmet',
            text: "A Classic",
        }
        this.powList.push(this.helmetPowObj);

        this.daggerPowObj = {
            button: this.physics.add.sprite(100, 500, 'creeps',329).setScale(3).setImmovable(true),
            title: 'Dagger',
            text: "Not Designed for Bouncing Off of Things",
        }
        this.powList.push(this.daggerPowObj);

        this.chickenPowObj = {
            button: this.physics.add.sprite(100, 500, 'creeps',369).setScale(3).setImmovable(true),
            title: 'Chicken',
            text: "Famously Can't Fly",
        }
        this.powList.push(this.chickenPowObj);

        this.partySizePowObj = {
            button: this.physics.add.sprite(100, 500, 'creeps',1057).setScale(3).setImmovable(true),
            title: 'Party Size',
            text: "Increases Size of Throwable Object",
        }
        this.powList.push(this.partySizePowObj);

        this.pokeyPowObj = {
            button: this.physics.add.sprite(100, 500, 'creeps',55).setScale(3).setImmovable(true),
            title: 'Pokey',
            text: "Destroys Those You Run Into",
        }
        this.powList.push(this.pokeyPowObj);

        this.dashPowObj = {
            button: this.physics.add.sprite(100, 500, 'creeps',462).setScale(3).setImmovable(true),
            title: 'Dash',
            text: "Press Shift to Move Faster Sideways",
        }
        this.powList.push(this.dashPowObj);

        for(let power of this.powList){
            power.button.body.setAllowGravity(false);
            this.disableButton(power);
        }

        //BALL
        this.ball = this.physics.add.sprite(400, 500, 'creeps',34).setCollideWorldBounds(true);
        this.ball.setData('onPaddle', true);
                
        this.ballObj = {
            sprite: this.ball,
            id:"helmet",
            key: '34',
            scale: 3,
            terminalY: 1100,
            terminalX: 600,
            name: "ball",
            bounce: 1.1,
            spinCooldown: 50,
            spinCooldownCntr: 0,
            spinViolence: 0.05,
            spinSpeed: 0.05,
            spinoff: true,
            mass:1,
            strength:1000,
            aim: 1,
            scaleMult: 1,
            audio1: "helmet1",
            audio2: "helmet2"
        }
        this.ball.body.setBounce(this.ballObj.bounce);
        this.ball.body.maxVelocity.y = this.ballObj.terminalY;
        this.ball.body.maxVelocity.x = this.ballObj.terminalX;
        this.ball.setScale(this.ballObj.scale * this.ballObj.scaleMult);
        this.ball.body.setMass(this.ballObj.mass);

        //PLAYER
        this.paddle = this.physics.add.sprite(400, 850,'creeps',460 ).setImmovable(false).setCollideWorldBounds(true);
        
        this.paddleObj = {
            sprite: this.paddle,
            key: 460,
            scale: 4,
            defSpeed: 600,
            terminalX: 600,
            accelX: 5000,
            drag: 8000,
            forgive: 50,
            JuggleCooldown: 20,
            JuggleCooldownCntr: 0,
            mass: 0.001,
            pokey: false,
            shiftmode: "dash",
            dashSpeed: 5
        }
        this.paddle.body.setAllowGravity(false);
        this.paddle.body.maxVelocity.x = this.paddleObj.terminalX;
        this.paddle.body.maxVelocity.y = this.paddleObj.terminalX;
        this.paddle.setScale(this.paddleObj.scale);
        this.paddle.setMass(this.paddleObj.mass);

        //COLLIDERS
        this.physics.add.collider(this.ball, this.archerGroup, this.hitEnemy, null, this);
        this.physics.add.collider(this.ball, this.bulletGroup, this.bulletClash, null, this);
        this.physics.add.collider(this.paddle,this.bulletGroup, this.hitPlayer, null, this);
        this.physics.add.collider(this.paddle,this.peonGroup, this.tackle, null, this);
        this.physics.add.collider(this.paddle,this.archerGroup, this.tackle, null, this);
        this.physics.add.collider(this.paddle,this.rusherGroup, this.tackle, null, this);
        this.physics.add.collider(this.ball,this.rusherGroup, this.hitEnemy, null, this);
        this.physics.add.collider(this.ball,this.peonGroup, this.hitEnemy, null, this);
        this.physics.add.collider(this.ball, this.textGroup, this.hitLetter, null, this);
        this.physics.add.collider(this.ball, this.playButton, this.wave0, null, this);
        this.physics.add.collider(this.ball, this.creditsButton, this.creditsScreen, null, this);
        this.physics.add.collider(this.ball, this.returnButton, this.titleScreen, null, this);
        this.physics.add.collider(this.peonGroup, this.rusherGroup);
        this.physics.add.collider(this.peonGroup, this.archerGroup);
        this.physics.add.collider(this.rusherGroup, this.archerGroup);

        //POWERUP COLLIDERS
        this.physics.add.collider(this.ball, this.daggerPowObj.button, this.daggerPowup, null, this);
        this.physics.add.collider(this.ball, this.helmetPowObj.button, this.helmetPowup, null, this);
        this.physics.add.collider(this.ball, this.chickenPowObj.button, this.chickenPowup, null, this);
        this.physics.add.collider(this.ball, this.partySizePowObj.button, this.partySizePowup, null, this);
        this.physics.add.collider(this.ball, this.pokeyPowObj.button, this.pokeyPowup, null, this);
        this.physics.add.collider(this.ball, this.dashPowObj.button, this.dashPowup, null, this);

        //KEYS
        this.left = this.input.keyboard.addKey("A");
        this.right = this.input.keyboard.addKey("D");
        this.up = this.input.keyboard.addKey("W");
        this.down = this.input.keyboard.addKey("S");
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        //MOUSE INPUTS
        this.input.on('pointermove', function (pointer)
        {
            this.reticle.x = Phaser.Math.Clamp(pointer.x, 0, this.gameScreenWidth);
            this.reticle.y = Phaser.Math.Clamp(pointer.y, 0, this.gameScreenHeight);

        }, this);

        this.input.on('pointerup', function (pointer)
        {
            if(this.paddleObj.JuggleCooldownCntr <= 0){
                this.paddle.play('throw',true);
                this.paddleObj.JuggleCooldownCntr = this.paddleObj.JuggleCooldown;
                if(this.collides(this.ball,this.paddle,this.paddleObj.forgive,this.paddleObj.forgive)){
                    this.juggle (this.ball, this.paddle, this.reticle);
                    //if the level is paused, unpause it when player successfully juggles
                    if(this.paused == true){
                        this.paused = false;
                        this.nextLevel();
                    }
                    
                }
            }

        }, this);


    }

    //-----------------------------------
    //COLLIDERS--------------------------
    //same collider as galaxy shooter, but with added reach functionality
    collides(a, b, givex, givey) {
        if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2 + givex)) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2 + givey)) return false;
        return true;
    }
    //if ball hits a bullet
    bulletClash (ball, bullet)
    {
        this.startSpin(bullet,bullet.spinCooldown,bullet.spinSpeed);
        if(Math.abs(bullet.body.velocity.x) < 20){
            let behav = Math.floor(Math.random() * 1);
            if(behav == 0){
                bullet.body.velocity.x = -100;
            }
            else{
                bullet.body.velocity.x = 100;
            }
        }
    }
    //if ball hits an enemy
    hitEnemy (ball, enemy)
    {
        this.impactAudio();
        enemy.disableBody(true, true);
        enemy.makeInactive()
        if (this.archerGroup.countActive() == 0 && this.peonGroup.countActive() == 0 && this.rusherGroup.countActive() == 0)
        {
            this.powerupScreen();
        }
    }
    //if ball hits a letter
    hitLetter (ball, letter)
    {
        this.impactAudio();
        letter.visible = false;
        letter.active = false;
        letter.disableBody(true,true);
    }
    //if player hits an enemy
    tackle (player, enemy)
    {
        this.loseHP(1);
        if(this.paddleObj.pokey == true){
            enemy.disableBody(true, true);
            enemy.makeInactive();
            this.hpCooldownCounter = 0;
            if (this.archerGroup.countActive() == 0 && this.peonGroup.countActive() == 0 && this.rusherGroup.countActive() == 0)
                {
                    this.powerupScreen();
                }
        }
        
    }
    //if a bullet hits a player
    hitPlayer (player, bullet)
    {
        bullet.setVelocityY(-200);
        this.bulletClash(player,bullet);
        this.loseHP(1);
    }
    //if the player clicks while touching the ball
    juggle (ball, paddle, reticle)
    {
        this.throwAudio();
        let diff = 0;
        if (ball.x < reticle.x)
        {
            //  Ball is left of the reticle
            diff = reticle.x - ball.x;
            ball.setVelocityX(1 * this.ballObj.aim * diff);
            this.ball.setVelocityY(-this.ball.body.velocity.y * this.ballObj.bounce);
            if(Math.abs(this.ball.body.velocity.y) < this.ballObj.strength){
                this.ball.setVelocityY(-this.ballObj.strength);
            }
            this.startSpin(this.ballObj,this.ballObj.spinCooldown,this.ballObj.spinSpeed);
        }
        else if (ball.x > reticle.x)
        {
            //  Ball is right of the reticle
            diff = ball.x - reticle.x;
            ball.setVelocityX(-1 * this.ballObj.aim * diff);
            this.ball.setVelocityY(-this.ball.body.velocity.y * this.ballObj.bounce);
            if(Math.abs(this.ball.body.velocity.y) < this.ballObj.strength){
                this.ball.setVelocityY(-this.ballObj.strength);
            }
            this.startSpin(this.ballObj,this.ballObj.spinCooldown,-this.ballObj.spinSpeed);
        }
        else
        {
            ball.setVelocityX(2 + Math.random() * 8);
            this.ball.setVelocityY(-this.ball.body.velocity.y * this.ballObj.bounce);
        }
    }


    //-----------------------------------
    //POWUP COLLIDERS--------------------
    //changes ball to dagger
    daggerPowup(){
        this.ballObj.id = "dagger";
        this.ballObj.scale = 3;
        this.ballObj.terminalY = 1400;//faster
        this.ballObj.terminalX = 600;
        this.ballObj.name = "ball";
        this.ballObj.bounce = 0.5;//less bounce
        this.ballObj.spinCooldown = 50;
        this.ballObj.spinCooldownCntr = 0;
        this.ballObj.spinViolence = 0.05;
        this.ballObj.spinSpeed = 0.2;
        this.ballObj.spinoff = true;
        this.ballObj.mass = 1;
        this.ballObj.strength = 2000;
        this.ballObj.aim = 1.5;//more sideways motion
        this.ballObj.audio1 = "dagger1",
        this.ballObj.audio2 = "dagger2"

        this.ball.body.setBounce(this.ballObj.bounce);
        this.ball.body.maxVelocity.y = this.ballObj.terminalY;
        this.ball.body.maxVelocity.x = this.ballObj.terminalX;
        this.ball.setScale(this.ballObj.scale * this.ballObj.scaleMult);
        this.ball.body.setMass(this.ballObj.mass);

        this.physics.world.gravity.y = 1100;
        this.pauseScreen();
    }
    //changes ball to helmet
    helmetPowup(){
            this.ballObj.id = "helmet";
            this.ballObj.key = '34';
            this.ballObj.scale = 3;
            this.ballObj.terminalY = 1100;
            this.ballObj.terminalX = 600;
            this.ballObj.name = "ball";
            this.ballObj. bounce = 1.3;
            this.ballObj.spinCooldown = 50;
            this.ballObj.spinCooldownCntr = 0;
            this.ballObj.spinViolence = 0.05;
            this.ballObj.spinSpeed = 0.05;
            this.ballObj.spinoff = true;
            this.ballObj. mass = 1;
            this.ballObj.strength = 1000;
            this.ballObj.aim = 1;
            this.ballObj.audio1 = "helmet1",
            this.ballObj.audio2 = "helmet2"

        this.ball.body.setBounce(this.ballObj.bounce);
        this.ball.body.maxVelocity.y = this.ballObj.terminalY;
        this.ball.body.maxVelocity.x = this.ballObj.terminalX;
        this.ball.setScale(this.ballObj.scale * this.ballObj.scaleMult);
        this.ball.body.setMass(this.ballObj.mass);

        this.physics.world.gravity.y = 1100;

        this.pauseScreen();
    }
    //changes ball to chicken
    chickenPowup(){
            this.ballObj.id = "chicken",
            this.ballObj.key = '34',
            this.ballObj.scale = 3,
            this.ballObj.terminalY = 600,//much slower
            this.ballObj.terminalX = 700,//faster sideways motion
            this.ballObj.name = "ball",
            this.ballObj.bounce = 1.5,//stronger bounce
            this.ballObj.spinCooldown = 50,
            this.ballObj.spinCooldownCntr = 0,
            this.ballObj.spinViolence = 0.05,
            this.ballObj.spinSpeed = 0.05,
            this.ballObj.spinoff = true,
            this.ballObj.mass = 1,
            this.ballObj.strength = 1000,
            this.ballObj.aim = 1,
            this.ballObj.audio1 = "chicken1",
            this.ballObj.audio2 = "chicken2"
        
        this.ball.body.setBounce(this.ballObj.bounce);
        this.ball.body.maxVelocity.y = this.ballObj.terminalY;
        this.ball.body.maxVelocity.x = this.ballObj.terminalX;
        this.ball.setScale(this.ballObj.scale * this.ballObj.scaleMult);
        this.ball.body.setMass(this.ballObj.mass);

        this.physics.world.gravity.y = 1100;

        this.pauseScreen();
    }
    //makes ball larger
    partySizePowup(){
        this.ballObj.scaleMult += 0.5;
        this.ball.setScale(this.ballObj.scale * this.ballObj.scaleMult);

        this.pauseScreen();
    }
    //makes player deal contact damage
    pokeyPowup(){
        this.paddleObj.pokey = true;
        this.pauseScreen();
    }
    //increases speed of dash
    dashPowup(){
        this.paddleObj.dashSpeed += 5;
        this.pauseScreen();
    }
    //INCLUSIVE RANDOM NUMBER
    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }


    //-----------------------------------
    //RESETTERS--------------------------

    //place ball back above player
    resetBall ()
    {
        this.ballObj.spinoff = true;
        this.ball.setVelocity(0);
        this.ball.setPosition(this.paddle.x, this.paddle.y - 400);
        this.ball.rotation = 0;
    }
    //game over logic, cleans enemies, brings back to title
    gameover(){
        for (let bullet of this.bulletGroup.children.entries){
            bullet.makeInactive();
        }
        for (let archer of this.archerGroup.children.entries){
            archer.makeInactive();
        }
        for (let peon of this.peonGroup.children.entries){
            peon.makeInactive();
        }
        for (let rusher of this.rusherGroup.children.entries){
            rusher.makeInactive();
        }
        this.titleScreen();
    }
    //cleans assets between levels, resets hp
    resetLevel ()
    {
        this.hp = 3;
        this.slot = 3;
        this.playButton.visible = false;
        this.playButton.body.enable = false;
        this.creditsButton.visible = false;
        this.creditsButton.body.enable = false;
        this.creditsText.visible = false;
        this.playText.visible = false;
        this.returnButton.visible = false;
        this.returnButton.body.enable = false;
        this.returnText.visible = false;
        this.actualCredits.visible = false;
        for(let power of this.powList){
            this.disableButton(power);
        }
        this.disableText(this.title1,this.text1);
        this.disableText(this.title2,this.text2);
        this.disableText(this.title3,this.text3);

        this.ball.play(this.ballObj.id,true);
        for (let letter of this.textGroup.children.entries){
            letter.visible = false;
            letter.body.enable = false;
            letter.active = false;
        }
        this.heart1.visible = true;
        this.heart2.visible = true;
        this.heart3.visible = true;
        this.slot1.visible = true;
        this.slot2.visible = true;
        this.slot3.visible = true;
    }
    //shows title screen assets and buttons
    titleScreen ()
    {
        this.resetLevel();
        this.level = 0;
        this.inGame = false;
        this.resetBall();
        this.setHearts(3);
        this.setBall(3);
        this.ballObj.id = "helmet";
        this.ballObj.key = '34';
        this.ballObj.scale = 3;
        this.ballObj.terminalY = 1100;
        this.ballObj.terminalX = 600;
        this.ballObj.name = "ball";
        this.ballObj. bounce = 1.3;
        this.ballObj.spinCooldown = 50;
        this.ballObj.spinCooldownCntr = 0;
        this.ballObj.spinViolence = 0.05;
        this.ballObj.spinSpeed = 0.05;
        this.ballObj.spinoff = true;
        this.ballObj. mass = 1;
        this.ballObj.strength = 1000;
        this.ballObj.aim = 1;
        this.ballObj.scaleMult = 1;
        this.ballObj.audio1 = "helmet1";
        this.ballObj.audio2 = "helmet2";
        this.waveText.visible = false;

        this.ball.body.setBounce(this.ballObj.bounce);
        this.ball.body.maxVelocity.y = this.ballObj.terminalY;
        this.ball.body.maxVelocity.x = this.ballObj.terminalX;
        this.ball.setScale(this.ballObj.scale * this.ballObj.scaleMult);
        this.ball.body.setMass(this.ballObj.mass);
        this.ball.play(this.ballObj.id,true);

        this.paddleObj.key = 460;
        this.paddleObj.scale = 4;
        this.paddleObj.defSpeed = 600,
        this.paddleObj.terminalX = 600;
        this.paddleObj.accelX = 5000;
        this.paddleObj.drag = 8000;
        this.paddleObj.forgive = 50;
        this.paddleObj.JuggleCooldown = 20;
        this.paddleObj.JuggleCooldownCntr = 0;
        this.paddleObj.mass = 0.001;
        this.paddleObj.pokey = false;
        this.paddleObj.shiftmode = "dash";
        this.paddleObj.dashSpeed = 5;
        this.paddle.body.setAllowGravity(false);
        this.paddle.body.maxVelocity.x = this.paddleObj.terminalX;
        this.paddle.body.maxVelocity.y = this.paddleObj.terminalX;
        this.paddle.setScale(this.paddleObj.scale);
        this.paddle.setMass(this.paddleObj.mass);

        this.physics.world.gravity.y = 1100;

        for (let letter of this.textGroup.children.entries){
            letter.visible = true;
            letter.body.enable = true;
            letter.active = true;
        }
        this.playButton.body.enable = true;
        this.playButton.visible = true;
        this.creditsButton.body.enable = true;
        this.creditsButton.visible = true;
        this.creditsText.visible = true;
        this.playText.visible = true;


    }
    //pauses game in between levels
    pauseScreen(){
        this.waveText.visible = true;
        this.waveText.setText("WAVE " + this.level + "-5");
        this.resetLevel();
        this.paused = true;
        this.paddle.x = this.gameScreenWidth/2;
        this.resetBall();
    }
    //brings up credits screen
    creditsScreen(){
        this.resetLevel();
        this.returnButton.body.enable = true;
        this.returnButton.visible = true;
        this.returnText.visible = true;
        this.actualCredits.visible = true;
        this.inGame = false;
        this.resetBall();
    }
    //brings up victory screen
    victoryScreen(){
        this.resetLevel();
        this.returnButton.body.enable = true;
        this.returnButton.visible = true;
        this.returnText.visible = true;
        this.waveText.visible = true;
        this.waveText.setText("THANKS FOR JUGGLING :D");
        this.inGame = false;
        this.resetBall();
    }
    //brings up powerup screen
    powerupScreen(){
        this.resetLevel();
        this.paddle.x = this.gameScreenWidth/2;
        this.resetBall();
        this.inGame = false;
        this.resetBall();
        let powerNum1 = this.getRndInteger(0,this.powList.length -1);
        for (let i = 0; i <= this.powList.length-1; i++){
            if(i == powerNum1){
                this.power = this.powList[i];
                this.enableButton(this.power);
                this.power.button.x = this.gameScreenWidth/4;
                this.power.button.y = this.gameScreenHeight/2;
                this.enableText(this.title1,this.text1,this.power);
            }
        }
        let powerNum2 = this.getRndInteger(0,this.powList.length -1);
        while(powerNum2 == powerNum1){
            powerNum2 = this.getRndInteger(0,this.powList.length -1);
        }
        for (let i = 0; i <= this.powList.length-1; i++){
            if(i == powerNum2){
                this.power = this.powList[i];
                this.enableButton(this.power);
                this.power.button.x = this.gameScreenWidth/4*3;
                this.power.button.y = this.gameScreenHeight/2;
                this.enableText(this.title2,this.text2,this.power);
                
            }
        }
    }
    //loads next level based on which level we have already completed
    nextLevel(){
        this.waveText.visible = false;
        if(this.level == 0){
            this.wave0();
        }
        else if(this.level == 1){
            this.wave1();
        }
        else if(this.level == 2){
            this.wave2();
        }
        else if(this.level == 3){
            this.wave3();
        }
        else if(this.level == 4){
            this.wave4();
        }
        else if(this.level == 5){
            this.wave5();
        }
        else if(this.level == 6){
            this.victoryScreen();
        }
        else{
            this.wave1();
        }
    }
    //enable powerup button
    enableButton(obj){
        obj.button.visible = true;
        obj.button.body.enable = true;
    }
    //disable powerup button
    disableButton(obj){
        obj.button.visible = false;
        obj.button.body.enable = false;
    }
    //enable powerup text
    enableText(title,text,obj){
        title.visible = true;
        title.setText(obj.title);
        text.visible = true;
        text.setText(obj.text);
    }
    //disable powerup text
    disableText(title,text){
        title.visible = false;
        text.visible = false;
    }
    //-----------------------------------
    //HP LOGIC---------------------------
    //lost HP
    loseHP(amt){
        if(this.hpCooldownCounter <= 0 && this.inGame == true){
            this.sound.play("shoot");
            let dmg = this.hp - amt;
            this.setHearts(dmg);
            this.hpCooldownCounter = this.hpCooldown;
        }

    }
    //Update heart count
    setHearts(num){
        this.hp = num;
        if(this.hp == 3){
            this.heart3.visible = true;
            this.heart2.visible = true;
            this.heart1.visible = true;
        }
        else if(this.hp == 2){
            this.heart3.visible = false;
            this.heart2.visible = true;
            this.heart1.visible = true;
        }
        else if(this.hp == 1){
            this.heart3.visible = false;
            this.heart2.visible = false;
            this.heart1.visible = true;
        }
        else if(this.hp == 0){
            this.heart3.visible = false;
            this.heart2.visible = false;
            this.heart1.visible = false;
            this.gameover();
        }

    }
    //lost ball
    nextBall(){
            
            if(this.inGame == true){
                this.sound.play("shoot");
                let damage = this.slot -1;
                this.setBall(damage);
            }


    }
    //update slot count
    setBall(num){
        this.slot = num;
        if(this.slot == 3){
            this.slot3.visible = true;
            this.slot2.visible = true;
            this.slot1.visible = true;
        }
        else if(this.slot == 2){
            this.slot3.visible = false;
            this.slot2.visible = true;
            this.slot1.visible = true;
        }
        else if(this.slot == 1){
            this.slot3.visible = false;
            this.slot2.visible = false;
            this.slot1.visible = true;
        }
        else if(this.slot == 0){
            this.slot3.visible = false;
            this.slot2.visible = false;
            this.slot1.visible = false;
        }
        else if (this.slot == -1){
            this.gameover();
        }
    }

    //-----------------------------------
    //MOVEMENT---------------------------

    movementLogic(){
        //Dash
        if(this.shift.isDown && this.paused != true){
            if(this.paddleObj.shiftmode == "dash"){
                if(this.paddleObj.sprite.body.velocity.x > 0){
                    this.paddleObj.sprite.x = this.paddleObj.sprite.x + this.paddleObj.dashSpeed;
                }
                else if(this.paddleObj.sprite.body.velocity.x < 0){
                    this.paddleObj.sprite.x = this.paddleObj.sprite.x - this.paddleObj.dashSpeed;
                }
                
            }
        }
        //left
        if (this.left.isDown && !this.right.isDown && !this.down.isDown && !this.up.isDown && this.paused != true) {
            this.paddle.play('walk',true);
            this.paddle.setFlip(true, false);
            this.paddle.setVelocityX(-this.paddleObj.accelX);
        }
        //right
        else if(this.right.isDown && !this.left.isDown && !this.down.isDown && !this.up.isDown && this.paused != true){
            this.paddle.play('walk',true);
            this.paddle.resetFlip();
            this.paddle.setVelocityX(this.paddleObj.accelX);
        }
        //up
        else if(this.up.isDown && !this.right.isDown && !this.down.isDown && !this.left.isDown && this.paused != true){
            this.paddle.play('walk',true);
            this.paddle.setVelocityY(-this.paddleObj.accelX);
        }
        //down
        else if(this.down.isDown && !this.right.isDown && !this.left.isDown && !this.up.isDown && this.paused != true){
            this.paddle.play('walk',true);
            if(this.paddle.y < 860){
                this.paddle.setVelocityY(this.paddleObj.accelX);
            }
            
        }
        //right up        
        else if(this.right.isDown && this.up.isDown && !this.left.isDown && !this.down.isDown && this.paused != true){
            this.paddle.play('walk',true);
            this.paddle.resetFlip();
            this.paddle.setVelocityY(-this.paddleObj.accelX/8);
            this.paddle.setVelocityX(this.paddleObj.accelX/8);
        }
        //right down
        else if(this.right.isDown && this.down.isDown && !this.left.isDown && !this.up.isDown && this.paused != true){
            this.paddle.play('walk',true);
            this.paddle.resetFlip();
            this.paddle.setVelocityX(this.paddleObj.accelX/8);
            if(this.paddle.y < 860){
                this.paddle.setVelocityY(this.paddleObj.accelX/8);
            };
        }
        //left down
        else if(this.left.isDown && this.down.isDown && !this.right.isDown && !this.up.isDown && this.paused != true){
            this.paddle.play('walk',true);
            this.paddle.setFlip(true, false);
            this.paddle.setVelocityX(-this.paddleObj.accelX/8);
            if(this.paddle.y < 860){
                this.paddle.setVelocityY(this.paddleObj.accelX/8);
            }
        }
        //left up
        else if(this.left.isDown && this.up.isDown && !this.right.isDown && !this.down.isDown && this.paused != true){
            this.paddle.play('walk',true);
            this.paddle.setFlip(true, false);
            this.paddle.setVelocityY(-this.paddleObj.accelX/8);
            this.paddle.setVelocityX(-this.paddleObj.accelX/8);
        }
        //idle
        else{;
            if(this.paddleObj.JuggleCooldownCntr <= 0){
                this.paddle.play('idle',true);
            }
            
            
            this.paddle.setAccelerationX(0);
            this.paddle.setDragX(this.paddleObj.drag);
            this.paddle.setDragY(this.paddleObj.drag);
        }
    }
    //queue spin
    startSpin(target,time,violence){
        target.spinoff = false;
        target.spinCooldownCntr = time;
        target.spinViolence = violence;        
    }
    //-----------------------------------
    //AUDIO------------------------------
    //juggle audio
    throwAudio(){
        let x = this.getRndInteger(1,3);
        if(x == 1){
            this.sound.play("throw1",{
                volume: 0.1
            });
        }
        else if(x == 2){
            this.sound.play("throw2",{
                volume: 0.1
            });
        }
        else if(x == 3){
            this.sound.play("throw3",{
                volume: 0.1
            });
        }
        if(this.ballObj.id == "chicken"){
            let x = this.getRndInteger(1,5);
            if(x == 1){
                this.sound.play(this.ballObj.audio1,{
                    volume: 1,
                    detune: 1
                });
            }
            else if(x == 2){
                this.sound.play(this.ballObj.audio2,{
                    volume: 1,
                    detune: 500
                });
            }
            else if(x == 3){
                this.sound.play(this.ballObj.audio2,{
                    volume: 1,
                    detune: 100
                });
            }
            else if(x == 4){
                this.sound.play(this.ballObj.audio2,{
                    volume: 1,
                    detune: 600
                });
            }
            else if(x == 5){
                this.sound.play(this.ballObj.audio1,{
                    volume: 1,
                    detune: 300
                });
            }
        }

    }
    //audio on hitting things
    impactAudio(){
        if(this.ballObj.id == "helmet"){
            let x = this.getRndInteger(1,5);
            if(x == 1){
                this.sound.play(this.ballObj.audio1,{
                    volume: 0.05,
                    detune: 1
                });
            }
            else if(x == 2){
                this.sound.play(this.ballObj.audio2,{
                    volume: 0.05,
                    detune: 500
                });
            }
            else if(x == 3){
                this.sound.play(this.ballObj.audio2,{
                    volume: 0.05,
                    detune: 100
                });
            }
            else if(x == 4){
                this.sound.play(this.ballObj.audio2,{
                    volume: 0.05,
                    detune: -100
                });
            }
            else if(x == 5){
                this.sound.play(this.ballObj.audio1,{
                    volume: 0.05,
                    detune: -500
                });
            }
        }
        else if(this.ballObj.id == "dagger"){
            let x = this.getRndInteger(1,5);
            if(x == 1){
                this.sound.play(this.ballObj.audio1,{
                    volume: 1,
                    detune: 1
                });
            }
            else if(x == 2){
                this.sound.play(this.ballObj.audio2,{
                    volume: 1,
                    detune: 500
                });
            }
            else if(x == 3){
                this.sound.play(this.ballObj.audio2,{
                    volume: 1,
                    detune: 100
                });
            }
            else if(x == 4){
                this.sound.play(this.ballObj.audio2,{
                    volume: 1,
                    detune: -100
                });
            }
            else if(x == 5){
                this.sound.play(this.ballObj.audio1,{
                    volume: 1,
                    detune: 500
                });
            }
        }
        
    }

    //-----------------------------------
    //EVERY TICK-------------------------
    decrementCounters(){
        this.paddleObj.JuggleCooldownCntr--;
        this.ballObj.spinCooldownCntr--;
        this.hpCooldownCounter--;
        for (let bullet of this.bulletGroup.children.entries){
            if(bullet.active){
                bullet.spinCooldownCntr--;
            }
        }
        for (let archer of this.archerGroup.children.entries){
            if(archer.active){
                archer.atkCooldownCntr--;
            }
        }
    }
    //rotate targets
    spin(target){
        if(target.spinoff == false){
            if(target.spinCooldownCntr > 0){
                target.sprite.rotation += target.spinViolence;
            }
            else{
                if(target.sprite.rotation != 0){
                    target.sprite.rotation += target.spinViolence/1.2;
                }
            }
        }

    }
    //fire arrows
    archerAttack(){
        for (let archer of this.archerGroup.children.entries){
            if(archer != null && archer.atkCooldownCntr <= 0 && archer.active == true){
                archer.atkCooldownCntr = archer.atkCooldown;
                let bullet = this.bulletGroup.getFirstDead();
                if(bullet != null){
                    bullet.x = archer.x + 16;
                    bullet.y = archer.y;
                    bullet.makeActive();
    
                }
            }
        }

    }
    //switch rusher behavior
    rusherAttack(){
        for (let rusher of this.rusherGroup.children.entries){
            if(rusher != null && this.collides(rusher,this.paddle,300,300) && rusher.active == true){
                rusher.hunt = true;
                if(rusher.x < this.paddle.x){
                    rusher.body.setVelocityX(180);
                }
                else if(rusher.x > this.paddle.x){
                    rusher.body.setVelocityX(-180);
                }
                if(rusher.y < this.paddle.y){
                    rusher.body.setVelocityY(170);
                }
                else if(rusher.y > this.paddle.y){
                    rusher.body.setVelocityY(-170);
                }
            }
            else{
                if(rusher != null){
                    rusher.hunt = false;
                }
            }
        }

    }
    //-----------------------------------
    //LEVELS-----------------------------
    //two archers two peons in a square
    wave0(){
        this.level++;
        this.resetLevel();
        this.inGame = true; 
        for(let i = 1; i <= 2; i++){
            let archer = this.archerGroup.getFirstDead();
            if(archer != null){
                archer.makeActive();
                archer.x = game.config.width/3 *i - 100;
                archer.y = 100;
            }

        }
        for(let i = 1; i <= 2; i++){
            let peon = this.peonGroup.getFirstDead();
            if(peon != null){
                peon.x = game.config.width/3 *i-100;
                peon.setSpawnX(peon.x);
                peon.makeActive();
                peon.y = 200;
                if (i % 2 == 0){
                    peon.y = 300;
                }
            }

        }

    }
    //line of archers, line of peons
    wave1(){
        this.level++;
        this.inGame = true; 
        this.resetLevel();
        for(let i = 1; i <= 5; i++){
            let archer = this.archerGroup.getFirstDead();
            if(archer != null){
                archer.makeActive();
                archer.x = game.config.width/6 *i - 100;
                archer.y = 100;
            }

        }
        for(let i = 1; i <= 5; i++){
            let peon = this.peonGroup.getFirstDead();
            if(peon != null){
                peon.x = game.config.width/6 *i-100;
                peon.setSpawnX(peon.x);
                peon.makeActive();
                peon.y = 200;
                if (i % 2 == 0){
                    peon.y = 300;
                }
            }

        }

    }
    //rushers!
    wave2(){
        this.level++;
        this.inGame = true; 
        this.resetLevel();
        for(let i = 1; i <= 5; i++){
            let rusher = this.rusherGroup.getFirstDead();
            if(rusher != null){
                rusher.x = game.config.width/5 *i-100;
                rusher.setSpawnX(rusher.x);
                rusher.makeActive();
                rusher.y = 100;
                if (i % 2 == 0){
                    rusher.y = 100;
                }
            }
        }
    }
    //rushers and peons
    wave3(){
        this.level++;
        this.inGame = true; 
        this.resetLevel();
        for(let i = 1; i <= 5; i++){
            let rusher = this.rusherGroup.getFirstDead();
            if(rusher != null){
                rusher.x = game.config.width/10 *i-100;
                rusher.setSpawnX(rusher.x);
                rusher.makeActive();
                rusher.y = 100;
                if (i % 2 == 0){
                    rusher.y = 100;
                }
            }
    
        }
        for(let i = 1; i <= 5; i++){
            let archer = this.archerGroup.getFirstDead();
            if(archer != null){
                archer.x = game.config.width/6 *i-100;
                archer.makeActive();
                archer.y = 400;
                if (i % 2 == 0){
                    archer.y = 500;
                }
            }
        }
    }
    //verticle formation of peons and rushers
    wave4(){
        this.level++;
        this.inGame = true; 
        this.resetLevel();
        for(let i = 1; i <= 5; i++){
            let rusher = this.rusherGroup.getFirstDead();
            if(rusher != null){
                rusher.x = game.config.width/10 *i-100;
                rusher.setSpawnX(rusher.x);
                rusher.makeActive();
                rusher.y = 100;
                if (i % 2 == 0){
                    rusher.y = 100;
                }
            }
    
        }
        for(let i = 1; i <= 10; i++){
            let peon = this.peonGroup.getFirstDead();
            if(peon != null){
                peon.x = game.config.width/6 *5;
                peon.setSpawnX(peon.x);
                peon.makeActive();
                peon.y = game.config.height/11 * i;
            }

        }

    }
    //huge barrage of arrows
    wave5(){
        this.level++;
        this.inGame = true; 
        this.resetLevel();
        for(let i = 1; i <= 20; i++){
            let archer = this.archerGroup.getFirstDead();
            if(archer != null){
                archer.x = game.config.width/11 *i/4 + 500;
                archer.makeActive();
                archer.y = 100;
                if (i > 10){
                    archer.y = 200;
                    archer.x = game.config.width/11 *i/4+100;
                }
            }

        }
        for(let i = 1; i <= 3; i++){
            let peon = this.peonGroup.getFirstDead();
            if(peon != null){
                peon.x = game.config.width/6 *4;
                peon.setSpawnX(peon.x);
                peon.makeActive();
                peon.y = game.config.height/6 * i;
            }

        }
        for(let i = 1; i <= 3; i++){
            let peon = this.peonGroup.getFirstDead();
            if(peon != null){
                peon.x = game.config.width/6 *1;
                peon.setSpawnX(peon.x);
                peon.makeActive();
                peon.y = game.config.height/6 * i;
            }

        }

    }
    update ()
    {
        if (Phaser.Input.Keyboard.JustDown(this.space)) {
            if(this.paddleObj.JuggleCooldownCntr <= 0){
                this.paddle.play('throw',true);
                this.paddleObj.JuggleCooldownCntr = this.paddleObj.JuggleCooldown;
                if(this.collides(this.ball,this.paddle,this.paddleObj.forgive,this.paddleObj.forgive)){
                    this.juggle (this.ball, this.paddle, this.reticle);
                }
            }
        }
        this.archerAttack();
        this.rusherAttack();
        this.decrementCounters();
        this.spin(this.ballObj);
        for (let bullet of this.bulletGroup.children.entries){
            if(bullet.active){
                this.spin(bullet);
            }
        }
        this.movementLogic();
        if (this.ball.y > 900)
        {
            this.nextBall();
            this.resetBall();
        }
    }
}