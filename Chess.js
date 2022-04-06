var divSquare = '<div class="square $color", id="s$coord"></div>';
var divFigure = '<div class="figure", id="f$coord">$figure</div>';
var map;
var starter = "rnbqkbnrpppppppp11111111111111111111111111111111PPPPPPPPRNBQKBNR"
var last_map;
var full_info = "";
var look = 1;
var check = 1;
var space = "\n";
var forOpenning = "";
var next = " ";
var save_openning = "";
var for_check = "rnbqkbnrpppppppp11111111111111111111111111111111PPPPPPPPRNBQKBNR";
var counter = 1;
who = true;
var global_figure = ""
var last_figure = ""
var II_white = false
var II_black = false
var was_figure = "";
var filer = 10;
var global_rnd = 0;
window.onload = init;   
function init(){
    var button = document.getElementById("addButton")
    button.onclick = handleButtonClick;
    var buttonh = document.getElementById("ah")
    buttonh.onclick = horde;
}

function handleButtonClick() {
    alert("Now you are playing with computer with BLACK pieces. Computer plays with white");
    II_white = true
}
$(function (){
    start();
});

function horde() {
    alert("Now you play horde");
    starter = "rnbqkbnrpppppppp111111111PP11PP1PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP"
    showFigures(starter);
    document.getElementById('notation').innerHTML = "Notation";
    document.getElementById('pgn').innerHTML = "";
    document.getElementById('opening').innerHTML = "";
    document.getElementById('FEN').innerHTML = "rnbqkbnr/pppppppp/8/1PP2PP1/PPPPPPPP/PPPPPPPP/PPPPPPPP/PPPPPPPP";
}
$(function (){
    start();
});

function start() {
    map = new Array(64);
    addSquares();
    showFigures(starter);
}


function setDraggable() {
    $('.figure').draggable();
}

function setDroppable() {
    $('.square').droppable({
        drop:   function (event, ui){
            var frCoord = ui.draggable.attr('id').substring(1);
            var toCoord = this.id.substring(1);
            global_figure = map[frCoord];     
            if (test_color(for_check[frCoord]) == who){
                if (unfair_moves(frCoord, toCoord) == false){
                    if (toCoord != frCoord){
                        who = false;
                        if (global_figure == "K" && frCoord == 60 && toCoord == 62){
                            showFigureAt(60, "1");
                            showFigureAt(62, "K");
                            showFigureAt(63, '1');
                            showFigureAt(61, "R");
                            full_info += look + "." + "O-O" + space;
                            forOpenning += look + "." + "O-O" + next;
                            check += 1
                            document.getElementById('notation').innerHTML = full_info;
                        }else if (global_figure == "K" && frCoord == 60 && toCoord == 58){
                            showFigureAt(60, "1");
                            showFigureAt(58, "K");
                            showFigureAt(56, '1');
                            showFigureAt(59, "R");
                            full_info += look + "." + "O-O-O" + space;
                            forOpenning += look + "." + "O-O-O" + next;
                            check += 1
                            document.getElementById('notation').innerHTML = full_info;
                        }else if (global_figure == "k" && frCoord == 4 && toCoord == 6){
                            showFigureAt(4, "1");
                            showFigureAt(6, "k");
                            showFigureAt(7, '1');
                            showFigureAt(5, "r");
                            full_info += "O-O" + space + "<br>";
                            forOpenning += "O-O" + next+ "<br>";
                            check = 1
                            look += 1
                            document.getElementById('notation').innerHTML = full_info;
                        }else if (global_figure == "k" && frCoord == 4 && toCoord == 2){
                            showFigureAt(4, "1");
                            showFigureAt(2, "k");
                            showFigureAt(0, '1');
                            showFigureAt(3, "r");
                            full_info +=  "O-O-O" + space + "<br>";
                            forOpenning += "O-O-O" + next + "<br>";
                            check = 1
                            look += 1
                            document.getElementById('notation').innerHTML = full_info;
                    }else{
                            moveFigure(frCoord, toCoord);  
                            console.log("here")
                        }
                        if (counter == 2){
                            who = true;
                            counter = 1;
                            if (II_white == true){
                                    findAllWhiteResponces();
                                    who = false;
                                    counter++;
                            } 
                        }else{  
             counter++;}
                    }else{
                        moveFigure(frCoord, frCoord);
                    }
                }else{
                    moveFigure(frCoord, frCoord);
                }
            }else{
                moveFigure(frCoord, frCoord);
            }
            }
    });
}

