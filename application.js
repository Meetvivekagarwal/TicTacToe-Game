$(document).ready(function () {
    
    var match = 0;
    var count = 0;
    var userWin = 0;
    var computerWin = 0;
    var matchTied = 0;
    var winner;
    var itemsArray;
    var interval;
    
        $('#board').find('td').on('click', function () {
            
            
             if ($(this).text() == '') {
                  
                  $(this).text('X');
                  count++;
                  
                  winner = checkVictory('X');
                  if (winner) {
                      interval = blink(itemsArray);
                      popup('Game over! You Won  :( ',interval);
                      userWin++;
                      $('#youWinCounter').text(userWin);
                      $('#computerWinCounter').text(computerWin);
                      $('#matchTieCounter').text(matchTied);
                      
                     
                      return true;
                  }
                  else if(count == 9)
                  {
                      
                      popup('Game over! Match is a draw :|');
                      matchTied++;
                      $('#youWinCounter').text(userWin);
                      $('#computerWinCounter').text(computerWin);
                      $('#matchTieCounter').text(matchTied);
                     
                     
                      return true;
                  }
              else
                  {
                      
                      computerTurn();
                      count++;
                      
                      winner = checkVictory('O');
                      if (winner) {
                          interval = blink(itemsArray);
                          popup('Game over! Computer Won !!!!  :)',interval);
                          computerWin++;
                          $('#youWinCounter').text(userWin);
                          $('#computerWinCounter').text(computerWin);
                          $('#matchTieCounter').text(matchTied);
                        
                         
                        
                          return true;
                      }
                      else if (count == 9) {
                         
                          popup('Game over! Match is a draw :|');
                          matchTied++;
                          $('#youWinCounter').text(userWin);
                          $('#computerWinCounter').text(computerWin);
                          $('#matchTieCounter').text(matchTied);
                         
                          return true;
                      }
                       
                  }
                  
                             
                  
                  
              }


        });
        
        function blink(items)
        {
            
            var elem = $('#' + items[0]);
            var elem1 = $('#' + items[1]);
            var elem2 = $('#' + items[2]);
         var inter= setInterval(function () {
               
                    elem.css('color', 'white');
                    elem1.css('color', 'white');
                    elem2.css('color', 'white');
                
           }, 100);

         return inter;
        }

    function popup(text,interval) {
       // $('#dialog-confirm').title(title);
        $('#dialogtext').text(text);
        setTimeout(function(){
            $("#dialog-confirm").dialog({
                resizable: false,
                height: 200,
                width: 500,
                modal: true,
                buttons: {
                    "Play Again": function () {
                        clearInterval(interval);
                        itemsArray = null;
                        $('.box').text('');
                        $('.box').css('color', 'red');
                        count = 0;
                        match++;
                        if (match % 2 != 0) {
                            computerTurn();
                            count++;

                        }
                        $(this).dialog("close");
                    },
                    "Reset Counter": function () {
                        clearInterval(interval);
                        $('#restartGame').click();
                        $(this).dialog("close");
                    }
                }
            });}, 500);
    }

    function computerTurn() {
        if (checkWinMove('OO')) {
            anyMove();
        }
    }
    function play(move) {
        
        if (fetchInfo(move) != '') {
            return false;
        }
        else {
            move = '#' + move;
            $(move).text('O');
            return true;
        }
    }
    function anyMove() {
        
        var value;
        if (checkWinMove('XX')) {
            if (play(5)) {
                return true;
            }
            value = fetchInfo(1) + fetchInfo(5) + fetchInfo(9);

            if (value == 'XXO' || value == 'XOX') {
                var stopCrossArray = [2, 4, 6, 8]
                for (var loop = 0; loop < stopCrossArray.length; loop++) {
                    if (play(stopCrossArray[loop])) {
                        return true;
                    }
                }

            }
            else if (value == 'OXX')
            {
                if(play(3))
                {
                    return true;
                }
            }
            else {
                value = fetchInfo(3) + fetchInfo(5) + fetchInfo(7);
                if (value == 'XXO' || value == 'XOX' || value == 'OXX') {
                    var stopCrossArray = [2, 4, 6, 8]
                    for (var loop = 0; loop < stopCrossArray.length; loop++) {
                        if (play(stopCrossArray[loop])) {
                            return true;
                        }
                    }

                }
            }
            // check for corner brackets
            var step = 2;
            while (step <= 8) {
                for (var loop = step + 2; loop <= 8; loop += 2) {
                    if (fetchInfo(loop) == fetchInfo(step) && fetchInfo(step) != '') {
                        if (play(loop + step - 5)) {
                            return true;
                        }

                    }
                }
                step += 2;
            }

            // Corner Check
            var cornerArray = [1, 2, 3, 4];
            step = 0;
            while (step < 4) {
                var currentCorner = cornerArray[step];
                if ((fetchInfo(currentCorner) + fetchInfo(currentCorner + 5)) == 'XX') {
                    if (play(Math.floor((currentCorner + 5) / 2))) {
                        return true;
                    }
                }
                else if ((step + 7) <= 9 && (fetchInfo(currentCorner) + fetchInfo(currentCorner + 7)) == 'XX') {
                    if (play(Math.floor((currentCorner + 7) / 2))) {
                        return true;
                    }
                }
                step++;
            }
            for (var loop = 2; loop < 10; loop += 2)
            {
                if (play(loop)) {
                    return true;
                }
            }
            
            for (var loop = 1; loop < 10; loop += 2)
            {
                if (play(loop)) {
                    return true;
                }
            }
            return false;
        }

    }
    function checkWinMove(val) {
        // top row check 
        var toprowarray = [1, 2, 3];
        var middlerowArray = [4, 5, 6];
        var bottomrowArray = [7, 8, 9];
        var firstColumnArray = [1, 4, 7];
        var secondColumnArray = [2, 5, 8];
        var thirdColumnArray = [3, 6, 9];
        var firstCrossArray = [1, 5, 9];
        var secondCrossArray = [3, 5, 7];

        var value;
        // top row --
        value = fetchInfo(1) +fetchInfo(2) + fetchInfo(3);
        if (value == val) {
            for (var loop = 0; loop < 3; loop++) {
                if (play(toprowarray[loop]))
                    return false;
            }
        }

        //middle row --
        value = fetchInfo(4) + fetchInfo(5) + fetchInfo(6);

        if (value == val) {
            for (var loop = 0; loop < 3; loop++) {
                if (play(middlerowArray[loop]))
                    return false;
            }
        }

        //bottom row--
        value = fetchInfo(7) + fetchInfo(8) + fetchInfo(9);

        if (value == val) {
            for (var loop = 0; loop < 3; loop++) {
                if (play(bottomrowArray[loop]))
                    return false;
            }
        }

        //first column --
        value = fetchInfo(1) + fetchInfo(4) + fetchInfo(7);

        if (value == val) {
            for (var loop = 0; loop < 3; loop++) {
                if (play(firstColumnArray[loop]))
                    return false;
            }
        }

        // middle column
        value = fetchInfo(2) + fetchInfo(5) + fetchInfo(8);

        if (value == val) {
            for (var loop = 0; loop < 3; loop++) {
                if (play(secondColumnArray[loop]))
                    return false;
            }
        }

        // Last column
        value = fetchInfo(3) + fetchInfo(6) + fetchInfo(9);

        if (value == val) {
            for (var loop = 0; loop < 3; loop++) {
                if (play(thirdColumnArray[loop]))
                    return false;
            }
        }

        //first cross
        value = fetchInfo(1) + fetchInfo(5) + fetchInfo(9);

        if (value == val) {
            for (var loop = 0; loop < 3; loop++) {
                if (play(firstCrossArray[loop]))
                    return false;
            }
        }

        //Second Cross
        value = fetchInfo(3) + fetchInfo(5) + fetchInfo(7);

        if (value == val) {
            for (var loop = 0; loop < 3; loop++) {
                if (play(secondCrossArray[loop]))
                    return false;
            }
        }
       
            return true;
        
    }
    function fetchInfo(move)
    {
        move = '#' + move;
        return $('#board').find(move).text();
            
        
    }
    function checkVictory(player) {
        
        //top row check
        if (fetchInfo(1)!== '') {
            if (fetchInfo(1) == fetchInfo(2)) {
                if (fetchInfo(1) == fetchInfo(3)) {
                    itemsArray = [1, 2, 3];
                    
                    return true;
                }
            }
            //left column check
            if (fetchInfo(1) == fetchInfo(4)) {
                if (fetchInfo(1) == fetchInfo(7)) {
                    itemsArray = [1, 4, 7];
                    
                   return true;
                }
            }
            //left diagonal check
            if (fetchInfo(1) == fetchInfo(5)) {
                if (fetchInfo(1) == fetchInfo(9)) {
                    itemsArray = [1, 5, 9];
                    
                    return true;
                }
            }
        }

        //middle column check
        if (fetchInfo(2) !== '') {
            if (fetchInfo(2) == fetchInfo(5)) {
                if (fetchInfo(2) == fetchInfo(8)) {
                    itemsArray = [2, 5, 8];
                    
                   return true;
                }
            }
        }

        //right column check
        if (fetchInfo(3) !== '') {
            if (fetchInfo(3) == fetchInfo(6)) {
                if (fetchInfo(3) == fetchInfo(9)) {
                    itemsArray = [3, 6, 9];
                    
                    return true;
                }
            }
            //right diag check
            if (fetchInfo(3) == fetchInfo(5)) {
                if (fetchInfo(3) == fetchInfo(7)) {
                    itemsArray = [3, 5, 7];
                    
                    return true;
                }
            }
        }

        //middle row check

        if (fetchInfo(4) !== '') {
            if (fetchInfo(4) == fetchInfo(5)) {
                if (fetchInfo(4) == fetchInfo(6)) {
                    itemsArray = [4, 5, 6];
                    
                    return true;
                }
            }
        }

        //bottom row check
        if (fetchInfo(7) !== '') {
            if (fetchInfo(7) == fetchInfo(8)) {
                if (fetchInfo(7) == fetchInfo(9)) {
                    itemsArray = [7, 8, 9];
                    
                     return true;
                }
            }
        }
        
        

    }
    $('#restartGame').on('click', function () {
        itemsArray = null;
        $('.box').text('');
        count = 0;
        userWin = 0;
        computerWin = 0;
        matchTied = 0;
        match = 0;
        $('.box').css('color', 'red');
        $('#youWinCounter').text(userWin);
        $('#computerWinCounter').text(computerWin);
        $('#matchTieCounter').text(matchTied);
    });

});