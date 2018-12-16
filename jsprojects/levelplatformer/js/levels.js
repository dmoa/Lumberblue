let empty = [new Exit(600 / 2 - playerLength / 2,-100,50,50)];

let level1 = [new Exit(400,345,50,50)];

let level2 = [new Exit(65, 345, 50,50), new Platform(200,345,50,50)];

let level3 = [new Exit(525, 345, 50, 50), new Platform(350,345,50,100), new Platform(300,370,50,25)];

let level4 = [new Exit(100,50,50,50), new Platform(350,295,50,100), new Platform(400,370,65,25),  new Platform(285,215,65,400), new Platform(0, 295, 360, 400)];

let level5 = [new Exit(350,345, 50, 50), new Platform(280,250,50,300), new Platform(330, 250, 190, 50), new Platform(0, 300, 335, 300)];

let level6 = [new Exit(0,0,0,0)];

let playground = [new Exit(0,0,0,0)];

let alllevels = [empty ,level1 ,level2, level3, level4, level5, playground];