function findAllWhiteResponces(){
    move_was_by_white = true;
    while (move_was_by_white){
        var rnd = Math.floor(Math.random() * 63)
        var rnd_2 = Math.floor(Math.random() * 63)
        console.log(rnd, rnd_2)
        global_figure = map[rnd]
        if (map[rnd]!= '1' && (map[rnd] == "P" || map[rnd] == "N"|| map[rnd] == "B"|| map[rnd] == "R" || map[rnd] == "Q")){
                if (unfair_moves(rnd, rnd_2) == false){
                    if (rnd != rnd_2){
                        console.log(rnd, rnd_2)
                        toCoord = rnd_2;
                        frCoord = rnd;
                        global_figure = map[rnd]
                        moveFigure(rnd, rnd_2)
                        move_was_by_white = false;
                    }
                }
        }
    }

}

function test_color(symbol){
    var isUpperCase = symbol.toUpperCase() == symbol;
    return (!!isUpperCase);
}

function moveFigure(frCoord, toCoord){
    last_map = map;
    figure = map[frCoord];
    showFigureAt(frCoord, '1');
    showFigureAt(toCoord, figure);
    var fen = "";
    not_figure = "";
    not_pawn = "";
    if (getChessSymbole(figure) == '&#9823;' || getChessSymbole(figure) == '&#9817;'){
        not_pawn = ""
    }else{
        not_pawn = getChessSymbole(figure)
    }
    if (figure != "P" && figure != "p"){
        not_figure = figure;
    }
    if (figure == "n"){
        not_figure = "N";
    }
    if (figure == "b"){
        not_figure = "B";
    }
    if (figure == "r"){
        not_figure = "R";
    }
    if (figure == "q"){
        not_figure = "Q";
    }
    if (figure == "k"){
        not_figure = "K";
    }
    for (var i = 0; i < 64; i++) {
        fen += map[i];
    }
    for_check = fen;
    var skoba = "/"
    var eight = 0;
    var fen_neu = "";
    var iteration = 0;
    var count_skoba = 0;
    for (let i = 0; i < 64; i++){
	if (fen[i] == '1'){
	   iteration += 1;
	   eight += 1;
	   if (eight == 8){
		fen_neu += iteration
		fen_neu += skoba
		iteration = 0
		eight = 0
		count_skoba += 1
	   }
	   if (count_skoba == 7){
		skoba = ""
	}
	}else{
	   if (iteration != '0'){
		fen_neu += iteration
	   }
	   eight += 1;
	   fen_neu += fen[i];
	   iteration = 0
	   if (eight == 8){
		fen_neu += skoba
		eight = 0
		count_skoba += 1
	   }
	   if (count_skoba == 7){
		skoba = ""
	}
	}
    }
    document.getElementById('FEN').innerHTML = fen_neu;
    if (check == 2){
        if (frCoord != toCoord){
            if (getMovePlace(toCoord) != "undefined"){
                if (II_black != true){
                    full_info += not_pawn + was_figure + getMovePlace(toCoord) + space + "<br>";
                    forOpenning += not_figure + was_figure + getMovePlace(toCoord) + next;
                }
                check = 1;
                look += 1;}}
    }else{
        if (frCoord != toCoord){
                    if(getMovePlace(toCoord) != "undefined"){  
                        if (II_white != true){
                            full_info += look + "." + not_pawn + was_figure + getMovePlace(toCoord) + space;
                            forOpenning += look + "." + " " + not_figure + was_figure + getMovePlace(toCoord) + next;
                        }else{
                            full_info += look + "." + not_pawn + was_figure + getMovePlace(toCoord) + space;
                            forOpenning += look + "." + " " + not_figure + was_figure + getMovePlace(toCoord) + next;
                        }
                        check += 1;
            }
        }
    }
    if (save_openning == "B00 King's Pawn" || save_openning == "A40 Queen's Pawn Game" ){
        save_openning = isOpening(forOpenning);
    }else{
        if (toCoord != frCoord){
            if (save_openning != isOpening(forOpenning) && isOpening(forOpenning) != ""){
                save_openning = isOpening(forOpenning);
            }else{
                if (save_openning != isOpening(forOpenning)){
                    save_openning += isOpening(forOpenning);
                }

            }

        }
    }
    info = ["This opening is very flexible. It can transpose into many others. Black's responses1...e5 is a 'reversed' Sicilian Defence. 1...e6 will probably end up in a Queen's Gambit Declined. This is known as the Agincourt Defense. However, if White plays 2. d4 then Black plays 2... Nf6, it is a typical Indian game (1. d4 nf6 2. c4 e6 is the normal order)1...c6 will usually either transpose into the Caro-Kann Defence or the Slav Defence.1...Nf6 or 1...g6 are likely to transpose into an Indian Defence. 1...b6 will in all likelihood transpose into the English Defence.1...f5, the Anglo-Dutch Defence, leads to sharp tactical lines for Black, but can open a powerful kingside attack. This is likely to transpose into the regular Dutch Defense after 2. d4.1...d5 is seldom played but may transpose into the Queen's Gambit or the Reti Opening.1...g5, the Myers Defence, gives White a small advantage. More on <a href = 'https://en.wikipedia.org/wiki/English_Opening', target='_blank'>Wikipedia</a>", 
    "White makes an aggressive claim to the center. At this point, Black must decide how to face White's aggression. Traditionally, the two most popular replies are 1...d5 and 1...Nf6, as most other moves tend to allow White a broad center with 2. e4. Allowing the broad center was frowned upon in classical times, but is more of a matter of preference today. Another reason 1...d5 and 1...Nf6 are the main replies considered is that many of the alternatives transpose into main lines anyway. One notable exception is the Dutch Defense (1...f5), whose character prevents 2. e4 whilst remaining unique. 1...d5 directly challenges White's plan to establish a broad center. 1...Nf6 prevents an immediate 2. e4 while maintaining flexibility to play a number of 'Indian' systems or move back into a system typical of 1...d5.To play 1. d4 correctly, the White player should learn the basic Queen's Gambit positions, the King's Indian, Queen's Indian, Nimzo-Indian positions, and even some of the Benoni positions. This may seem intimidating to the beginner. Read more on <a href = 'https://en.wikipedia.org/wiki/Queen%27s_Pawn_Game', target='_blank'>Wikipedia</a>", 
    "1...Nf6 Blacks 1...Nf6 in response to 1.d4 is characteristic of the various Indian defences. Unlike 1...d5, which fights for the center in traditional fashion by occupying it with pawns, Indian systems reflect the hyper modern approach to opening theory. In such openings, Black often allows White to construct a classical pawn center, but then attempts to attack it with pieces and undermine it with timely pawn advances. By delaying the movement of his own central pawns, Black retains a certain degree of flexibility at the cost of ceding the center to White. More on <a href = 'https://en.wikipedia.org/wiki/Indian_Defence', target='_blank'>Wikipedia</a>",
    "Torre Attack 1. d4 Nf6 2.Nf3 e6 3.Bg5. More on <a href = 'https://en.wikibooks.org/wiki/Chess_Opening_Theory/1._d4/1...Nf6/2._Nf3/2...e6/3._Bg5', target='_blank'>Wikipedia</a>", 
    "The Dutch Defence has a character all of its own. Black usually plays either for a Classical setup with 2... e6 3... d6 4... Be7, a Stonewall with 2... e6 3... d5 4... c6, or for the Leningrad with 2... g6 3... Bg7 4... d6. White usually plays 2. c4 here, though many moves are playable. One interesting, though often considered dubious, option is to play the Staunton Gambit with 2. e4 leading to more tactical positions rather than the positional grinds and straightforward attacks the Dutch usually provides. This grabs the e4-square without copying moves. Read more on <a href = 'https://en.wikibooks.org/wiki/Chess_Opening_Theory/1._d4/1...f5', target='_blank'>Wikipedia</a>",
    "1. e4 - King's Pawn Opening White's assertive opening move opens lines for the queen and king's bishop and fights for control of the squares d5 and f5. This move is popular at all levels of the game and was the favorite opening move of world champion Bobby Fischer who called it 'best by test'. Openings with 1. e4 are traditionally considered more sharp and attacking than those with 1. d4, but this is an extreme generalization and both players will have many more opportunities to influence the type of position that appears. With a pawn on e4, White's simplest plan is to play d4 on the next move, creating a strong 'classical' center.Black's responsesIt's useful to think of Black's responses to 1. e4 as motivated by one of the following counterplans:Establish a pawn on e5, securing a share of the centre for Black.Establish a pawn on d5, securing a share of the centre for Black.Attack White's e-pawn immediately. Read more on <a href = 'https://en.wikibooks.org/wiki/Chess_Opening_Theory/1._e4', target='_blank'>Wikipedia</a>",
    "This is not a very common move because it somewhat weakens the e1-h4 diagonal; its aim is to over-protect the e5 square which later can be occupied by a White Knight. It could also prepare a kingside attack. Black sometimes attempts to stop this plan as early as move one, by responding with e5, the From Gambit. Read more on <a href = 'https://en.wikibooks.org/wiki/Chess_Opening_Theory/1._f4', target='_blank'>Wikipedia</a>",
"", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "","", "", "", "", "", ""]
    videos = ["", "", "", "", ""]
    if (II_white != true){
        document.getElementById('notation').innerHTML = full_info;
        document.getElementById('opening').innerHTML = save_openning;
    }else{
        document.getElementById('notation').innerHTML = "You play with black pieces";
    }
    if (info[filer] != "undefined"){
        document.getElementById('info').innerHTML = info[filer];
        filer = 10;
    }else{
        document.getElementById('info').innerHTML = " "
    }
    was_figure = ""
}

