//VARIABLE DECLARATION
{
    var url = window.location.pathname;
    var filename = url.substring(url.lastIndexOf('/') + 1);
    var screen;
    var screentimer = 0;
    // if (filename == "index.html") screen = 0;
    if (filename == "level1.html") screen = 1;
    if (filename == "level2.html") screen = 2;
    if (filename == "level3.html") screen = 3;
    if (filename == "level4.html") screen = 4;
    if (filename == "endcard.html") screen = 5;
    var firstsetup = true;
    var level02setup = true;
    var gameIsPaused = false;
    var nextIsActive = false;

    var invisibleBorderLeft = 10;
    var invisibleBorderRight = 1890;

    var spawnpointX;
    var spawnpointY;

    var soundWalking_01 = new Audio('SoundWalking01.wav');
    soundWalking_01.volume = 0.2;
    var soundWalking_02 = new Audio('SoundWalking02.wav');
    soundWalking_02.volume = 0.2;
    var soundWalking_03 = new Audio('SoundWalking03.wav');
    soundWalking_03.volume = 0.2;
    var SoundDeath = new Audio('SoundDeath.wav');

    var randomSoundSel;
    var soundPunching = new Audio('SoundPunch.wav');
    var soundPortalshot = new Audio('SoundPortal.wav');

    var Schlorpy01 = new SchlorpGaDorb();
    var Schlorpy02 = new SchlorpGaDorb();
    var Schlorpy03 = new SchlorpGaDorb();
    var Schlorpy04 = new SchlorpGaDorb();
    var Schlorpy05 = new SchlorpGaDorb();

    var COI01 = new Charger();
    var COI02 = new Charger();
    var COI03 = new Charger();
    var COI04 = new Charger();
    var COI05 = new Charger();
    var COI06 = new Charger();
    var COI07 = new Charger();
    var COI08 = new Charger();

    var IMGchars;
    var IMGportal;
    var portalDestiny_X;
    var portalDestiny_Y;
    var portalNear_X;
    var portalNear_Y;

    var ITEMportalgun_X;
    var ITEMportalgun_Y;
    var ITEMcar_X;
    var ITEMcar_Y;

    var infoboxIsActive = false;    //Chars cant move if == true
    var OKclicked = { controls: false, portalgun: false, car: false, enemies: false };        //criteria if IB is shown after respawn

    var infobox_x = 700;
    var infobox_y = 200;
    var infobox_w = 500;
    var infobox_h = 350;
    var IBbutton_XS = ((infobox_x + (infobox_x + infobox_w)) / 2) - 70;         //XStart YStart XEnd YEnd
    var IBbutton_YS = ((infobox_y + (infobox_y + infobox_h)) / 2) + 40;
    var IBbutton_XE = IBbutton_XS + 140;
    var IBbutton_YE = IBbutton_YS + 75;

    var HPbar_X = 170;
    var HPbar_Y = 40;
    var HPbar_W = 120;
    var HPbar_H = 22;
    var Fbar_X = HPbar_X;
    var Fbar_Y = HPbar_Y + HPbar_H;
    var Fbar_W = 80;
    var Fbar_H = 12;

    var TO_uniHeight = 60;
    var TO_01x;        //TERRAINOBJECT OBJ 01 XPOS YPOS WIDTH HEIGHT
    var TO_01y;
    var TO_01w;
    var TO_01h;

    var TO_02x;
    var TO_02y;
    var TO_02w;
    var TO_02h;

    var TO_03x;
    var TO_03y;
    var TO_03w;
    var TO_03h;

    var TO_04x;
    var TO_04y;
    var TO_04w;
    var TO_04h;

    var TO_05x;
    var TO_05y;
    var TO_05w;
    var TO_05h;

    var TO_06x;
    var TO_06y;
    var TO_06w;
    var TO_06h;

    var TO_07x;
    var TO_07y;
    var TO_07w;
    var TO_07h;
}
function preload() {
    IMGportal = loadImage("IMG-portal.png");
    IMGchars = loadImage("IMG-chars.png");
}
// function setup() {
//     IMGportal.loadPixels();
//     IMGchars.loadPixels();
// }



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//UTILITY / COMFORT FUNCTIONS
function RickSensorIsInside(x, y, w, h) {
    if (Rick.xpos >= x &&
        Rick.xpos <= x + w &&
        (Rick.ypos + 191) >= y &&
        (Rick.ypos + 191) <= y + (0.3 * h))
        return true;
}

function MortySensorIsInside(x, y, w, h) {
    if (Morty.xpos >= x &&
        Morty.xpos <= x + w &&
        (Morty.ypos + 145) >= y &&
        (Morty.ypos + 145) <= y + (0.3 * h))
        return true;
}

function drawPortalgun(x, y, r) {

    if (Rick.portalgunAquired) {
        push();
        translate(x, y);
        rotate(r * Rick.xflip);
        fill(60, 200, 120, 170);    //LIQUID
        ellipse(18 * Rick.xflip, -2, 11 * Rick.scale, 30 * Rick.scale);
        fill(180, 180, 180);        //GUN
        rect(0, 0, 40 * Rick.scale * Rick.xflip, 12 * Rick.scale);
        ellipse(5 * Rick.xflip, 12, 15 * Rick.scale * Rick.xflip, 22 * Rick.scale);
        pop();
    } else {
        push();
        translate(x, y);
        noStroke();
        fill(120, 20, 20, 190);
        ellipse(16, 0, 60);
        rotate(r);
        stroke(1);
        fill(60, 200, 120, 170);    //LIQUID
        ellipse(18, -2, 11 * Rick.scale, 30 * Rick.scale);
        fill(180, 180, 180);        //GUN
        rect(0, 0, 40 * Rick.scale, 12 * Rick.scale);
        ellipse(5, 12, 15 * Rick.scale, 22 * Rick.scale);
        pop();
    }
}

function drawCarItem(x, y) {
    fill(120, 120, 20, 210);
    ellipse(x + 28, y + 5, 80);         //BACKGROUND CIRCLE
    fill(0, 255, 0);
    noStroke();
    fill(255, 30, 0);
    rect(x, y, 190 * 0.3, 50 * 0.3);
    triangle(x + 122 * 0.3, y,
        x + 155 * 0.3, y,
        x + 122 * 0.3, y - 46 * 0.3);
    rect(x + 50 * 0.3, y - 45 * 0.3, 75 * 0.3, 75 * 0.3);
    triangle(x + 52 * 0.3, y,
        x, y,
        x + 52 * 0.3, y - 46 * 0.3);
    fill(255, 255, 255);    //EYES
    stroke(1);
    ellipse(x + 130 * 0.3, y - 15 * 0.3, 25 * 0.3, 32 * 0.3);
    ellipse(x + 112 * 0.3, y - 15 * 0.3, 25 * 0.3, 32 * 0.3);
    fill(0, 0, 0);
    ellipse(x + 130 * 0.3, y - 15 * 0.3, 5 * 0.3, 6 * 0.3);
    ellipse(x + 112 * 0.3, y - 15 * 0.3, 5 * 0.3, 6 * 0.3);
    fill(40, 40, 40);          //WHEELS
    ellipse(x + 45 * 0.3, y + 50 * 0.3, 45 * 0.3);
    ellipse(x + 140 * 0.3, y + 50 * 0.3, 45 * 0.3);
    fill(205, 205, 205);
    ellipse(x + 45 * 0.3, y + 50 * 0.3, 18 * 0.3);
    ellipse(x + 140 * 0.3, y + 50 * 0.3, 18 * 0.3);
}

