class MatrixException extends Error {
    constructor(message) {
        super(message);
        this.name = 'MatrixException';
        this.error = new Error(this.message);
        return this.error;
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

    _createGrid() {
        for (let x = 0; x < this.rows; x++) {
            this.grid[x] = new Array(this.columns).fill(this.filler);
        }
    }

    _notEmptyValue(newValue) {
        if (newValue !== undefined) {
            return true;
        } else {
            throw new MatrixException("No argument provided for value");
        }
    }

    _isInBounds(x, y) {
        if (x >= 0 && y >= 0 && x < this.rows && y < this.columns) {
            return true;
        } else {
            throw new MatrixException(`Coordinates ${x}-${y} out of bounds`);
        }
    }

    changeGridPointValue(x, y, newValue) {
        try {
            if (this._notEmptyValue(newValue)) {
                if (this._isInBounds(x, y)) { this.grid[x][y] = newValue; }
            }
        } catch (e) {
            console.error(e);
        }
    }

    changeGridRowValue(x, newValue) {
        this.grid[x].forEach((el, idx) => this.changeGridPointValue(x, idx, newValue));
    }

    changeGridColumnValue(y, newValue) {
        this.grid.forEach((el, idx) => this.changeGridPointValue(idx, y, newValue));
    }

    createFromGrid(grid) {
        for (let x = 0; x < grid.length; x++) {
            this.grid.push(new Array());
            for (let y = 0; y < grid[y].length; y++) {
                this.grid[x].push(grid[x][y]);
            }
        }
    }

    createFromSequence(rows, columns, startValue, endValue) {
        this.rows = rows;
        this.columns = columns;
        this._createGrid();
        let currentValue = startValue;

        for (let x = 0; x < this.rows; x++) {
            for (let y = 0; y < this.columns; y++) {
                this.grid[x][y] = currentValue;
                currentValue = currentValue + 1 > endValue ? startValue : currentValue + 1;
            }
        }
    }

    spiralTraverse() {
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

}




const matrix = new Matrix();
matrix.createFromSequence(3, 3, 1, 100)
console.log(matrix.grid)
console.log(matrix.changeGridPointValue(2, 2, 1))