function addSquares() {
    console.log("ok")
    $('.board').html('');
    for (var coord = 0; coord < 64; coord++)
        $('.board').append(divSquare
            .replace('$coord', coord)
            .replace('$color', 
            isBlackSquareAt(coord) ? "black" : "white"));
    setDroppable();            }

function showFigureAt(coord, figure) {
    map[coord] = figure;
    $('#s' + coord).html(divFigure
        .replace('$coord', coord)
        .replace('$figure', getChessSymbole(figure)));
        setDraggable();
}

function showFigures(figure) {
    for (var coord = 0; coord < 64; coord++)
        showFigureAt(coord, figure.charAt(coord));
}

function getChessSymbole(figure) {
    switch (figure) {
        case 'R' : return '&#9814;';
        case 'N' : return '&#9816;';
        case 'B' : return '&#9815;';
        case 'P' : return '&#9817;';
        case 'Q' : return '&#9813;';
        case 'K' : return '&#9812;';
        case 'r' : return '&#9820;';
        case 'n' : return '&#9822;';
        case 'b' : return '&#9821;';
        case 'p' : return '&#9823;';
        case 'q' : return '&#9819;';
        case 'k' : return '&#9818;';
        default  : return '';
    }
}

function getMovePlace(toCoord){
    switch (toCoord) {
        case '0' : return 'a8';
        case '1' : return 'b8';
        case '2' : return 'c8';
        case '3' : return 'd8';
        case '4' : return 'e8';
        case '5' : return 'f8';
        case '6' : return 'g8';
        case '7' : return 'h8';
        case '8' : return 'a7';
        case '9' : return 'b7';
        case '10' : return 'c7';
        case '11' : return 'd7';
        case '12' : return 'e7';
        case '13' : return 'f7';
        case '14' : return 'g7';
        case '15' : return 'h7';
        case '16' : return 'a6';
        case '17' : return 'b6';
        case '18' : return 'c6';
        case '19' : return 'd6';
        case '20' : return 'e6';
        case '21' : return 'f6';
        case '22' : return 'g6';
        case '23' : return 'h6';
        case '24' : return 'a5';
        case '25' : return 'b5';
        case '26' : return 'c5';
        case '27' : return 'd5';
        case '28' : return 'e5';
        case '29' : return 'f5';
        case '30' : return 'g5';
        case '31' : return 'h5';
        case '32' : return 'a4';
        case '33' : return 'b4';
        case '34' : return 'c4';
        case '35' : return 'd4';
        case '36' : return 'e4';
        case '37' : return 'f4';
        case '38' : return 'g4';
        case '39' : return 'h4';
        case '40' : return 'a3';
        case '41' : return 'b3';
        case '42' : return 'c3';
        case '43' : return 'd3';
        case '44' : return 'e3';
        case '45' : return 'f3';
        case '46' : return 'g3';
        case '47' : return 'h3';
        case '48' : return 'a2';
        case '49' : return 'b2';
        case '50' : return 'c2';
        case '51' : return 'd2';
        case '52' : return 'e2';
        case '53' : return 'f2';
        case '54' : return 'g2';
        case '55' : return 'h2';
        case '56' : return 'a1';
        case '57' : return 'b1';
        case '58' : return 'c1';
        case '59' : return 'd1';
        case '60' : return 'e1';
        case '61' : return 'f1';
        case '62' : return 'g1';
        case '63' : return 'h1';
    }
}

