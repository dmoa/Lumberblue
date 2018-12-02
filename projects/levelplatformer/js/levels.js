let empty = [new Exit(600 / 2 - playerLength / 2,-100,50,50)];

let level1 = [new Exit(400,345,50,50)];

let level2 = [new Exit(80, 345, 50,50), new Platform(200,345,50,50)];

let level3 = [new Exit(500, 345, 50, 50), new Platform(350,295,50,100), new Platform(300,345,50,50)];

let level4 = [new Exit(0,0,0,0), new Platform(350,295,50,100), new Platform(300,345,50,50)];

let alllevels = [empty ,level1 ,level2, level3, level4];
