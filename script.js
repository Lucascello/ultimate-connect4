(function () {
    var currentPlayer = "player1";

    var gameOver = false;

    function switchPlayer() {
        if (currentPlayer === "player1") {
            currentPlayer = "player2";
        } else {
            currentPlayer = "player1";
        }
    }

    $(document).ready(function () {
        $(".play").click(function () {
            location.reload(true);
        });
    });

    $(document).ready(function () {
        $(".ultimate").click(function () {
            $(".board").css("animation-play-state", "running");
        });
    });

    var isBoardBlocked = false;

    $(document).ready(function () {
        $(".board").click(function () {
            if (!isBoardBlocked) {
                isBoardBlocked = true;
                $(".board").css("animation-play-state", "running");
            }
        });
    });

    $(document).ready(function () {
        $(".nausea").click(function () {
            $(".board").css("animation-play-state", "paused");
        });
    });

    $(document).ready(function () {
        $(".how").click(function () {
            $("#how").css("visibility", "visible");
        });
    });

    $(".column").on("click", function (e) {
        var slotsInCol = $(e.currentTarget).children();

        // console.log(slotsInCol);
        for (var i = slotsInCol.length - 1; i >= 0; i--) {
            var row = $(".row" + i);

            // var hole = $(".hole" + i);
            /*this shows some weird stuff on the dev tools*/

            // var diagonalUp = $(e.currentTarget).data("column") + i;

            // var diagonalDown = $(e.currentTarget).data("column") - i;
            if (gameOver) {
                return;
            } else if (
                !slotsInCol.eq(i).hasClass("player1") &&
                !slotsInCol.eq(i).hasClass("player2")
            ) {
                // console.log("is empty")
                slotsInCol.eq(i).addClass(currentPlayer);
                break;
            } else {
            }
        }

        if (i === -1) {
            return;
        }

        var currentColumn = $(e.currentTarget).data("column");

        var currentRow = $(
            $(e.currentTarget).find("." + currentPlayer)[0]
        ).data("row");

        if (
            checkForVictory(slotsInCol) ||
            checkForVictory(row) ||
            checkForDiagonal(currentRow, currentColumn)
        ) {
            $(".aplause").css("visibility", "visible");
            gameOver = true;
            setTimeout(function () {
                alert(currentPlayer + " is the winner!");
            }, 100);
        } else {
            switchPlayer();
        }
    });

    // diagonal down
    function checkForDiagonal(row, col) {
        var decreasing /* left up, right down*/ = [];

        var increasing = /* right up, left down*/ [];

        var diagonalLeftUpRow = row;
        var diagonalLeftUpColumn = col;

        var diagonalRightDownRow = row;
        var diagonalRightDownColumn = col;

        var diagonalLeftDownRow = row;
        var diagonalLeftDownColumn = col;

        var diagonalRightUpRow = row;
        var diagonalRightUpColumn = col;

        var currentElement = $(".column" + col + " > .row" + row).hasClass(
            currentPlayer
        );
        // console.log("Element", currentElement);
        decreasing.push(currentElement);

        increasing.push(currentElement);

        for (var i = 0; i < 3; i++) {
            var leftUp = $(
                ".column" +
                    --diagonalLeftUpColumn +
                    " > .row" +
                    --diagonalLeftUpRow
            ).hasClass(currentPlayer);
            decreasing.unshift(leftUp);

            var rightDown = $(
                ".column" +
                    ++diagonalRightDownColumn +
                    " > .row" +
                    ++diagonalRightDownRow
            ).hasClass(currentPlayer);
            decreasing.push(rightDown);

            var leftDown = $(
                ".column" +
                    --diagonalLeftDownColumn +
                    " > .row" +
                    ++diagonalLeftDownRow
            ).hasClass(currentPlayer);
            increasing.unshift(leftDown);

            var rightUp = $(
                ".column" +
                    ++diagonalRightUpColumn +
                    " > .row" +
                    --diagonalRightUpRow
            ).hasClass(currentPlayer);
            increasing.push(rightUp);
        }

        var countDecreaseToTheRight = 0;
        for (var i = 0; i < decreasing.length; i++) {
            if (decreasing[i]) {
                countDecreaseToTheRight++;
            } else {
                countDecreaseToTheRight = 0;
            }
            if (countDecreaseToTheRight >= 4) {
                return true;
            }
        }

        var countIncreaseToTheRight = 0;
        for (var i = 0; i < increasing.length; i++) {
            if (increasing[i]) {
                countIncreaseToTheRight++;
            } else {
                countIncreaseToTheRight = 0;
            }
            if (countIncreaseToTheRight >= 4) {
                return true;
            }
        }
        return false; /*if entire for is false*/
    }

    function checkForVictory(slots) {
        var counter = 0;
        // console.log("checking for a victory");
        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(currentPlayer)) {
                counter++;
                if (counter >= 4) {
                    return true;
                }
            } else if (slots === currentPlayer) {
                counter++;
                if (counter >= 4) {
                    return true;
                }
            } else {
                counter = 0;
            }
        }
    }
})();