function isOpening(forOpenning){
    var node = ["1. c4 ", "1. d4 ", "1. d4 Nf6 ", "1. d4 Nf6 2. Nf3 e6 3. Bg5 ", "1. d4 f5 ", "1. e4 ", "1. f4 ", "1. g4 ", "1. h4 ", "1. a4 ", "1. b4 ", "1. a3 ", "1. b3 ", "1. c3 ", "1. d3 ", "1. e3 ", "1. f3 ", "1. g3 ", "1. h3 ", "1. Na3 ", "1. Nc3 ", "1. Nf3 ", "1. Nh3 "];
    var ECO = ["A10	English Opening", "A40	Queen's Pawn Game", "A45 Indian Defense", "A46	Torre Attack", "A80	Dutch Defense", "B00 King's Pawn", "A02 Bird Opening", "A00 Grob Opening", "A00 Kádas Opening",
"A00 Ware Opening", "A00 Polish Opening", "A00 Anderssen's Opening", "A01 Nimzo-Larsen Attack", "A00 Saragossa Opening", "A00 Mieses Opening", "A00 Van't Kruijs Opening", "A00 Gedult's Opening", "A00 Hungarian Opening", "A00 Clemenz Opening",
"A00 Sodium Attack", "A00 Van Geet Opening", "A04 Zukertort Opening", "A00 Amar Opening"];
    console.log(forOpenning)
    if (II_white == false){
        document.getElementById('pgn').innerHTML = forOpenning;
    }else{
        document.getElementById('pgn').innerHTML = "You play with bot";
    }

    for (var i = 0; i < node.length; i++){
        if (forOpenning == node[i]){
            filer = i;
            return ECO[i];
        }
    }
    return ""
}

