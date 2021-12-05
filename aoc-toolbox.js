const fs = require('fs')

const js = (x) => JSON.stringify(x, null, 4)
const cs = (x) => console.log(js(x))


/**
 * Reads and interprets a given input data file, for a day of AoC. It contains some useful and
 * fairly common way that data is represented in historical problems, but whether it will be useful
 * for any particular problem any particular year, there is no guarantee.
 */
class InputData {
    /**
     * 
     * @param {object} params If params.filename exists, that will be used to read the input file.
     *                        If not, but params.lines exists, that is used as contents of the input file.
     *                        If a string is provided instead of an object, it is assumed to be a filename.
     *                        The default value of this parameter is 'input.txt'.
     */
    constructor(params = {}) {
        if (typeof (params) == 'string') {
            params = { filename: params } // given a string, we assume it's a filename
        }
        if (params.lines) {
            this._lines = params.lines
        } else {
            let filename = params.filename || "input.txt"
            let encoding = params.encoding || "utf8"
            this._lines = fs.readFileSync(filename, {encoding}).trim().split("\n")
        }
    }

    /**
     * 
     * @returns cached file content as an array, containing each line in the file.
     */
    lines() {
        return this._lines
    }

    linesCount() {
        return this.lines().length
    }

    /**
     * Shortcut for lines()[lineNum]
     * @param {number} lineNum zero based line number in the data
     */
    line(lineNum) {
        return this.lines()[lineNum]
    }

    /**
     * Shortcut for line(0)
     */
    firstLine() {
        return this.line(0)
    }

    /**
     * For now, assuming all lines are the same length (ie just looking at the first line)
     */
    colsCount() {
        return this.line(0).length
    }

    /**
     * 
     * @returns same as InputData.lines() but each line converted to integer
     */
    linesInts() {
        return this.lines().map((x) => parseInt(x))
    }

    /**
     * Returns a subset (as an InputData instance) of the data lines, 
     * starting with the line with the provided index.
     * @param {number} startLine index of first line extracted
     * @param {number} numLines number of lines extracted. default=-1, meaning to the last line
     * @returns a new InputData instance
     */
    linesData(startLine, numLines = -1) {
        let lines2 = []
        let l = this.lines()
        if (numLines < 0) {
            numLines = this.linesCount()
        }
        for (let i = startLine; i < startLine + numLines + 1 && i < this.linesCount(); i++) {
            lines2.push(this.line(i))
        }
        return new InputData({ lines: lines2 })
    }

    /**
     * 
     * @param {RegExp} r matching and identifying the fields of each line
     * @returns an array with an element for each line, each being an array with all the fields matched by the supplied RegExp
     */
    linefieldsRegexp(r) {
        return this.lines().map((line) => {
            let matches = line.match(r)
            matches.shift()
            return matches
        })
    }

    /**
     * 
     * @param {string or RegExp} separator separator character (or Regexp) between fields. Default: ','
     * @returns an array with an element for each line, each being an array with all the fields
     */
    linefieldsSeparator(separator = ',') {
        return this.lines().map((l) => l.split(separator))
    }

    /**
     * A section in the input data is defined as a number of consecutive lines without any separator lines
     * between them. One or more consecutive separator lines separates each section (but is not considered to
     * be part of any section).
     * @param dividerLine a string or regexp that identifies what a separator line looks like. Default is empty string = empty line.
     * @returns an array with each section, represented as a new InputData instance
     */
    sections(dividerLine = '') {
        let sections = []
        let currentSection = []
        for (let lineNum in this.lines()) {
            if (this.line(lineNum) === dividerLine || (typeof (dividerLine) == 'object' && this.line(lineNum).match(dividerLine))) {
                if (currentSection.length > 0) {
                    sections.push(new InputData({ lines: currentSection }))
                }
                currentSection = []
            } else {
                currentSection.push(this.line(lineNum))
            }
        }
        if (currentSection.length > 0) {
            sections.push(new InputData({ lines: currentSection }))
        }
        return sections
    }

    /**
     * Considering the input file as a matrix of characters, this method access a specific character
     * by its coordinates.
     * @param {number} row 
     * @param {number} col 
     * @returns the character in the matrix at the supplied coordinates
     */
    matrixChar(row, col) {
        return this.lines()[row][col]
    }

    /**
     * Treating the input data as a matrix, this method returns the number of occurrences a 
     * given character has in the given column of the matrix
     * @param {number} col 
     * @param {string} charToCount 
     * @returns 
     */
    countOccurrencesInColumn(col, charToCount) {
        return this.filterOnColValue(col, charToCount).linesCount()
    }

    /**
     * Considering the input file as a matrix of characters, this method extracts a sub matrix from the original.
     * @param {number} startRow 
     * @param {number} startCol 
     * @param {number} rows 
     * @param {number} cols 
     * @returns the sub matrix, as a new InputData instance
     */
    subMatrix(startRow, startCol, rows, cols) {
        let sub = []
        for (let rowNum = startRow; rowNum < startRow + rows; rowNum++) {
            let subRow = this.line(rowNum).substr(startCol, cols)
            sub.push(subRow)
        }
        return new InputData({ lines: sub })
    }

    /**
     * Returns a new InputData instance that is a subset of this one, where each line
     * is copied from this instance, if the given predicate function returns true for that line.
     * @param {Function} predicate 
     */
    filterLines(predicate) {
        let ls = []
        for (let i = 0; i < this.linesCount(); i++) {
            if (predicate(this.line(i))) {
                ls.push(this.line(i))
            }
        }
        return new InputData({ lines: ls })
    }

    /**
     * Returns a new InputData instance where each line matches the given value in the given column.
     */
    filterOnColValue(col, value) {
        return this.filterLines((line) => line[col] == value)
    }

}

/**
 * Returns an array of shorter arrays based of the supplied array, each subarray
 * being a number of consecutive elements (a "sliding window") from the supplied array.
 * 
 * @param {Array} lines input array
 * @param {number} windowSize size of window = number of elements in each returned subarray
 * @returns 
 */
const slidingWindow = (lines, windowSize) => {
    if (windowSize > lines.length) {
        return lines
    }

    let windows = []
    for (let index = 0; index <= lines.length - windowSize; index++) {
        let window = []
        for (let inner = 0; inner < windowSize; inner++) {
            window.push(lines[index + inner])
        }
        windows.push(window)
    }
    return windows
}

/**
 * Steps through an array, for each consecutive pair of elements, and returns
 * a count of all pairs that matches the provided test function.
 * 
 * @param {Array} arr the array to step through. Must be at least two elements long
 * @param compFunc function taking two arguments and returning a boolean
 * @returns 
 */
const countCompare = (arr, compFunc) => {
    let count = 0
    arr.reduce((x, y) => {
        if (compFunc(x, y)) {
            count++
        }
        return y
    })
    return count
}

/**
 * Takes an array and a distance and returns an array of pairs
 * @param {Array} arr 
 * @param {number} distance 
 * @returns An array where each element is an array of two elements, each being 
 *          from the original array, with the specified distance between
 */
const equidistantPairs = (arr, distance) => {
    let pairs = []
    for (let i = 0; i < arr.length - distance; i++) {
        pairs.push([arr[i], arr[i + distance]])
    }
    return pairs
}

module.exports = { InputData, slidingWindow, countCompare, equidistantPairs, cs, js }