function infobox(s) {

    noStroke();

    if (nextIsActive) infoboxIsActive = true;

    if (!nextIsActive && s == "death") {

        fill(50, 40, 50, 200);
        // tint(255, 127);
        ellipse(0, 0, 10000, 10000);

        fill(20, 20, 20);
        rect(infobox_x, infobox_y, infobox_w, infobox_h);
        fill(255, 100, 120);
        rect(infobox_x + 5, infobox_y + 5, infobox_w - 10, infobox_h - 10);
        fill(20, 20, 20);
        rect(infobox_x + 10, infobox_y + 10, infobox_w - 20, infobox_h - 20);

        stroke(1);
        textSize(25);
        fill(255, 120, 120);
        text("GAME OVER", ((infobox_x + (infobox_x + infobox_w)) / 2) - 70, ((infobox_y + (infobox_y + infobox_h)) / 2) - 85);
        fill(255, 200, 200);
        textSize(18);
        text("One of your characters died.\n    What a pity :/ Try again!", infobox_x + 140, infobox_y + 145);

        // fill(60, 200, 80);
        fill(255, 120, 120);
        rect(IBbutton_XS, IBbutton_YS, IBbutton_XE - IBbutton_XS, IBbutton_YE - IBbutton_YS, 10);
        fill(0, 0, 0);
        textSize(35);
        text("Restart", IBbutton_XS + 15, IBbutton_YS + 50);

        SoundDeath.play();

        if (infoboxIsActive && (keyIsDown(13) || mouseIsPressed && mouseX > IBbutton_XS && mouseX < IBbutton_XE && mouseY > IBbutton_YS && mouseY < IBbutton_YE)) {
            resetValues();
            infoboxIsActive = false;
        }
    }

    if (s == "next") {

        fill(50, 40, 50, 200);
        // tint(255, 127);
        ellipse(0, 0, 10000, 10000);

        fill(20, 20, 20);
        rect(infobox_x, infobox_y, infobox_w, infobox_h);
        fill(120, 100, 220);
        rect(infobox_x + 5, infobox_y + 5, infobox_w - 10, infobox_h - 10);
        fill(20, 20, 20);
        rect(infobox_x + 10, infobox_y + 10, infobox_w - 20, infobox_h - 20);

        stroke(1);
        textSize(25);
        fill(255, 120, 120);
        text("LEVEL FINSIHED", ((infobox_x + (infobox_x + infobox_w)) / 2) - 100, ((infobox_y + (infobox_y + infobox_h)) / 2) - 85);
        fill(255, 200, 200);
        textSize(18);
        text("                   You played this level thorugh.", infobox_x + 40, infobox_y + 145);

        // fill(60, 200, 80);
        fill(120, 100, 220);
        rect(IBbutton_XS, IBbutton_YS, IBbutton_XE - IBbutton_XS, IBbutton_YE - IBbutton_YS, 10);
        fill(0, 0, 0);
        textSize(25);
        text("Next Level", IBbutton_XS + 15, IBbutton_YS + 50);

        if (infoboxIsActive && (keyIsDown(13) || mouseIsPressed && mouseX > IBbutton_XS && mouseX < IBbutton_XE && mouseY > IBbutton_YS && mouseY < IBbutton_YE)) {
            screen++;
            if (screen == 2) window.location.assign("level2.html");
            if (screen == 3) window.location.assign("level3.html");
            if (screen == 4) window.location.assign("level4.html");
            if (screen == 5) window.location.assign("endcard.html");
            infoboxIsActive = false;
        }
    }

    if (OKclicked.controls == false || OKclicked.portalgun == false || OKclicked.car == false) {

        if (s == "controls" && OKclicked.controls == false) {

            fill(50, 50, 50);
            rect(infobox_x - 10, infobox_y - 10, infobox_w + 20, infobox_h + 20);
            fill(25, 120, 200);
            rect(infobox_x, infobox_y, infobox_w, infobox_h);
            textSize(25);
            fill(255, 255, 255);
            text("Movement Controls", ((infobox_x + (infobox_x + infobox_w)) / 2) - 100, ((infobox_y + (infobox_y + infobox_h)) / 2) - 100);
            textSize(18);
            // text("         Use A and D to Move left and right.\n                   Press Space to Jump.\n                     Punch by hitting W.\nNow break the wooden barrier in front of you!",
            // infobox_x + 70, infobox_y + 145);
            text("         Use A and D to Move left and right.\n                   Press Space to Jump.\n                     Punch by hitting W.\n                  Swap character with ^",
                infobox_x + 70, infobox_y + 145);

            fill(60, 200, 80);
            rect(IBbutton_XS, IBbutton_YS + 40, IBbutton_XE - IBbutton_XS, IBbutton_YE - IBbutton_YS, 10);
            fill(0, 0, 0);
            textSize(30);
            text("OK", IBbutton_XS + 45, IBbutton_YS + 90);

            if (infoboxIsActive && (keyIsDown(13) || mouseIsPressed && mouseX > IBbutton_XS && mouseX < IBbutton_XE && mouseY > IBbutton_YS && mouseY < IBbutton_YE)) {
                infoboxIsActive = false;
                OKclicked.controls = true;
            }
        }

        if (s == "portalgun" && OKclicked.portalgun == false) {

            fill(50, 50, 50);
            rect(infobox_x - 10, infobox_y - 10, infobox_w + 20, infobox_h + 20);
            fill(60, 200, 80);
            rect(infobox_x, infobox_y, infobox_w, infobox_h);
            textSize(25);
            fill(0, 0, 0);
            text("You've unlocked Rick's Portal Gun!", ((infobox_x + (infobox_x + infobox_w)) / 2) - 180, ((infobox_y + (infobox_y + infobox_h)) / 2) - 100);
            textSize(18);
            text("     Press F to set up the first portal at your destination.\n                    Confirm its position by Clicking.\nThe second Portal will appear right right in front of you.\nCollect rotating thingy items to charge your Portal Gun.",
                infobox_x + 28, infobox_y + 145);

            fill(25, 120, 200);
            rect(IBbutton_XS, IBbutton_YS + 40, IBbutton_XE - IBbutton_XS, IBbutton_YE - IBbutton_YS, 10);
            fill(0, 0, 0);
            textSize(30);
            text("OK", IBbutton_XS + 45, IBbutton_YS + 90);

            if (infoboxIsActive && (keyIsDown(13) || mouseIsPressed && mouseX > IBbutton_XS && mouseX < IBbutton_XE && mouseY > IBbutton_YS && mouseY < IBbutton_YE)) {
                infoboxIsActive = false;
                OKclicked.portalgun = true;
                Rick.charge += 38;
            }
        }

        if (s == "car" && OKclicked.car == false) {

            fill(50, 50, 50);
            rect(infobox_x - 10, infobox_y - 10, infobox_w + 20, infobox_h + 20);
            fill(60, 200, 80);
            rect(infobox_x, infobox_y, infobox_w, infobox_h);
            textSize(25);
            fill(0, 0, 0);
            text("You've unlocked Morty's Spezial Attax!", ((infobox_x + (infobox_x + infobox_w)) / 2) - 210, ((infobox_y + (infobox_y + infobox_h)) / 2) - 100);
            textSize(18);
            text("                    Press F to transform into a car.\n                           Hold W to build up drive.\n  Release W and use A and D to move in superspeed\n                           and run over enemies\nCollect rotating thingy items to charge your car battery.",
                infobox_x + 28, infobox_y + 145);

            fill(25, 120, 200);
            rect(IBbutton_XS, IBbutton_YS + 40, IBbutton_XE - IBbutton_XS, IBbutton_YE - IBbutton_YS, 10);
            fill(0, 0, 0);
            textSize(30);
            text("OK", IBbutton_XS + 45, IBbutton_YS + 90);

            if (infoboxIsActive && (keyIsDown(13) || mouseIsPressed && mouseX > IBbutton_XS && mouseX < IBbutton_XE && mouseY > IBbutton_YS && mouseY < IBbutton_YE)) {
                infoboxIsActive = false;
                OKclicked.car = true;
                Morty.charge += 38;
            }
        }

        if (s == "enemies" && OKclicked.enemies == false) {
            fill(50, 50, 50);
            rect(infobox_x - 10, infobox_y - 10, infobox_w + 20, infobox_h + 20);
            fill(120, 40, 80);
            rect(infobox_x, infobox_y, infobox_w, infobox_h);
            textSize(25);
            fill(0, 0, 0);
            text("      The Bad Guys Are Here!", ((infobox_x + (infobox_x + infobox_w)) / 2) - 180, ((infobox_y + (infobox_y + infobox_h)) / 2) - 100);
            textSize(18);
            text("              A wild Schlorp GaDorp has appeared.\n                        And he brought friends...\n                    Let's kick their asses, Morty!",
                infobox_x + 28, infobox_y + 145);

            fill(25, 120, 200);
            rect(IBbutton_XS, IBbutton_YS + 40, IBbutton_XE - IBbutton_XS, IBbutton_YE - IBbutton_YS, 10);
            fill(0, 0, 0);
            textSize(30);
            text("OK", IBbutton_XS + 45, IBbutton_YS + 90);

            if (infoboxIsActive && (keyIsDown(13) || mouseIsPressed && mouseX > IBbutton_XS && mouseX < IBbutton_XE && mouseY > IBbutton_YS && mouseY < IBbutton_YE)) {
                infoboxIsActive = false;
                OKclicked.enemies = true;
            }
        }
    }
}

