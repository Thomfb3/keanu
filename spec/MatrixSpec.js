describe("Matrix", function () {
  afterAll(function () {
    // console.clear();
  })

  describe("new Matrix: Instantiate Matrix with constructor", function () {
    const matrix = new Matrix(3, 3, 0);
    let expected = [[new Node(0,'0_0'), new Node(0,'0_1'), new Node(0,'0_2')], 
                    [new Node(0,'1_0'), new Node(0,'1_1'), new Node(0,'1_2')], 
                    [new Node(0,'2_0'), new Node(0,'2_1'), new Node(0,'2_2')]];

    it("new Matrix: rows and columns value", function () {
      expect(matrix.rows).toBe(3);
      expect(matrix.columns).toBe(3);
    });
    it("_createGrid: grid lengths", function () {
      expect(matrix.grid.length).toBe(3);
      expect(matrix.grid[0].length).toBe(3);
    });
    it("_createGrid: grid values", function () {
      expect(matrix.grid).toEqual(expected);
    });

  });

  describe("Matrix Utility Functions", function () {
    const matrix = new Matrix(3, 3, 0);

    it("_notEmptyValue: Bool: check for empty argument", function () {
      expect(matrix._notEmptyValue(1)).toBeTrue();
      expect(() => { matrix._notEmptyValue() }).toThrowError(MatrixError, "No argument provided for value");
    });
    it("_isInBounds: Bool: check to see if coordinates are in bounds", function () {
      expect(() => { matrix._isInBounds(2, 3) }).toThrowError(MatrixError, "Coordinates are out of bounds");
      expect(() => { matrix._isInBounds(3, 3) }).toThrowError(MatrixError, "Coordinates are out of bounds");
      expect(() => { matrix._isInBounds(-1, -2) }).toThrowError(MatrixError, "Coordinates are out of bounds");
      expect(() => { matrix._isInBounds(2, -1) }).toThrowError(MatrixError, "Coordinates are out of bounds");
      expect(matrix._isInBounds(0, 0)).toBeTrue();
      expect(matrix._isInBounds(2, 2)).toBeTrue();
    });
    it("_rowInBounds: Bool: check to see if row are in bounds", function () {
      expect(() => { matrix._rowInBounds(3) }).toThrowError(MatrixError, "Row is out of bounds");
      expect(() => { matrix._rowInBounds(-1) }).toThrowError(MatrixError, "Row is out of bounds");
      expect(matrix._rowInBounds(0)).toBeTrue();
      expect(matrix._rowInBounds(2)).toBeTrue();
    });
    it("_columnInBounds: Bool: check to see if column are in bounds", function () {
      expect(() => { matrix._columnInBounds(3) }).toThrowError(MatrixError, "Column is out of bounds");
      expect(() => { matrix._columnInBounds(-1) }).toThrowError(MatrixError, "Column is out of bounds");
      expect(matrix._columnInBounds(0)).toBeTrue();
      expect(matrix._columnInBounds(2)).toBeTrue();
    });
    it("_isOutOfBounds: Bool: check to see if coordinates out of bounds", function () {
      expect(matrix._isOutOfBounds(2, 3)).toBeTrue();
      expect(matrix._isOutOfBounds(3, 3)).toBeTrue();
      expect(matrix._isOutOfBounds(-1, -2)).toBeTrue();
      expect(matrix._isOutOfBounds(2, -1)).toBeTrue();
      expect(matrix._isOutOfBounds(0, 0)).toBeFalse();
      expect(matrix._isOutOfBounds(2, 2)).toBeFalse();
    });
  });

  describe("createFromGrid: Create Matrix with input grid", function () {
    const matrix = new Matrix();
    let grid = [[0,0,0],[0,0,0],[0,0,0]];
    let expected = [[new Node(0,'0_0'), new Node(0,'0_1'), new Node(0,'0_2')], 
                    [new Node(0,'1_0'), new Node(0,'1_1'), new Node(0,'1_2')], 
                    [new Node(0,'2_0'), new Node(0,'2_1'), new Node(0,'2_2')]];
    matrix.createFromGrid(grid)

    it("createFromGrid: rows and columns value", function () {
      expect(matrix.rows).toBe(3);
      expect(matrix.columns).toBe(3);
    });
    it("createFromGrid: grid lengths", function () {
      expect(matrix.grid[0].length).toBe(grid[0].length);
      expect(matrix.grid.length).toBe(grid.length);
    });
    it("createFromGrid: grid values", function () {
      expect(matrix.grid[2][2]).toEqual(expected[2][2]);
      expect(matrix.grid).toEqual(expected);
    });

    const emptyMatrix = new Matrix();
    it("createFromGrid: rows and columns value", function () {
      expect(emptyMatrix.rows).toBe(0);
      expect(emptyMatrix.columns).toBe(0);
    });
    it("createFromGrid: empty grid lengths", function () {
      expect(emptyMatrix.grid.length).toBe(0);
      expect(() => { emptyMatrix.grid[0].length }).toThrowError();
    });
    it("createFromGrid: empty grid values", function () {
      expect(emptyMatrix.grid).toEqual([]);
    });

  });

  describe("createFromSequence: Create Matrix from Sequence", function () {
    const matrix = new Matrix();
    let grid = [[new Node(1,'0_0'), new Node(2,'0_1'), new Node(3,'0_2')], 
                [new Node(4,'1_0'), new Node(5,'1_1'), new Node(6,'1_2')], 
                [new Node(7,'2_0'), new Node(8,'2_1'), new Node(9,'2_2')]];
    matrix.createFromSequence(3, 3, 1, 9)
    console.log(matrix.grid)
    console.log(grid)
    it("createFromSequence: rows and columns value", function () {
      expect(matrix.rows).toBe(3);
      expect(matrix.columns).toBe(3);
    });
    it("createFromSequence: grid lengths", function () {
      expect(matrix.grid.length).toBe(grid.length);
      expect(matrix.grid[0].length).toBe(grid[0].length);
    });
    it("createFromSequence: grid values", function () {
      expect(matrix.grid).toEqual(grid);
      expect(matrix.grid[2][2]).toEqual(grid[2][2]);
      expect(matrix.grid[2][2].value).toBe(grid[2][2].value);
    });
  });

  describe("changeGridPointValue: Change Matrix point value", function () {
    beforeEach(function () {
      spyOn(console, 'error');
    })

    const matrix = new Matrix(5, 5, 0);
    matrix.changeGridPointValue(0, 0, 1);
    matrix.changeGridPointValue(3, 3, "test");
    matrix.changeGridPointValue(3, 3)

    it("changeGridPointValue: simple change", function () {
      expect(matrix.grid[0][0].value).toBe(1);
      expect(matrix.grid[3][3].value).toBe("test");
    });
    it("changeGridPointValue: Error - no argument", function () {
      matrix.changeGridPointValue(3, 3)
      expect(console.error).toHaveBeenCalled();
    });
    it("changeGridPointValue: Error - Out of Bounds", function () {
      matrix.changeGridPointValue(-1, 0)
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe("changeGridRowValue: Change Matrix row values", function () {
    beforeEach(function () {
      spyOn(console, 'error');
    })

    const matrix = new Matrix(3, 3, 0);
    matrix.changeGridRowValue(0, 1);
    matrix.changeGridRowValue(2, "test");
    let expected = [[new Node(1,'0_0'), new Node(1,'0_1'), new Node(1,'0_2')], 
                    [new Node(0,'1_0'), new Node(0,'1_1'), new Node(0,'1_2')], 
                    [new Node("test",'2_0'), new Node("test",'2_1'), new Node("test",'2_2')]];

    it("changeGridRowValue: simple change", function () {
      expect(matrix.grid).toEqual(expected);
    });
    it("changeGridRowValue: Error - no argument", function () {
      matrix.changeGridRowValue(3)
      expect(console.error).toHaveBeenCalled();
    });
    it("changeGridRowValue: Error - Out of Bounds", function () {
      matrix.changeGridRowValue(-1, 0)
      expect(console.error).toHaveBeenCalled();
    });
  });

    describe("changeGridColumnValue: Change Matrix columns values", function () {
      beforeEach(function () {
        spyOn(console, 'error');
      })

      const matrix = new Matrix(3, 3, 0);
      matrix.changeGridColumnValue(0, 1);
      matrix.changeGridColumnValue(2, "test");
      let expected = [[new Node(1,'0_0'), new Node(0,'0_1'), new Node("test",'0_2')], 
                      [new Node(1,'1_0'), new Node(0,'1_1'), new Node("test",'1_2')], 
                      [new Node(1,'2_0'), new Node(0,'2_1'), new Node("test",'2_2')]];

      it("changeGridColumnValue: simple change", function () {
        expect(matrix.grid).toEqual(expected);
      });
      it("changeGridColumnValue: Error - no argument", function () {
        matrix.changeGridColumnValue(3)
        expect(console.error).toHaveBeenCalled();
      });
      it("changeGridColumnValue: Error - Out of Bounds", function () {
        matrix.changeGridColumnValue(-1, 0)
        expect(console.error).toHaveBeenCalled();
      });
    });
    
    describe("straightTraverse: Traverse through Matrix in order", function () {
      const matrix = new Matrix();
      matrix.createFromSequence(3, 3, 1, 9)
      let straight = matrix.straightTraverse();
      let straightExpected = [new Node(1,'0_0'), new Node(2,'0_1'), new Node(3,'0_2'),
                              new Node(4,'1_0'), new Node(5,'1_1'), new Node(6,'1_2'),
                              new Node(7,'2_0'), new Node(8,'2_1'), new Node(9,'2_2')];
      let grid = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16]
      ];

      const matrixTwo = new Matrix();
      matrixTwo.createFromGrid(grid)
      let matrixFromGrid = matrixTwo.straightTraverse()

      let matrixFromGridExpected = [new Node(1,'0_0'), new Node(2,'0_1'), new Node(3,'0_2'), new Node(4,'0_3'),
                                    new Node(5,'1_0'), new Node(6,'1_1'), new Node(7,'1_2'), new Node(8,'1_3'),
                                    new Node(9,'2_0'), new Node(10,'2_1'), new Node(11,'2_2'), new Node(12,'2_3'),
                                    new Node(13,'3_0'), new Node(14,'3_1'), new Node(15,'3_2'), new Node(16,'3_3')];
      
      const empty = new Matrix();
      let emptyExpected = empty.spiralTraverse();

      it("straightTraverse: with small grid from sequence", function () {
        expect(straight).toEqual(straightExpected);
      });
      it("straightTraverse: with bigger grid from grid", function () {
        expect(matrixFromGrid).toEqual(matrixFromGridExpected);
      });
      it("straightTraverse: wiht empty array", function () {
        expect(emptyExpected).toEqual([]);
      });
    });

    describe("spiralTraverse: Traverse through Matrix in spiral", function () {
      const matrix = new Matrix();
      matrix.createFromSequence(3, 3, 1, 9)
      let spiral = matrix.spiralTraverse();
      let spiralExpected = [new Node(1,'0_0'), new Node(2,'0_1'), new Node(3,'0_2'),
                            new Node(6,'1_2'), new Node(9,'2_2'), new Node(8,'2_1'),
                            new Node(7,'2_0'), new Node(4,'1_0'), new Node(5,'1_1')];

      let grid = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16]
      ]
      const matrixTwo = new Matrix();
      matrixTwo.createFromGrid(grid)
      let spiralFromGrid = matrixTwo.spiralTraverse()
      let spiralFromGridExpected = [new Node(1,'0_0'), new Node(2,'0_1'), new Node(3,'0_2'), new Node(4,'0_3'),
                                    new Node(8,'1_3'), new Node(12,'2_3'), new Node(16,'3_3'), new Node(15,'3_2'),
                                    new Node(14,'3_1'), new Node(13,'3_0'), new Node(9,'2_0'), new Node(5,'1_0'),
                                    new Node(6,'1_1'), new Node(7,'1_2'), new Node(11,'2_2'), new Node(10,'2_1')];

      const empty = new Matrix();
      let emptyExpected = empty.spiralTraverse();

      it("spiralTraverse: with small grid from sequence", function () {
        expect(spiral).toEqual(spiralExpected);
      });
      it("spiralTraverse: with bigger grid from grid", function () {
        expect(spiralFromGrid).toEqual(spiralFromGridExpected);
      });
      it("spiralTraverse: wiht empty array", function () {
        expect(emptyExpected).toEqual([]);
      });
    });

    describe("zigzagTraverse: Traverse through Matrix in zigzag", function () {
      const matrix = new Matrix();
      matrix.createFromSequence(3, 3, 1, 9)
      let zigzag = matrix.zigzagTraverse();
      let zigzagExpected = [new Node(1,'0_0'), new Node(4,'1_0'), new Node(2,'0_1'),
                            new Node(3,'0_2'), new Node(5,'1_1'), new Node(7,'2_0'),
                            new Node(8,'2_1'), new Node(6,'1_2'), new Node(9,'2_2')];

      let grid = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16]
      ]

      const matrixTwo = new Matrix();
      matrixTwo.createFromGrid(grid)
      let zigzagTwo = matrixTwo.zigzagTraverse();
      let zigzagTwoExpected = [new Node(1,'0_0'), new Node(5,'1_0'), new Node(2,'0_1'), new Node(3,'0_2'),
                              new Node(6,'1_1'), new Node(9,'2_0'), new Node(13,'3_0'), new Node(10,'2_1'),
                              new Node(7,'1_2'), new Node(4,'0_3'), new Node(8,'1_3'), new Node(11,'2_2'),
                              new Node(14,'3_1'), new Node(15,'3_2'), new Node(12,'2_3'), new Node(16,'3_3')];

      const empty = new Matrix();
      let emptyExpected = empty.zigzagTraverse();

      it("zigzagExpected: with small grid from sequence", function () {
        expect(zigzag).toEqual(zigzagExpected);
      });
      it("zigzagExpected: with bigger grid from grid", function () {
        expect(zigzagTwo).toEqual(zigzagTwoExpected);
      });
      it("zigzagExpected: wiht empty array", function () {
        expect(emptyExpected).toEqual([]);
      });
    });

});
