const { InputData } = require('../aoc-toolbox')

test('lines()', () => {
    const i = new InputData()
    expect(i.lines()[0]).toBe('1337')
    expect(i.lines()[1]).toBe('42')
})

test('linesInts()', () => {
    const i = new InputData()
    expect(i.linesInts()[0]).toBe(1337)
    expect(i.linesInts()[1]).toBe(42)
})

test('linefieldsRegexp()', () => {
    const i = new InputData({ filename: 'input-fields.txt' })
    const r = /(\w+): (\d+)\s(\d+)\s(\d+)/
    const fieldArray = i.linefieldsRegexp(r)
    expect(fieldArray[0][0]).toBe('kalle')
    expect(fieldArray[0][1]).toBe('123')
    expect(fieldArray[0][2]).toBe('456')
    expect(fieldArray[0][3]).toBe('879')
})

test('sections()', () => {
    const i = new InputData({ filename: 'input-sections.txt' })
    expect(i.sections()[3].lines()[1]).toBe('banana')
})

test('matrixChar()', () => {
    const i = new InputData({ filename: 'input-matrix.txt' })
    expect(i.matrixChar(1, 4)).toBe('.')
    expect(i.matrixChar(3, 15)).toBe('#')
})

test('matrixChar() with supplied lines', () => {
    const lines = ['0123456789', 'ABCDEFGHIK', 'abcdefghijk']
    const i = new InputData({ lines })
    expect(i.matrixChar(1, 3)).toBe('D')
})

test('subMatrix()', () => {
    const i = new InputData({ filename: 'input-matrix.txt' })
    expect(i.subMatrix(1, 1, 2, 2).lines()[0]).toBe('.#')
    expect(i.subMatrix(1, 1, 2, 2).lines()[1]).toBe('..')
})