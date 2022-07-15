class MatrixError extends Error {
    constructor(message) {
        super(message);
        this.name = 'MatrixError';
    }
}

class Node {
    constructor(value, coordinates) {
        this.value = value === undefined ? null : value;
        this.coordinates = coordinates === undefined ? null : coordinates;
    }
}

class Matrix {
    constructor(rows = 0, columns = 0, filler = 0) {
        this.rows = rows;
        this.columns = columns;
        this.filler = filler;
        this.grid = new Array();

        this._createGrid();
    }

    //// MATRIX UTILITIES
    _createGrid() {
        for (let row = 0; row < this.rows; row++) {
            this.grid.push(new Array());
            for (let col = 0; col < this.columns; col++) {
                this.grid[row].push(new Node(this.filler, `${row}_${col}`));
            }
        }
    }

    _notEmptyValue(newValue) {
        if (newValue !== undefined) {
            return true;
        } else {
            throw new MatrixError("No argument provided for value");
        }
    }

    _isInBounds(row, col) {
        if (row >= 0 && col >= 0 && row < this.rows && col < this.columns) {
            return true;
        } else {
            throw new MatrixError("Coordinates are out of bounds");
        }
    }

    _rowInBounds(row) {
        if (row >= 0 && row < this.rows) {
            return true;
        } else {
            throw new MatrixError("Row is out of bounds");
        }
    }

    _columnInBounds(col) {
        if (col >= 0 && col < this.columns) {
            return true;
        } else {
            throw new MatrixError("Column is out of bounds");
        }
    }

    _isOutOfBounds(row, col) {
        return row < 0 || row > this.rows - 1 || col < 0 || col > this.columns - 1;
    }

    //// MATRIX CHANGES
    createFromGrid(grid) {
        if (!Array.isArray(grid) || !Array.isArray(grid[0])) return;
        this.rows = grid.length;
        this.columns = grid[0].length;

        for (let row = 0; row < grid.length; row++) {
            this.grid.push(new Array());
            for (let col = 0; col < grid[row].length; col++) {
                this.grid[row].push(new Node(grid[row][col], `${row}_${col}`));
            }
        }
    }

    createFromSequence(rows, columns, startValue, endValue) {
        this.rows = rows;
        this.columns = columns;
        //this._createGrid();
        let currentValue = startValue;

        for (let row = 0; row < this.rows; row++) {
            this.grid.push(new Array());
            for (let col = 0; col < this.columns; col++) {
                this.grid[row].push(new Node(currentValue, `${row}_${col}`));
                currentValue = currentValue + 1 > endValue ? startValue : currentValue + 1;
            }
        }
    }

    changeGridPointValue(row, col, newValue) {
        try {
            if (this._notEmptyValue(newValue)) {
                if (this._isInBounds(row, col)) { this.grid[row][col].value = newValue; }
            }
        } catch (e) {
            console.error(e);
        }
    }

    changeGridRowValue(row, newValue) {
        try {
            if (this._rowInBounds(row)) {
                this.grid[row].forEach((el, idx) => this.changeGridPointValue(row, idx, newValue));
            }
        } catch (e) {
            console.error(e);
        }
    }

    changeGridColumnValue(col, newValue) {
        try {
            if (this._columnInBounds(col)) {
                this.grid.forEach((el, idx) => this.changeGridPointValue(idx, col, newValue));
            }
        } catch (e) {
            console.error(e);
        }
    }

    //// MATRIX TRAVERSAL
    straightTraverse() {
        if (!this.grid.length) return [];
        const result = [];
        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 0; col < this.grid[0].length; col++) {
                result.push(this.grid[row][col]);
            }
        }
        return result;
    }

    spiralTraverse() {
        if (!this.grid.length) return [];
        const result = [];
        let startRow = 0, endRow = this.grid.length - 1;
        let startCol = 0, endCol = this.grid[0].length - 1;

        while (startRow <= endRow && startCol <= endCol) {
            // TO RIGHT
            for (let col = startCol; col <= endCol; col++) {
                result.push(this.grid[startRow][col]);
            }
            // TO BOTTOM
            for (let row = startRow + 1; row <= endRow; row++) {
                result.push(this.grid[row][endCol]);
            }
            // TO LEFT
            for (let col = endCol - 1; col >= startCol; col--) {
                if (startRow === endRow) break;
                result.push(this.grid[endRow][col]);
            }
            // TO TOP
            for (let row = endRow - 1; row > startRow; row--) {
                if (startCol === endCol) break;
                result.push(this.grid[row][startCol]);
            }
            startRow++;
            endRow--;
            startCol++;
            endCol--;
        }
        return result;
    }

    zigzagTraverse() {
        if (!this.grid.length) return [];
        const result = [];
        let row = 0;
        let col = 0;
        let goingDown = true;

        while (!this._isOutOfBounds(row, col)) {
            result.push(this.grid[row][col]);

            if (goingDown) {
                if (col === 0 || row === this.rows - 1) {
                    goingDown = false;
                    if (row === this.columns - 1) {
                        col++;
                    } else {
                        row++;
                    }
                } else {
                    row++;
                    col--;
                }
            } else {
                if (row === 0 || col === this.columns - 1) {
                    goingDown = true;
                    if (col === this.columns - 1) {
                        row++;
                    } else {
                        col++;
                    }
                } else {
                    row--;
                    col++;
                }
            }
        }
        return result;
    }

}  