function resetValues() {
    Rick.xpos = spawnpointX;
    Rick.ypos = spawnpointY;
    Morty.xpos = spawnpointX - 60;
    Morty.ypos = spawnpointY;

    Rick.health = 100;
    Morty.health = 100;
    Schlorpy01.health = 50;
    Schlorpy02.health = 50;
    Schlorpy03.health = 50;
    Schlorpy04.health = 50;
    Schlorpy05.health = 50;

    Rick.charge = 0;
    Morty.charge = 0;

    portalDestiny_X = -1000;
    portalNear_X = -1000;

    COI01.collected = false;
    COI02.collected = false;
    COI03.collected = false;
    COI04.collected = false;
    COI05.collected = false;
    COI06.collected = false;
    COI07.collected = false;
    COI08.collected = false;
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CHARACTERS AND ITEMS
function keyPressed() {

    if (keyIsDown(220)) {
        if (Rick.isActivePlayer) {
            Rick.isActivePlayer = false;
            Morty.isActivePlayer = true;
        } else {
            Morty.isActivePlayer = false;
            Rick.isActivePlayer = true;
        }
    }
}

////RICK//////////////
Rick = {
    xpos: 50,
    ypos: 350,
    scale: 0.75,
    xflip: 1,
    health: 100,
    charge: 0,
    animationProgess: 0,
    isActivePlayer: true,
    movespeed: 11,


    spawn: function () {

        if (Rick.isStandingOnTerrain()) {
            Rick.movespeed = 11;
            Rick.jumpingProgress = 1;
            Rick.jumpStart = false;
            Rick.jumpingProgress = 1;
        }

        //Gravity
        if (Rick.isStandingOnTerrain() == false) {
            Rick.animationProgess = 0.75;
            Rick.ypos += 20;
        }

        //TELEPORTATION
        if (Rick.portalsAreOpen) {
            if (Rick.touches(portalNear_X, portalNear_Y - 30, portalNear_X + 100, portalNear_Y + 100) && Rick.canBeTeleported) {
                Rick.xflip *= -1;
                Rick.xpos = portalDestiny_X + 50;
                Rick.ypos = portalDestiny_Y + 15;
                Rick.canBeTeleported = false;
            }
            else if (Rick.touches(portalDestiny_X, portalDestiny_Y - 30, portalDestiny_X + 100, portalDestiny_Y + 100) && Rick.canBeTeleported) {
                Rick.xflip *= -1;
                Rick.xpos = portalNear_X + 50;
                Rick.ypos = portalNear_Y + 15;
                Rick.canBeTeleported = false;
            } else if (!Rick.touches(portalNear_X, portalNear_Y - 30, portalNear_X + 100, portalNear_Y + 100) && !Rick.touches(portalDestiny_X, portalDestiny_Y - 30, portalDestiny_X + 100, portalDestiny_Y + 100)) {
                Rick.canBeTeleported = true;
            }
        }

        //CONTROLS
        if (Rick.isActivePlayer && gameIsPaused == false && (keyIsDown(65) || keyIsDown(68) || keyIsDown(87) || keyIsDown(70))) {
            if (Rick.isActivePlayer && keyIsDown(65) && !keyIsDown(68)) {
                if (Rick.xpos > invisibleBorderLeft) Rick.xpos -= Rick.movespeed;
                Rick.xflip = -1;
                if (Rick.isStandingOnTerrain() && !keyIsDown(87)) Rick.animate();
            }

            if (Rick.isActivePlayer && keyIsDown(68) && !keyIsDown(65)) {
                if (Rick.xpos < invisibleBorderRight) Rick.xpos += Rick.movespeed;
                Rick.xflip = 1;
                if (Rick.isStandingOnTerrain() && !keyIsDown(87)) Rick.animate();
            }

            if (Rick.isActivePlayer && keyIsDown(87) && (!keyIsDown(65) || !keyIsDown(68))) Rick.punch();

            if (Rick.isActivePlayer && Rick.portalgunAquired && keyIsDown(70)) {
                Rick.firstF = true;
            }
        } else {
            Rick.animationProgess = 0;
            Rick.isAnimated = false;
            Rick.movespeed = 11;
            Rick.jumpingProgress = 1;
        }

        if (keyIsDown(70)) Rick.portalsInitiated = true;
        if (Rick.portalsInitiated) {
            Rick.shootPortal();
            image(IMGportal, portalDestiny_X, portalDestiny_Y, 100, 220);
            image(IMGportal, portalNear_X, portalNear_Y, 100, 220);
        }

        Rick.displayStats();

        //DEATH 
        if (Rick.health <= 0 || Rick.ypos > 1000) {
            Rick.health = 0;
            infoboxIsActive = true;
            infobox("death");
        }

        if (!gameIsPaused) Rick.jump();

        Rick.drawModel();
    },


    drawModel: function () {
        //RICK MODEL [difference ( pivot - lower end ) = 260]

        noStroke();
        fill(255, 255, 255);    //ARM (BACK)
        push();
        translate(Rick.xpos, Rick.ypos + (35 * Rick.scale));
        if (Rick.isAnimated == true) rotate(Rick.animationProgess * (-1) * Rick.xflip);
        rect(0, 8 * Rick.scale, (15 * Rick.scale) * Rick.xflip, 100 * Rick.scale);
        ellipse((7 * Rick.scale) * Rick.xflip, 10 * Rick.scale, 17 * Rick.scale);
        fill(235, 215, 190);
        ellipse(0 + (8 * Rick.scale) * Rick.xflip, 110 * Rick.scale, (16 * Rick.scale) * Rick.xflip, 18 * Rick.scale);
        pop();

        {   //LEGS
            fill(190, 145, 75);     //LEG (BACK)
            push();
            translate(Rick.xpos - ((10 * Rick.scale) * Rick.xflip), Rick.ypos + (120 * Rick.scale));
            if (Rick.isAnimated == true) rotate(Rick.animationProgess * 0.8 * Rick.xflip);
            {
                rect(0, 0, (20 * Rick.scale) * Rick.xflip, 120 * Rick.scale);
                fill(255, 255, 255);    //SOCKS
                rect((5 * Rick.scale) * Rick.xflip, 120 * Rick.scale, (10 * Rick.scale) * Rick.xflip, 6 * Rick.scale);
                fill(80, 80, 80);       //SHOES
                rect((2 * Rick.scale) * Rick.xflip, 126 * Rick.scale, (20 * Rick.scale) * Rick.xflip, 14 * Rick.scale);
                ellipse((10 - 8 * Rick.scale) * Rick.xflip, 134 * Rick.scale, (12 * Rick.scale) * Rick.xflip);
                triangle((22 * Rick.scale) * Rick.xflip, 125 * Rick.scale,
                    (35 * Rick.scale) * Rick.xflip, 140 * Rick.scale,
                    (22 * Rick.scale) * Rick.xflip, 140 * Rick.scale);
            }
            pop();

            fill(190, 145, 75);     //LEG (FRONT)
            push();
            translate(Rick.xpos - ((10 * Rick.scale) * Rick.xflip), Rick.ypos + (120 * Rick.scale));
            if (Rick.isAnimated == true) rotate(Rick.animationProgess * (-0.8) * Rick.xflip);
            {
                rect(0, 0, (20 * Rick.scale) * Rick.xflip, 120 * Rick.scale);
                fill(255, 255, 255);    //SOCKS
                rect((10 - 5 * Rick.scale) * Rick.xflip, 120 * Rick.scale, (10 * Rick.scale) * Rick.xflip, 6 * Rick.scale);
                fill(80, 80, 80);       //SHOES
                rect((10 - 8 * Rick.scale) * Rick.xflip, 126 * Rick.scale, (20 * Rick.scale) * Rick.xflip, 14 * Rick.scale);
                ellipse((10 - 8 * Rick.scale) * Rick.xflip, 0 + 134 * Rick.scale, (0 + 12 * Rick.scale) * Rick.xflip);
                triangle((22 * Rick.scale) * Rick.xflip, 125 * Rick.scale,
                    (35 * Rick.scale) * Rick.xflip, 140 * Rick.scale,
                    (22 * Rick.scale) * Rick.xflip, 140 * Rick.scale);
            }
            pop();
        }

        {       // NON-ANIMATED
            fill(155, 210, 215);    //TORSO
            rect((Rick.xpos - (10 * Rick.scale) * Rick.xflip), Rick.ypos + (35 * Rick.scale), (25 * Rick.scale) * Rick.xflip, 82 * Rick.scale);
            triangle(Rick.xpos - ((10 * Rick.scale) * Rick.xflip), Rick.ypos + (36 * Rick.scale),
                Rick.xpos + ((13 * Rick.scale) * Rick.xflip), Rick.ypos + (36 * Rick.scale),
                Rick.xpos, Rick.ypos);
            fill(190, 145, 75);
            ellipse(Rick.xpos + (5 * Rick.scale), Rick.ypos + (125 * Rick.scale), (15 * Rick.scale) * Rick.xflip);
            fill(110, 90, 55);      //BELT
            rect((Rick.xpos - (10 * Rick.scale) + (2 * Rick.xflip * Rick.scale)), Rick.ypos + (112 * Rick.scale), Math.abs((25 * Rick.scale) * Rick.xflip), 10 * Rick.scale, 10);
            fill(255, 255, 255);    //LAB COAT
            rect((Rick.xpos - (15 * Rick.scale) * Rick.xflip), Rick.ypos + (35 * Rick.scale), (16 * Rick.scale) * Rick.xflip, 150 * Rick.scale);
            triangle(Rick.xpos - ((15 * Rick.scale) * Rick.xflip), Rick.ypos + (35 * Rick.scale),
                Rick.xpos, Rick.ypos + (36 * Rick.scale),
                Rick.xpos, Rick.ypos);
            fill(245, 225, 200);    //HEAD
            ellipse(Rick.xpos, Rick.ypos, (30 * Rick.scale) * Rick.xflip, 55 * Rick.scale);
            fill(190, 210, 215);    //HAIR
            triangle(Rick.xpos - ((12 * Rick.scale) * Rick.xflip), Rick.ypos + (16 * Rick.scale), Rick.xpos - ((25 * Rick.scale) * Rick.xflip), Rick.ypos + (10 * Rick.scale), Rick.xpos - ((5 * Rick.scale) * Rick.xflip), Rick.ypos - (1 * Rick.scale));
            triangle(Rick.xpos - ((8 * Rick.scale) * Rick.xflip), Rick.ypos - (22 + Rick.scale), Rick.xpos - ((28 * Rick.scale) * Rick.xflip), Rick.ypos - (10 * Rick.scale), Rick.xpos - ((8 * Rick.scale) * Rick.xflip), Rick.ypos + (10 * Rick.scale));
            triangle(Rick.xpos - ((0 * Rick.scale) * Rick.xflip), Rick.ypos - (30 * Rick.scale), Rick.xpos - ((18 * Rick.scale) * Rick.xflip), Rick.ypos - (35 * Rick.scale), Rick.xpos - ((8 * Rick.scale) * Rick.xflip), Rick.ypos + (10 * Rick.scale));
            triangle(Rick.xpos + ((7 * Rick.scale) * Rick.xflip), Rick.ypos - (28 * Rick.scale), Rick.xpos + ((1 * Rick.scale) * Rick.xflip), Rick.ypos - (37 * Rick.scale), Rick.xpos - ((12 * Rick.scale) * Rick.xflip), Rick.ypos + (10 * Rick.scale));
            triangle(Rick.xpos + ((0 * Rick.scale) * Rick.xflip), Rick.ypos - (25 * Rick.scale), Rick.xpos + ((20 * Rick.scale) * Rick.xflip), Rick.ypos - (30 * Rick.scale), Rick.xpos - ((18 * Rick.scale) * Rick.xflip), Rick.ypos + (15 * Rick.scale));
            fill(245, 225, 200);    //HEAD-HAIR ADJUSTMENTS
            ellipse(Rick.xpos + ((2 * Rick.scale) * Rick.xflip), Rick.ypos - 2 * Rick.scale, (25 * Rick.scale) * Rick.xflip, 30 * Rick.scale);
            fill(255, 255, 255);    //EYES
            stroke(1);
            ellipse(Rick.xpos + ((10 * Rick.scale) * Rick.xflip), Rick.ypos - (1 * Rick.scale), (10 * Rick.scale) * Rick.xflip);
            noStroke();
            fill(0, 0, 0);
            ellipse(Rick.xpos + ((12 * Rick.scale) * Rick.xflip), Rick.ypos - (1 * Rick.scale), (3 * Rick.scale) * Rick.xflip);
            fill(100, 180, 225);    //EYEBROWS
            ellipse(Rick.xpos + ((10 * Rick.scale) * Rick.xflip), Rick.ypos - (8 * Rick.scale), (12 * Rick.scale) * Rick.xflip, 3 * Rick.scale);
            fill(0, 0, 0);          //MOUTH
            ellipse(Rick.xpos + ((10 * Rick.scale) * Rick.xflip), Rick.ypos + (13 * Rick.scale), (12 * Rick.scale) * Rick.xflip, 3 * Rick.scale);
        }

        fill(255, 255, 255);    //ARM (FRONT)
        push();
        translate(Rick.xpos, Rick.ypos + (35 * Rick.scale));           //NOTE: generell öfter zsmgehörige Meshes in einer neuen Matrize abspeichern --> einfacheres Behandeln als ganzes
        rotate(Rick.animationProgess * Rick.xflip);
        stroke(1);
        rect(0 - ((12 * Rick.scale) * Rick.xflip), 8 * Rick.scale, (15 * Rick.scale) * Rick.xflip, 100 * Rick.scale);
        noStroke();
        ellipse(0 - ((4 * Rick.scale) * Rick.xflip), 10 * Rick.scale, 17 * Rick.scale);
        fill(235, 215, 190);
        ellipse(0 - (4 * Rick.scale) * Rick.xflip, 110 * Rick.scale, (16 * Rick.scale) * Rick.xflip, 18 * Rick.scale);
        pop();

        //LAB COAT MOVEMENT EXTRA
        if (Rick.animationProgess >= 0)
            triangle(Rick.xpos - (((15 * Rick.scale) * Rick.xflip) * Rick.animationProgess), Rick.ypos + (80 * Rick.scale),
                Rick.xpos - (((15 * Rick.scale) * Rick.xflip) * Rick.animationProgess), Rick.ypos + (185 * Rick.scale),
                Rick.xpos - (((90 * Rick.scale) * Rick.xflip) * Rick.animationProgess), Rick.ypos + (190 * Rick.scale));
        if (Rick.animationProgess < 0 && Rick.animationProgess > -0.9)
            triangle(Rick.xpos - (((15 * Rick.scale) * Rick.xflip) * (-Rick.animationProgess)), Rick.ypos + (80 * Rick.scale),
                Rick.xpos - (((15 * Rick.scale) * Rick.xflip) * (-Rick.animationProgess)), Rick.ypos + (185 * Rick.scale),
                Rick.xpos - (((90 * Rick.scale) * Rick.xflip) * (-Rick.animationProgess)), Rick.ypos + (190 * Rick.scale));
    },


    acp: false,             //Checkpoint for direction of walking animation
    animate: function () {

        Rick.isAnimated = true;
        if (Rick.acp == false && Rick.animationProgess < 0.8) Rick.animationProgess += 0.18 * (Rick.movespeed / 11);
        else Rick.acp = true;
        if (Rick.acp == true && Rick.animationProgess > -0.75) Rick.animationProgess -= 0.18 * (Rick.movespeed / 11);
        else Rick.acp = false;

        randomSoundSel = round(random(3, 3));
        if (randomSoundSel == 1) soundWalking_01.play();
        if (randomSoundSel == 2) soundWalking_02.play();
        if (randomSoundSel == 3) soundWalking_03.play();
    },


    jumpStart: false,
    jumpingProgress: 0,
    jump: function () {

        if (Rick.isActivePlayer && keyIsDown(32) && Rick.isStandingOnTerrain()) {
            Rick.jumpingProgress = 0;
            Rick.jumpStart = true;
            Rick.movespeed = 17;
            Rick.isAnimated = true;
            if (!keyIsDown(65) && !keyIsDown(68)) Rick.animationProgess = 0.75;

        }

        if (Rick.jumpStart == true) {
            Rick.ypos -= 60 * round((1 / 1 + Rick.jumpingProgress));
            Rick.jumpingProgress += 0.14;
            if (Rick.jumpingProgress > 0.8) Rick.jumpStart = false;
        }
    },


    isAnimated: false,      //Must be disabled for punch animation (isAnimated is no criteria on front arm animation)
    punch: function () {
        Rick.animationProgess = - (0.45 * PI);
        soundPunching.play();
    },


    portalgunAquired: false,
    firstF: false,                  //Rick started placing the portal on true [Initiation]
    firstPortalSet: false,          //Rick has placed the first portal on true
    secondPortalSet: false,
    canBeTeleported: true,          //So that Portals wont loop-teleport to each other
    portalsAreOpen: false,          //To prevent teleporting during the progress of placing the portal
    chargeSubstracted: false,
    portalsInitiated: false,        //Turns true on F press to loop function while true
    chargeCost: 15,
    shootPortal: function () {
        if (Rick.firstF && Rick.firstPortalSet == false && Rick.charge >= Rick.chargeCost) {
            Rick.portalsAreOpen = false;
            portalDestiny_X = round(mouseX) - 50;
            portalDestiny_Y = round(mouseY) - 110;
            if (mouseIsPressed) {
                Rick.firstF = false;
                Rick.firstPortalSet = true;
                Rick.portalsAreOpen = true;
                if (Rick.chargeSubstracted == false) {
                    Rick.charge -= Rick.chargeCost;
                    Rick.chargeSubstracted = true;
                }
                if (!keyIsDown(65) && !keyIsDown(68) && !keyIsDown(32)) {
                    Rick.isAnimated = false;
                    Rick.animationProgess = - (0.45 * PI);
                    // if (portalDestiny_X >= Rick.xpos) Rick.xflip = 1;
                    // if (portalDestiny_X < Rick.xpos) Rick.xflip = -1;
                    drawPortalgun(Rick.xpos + ((108 * Rick.scale) * Rick.xflip), Rick.ypos + (35 * Rick.scale), 0.08);
                }
                soundPortalshot.play();
            }
            Rick.secondPortalSet = false;
        }

        if (Rick.firstF == false && Rick.firstPortalSet && Rick.secondPortalSet == false && Rick.charge >= 0) {
            Rick.isAnimated = false;
            Rick.animationProgess = - (0.45 * PI);
            drawPortalgun(Rick.xpos + ((108 * Rick.scale) * Rick.xflip), Rick.ypos + (35 * Rick.scale), 0.08);

            if (Rick.xflip > 0) portalNear_X = Rick.xpos + 50 * Rick.scale;
            if (Rick.xflip < 0) portalNear_X = Rick.xpos - 200 * Rick.scale;
            portalNear_Y = Rick.ypos - 40 * Rick.scale;
            Rick.secondPortalSet = true;
            Rick.firstPortalSet = false;
        }

        // if (Rick.isActivePlayer && keyIsDown(84)) Rick.portalsAreOpen = false;

        // if (Rick.portalsAreOpen) {
        image(IMGportal, portalDestiny_X, portalDestiny_Y, 100, 220);
        if (Rick.firstPortalSet) image(IMGportal, portalNear_X, portalNear_Y, 100, 220);
        // }
    },


    displayStats: function () {
        push();
        translate(HPbar_X, HPbar_Y);
        fill(0, 0, 0);
        rect(-22, 0, HPbar_W + 22, HPbar_H);
        fill(255, 0, 0);
        rect(0, 0, HPbar_W, HPbar_H);
        if (Rick.isActivePlayer) fill(255, 0, 120);
        else fill(255, 255, 255);
        textSize(20);
        text("R", -18, 19);
        fill(100, 255, 80);
        rect(0, 0, (Rick.health / 100) * 120, HPbar_H);

        if (Rick.portalgunAquired) {
            stroke(1);
            fill(20, 20, 20);
            rect(Fbar_X - HPbar_X, Fbar_Y - HPbar_Y, Fbar_W, Fbar_H);
            fill(80, 200, 255);
            rect(Fbar_X - HPbar_X, Fbar_Y - HPbar_Y, (Rick.charge / Fbar_W) * 80, Fbar_H);
        }
        noStroke();
        pop();
    },


    fist_X: function () {
        return Rick.xpos + (120 * Rick.scale * Rick.xflip);
    },
    fist_Y: function () {
        return Rick.ypos + (240 * Rick.scale);
    },


    touches: function (XS, YS, XE, YE) {
        if (XS <= Rick.xpos && Rick.xpos <= XE && YS <= Rick.ypos && Rick.ypos <= YE) return true;
        return false;
    },


    isStandingOnTerrain: function () {
        if (RickSensorIsInside(TO_01x, TO_01y, TO_01w, TO_01h)) return true;
        if (RickSensorIsInside(TO_02x, TO_02y, TO_02w, TO_02h)) return true;
        if (RickSensorIsInside(TO_03x, TO_03y, TO_03w, TO_03h)) return true;
        if (RickSensorIsInside(TO_04x, TO_04y, TO_04w, TO_04h)) return true;
        if (RickSensorIsInside(TO_05x, TO_05y, TO_05w, TO_05h)) return true;
        if (RickSensorIsInside(TO_06x, TO_06y, TO_06w, TO_06h)) return true;
        if (RickSensorIsInside(TO_07x, TO_07y, TO_07w, TO_07h)) return true;
        return false;
    },
};


////MORTY/////////////
Morty = {
    xpos: 50,
    ypos: 350,
    scale: 0.75,
    xflip: 1,
    health: 100,
    charge: 0,
    animationProgess: 0,
    isActivePlayer: false,
    movespeed: 11,
    carAquired: false,
    isCar: false,
    carTimer: 140,
    canBeTeleported: true,
    drive: 0,
    isSprinting: false,


    spawn: function () {

        if (Morty.isStandingOnTerrain()) {
            Morty.movespeed = 11;
            Morty.jumpingProgress = 1;
            Morty.jumpStart = false;
            Morty.jumpingProgress = 1;
        }

        //CAR TRANSFORMATION
        if (Morty.isActivePlayer && Morty.carAquired && Morty.charge > 20 && keyIsDown(70)) {
            Morty.carTimer = 140;
            Morty.drive = 0;
            Morty.isCar = true;
            Morty.charge -= 20;
        }
        if (Morty.isCar) {
            Morty.carTimer--;
            if (Morty.carTimer == 0) Morty.isCar = false;
            if (keyIsDown(87)) Morty.drive += 2;
            if (Morty.drive > 0 && !keyIsDown(87)) {
                Morty.isSprinting = true;
                if (11 * (Morty.drive / 65) <= 50) Morty.movespeed += 11 * (Morty.drive / 65);
                Morty.drive -= 3 + (0.05 * Morty.carTimer ^ 2);
            } else Morty.isSprinting = false;
        } else Morty.isSprinting = false;

        //Gravity
        if (Morty.isStandingOnTerrain() == false) {
            Morty.animationProgess = 0.75;
            Morty.ypos += 20;
        }

        //TELEPORTATION
        if (Rick.portalsAreOpen) {
            if (Morty.touches(portalNear_X, portalNear_Y - 30, portalNear_X + 100, portalNear_Y + 100) && Morty.canBeTeleported) {
                Morty.xflip *= -1;
                Morty.xpos = portalDestiny_X + 50;
                Morty.ypos = portalDestiny_Y + 15;
                Morty.canBeTeleported = false;
            }
            else if (Morty.touches(portalDestiny_X, portalDestiny_Y - 30, portalDestiny_X + 100, portalDestiny_Y + 100) && Morty.canBeTeleported) {
                Morty.xflip *= -1;
                Morty.xpos = portalNear_X + 50;
                Morty.ypos = portalNear_Y + 15;
                Morty.canBeTeleported = false;
            } else if (!Morty.touches(portalNear_X, portalNear_Y - 30, portalNear_X + 100, portalNear_Y + 100) && !Morty.touches(portalDestiny_X, portalDestiny_Y - 30, portalDestiny_X + 100, portalDestiny_Y + 100)) {
                Morty.canBeTeleported = true;
            }
        }

        //CONTROLS
        if (Morty.isActivePlayer && gameIsPaused == false && (keyIsDown(65) || keyIsDown(68) || keyIsDown(87))) {

            if (Morty.isActivePlayer && keyIsDown(65) && !keyIsDown(68)) {
                if (Morty.xpos > invisibleBorderLeft) Morty.xpos -= Morty.movespeed;
                Morty.xflip = -1;
                if (Morty.isStandingOnTerrain()) Morty.animate();
            }

            if (Morty.isActivePlayer && keyIsDown(68) && !keyIsDown(65)) {
                if (Morty.xpos < invisibleBorderRight) Morty.xpos += Morty.movespeed;
                Morty.xflip = 1;
                if (Morty.isStandingOnTerrain()) Morty.animate();
            }

            if (Morty.isActivePlayer && Morty.isCar == false && keyIsDown(87)) Morty.punch();

        } else {
            Morty.animationProgess = 0;
            Morty.isAnimated = false;
            Morty.movespeed = 11;
            Morty.jumpingProgress = 1;
        }

        Morty.displayStats();

        //DEATH 
        if (Morty.health <= 0 || Morty.ypos > 1000) {
            Morty.health = 0;
            infoboxIsActive = true;
            infobox("death");
        }

        if (!gameIsPaused && !Morty.isCar) Morty.jump();

        Morty.drawModel();
    },


    drawModel: function () {
        if (Morty.isCar) {
            Morty.scale = 0.82;
            push();
            translate(-75 * Morty.xflip, +90);
            fill(0, 255, 0);
            noStroke();
            fill(255, 30, 0);
            rect(Morty.xpos, Morty.ypos, 190 * Morty.scale * Morty.xflip, 50 * Morty.scale);
            triangle(Morty.xpos + 122 * Morty.scale * Morty.xflip, Morty.ypos,
                Morty.xpos + 155 * Morty.scale * Morty.xflip, Morty.ypos,
                Morty.xpos + 122 * Morty.scale * Morty.xflip, Morty.ypos - 46 * Morty.scale);
            rect(Morty.xpos + 50 * Morty.scale * Morty.xflip, Morty.ypos - 45 * Morty.scale, 75 * Morty.scale * Morty.xflip, 75 * Morty.scale);
            triangle(Morty.xpos - 52 * Morty.scale * -Morty.xflip, Morty.ypos,
                Morty.xpos, Morty.ypos,
                Morty.xpos + 52 * Morty.scale * Morty.xflip, Morty.ypos - 46 * Morty.scale);
            fill(255, 255, 255);    //EYES
            stroke(1);
            ellipse(Morty.xpos + 130 * Morty.scale * Morty.xflip, Morty.ypos - 15 * Morty.scale, 25 * Morty.scale, 32 * Morty.scale);
            ellipse(Morty.xpos + 112 * Morty.scale * Morty.xflip, Morty.ypos - 15 * Morty.scale, 25 * Morty.scale, 32 * Morty.scale);
            fill(0, 0, 0);
            ellipse(Morty.xpos + 130 * Morty.scale * Morty.xflip, Morty.ypos - 15 * Morty.scale, 5 * Morty.scale, 6 * Morty.scale);
            ellipse(Morty.xpos + 112 * Morty.scale * Morty.xflip, Morty.ypos - 15 * Morty.scale, 5 * Morty.scale, 6 * Morty.scale);
            fill(40, 40, 40);          //WHEELS
            ellipse(Morty.xpos + 45 * Morty.scale * Morty.xflip, Morty.ypos + 50 * Morty.scale, 45 * Morty.scale);
            ellipse(Morty.xpos + 140 * Morty.scale * Morty.xflip, Morty.ypos + 50 * Morty.scale, 45 * Morty.scale);
            fill(205, 205, 205);
            ellipse(Morty.xpos + 45 * Morty.scale * Morty.xflip, Morty.ypos + 50 * Morty.scale, 18 * Morty.scale);
            ellipse(Morty.xpos + 140 * Morty.scale * Morty.xflip, Morty.ypos + 50 * Morty.scale, 18 * Morty.scale);

            pop();
        } else {
            Morty.scale = 0.75;
            noStroke();
            //MORTY MODEL [difference ( pivot - lower end ) = 144 (on scale 0.75)]
            {
                noStroke();
                fill(250, 230, 120);     //ARM (BACK)
                push();
                translate(Morty.xpos, Morty.ypos + (22 * Morty.scale));
                if (Morty.isAnimated == true) rotate(Morty.animationProgess * (-1) * Morty.xflip);
                rect(0, 8 * Morty.scale, (15 * Morty.scale) * Morty.xflip, 72 * Morty.scale);
                ellipse((7 * Morty.scale) * Morty.xflip, 10 * Morty.scale, 17 * Morty.scale);
                fill(240, 200, 130);
                stroke(1);
                ellipse(0 + (8 * Morty.scale) * Morty.xflip, 75 * Morty.scale, (16 * Morty.scale) * Morty.xflip, 18 * Morty.scale);
                noStroke();
                pop();
                {   //LEGS
                    fill(20, 40, 120);     //LEG (BACK)
                    push();
                    translate(Morty.xpos, Morty.ypos + (90 * Morty.scale));
                    if (Morty.isAnimated == true) rotate(Morty.animationProgess * 0.8 * Morty.xflip);
                    {
                        rect(0, 0, (20 * Morty.scale) * Morty.xflip, 80 * Morty.scale);
                        fill(255, 255, 255);    //SOCKS
                        rect((5 * Morty.scale) * Morty.xflip, 80 * Morty.scale, (10 * Morty.scale) * Morty.xflip, 6 * Morty.scale);
                        fill(80, 80, 80);       //SHOES
                        rect((2 * Morty.scale) * Morty.xflip, 86 * Morty.scale, (20 * Morty.scale) * Morty.xflip, 14 * Morty.scale);
                        ellipse((10 - 8 * Morty.scale) * Morty.xflip, 94 * Morty.scale, (12 * Morty.scale) * Morty.xflip);
                        triangle((22 * Morty.scale) * Morty.xflip, 85 * Morty.scale,
                            (35 * Morty.scale) * Morty.xflip, 100 * Morty.scale,
                            (22 * Morty.scale) * Morty.xflip, 100 * Morty.scale);
                    }
                    pop();

                    fill(20, 40, 120);     //LEG (FRONT)
                    push();
                    translate(Morty.xpos - ((15 * Morty.scale) * Morty.xflip), Morty.ypos + (90 * Morty.scale));
                    if (Morty.isAnimated == true) rotate(Morty.animationProgess * (-0.8) * Morty.xflip);
                    {
                        rect(0, 0, (20 * Morty.scale) * Morty.xflip, 80 * Morty.scale);
                        fill(255, 255, 255);    //SOCKS
                        rect((5 * Morty.scale) * Morty.xflip, 80 * Morty.scale, (10 * Morty.scale) * Morty.xflip, 6 * Morty.scale);
                        fill(80, 80, 80);       //SHOES
                        rect((2 * Morty.scale) * Morty.xflip, 86 * Morty.scale, (20 * Morty.scale) * Morty.xflip, 14 * Morty.scale);
                        ellipse((10 - 8 * Morty.scale) * Morty.xflip, 94 * Morty.scale, (12 * Morty.scale) * Morty.xflip);
                        triangle((22 * Morty.scale) * Morty.xflip, 85 * Morty.scale,
                            (35 * Morty.scale) * Morty.xflip, 100 * Morty.scale,
                            (22 * Morty.scale) * Morty.xflip, 100 * Morty.scale);
                    }
                    pop();
                    fill(20, 40, 120);
                    ellipse(Morty.xpos + 1 * Morty.scale, Morty.ypos + (90 * Morty.scale), 35 * Morty.scale * Morty.xflip, 30 * Morty.scale);
                }
                fill(250, 230, 120);        //TORSO
                stroke(1);
                rect(Morty.xpos - ((15 * Morty.scale) * Morty.xflip), Morty.ypos + 26 * Morty.scale, (35 * Morty.scale) * Morty.xflip, 66 * Morty.scale);
                noStroke();
                triangle(Morty.xpos - (16 * Morty.scale) * Morty.xflip, Morty.ypos + 28 * Morty.scale,
                    Morty.xpos, Morty.ypos,
                    Morty.xpos + ((21 * Morty.scale) * Morty.xflip), Morty.ypos + 28 * Morty.scale);
                fill(80, 60, 20);           //HAIR
                ellipse(Morty.xpos - ((5 * Morty.scale) * Morty.xflip), Morty.ypos - 6 * Morty.scale, (50 * Morty.scale) * Morty.xflip);
                fill(240, 200, 130);        //HEAD
                stroke(1);
                ellipse(Morty.xpos, Morty.ypos, 45 * Morty.scale);
                fill(255, 255, 255);         //EYES
                ellipse(Morty.xpos + 18 * Morty.scale * Morty.xflip, Morty.ypos - 7 * Morty.scale, 12 * Morty.scale * Morty.xflip, 12 * Morty.scale);
                ellipse(Morty.xpos + 4 * Morty.scale * Morty.xflip, Morty.ypos - 7 * Morty.scale, 12 * Morty.scale * Morty.xflip, 12 * Morty.scale);
                fill(0, 0, 0);
                ellipse(Morty.xpos + 18 * Morty.scale * Morty.xflip, Morty.ypos - 7 * Morty.scale, 3 * Morty.scale * Morty.xflip, 3 * Morty.scale);
                ellipse(Morty.xpos + 4 * Morty.scale * Morty.xflip, Morty.ypos - 7 * Morty.scale, 3 * Morty.scale * Morty.xflip, 3 * Morty.scale);
                //MOUTH
                ellipse(Morty.xpos + 10 * Morty.scale * Morty.xflip, Morty.ypos + 8 * Morty.scale, 16 * Morty.scale * Morty.xflip, 2 * Morty.scale);
            }
            fill(250, 230, 120);    //ARM (FRONT)
            push();
            translate(Morty.xpos, Morty.ypos + (22 * Morty.scale));           //NOTE: generell öfter zsmgehörige Meshes in einer neuen Matrize abspeichern --> einfacheres Behandeln als ganzes
            rotate(Morty.animationProgess * Morty.xflip);
            stroke(1);
            rect(0 - ((12 * Morty.scale) * Morty.xflip), 8 * Morty.scale, (15 * Morty.scale) * Morty.xflip, 72 * Morty.scale);
            noStroke();
            ellipse(0 - ((4 * Morty.scale) * Morty.xflip), 10 * Morty.scale, 17 * Morty.scale);
            fill(240, 200, 130);
            stroke(1);
            ellipse(0 - (4 * Morty.scale) * Morty.xflip, 75 * Morty.scale, (16 * Morty.scale) * Morty.xflip, 18 * Morty.scale);
            noStroke();
            pop();
        }
    },


    acp: false,             //Checkpoint for direction of walking animation
    animate: function () {

        Morty.isAnimated = true;
        if (Morty.acp == false && Morty.animationProgess < 0.8) Morty.animationProgess += 0.18 * (Morty.movespeed / 11);
        else Morty.acp = true;
        if (Morty.acp == true && Morty.animationProgess > -0.75) Morty.animationProgess -= 0.18 * (Morty.movespeed / 11);
        else Morty.acp = false;

        randomSoundSel = round(random(3, 3));
        if (randomSoundSel == 1) soundWalking_01.play();
        if (randomSoundSel == 2) soundWalking_02.play();
        if (randomSoundSel == 3) soundWalking_03.play();
    },


    jumpStart: false,
    jumpingProgress: 0,
    jump: function () {

        if (Morty.isActivePlayer && keyIsDown(32) && Morty.isStandingOnTerrain()) {
            Morty.jumpingProgress = 0;
            Morty.jumpStart = true;
            Morty.movespeed = 17;
            Morty.isAnimated = true;
            if (!keyIsDown(65) && !keyIsDown(68)) Morty.animationProgess = 0.75;

        }

        if (Morty.jumpStart == true) {
            Morty.ypos -= 60 * round((1 / 1 + Morty.jumpingProgress));
            Morty.jumpingProgress += 0.14;
            if (Morty.jumpingProgress > 0.8) Morty.jumpStart = false;
        }
    },


    isAnimated: false,      //Must be disabled for punch animation (isAnimated is no criteria on front arm animation)
    punch: function () {
        Morty.animationProgess = - (0.45 * PI);
        soundPunching.play();
    },


    displayStats: function () {
        push();
        translate(HPbar_X, HPbar_Y + 20);
        stroke(1);
        fill(0, 0, 0);
        rect(- 22, HPbar_Y, HPbar_W + 22, HPbar_H);
        fill(255, 0, 0);
        rect(0, HPbar_Y, HPbar_W, HPbar_H);
        if (Morty.isActivePlayer) fill(255, 0, 120);
        else fill(255, 255, 255);
        textSize(20);
        text("M", - 18, HPbar_Y + 19);
        fill(100, 255, 80);
        rect(0, HPbar_Y, (Morty.health / 100) * 120, HPbar_H);

        if (Morty.carAquired) {
            fill(20, 20, 20);
            rect(Fbar_X - HPbar_X, Fbar_Y - HPbar_Y + 40, Fbar_W, Fbar_H);
            fill(80, 200, 255);
            rect(Fbar_X - HPbar_X, Fbar_Y - HPbar_Y + 40, (Morty.charge / 100) * 80, Fbar_H);
            if (Morty.isCar) {
                fill(180, 30, 30);
                rect(Fbar_X - HPbar_X, Fbar_Y - HPbar_Y + Fbar_H + 40, Morty.drive, Fbar_H);
            }
        }
        if (Morty.isCar) {
            fill(0, 0, 0);
            text(Morty.carTimer, HPbar_X - 30, HPbar_Y + 20);
        }
        noStroke();
        pop();
    },


    fist_X: function () {
        return Morty.xpos + (60 * Morty.scale * Morty.xflip);
    },
    fist_Y: function () {
        return Morty.ypos + (120 * Morty.scale);
    },

    touches: function (XS, YS, XE, YE) {
        if (XS <= Morty.xpos && Morty.xpos <= XE && YS <= Morty.ypos && Morty.ypos <= YE) return true;
        return false;
    },

    isStandingOnTerrain: function () {
        if (MortySensorIsInside(TO_01x, TO_01y, TO_01w, TO_01h)) return true;
        if (MortySensorIsInside(TO_02x, TO_02y, TO_02w, TO_02h)) return true;
        if (MortySensorIsInside(TO_03x, TO_03y, TO_03w, TO_03h)) return true;
        if (MortySensorIsInside(TO_04x, TO_04y, TO_04w, TO_04h)) return true;
        if (MortySensorIsInside(TO_05x, TO_05y, TO_05w, TO_05h)) return true;
        if (MortySensorIsInside(TO_06x, TO_06y, TO_06w, TO_06h)) return true;
        if (MortySensorIsInside(TO_07x, TO_07y, TO_07w, TO_07h)) return true;
        return false;
    },
};


////ENEMIES///////////
function SchlorpGaDorb(x, y) {
    this.xpos = x;
    this.ypos = y;
    this.health = 50;
    this.xflip = 1;
    this.scale = 1;
    this.movespeed = 4;
    this.minDist = 50;
    this.randomWalking = false;
    this.canBeTeleported = true;
    this.canTakeDamage = true;          //For non-continuos damage when punching

    this.spawn = function () {
        //TAKING DAMAGE
        if (this.canTakeDamage) {
            if (Rick.isActivePlayer) {
                if (keyIsDown(87) && Rick.fist_X() > this.xpos - 45 && Rick.fist_Y() > this.ypos - 100 && Rick.fist_X() < this.xpos + 70 && Rick.fist_Y() < this.ypos + 50) {
                    this.health -= 8;
                    this.canTakeDamage = false;
                }
            } else {
                if (keyIsDown(87) && Morty.isCar == false && Morty.fist_X() > this.xpos - 45 && Morty.fist_Y() > this.ypos - 100 && Morty.fist_X() < this.xpos + 45 && Morty.fist_Y() < this.ypos + 50) {
                    this.health -= 8;
                    this.canTakeDamage = false;
                }
                else if (Morty.isSprinting) {
                    if (this.touches(Morty.xpos - 80, Morty.ypos - 100, Morty.xpos + 80, Morty.ypos + 100)) {
                        // if (this.xpos)
                        this.health -= 2 * (Morty.drive / 35);
                    }
                }
            }
        } else if (!keyIsDown(87)) {
            this.canTakeDamage = true;
        }
        if (this.ypos > 950) this.health = 0;

        this.displayStats();

        //MOVEMENT
        if (this.isStandingOnTerrain() && !infoboxIsActive) {
            if (this.preSensorIsOnTerrain()) {
                if (this.randomWalking == false) {
                    console.log("#0");
                    if (this.nearestPlayer() == "Morty") {
                        console.log("#1");
                        if (this.xpos > Morty.xpos + this.minDist) {
                            this.xflip = 1;
                            this.xpos -= this.movespeed;
                            console.log("#1.1");
                        }
                        if (this.xpos < Morty.xpos - this.minDist) {
                            this.xflip = -1;
                            this.xpos += this.movespeed;
                            console.log("#1.2");
                        }
                    }
                    if (this.nearestPlayer() == "Rick") {
                        console.log("#2");
                        if (this.xpos > Rick.xpos + this.minDist) {
                            this.xflip = 1;
                            this.xpos -= this.movespeed;
                            console.log("#2.1");

                        }
                        if (this.xpos < Rick.xpos - this.minDist) {
                            this.xflip = -1;
                            this.xpos += this.movespeed;
                            console.log("#2.2");
                        }
                    }
                } if (this.randomWalking) {
                    console.log("#0.2");
                    this.xpos -= this.movespeed * this.xflip;
                }
            } else {
                this.randomWalking = true;
                this.xflip *= -1;
                this.xpos += this.movespeed * this.xflip;
                console.log("#-1");
                // if (Rick.isActivePlayer) {
                //     if (Rick.ypos - 25 <= this.ypos && this.ypos <= Rick.ypos + 260) {
                //         this.randomWalking = false;
                //         console.log("#-1.1");

                //     }
                // } if (Morty.isActivePlayer) {
                //     console.log("#-1.2");
                //     if (Morty.ypos - 25 <= this.ypos && this.ypos <= Morty.ypos + 144) {
                //         this.randomWalking = false;
                //     }
                // }
            }

            if (Rick.touches(this.xpos - 60, this.ypos - 50, this.xpos + 60, this.ypos + 50)) {
                Rick.health -= 20;
                // SoundDeath.play();
            }

            if (Morty.touches(this.xpos - 60, this.ypos - 50, this.xpos + 60, this.ypos + 50)) {
                Morty.health -= 20;
                // SoundDeath.play();
            }
        }

        this.drawModel();

        //Gravity
        if (this.isStandingOnTerrain() == false) this.ypos += 15;

        //Teleportation
        if (Rick.portalsAreOpen) {
            if (this.touches(portalNear_X, portalNear_Y, portalNear_X + 100, portalNear_Y + 220) && this.canBeTeleported) {
                this.xflip *= -1;
                this.xpos = portalDestiny_X + 50;
                this.ypos = portalDestiny_Y + 175;
                this.canBeTeleported = false;
            }
            else if (this.touches(portalDestiny_X, portalDestiny_Y, portalDestiny_X + 100, portalDestiny_Y + 220) && this.canBeTeleported) {
                this.xflip *= -1;
                this.xpos = portalNear_X + 50;
                this.ypos = portalNear_Y + 175;
                this.canBeTeleported = false;
            } else if (!this.touches(portalNear_X, portalNear_Y, portalNear_X + 100, portalNear_Y + 220) && !this.touches(portalDestiny_X, portalDestiny_Y, portalDestiny_X + 100, portalDestiny_Y + 100)) {
                this.canBeTeleported = true;
            }
        }

        if (this.touches(!infoboxIsActive && Rick.xpos - 50, Rick.ypos, Rick.xpos + 50, Rick.ypos + 240)) Rick.health -= 2;
        if (!infoboxIsActive && Morty.isCar == false && this.touches(Morty.xpos - 50, Morty.ypos, Morty.xpos + 50, Morty.ypos + 144)) Morty.health -= 2;
    };

    this.nearestPlayer = function () {
        if (Math.abs(this.xpos - Rick.xpos) > (Math.abs(this.xpos - Morty.xpos))) return "Morty";
        else return "Rick";
    };

    this.displayStats = function () {
        stroke(1);
        fill(255, 20, 20);
        rect(this.xpos - 35 * this.scale, this.ypos - 75 * this.scale, 80 * this.scale, 12 * this.scale);
        fill(20, 255, 20);
        rect(this.xpos - 35 * this.scale, this.ypos - 75 * this.scale, (this.health / 50) * 80 * this.scale, 12 * this.scale);
    };

    this.SchlorpSensorIsInside = function (x, y, w, h) {
        if (this.xpos >= x &&
            this.xpos <= x + w &&
            (this.ypos + 45) >= y &&
            (this.ypos + 45) <= y + (0.3 * h)) {
            return true;
        }
    };

    this.isStandingOnTerrain = function () {
        if (screen == 0) return;
        if (this.SchlorpSensorIsInside(TO_01x, TO_01y, TO_01w, TO_01h)) return true;
        if (this.SchlorpSensorIsInside(TO_02x, TO_02y, TO_02w, TO_02h)) return true;
        if (this.SchlorpSensorIsInside(TO_03x, TO_03y, TO_03w, TO_03h)) return true;
        if (this.SchlorpSensorIsInside(TO_04x, TO_04y, TO_04w, TO_04h)) return true;
        if (this.SchlorpSensorIsInside(TO_05x, TO_05y, TO_05w, TO_05h)) return true;
        if (this.SchlorpSensorIsInside(TO_06x, TO_06y, TO_06w, TO_06h)) return true;
        if (this.SchlorpSensorIsInside(TO_07x, TO_07y, TO_07w, TO_07h)) return true;
        else return false;
    };

    this.preSensorIsInside = function (x, y, w, h) {
        if (this.xpos - 60 * this.xflip >= x &&
            this.xpos - 60 * this.xflip <= x + w &&
            (this.ypos + 45) >= y &&
            (this.ypos + 45) <= y + (0.3 * h)) {
            return true;
        }
    };

    this.preSensorIsOnTerrain = function () {
        if (this.preSensorIsInside(TO_01x, TO_01y, TO_01w, TO_01h)) return true;
        if (this.preSensorIsInside(TO_02x, TO_02y, TO_02w, TO_02h)) return true;
        if (this.preSensorIsInside(TO_03x, TO_03y, TO_03w, TO_03h)) return true;
        if (this.preSensorIsInside(TO_04x, TO_04y, TO_04w, TO_04h)) return true;
        if (this.preSensorIsInside(TO_05x, TO_05y, TO_05w, TO_05h)) return true;
        if (this.preSensorIsInside(TO_06x, TO_06y, TO_06w, TO_06h)) return true;
        if (this.preSensorIsInside(TO_07x, TO_07y, TO_07w, TO_07h)) return true;
        return false;
    };

    this.drawModel = function () {
        {   //Blops
            fill(255, 255, 180);
            stroke(1);
            ellipse(this.xpos - 12 * this.scale * this.xflip, this.ypos - 43 * this.scale, 18 * this.scale, 28 * this.scale);

            fill(100, 10, 50);
            stroke(1);
            ellipse(this.xpos + 16 * this.scale * this.xflip, this.ypos - 46 * this.scale, 12 * this.scale);
            ellipse(this.xpos - 38 * this.scale * this.xflip, this.ypos + 20 * this.scale, 11 * this.scale);
            ellipse(this.xpos + 35 * this.scale * this.xflip, this.ypos - 30 * this.scale, 10 * this.scale);
            ellipse(this.xpos + 55 * this.scale * this.xflip, this.ypos + 8 * this.scale, 7 * this.scale);
            noStroke();
        }
        {   //BODY
            fill(120, 30, 70);
            ellipse(this.xpos, this.ypos, 90 * this.scale, 100 * this.scale);
            triangle(this.xpos, this.ypos + 50 * this.scale,
                this.xpos + 80 * this.scale * this.xflip, this.ypos + 50 * this.scale,
                this.xpos + 40 * this.scale * this.xflip, this.ypos + 20 * this.scale);
            ellipse(this.xpos + 38 * this.scale * this.xflip, this.ypos + 15 * this.scale, 35 * this.scale, 40 * this.scale);
            ellipse(this.xpos + 45 * this.scale * this.xflip, this.ypos + 30 * this.scale, 35 * this.scale, 25 * this.scale);
            ellipse(this.xpos + 62 * this.scale * this.xflip, this.ypos + 41 * this.scale, 20 * this.scale, 17 * this.scale);
        }
        {   //More Blops
            fill(100, 10, 50);
            stroke(1);
            ellipse(this.xpos + 13 * this.scale * this.xflip, this.ypos - 25 * this.scale, 5 * this.scale);
            ellipse(this.xpos + 45 * this.scale * this.xflip, this.ypos + 25 * this.scale, 6 * this.scale);
            ellipse(this.xpos + 42 * this.scale * this.xflip, this.ypos - 15 * this.scale, 11 * this.scale);
            ellipse(this.xpos + 10 * this.scale * this.xflip, this.ypos - 20 * this.scale, 9 * this.scale);
            ellipse(this.xpos + 20 * this.scale * this.xflip, this.ypos - 35 * this.scale, 5 * this.scale);
            ellipse(this.xpos + 20 * this.scale * this.xflip, this.ypos - 5 * this.scale, 7 * this.scale);
            ellipse(this.xpos + 23 * this.scale * this.xflip, this.ypos - 25 * this.scale, 7 * this.scale);
            ellipse(this.xpos + 38 * this.scale * this.xflip, this.ypos + 10 * this.scale, 5 * this.scale);
            ellipse(this.xpos + 70 * this.scale * this.xflip, this.ypos + 37 * this.scale, 5 * this.scale);
            ellipse(this.xpos + 3 * this.scale * this.xflip, this.ypos + 5 * this.scale, 5 * this.scale);
            ellipse(this.xpos - 42 * this.scale * this.xflip, this.ypos + 8 * this.scale, 7 * this.scale);
            ellipse(this.xpos - 14 * this.scale * this.xflip, this.ypos - 16 * this.scale, 5 * this.scale);
            ellipse(this.xpos, this.ypos - 42 * this.scale, 5 * this.scale);
        }
        fill(255, 255, 180);
        ellipse(this.xpos - 20 * this.scale * this.xflip, this.ypos - 45 * this.scale, 18 + this.scale, 28 * this.scale);
        fill(30, 30, 15);
        ellipse(this.xpos - 25 * this.scale * this.xflip, this.ypos - 45 * this.scale, 6 * this.scale, 8 * this.scale);

        noStroke();
        push();
        translate(this.xpos - 45 * this.scale * this.xflip, this.ypos);
        rotate();
        rect();
        pop();
    };

    this.touches = function (XS, YS, XE, YE) {
        if (XS <= this.xpos && this.xpos <= XE && YS <= this.ypos && this.ypos <= YE) {
            return true;
        }
        return false;
    };

    this.reposition = function (x, y) {
        this.xpos = x;
        this.ypos = y;
    };
}


////ITEMS/////////////
function Charger(x, y) {
    this.xpos = x;
    this.ypos = y;
    this.collected = false;
    this.scale = 1;
    this.rot = 0;
    this.amount = 30;

    this.spawn = function () {
        if (this.collected == false) this.drawModel();
        if (this.collected == false && Rick.touches(this.xpos - 20 * this.scale, this.ypos - 160 * this.scale, this.xpos + 40 * this.scale, this.ypos + 90 * this.scale)) {
            Rick.charge += this.amount;
            this.collected = true;
        }
        if (Morty.isSprinting) {
            if (this.collected == false && Morty.touches(this.xpos - 110 * this.scale, this.ypos - 160 * this.scale, this.xpos + 110 * this.scale, this.ypos + 90 * this.scale)) {
                Morty.charge += this.amount;
                this.collected = true;
            }
        }
        else if (this.collected == false && Morty.touches(this.xpos - 20 * this.scale, this.ypos - 160 * this.scale, this.xpos + 40 * this.scale, this.ypos + 90 * this.scale)) {
            Morty.charge += this.amount;
            this.collected = true;
        }
        this.rot += 0.15;
        if (this.rot >= 5 * PI) this.rot = 0;
    };

    this.drawModel = function () {
        push();
        translate(this.xpos, this.ypos);
        rotate(this.rot);
        fill(40, 20, 20);
        ellipse(0, 10 * this.scale, 23 * this.scale, 45 * this.scale);
        fill(180, 20, 20);
        ellipse(0, -1 * this.scale, 23 * this.scale, 45 * this.scale);
        stroke(1);
        fill(60, 160, 200);
        ellipse(0, 0, 20 * this.scale, 40 * this.scale);
        noStroke();
        fill(40, 200, 80);
        ellipse(0, -3, 12 * this.scale, 28 * this.scale);
        pop();
    };

    this.reposition = function (newX, newY) {
        this.xpos = newX;
        this.ypos = newY;
    };
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//SCREENS
function runGame() {
    if (screen == 0) window.location.assign("index.html");
    if (screen == 1) startGame_level(screen);
    if (screen == 2) startGame_level(screen);
    if (screen == 3) startGame_level(screen);
    if (screen == 4) startGame_level(screen);
    // if (screen == 5) window.location.assign("endcard.html");
}

function startGame_level(level) {    //LEVELDESIGN

    //LEVEL 01////////////////////////
    if (level == 1) {

        /////////ISTANCE ENVIRONMENT DRAWING//////////////
        if (firstsetup) {
            screen = 1;

            spawnpointX = 150;
            spawnpointY = 400;

            TO_01x = -10;
            TO_01y = 700;
            TO_01w = 300;
            TO_01h = TO_uniHeight;

            TO_02x = 750;
            TO_02y = 800;
            TO_02w = 450;
            TO_02h = TO_uniHeight;

            TO_03x = 530;
            TO_03y = 550;
            TO_03w = 450;
            TO_03h = TO_uniHeight;

            TO_04x = 1450;
            TO_04y = 320;
            TO_04w = 500;
            TO_04h = TO_uniHeight;

            TO_05x = 450;
            TO_05y = 550;
            TO_05w = 450;
            TO_05h = TO_uniHeight;

            COI01.reposition(700, 480);
            COI02.reposition(1580, 200);
            COI03.reposition(880, 720);
            COI04.reposition(1270, 600);

            firstsetup = false;
        }
        stroke(1);  //SOLID
        fill(180, 110, 50);
        rect(TO_03x + 20, TO_03y + TO_03h, TO_03w - 40, 800);
        rect(TO_04x + 150, TO_04y + TO_04h, TO_04w - 170, 800);

        fill(150, 80, 20);
        rect(TO_01x, TO_01y + TO_01h, TO_01w - 40, 500);
        rect(TO_02x + 20, TO_02y + TO_02h, TO_02w - 40, 800);

        fill(0, 120, 0);    //WALKING GROUND
        rect(TO_01x, TO_01y, TO_01w, TO_01h, 15);
        rect(TO_02x, TO_02y, TO_02w, TO_02h, 15);
        rect(TO_03x, TO_03y, TO_03w, TO_03h, 15);
        rect(TO_04x, TO_04y, TO_04w, TO_04h, 15);

        if (Rick.portalgunAquired || Morty.carAquired) {
            COI01.spawn();
            COI02.spawn();
            COI03.spawn();
            COI04.spawn();
        }

        if (Rick.portalgunAquired == false) drawPortalgun(ITEMportalgun_X, ITEMportalgun_Y, -0.35);

        ///////////INDIVIDUAL INSTANCE CONTENT//////////////
        ITEMportalgun_X = 1150;
        ITEMportalgun_Y = 700;
    }

    //LEVEL 02////////////////////////
    if (level == 2) {

        ///////////ISTANCE ENVIRONMENT DRAWING//////////////
        if (firstsetup) {
            screen = 2;
            spawnpointX = 100;
            spawnpointY = 400;

            TO_01x = 250;
            TO_01y = 800;
            TO_01w = 1400;
            TO_01h = TO_uniHeight;

            TO_02x = 0;
            TO_02y = 650;
            TO_02w = 160;
            TO_02h = TO_uniHeight;

            TO_03x = 1700;
            TO_03y = TO_02y;
            TO_03w = TO_02w;
            TO_03h = TO_uniHeight;

            // TO_04x = 1450;
            // TO_04y = TO_05y;
            // TO_04w = TO_05w;
            // TO_04h = TO_uniHeight;

            TO_05x = 1450;
            TO_05y = 380;
            TO_05w = 100;
            TO_05h = TO_uniHeight;

            TO_06x = 700;
            TO_06y = 300;
            TO_06w = 150;
            TO_06h = TO_uniHeight;

            TO_07x = 1000;
            TO_07y = 300;
            TO_07w = 150;
            TO_07h = TO_uniHeight;

            //SOLID
            fill(150, 80, 20);
            rect(TO_01x + 20, TO_01y + TO_01h, TO_01w - 40, 500);

            COI01.reposition(950, 150);
            COI02.reposition(450, 120);
            COI03.reposition(1400, 120);

            Schlorpy01.xpos = 400;
            Schlorpy01.ypos = 550;
            Schlorpy02.xpos = 650;
            Schlorpy02.ypos = 550;
            Schlorpy03.xpos = 1000;
            Schlorpy03.ypos = 550;
            Schlorpy04.xpos = 1300;
            Schlorpy04.ypos = 550;
            Schlorpy01.randomWalking = false;
            Schlorpy02.randomWalking = false;
            Schlorpy03.randomWalking = false;
            Schlorpy04.randomWalking = false;

            firstsetup = false;
        }
        Rick.portalgunAquired = true;

        fill(0, 120, 0);    //WALKING GROUND
        rect(TO_01x, TO_01y, TO_01w, TO_01h, 15);
        rect(TO_02x, TO_02y, TO_02w, TO_02h, 15);
        rect(TO_03x, TO_03y, TO_03w, TO_03h, 15);
        // rect(TO_04x, TO_04y, TO_04w, TO_04h, 15);
        rect(TO_05x, TO_05y, TO_05w, TO_05h, 15);
        rect(TO_06x, TO_06y, TO_06w, TO_06h, 15);
        rect(TO_07x, TO_07y, TO_07w, TO_07h, 15);

        COI01.spawn();
        COI02.spawn();
        COI03.spawn();

        ITEMcar_X = 920;
        ITEMcar_Y = 240;

        if (Morty.carAquired == false) drawCarItem(ITEMcar_X, ITEMcar_Y);

        ///////////INDIVIDUAL INSTANCE CONTENT//////////////

        if (Schlorpy01.health > 0) Schlorpy01.spawn();
        if (Schlorpy02.health > 0) Schlorpy02.spawn();
        if (Schlorpy03.health > 0) Schlorpy03.spawn();
        if (Schlorpy04.health > 0) Schlorpy04.spawn();
    }

    //LEVEL 03////////////////////////
    if (level == 3) {

        ///////////ISTANCE ENVIRONMENT DRAWING//////////////
        if (firstsetup) {

            screen = 3;
            spawnpointX = 300;
            spawnpointY = -100;

            // TO_01x = 420;   //SOLID
            // TO_01y = 800;
            // TO_01w = 310;
            // TO_01h = TO_uniHeight;

            TO_02x = -10;   //PLATFORM
            TO_02y = 300;
            TO_02w = 820;
            TO_02h = TO_uniHeight;

            TO_03x = -20;     //SPAWN
            TO_03y = 650;
            TO_03w = 160;
            TO_03h = TO_uniHeight;

            TO_04x = 1450;
            TO_04y = TO_05y;
            TO_04w = TO_05w;
            TO_04h = TO_uniHeight;

            TO_05x = 900;
            TO_05y = 780;
            TO_05w = 100;
            TO_05h = TO_uniHeight;

            TO_06x = 1550;
            TO_06y = 560;
            TO_06w = 400;
            TO_06h = TO_uniHeight;

            COI01.reposition(80, 500);
            COI02.reposition(1700, 450);
            COI03.reposition(950, 730);
            COI04.reposition(1750, 750);

            firstsetup = false;

            resetValues();
        }

        //SOLID
        fill(150, 80, 20);
        // rect(TO_01x + 20, TO_01y + TO_01h, TO_01w - 40, 500);
        rect(TO_03x + 20, TO_03y + TO_03h, TO_03w - 40, 500);
        rect(TO_06x + 20, TO_06y + TO_06h, TO_06w - 40, 500);
        rect();
        fill(0, 120, 0);    //WALKING GROUND
        rect(TO_01x, TO_01y, TO_01w, TO_01h, 15);
        rect(TO_02x, TO_02y, TO_02w, TO_02h, 15);
        rect(TO_03x, TO_03y, TO_03w, TO_03h, 15);
        rect(TO_04x, TO_04y, TO_04w, TO_04h, 15);
        rect(TO_05x, TO_05y, TO_05w, TO_05h, 15);
        rect(TO_06x, TO_06y, TO_06w, TO_06h, 15);
        COI01.spawn();
        COI02.spawn();
        COI03.spawn();
        COI04.spawn();
        Rick.portalgunAquired = true;
        Morty.carAquired = true;
    }

    //LEVEL 04////////////////////////
    if (level == 4) {

        ///////////ISTANCE ENVIRONMENT DRAWING//////////////
        if (firstsetup) {
            screen = 4;

            spawnpointX = 650;
            spawnpointY = 100;

            TO_01x = 700;
            TO_01y = 800;
            TO_01w = 500;
            TO_01h = TO_uniHeight;

            TO_02x = 550;
            TO_02y = 530;
            TO_02w = 120;
            TO_02h = TO_uniHeight;

            TO_03x = 1250;
            TO_03y = TO_02y;
            TO_03w = TO_02w;
            TO_03h = TO_uniHeight;

            TO_04x = 1450;
            TO_04y = TO_05y;
            TO_04w = TO_05w;
            TO_04h = TO_uniHeight;

            TO_05x = 300;
            TO_05y = 280;
            TO_05w = 260;
            TO_05h = TO_uniHeight;

            TO_06x = 1350;
            TO_06y = 280;
            TO_06w = 260;
            TO_06h = TO_uniHeight;

            TO_07x = 850;
            TO_07y = 400;
            TO_07w = 200;
            TO_07h = TO_uniHeight;

            COI01.reposition(950, 250);
            COI02.reposition(450, 120);
            COI03.reposition(1400, 120);
            COI04.reposition(950, 700);

            Schlorpy01.xpos = 900;
            Schlorpy01.ypos = 300;
            Schlorpy02.xpos = 350;
            Schlorpy02.ypos = 250;
            Schlorpy03.xpos = 1000;
            Schlorpy03.ypos = 750;
            Schlorpy04.xpos = 1400;
            Schlorpy04.ypos = 250;
            Schlorpy01.randomWalking = false;
            Schlorpy02.randomWalking = false;
            Schlorpy03.randomWalking = false;
            Schlorpy04.randomWalking = false;

            firstsetup = false;

            resetValues();
        }

        Rick.portalgunAquired = true;
        Morty.carAquired = true;

        //SOLID
        fill(150, 80, 20);
        rect(TO_01x + 20, TO_01y + TO_01h, TO_01w - 40, 500);

        fill(0, 120, 0);    //WALKING GROUND
        rect(TO_01x, TO_01y, TO_01w, TO_01h, 15);
        rect(TO_02x, TO_02y, TO_02w, TO_02h, 15);
        rect(TO_03x, TO_03y, TO_03w, TO_03h, 15);
        rect(TO_04x, TO_04y, TO_04w, TO_04h, 15);
        rect(TO_05x, TO_05y, TO_05w, TO_05h, 15);
        rect(TO_06x, TO_06y, TO_06w, TO_06h, 15);
        rect(TO_07x, TO_07y, TO_07w, TO_07h, 15);

        COI01.spawn();
        COI02.spawn();
        COI03.spawn();
        COI04.spawn();

        ///////////INDIVIDUAL INSTANCE CONTENT//////////////
        if (Schlorpy01.health > 0) Schlorpy01.spawn();
        if (Schlorpy02.health > 0) Schlorpy02.spawn();
        if (Schlorpy03.health > 0) Schlorpy03.spawn();
        if (Schlorpy04.health > 0) Schlorpy04.spawn();

        //////////LEVEL END CONDITIONS////////////////////////

    }


    image(IMGchars, -20, 0, 200, 180);
    Rick.spawn();
    Morty.spawn();

    //LEVEL ONE FUNCTIONALITY
    if (screen == 1) {
        if (OKclicked.controls == false) {
            infoboxIsActive = true;
            infobox("controls");
        }
        if (Rick.portalgunAquired == false && (ITEMportalgun_X - Rick.xpos) <= 30 && (ITEMportalgun_X - Rick.xpos) >= -30 && (ITEMportalgun_Y - Rick.ypos) <= 200 && (ITEMportalgun_Y - Rick.ypos) >= 20) {
            Rick.portalgunAquired = true;
            OKclicked.portalgun = false;
        }
        if (Rick.portalgunAquired && OKclicked.portalgun == false) {
            infoboxIsActive = true;
            infobox("portalgun");
        }

        //////////LEVEL END CONDITIONS////////////////////////
        if (Rick.portalgunAquired && COI01.collected && COI02.collected && COI03.collected && COI04.collected) {
            infoboxIsActive = true;
            nextIsActive = true;
            infobox("next");
        }
    }

    //LEVEL TWO FUNCTIONALITY
    if (screen == 2) {
        if (Morty.carAquired == false && (ITEMcar_X - Morty.xpos) <= 25 && (ITEMcar_X - Morty.xpos) >= -25 && (ITEMcar_Y - Morty.ypos) <= 140 && (ITEMcar_Y - Morty.ypos) >= 0) {
            Morty.carAquired = true;
            OKclicked.car = false;
        }
        if (Morty.carAquired && OKclicked.car == false) {
            infoboxIsActive = true;
            infobox("car");
        }
        if (OKclicked.enemies == false) infoboxIsActive = true;
        infobox("enemies");
        if (COI01.collected && COI02.collected && COI03.collected && Schlorpy01.health <= 0 && Schlorpy02.health <= 0 && Schlorpy03.health <= 0 && Schlorpy04.health <= 0) {
            infoboxIsActive = true;
            nextIsActive = true;
            infobox("next");
        }
    }

    //LEVEL THREE FUNCTIONALITY
    if (screen == 3) {
        if (COI01.collected && COI02.collected && COI03.collected && COI04.collected) {
            infoboxIsActive = true;
            nextIsActive = true;
            infobox("next");
        }
    }

    //LEVEL FOUR FUNCTIONALITY
    if (screen == 4) {
        if (COI01.collected && COI02.collected && COI03.collected && Schlorpy01.health <= 0 && Schlorpy02.health <= 0 && Schlorpy03.health <= 0 && Schlorpy04.health <= 0) {
            infoboxIsActive = true;
            nextIsActive = true;
            infobox("next");
        }
    }
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//EXECUTE
function draw() {
    clear();
    runGame();
    if (infoboxIsActive) gameIsPaused = true;
    else gameIsPaused = false;
}