function isBlackSquareAt(coord){ 
    return (coord % 8 + Math.floor(coord / 8)) % 2;
}

function unfair_moves(frCoord, toCoord){
    last_figure = map[toCoord];
    var x1 = Math.floor(frCoord/8)-1;
    var x2 = Math.floor(toCoord/8)-1;
    var y1 = (8 - (frCoord) % 8);
    var y2 = (8 - (toCoord) % 8);
    dx = Math.abs(x1 - x2);
    dy = Math.abs(y1 - y2);
    if (global_figure == "Q" || global_figure == "q"){
        if (Math.abs(x1 - x2) == Math.abs(y1 - y2) || x1 == x2 || y1 == y2){
            if (global_figure == "q" && (last_figure == "P" || last_figure == "N"|| last_figure == "B"|| last_figure == "R"|| last_figure == "Q"|| last_figure == "K" || last_figure == "1")){
                if (map[toCoord] != "1"){
                    was_figure = "x"
                }
                return false
            }else if (global_figure == "Q" && (last_figure == "p"|| last_figure == "n"|| last_figure == "b"|| last_figure == "r"|| last_figure == "q"|| last_figure == "k" || last_figure == "1")){
                if (map[toCoord] != "1"){
                    was_figure = "x"
                }
                if (II_white == true){
                    return true
                }
                return false
            }else{
                return true
            }
        }else{
            return true
    }}
    else if (global_figure == "B" || global_figure == "b"){
        console.log(last_figure)
        if (Math.abs(x2 - y2) == Math.abs(x1 - y1) || Math.abs(y2 + x2) == Math.abs(y1 + x1) || Math.abs(y2 - x2) == Math.abs(y1 - x1)){
            if (global_figure == "b" && (last_figure == "P" || last_figure == "N"|| last_figure == "B"|| last_figure == "R"|| last_figure == "Q"|| last_figure == "K" || last_figure == "1")){
                if (map[toCoord] != "1"){
                    was_figure = "x"
                }
                return false
            }else if (global_figure == "B" && (last_figure == "p"|| last_figure == "n"|| last_figure == "b"|| last_figure == "r"|| last_figure == "q"|| last_figure == "k" || last_figure == "1")){
                if (map[toCoord] != "1"){
                    was_figure = "x"
                }
                if (II_white == true){
                    return true
                }
                return false
            }else{
                return true
            }
        }else{            
            return true
        }
    }else if (global_figure == "N" || global_figure == "n"){
        if(dx == 1 && dy == 2 || dx == 2 && dy == 1){
            if (global_figure == "n" && (last_figure == "P" || last_figure == "N"|| last_figure == "B"|| last_figure == "R"|| last_figure == "Q"|| last_figure == "K" || last_figure == "1")){
                if (map[toCoord] != "1"){
                    was_figure = "x"
                }
                return false
            }else if (global_figure == "N" && (last_figure == "p"|| last_figure == "n"|| last_figure == "b"|| last_figure == "r"|| last_figure == "q"|| last_figure == "k" || last_figure == "1")){
                if (map[toCoord] != "1"){
                    was_figure = "x"
                }
                return false
            }else{
                return true
            }
        }else{
            return true
        }
    }else if (global_figure == "R" || global_figure == "r"){
            if (x1 == x2 || y1 == y2){
                if (global_figure == "r" && (last_figure == "P" || last_figure == "N"|| last_figure == "B"|| last_figure == "R"|| last_figure == "Q"|| last_figure == "K" || last_figure == "1")){
                    if (map[toCoord] != "1"){
                        was_figure = "x"
                    }
                    return false
                }else if (global_figure == "R" && (last_figure == "p"|| last_figure == "n"|| last_figure == "b"|| last_figure == "r"|| last_figure == "q"|| last_figure == "k" || last_figure == "1")){
                    if (map[toCoord] != "1"){
                        was_figure = "x"
                    }
                        while(x1 != x2){
                            if (x1 > x2){
                                x2 += 1
                                if (map[x2*7+y2-2] != "1"){
                                    return true
                                }
                            }else{
                                if (map[x1 * 8 + y1] != "1"){
                                    return true
                                }
                                x1 += 1
                            }
                        }
                        if (II_white == true){
                            return true
                        }
                    return false
                }else{
                    return true
                }
            }else{
                return true 
            }
        }else if (global_figure == "K" || global_figure == "k"){
            if (Math.abs(x1 - x2) <= 1 && Math.abs(y1 - y2) <= 1){
                if (global_figure == "k" && (last_figure == "P" || last_figure == "N"|| last_figure == "B"|| last_figure == "R"|| last_figure == "Q"|| last_figure == "K" || last_figure == "1")){
                    if (map[toCoord] != "1"){
                        was_figure = "x"
                    }
                    return false
                }else if (global_figure == "K" && (last_figure == "p"|| last_figure == "n"|| last_figure == "b"|| last_figure == "r"|| last_figure == "q"|| last_figure == "k" || last_figure == "1")){
                    if (map[toCoord] != "1"){
                        was_figure = "x"
                    }
                    if (II_white == true){
                        return true
                    }
                    return false
                }else{
                    return true
                }
            }else if(global_figure == "K" && frCoord == 60 && toCoord == 62){
                if (map[toCoord] != "1"){
                    was_figure = "x"
                }
                return false
            }else if(global_figure == "K" && frCoord == 60 && toCoord == 58){
                if (map[toCoord] != "1"){
                    was_figure = "x"
                }
                return false
            }else if(global_figure == "k" && frCoord == 4 && toCoord == 6){
                if (map[toCoord] != "1"){
                    was_figure = "x"
                }
                return false
            }else if(global_figure == "k" && frCoord == 4 && toCoord == 2){
                if (map[toCoord] != "1"){
                    was_figure = "x"
                }
                return false
            }else{
                return true
            }
        }else if (global_figure == "P"){
            if (x1 - x2 == 1 && y1 == y2 && map[toCoord] == '1'){
                return false
            }else if(x1 - x2 == 2 && (frCoord == 52 || frCoord == 48 || frCoord == 49 || frCoord == 50 || frCoord == 51 || frCoord == 53 || frCoord == 54 || frCoord == 55) && map[toCoord] == '1' && y1 == y2){
                return false
            }else if(x1 - x2 == 1 && Math.abs(y1 - y2) == 1 && map[toCoord] != '1'){
                was_figure = getMovePlace(frCoord)[0] + "x"
                return false
            }else{
                return true
            }
        }else if (global_figure == "p"){
            if (x2 - x1 == 1 && y1 == y2 && map[toCoord] == '1'){
                return false
            }else if(x2 - x1 == 2 && (frCoord == 8 || frCoord == 9 || frCoord == 10 || frCoord == 11 || frCoord == 12 || frCoord == 13 || frCoord == 14 || frCoord == 15)){
                return false
            }else if(x2 - x1 == 1 && Math.abs(y1 - y2) == 1 && map[toCoord] != '1'){ 
                if (II_white != true){
                    was_figure = getMovePlace(frCoord)[0] + "x"
                }

                return false
            }else{
                return true
            }}else{
            return false
        }
}
