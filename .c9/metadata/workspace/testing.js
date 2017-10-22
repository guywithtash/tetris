{"filter":false,"title":"testing.js","tooltip":"/testing.js","undoManager":{"mark":1,"position":1,"stack":[[{"start":{"row":0,"column":0},"end":{"row":64,"column":18},"action":"insert","lines":["class Tetrimino {","    constructor(){","        switch (random_tetrimino()) {","            case \"I\":","                starting_coords(3, 0, 4, 0, 5, 0, 6, 0);","                this.colour = \"cyan\";","                break;","            case \"J\":","                starting_coords(4, 0, 5, 0, 6, 0, 6, 1);","                this.colour = \"blue\";","                break;","            case \"L\":","                starting_coords(3, 0, 4, 0, 5, 0, 1, 3);","                this.colour = \"orange\";","                break;","            case \"O\":","                starting_coords(4, 0, 5, 0, 4, 1, 5, 1);","                this.colour = \"yellow\";","                break;","            case \"S\":","                starting_coords(5, 0, 6, 0, 1, 4, 1, 5);","                this.colour = \"lime\";","                break;","            case \"T\":","                var r = Math.floor(Math.random() * 2);","                if (r === 0) {","                    starting_coords(3, 0, 4, 0, 5, 0, 4, 1);","                } else {","                    starting_coords(4, 0, 5, 0, 6, 0, 5, 1);","                }","                this.colour = \"purple\";","                break;","            case \"Z\":","                starting_coords(3, 0, 4, 0, 4, 1, 5, 1);","                this.colour = \"red\";","                break;","        }","    }","}","function random_tetrimino() {","    var r = Math.floor(Math.random() * 7);","        var types = {","            0: \"I\",","            1: \"J\",","            2: \"L\",","            3: \"O\",","            4: \"S\",","            5: \"T\",","            6: \"Z\"","        };","    return types[r];","}","function starting_coords(ax, ay, bx, by, cx, cy, dx, dy) {","        this.a.x = ax;","        this.a.y = ay;","        this.b.x = bx;","        this.b.y = by;","        this.c.x = cx;","        this.c.y = cy;","        this.d.x = dx;","        this.d.y = dy;","}","","var t = new Tetrimino","console.log(t.a.x)"],"id":1}],[{"start":{"row":0,"column":0},"end":{"row":1,"column":0},"action":"insert","lines":["",""],"id":2}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":1,"column":0},"end":{"row":1,"column":0},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1459510332420,"hash":"f9b55882102eb7b007c3235388f9f60409ebd8aa"}