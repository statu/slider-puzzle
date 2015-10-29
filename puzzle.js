(function () {
 
 $("td").click(tileClick);
 
function isEmptySquare($image) {
    var altText = $image.attr("alt");
    if (altText === "empty") {
        return true;
    }
    else {
        return false;
    }
}

function tileClick() {
    var $td, $clickedImg, $emptyImg, temp;
    
    $td = $(this)
    
    $clickedImg = $td.children().first();
    if (isEmptySquare($clickedImg)) {
        alert("Click on an image next to this square to move it.");
}
    else {
            $emptyImg = checkForEmpty($td);
            console.log($emptyImg);
        
            if ($emptyImg === null) {
                alert("Click on an image next to the empty square to move it.");
            }
            else {
        //swap images
        temp = $clickedImg.attr("src");
        $clickedImg.attr("src", $emptyImg.attr("src"));
        $emptyImg.attr("src", temp);
        
        //swap alt
        temp = $clickedImg.attr("alt");
        $clickedImg.attr("alt", $emptyImg.attr("alt"));
        $emptyImg.attr("alt", temp);
                
        //check for win
        if (checkForWin()) {
            $("#puzzleGrid").addClass("win");
        }
    }
}

function checkForEmpty($td) {
    var newRow, newCol, idToCheck, $img;
    
    var id= $td.attr("id");
    var row = id.substring(4,5);
    var col = id.substring(5,6);
    
    console.log("Row " + row);
    console.log("Col " + col);
    
    //check top
    if (row > 1) {
        newRow = parseInt(row) - 1;
        newCol = col;
        $img = getImageFromCell(newRow, newCol);
        
    if (isEmptySquare($img)) {
            //found empty spot
            return $img;
        }
    }
    
    //check bottom
    if (row < 4) {
        newRow = parseInt(row) + 1;
        newCol = col;
        idToCheck = "#cell" + newRow + newCol;
        
        $img = getImageFromCell(newRow, newCol)
        if (isEmptySquare($img)) {
            //found empty spot
            return $img;
        }
    }
    //check left
    if (col > 1) {
        newCol = parseInt(col) - 1;
        newRow = row;
        idToCheck = "#cell" + newRow + newCol;
        
        $img = getImageFromCell(newRow, newCol)
        if (isEmptySquare($img)) {
            //found empty spot
            return $img;
        }
    }
    //check right
    if (col < 4) {
        newCol = parseInt(col) + 1;
        newRow = row;
        idToCheck = "#cell" + newRow + newCol;
        
        $img = getImageFromCell(newRow, newCol)
        if (isEmptySquare($img)) {
            //found empty spot
            return $img;
        }
    }
    
    return null;
}
    
function getImageFromCell(row, col) {
    idToCheck = "#cell" + row + col;
    return $(idToCheck).children().first();
}
        
function checkForWin() {
    var i, counter, $allImages, isWin;
    
    isWin = true;
    counter = 1;
    $allImages = $("img").each(function(index, element){
        var altText = $(this).attr("alt");
        if (counter === 16) {
            if (altText != "empty")
                isWin = false;
                return false;
        }

        else {
        if (altText != counter) {
            isWin = false;
            return false;
        }
}
        counter = counter + 1;
    });
    return isWin;
        
    
    
    
}
    

 
 
 }());