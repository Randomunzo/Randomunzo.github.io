let hod = 0;
let WinCriteria = 3;
function Tablica() {
    let NotMyTable = document.getElementById("Table1"); // id присваиваем Table1
    let nx = document.getElementById("input_width_size").value; // переменной nx input_width_size
    let ny = document.getElementById("input_height_size").value; // переменной ny input_height_size
    NotMyTable.innerHTML = ""; // NotMyTable присваивается пустое значение
    for (let i = 0; i < nx; i++) { // цикл для создания горизонтали
        let NewLine = document.createElement("tr");// создание строк
        for (let j = 0; j < ny; j++) { // цикл создания по вертикали 
            let NewColumn = document.createElement("td"); // создание столбцов
            NewColumn.setAttribute("id", "cell_" + (i + 1) + "_" + (j + 1));// aтрибут  
            NewColumn.cellStatus = "0"; // 0 - пусто; 1 -  крестик; 2 - нолик;  
            NewColumn.addEventListener("mousedown", cellMouseDown);// нажатие кнопки
            NewLine.appendChild(NewColumn); // вставить в конец элемента переданный элемент
        }
        NotMyTable.appendChild(NewLine); //возвращение ссылки на добавленный элемент newline.
    }
}
function cellMouseDown(e) {//проверка на нажатие мышки
    e = e || window.event; //получаем объект события так
    let el = e.target || e.c;
    let index1 = el.closest("tr").rowIndex;
    let index2 = el.closest("td").cellIndex;
    if (e.which == 1) {
        if (hod % 2 == 0) {
            if (this.style.backgroundImage == "") {
                this.style.backgroundImage = "url(0.png)";
                this.cellStatus = "1";
                document.getElementById("Alians").style.display = "block";
                document.getElementById("Orda").style.display = "none";
                hod++;
                CheckWin(index1, index2, this.cellStatus);
            }
        }
        else {
            if (this.style.backgroundImage == "") {
                this.style.backgroundImage = "url(X.png)";
                this.cellStatus = "2";
                document.getElementById("Alians").style.display = "none";
                document.getElementById("Orda").style.display = "block";
                hod++;
                CheckWin(index1, index2, this.cellStatus);
            }
        }

    }

}
function CheckDrow()
{
    let myCells = document.querySelectorAll('td');
    let cellsNumber = myCells.length;
    for(let i=0; i<cellsNumber; ++i)
    {
        if(myCells[i].cellStatus == 0)
            return false;
    }
    return true;
        
}
function CheckWin(row, cell, typeField) {
    let horizont = 1 + ChecDirection(row, cell, typeField, 0, -1) + ChecDirection(row, cell, typeField, 0, 1);
    let vertical = 1 + ChecDirection(row, cell, typeField, -1, 0) + ChecDirection(row, cell, typeField, 1, 0);
    let diagonalReducing = 1 + ChecDirection(row, cell, typeField, -1, -1) + ChecDirection(row, cell, typeField, 1, 1);
    let diagonalIncreasing = 1 + ChecDirection(row, cell, typeField, -1, 1) + ChecDirection(row, cell, typeField, 1, -1);
     if (horizont >= WinCriteria || vertical >= WinCriteria || diagonalReducing >= WinCriteria || diagonalIncreasing >= WinCriteria) {
        if (typeField == "2")
            document.getElementById("Cross").innerHTML = "Победили крестики";
        else if (typeField == "1")
            document.getElementById("Cross").innerHTML = "Победили нолики";
        document.getElementById("Table1").style.display = "none";
    }
    else if (CheckDrow())
        document.getElementById("Cross").innerHTML = "Ничья";
}
function ChecDirection(row, cell, typeField, directionRow, directionCell) {
    let currentRow = row + directionRow;
    let currentCell = cell + directionCell;
    let id = "cell_" + (currentRow + 1) + "_" + (currentCell + 1);
    let myCell = document.getElementById(id);
    if (myCell != null && typeField == myCell.cellStatus) {
        return 1 + ChecDirection(currentRow, currentCell, typeField, directionRow, directionCell);
    }
    return 0;
}
