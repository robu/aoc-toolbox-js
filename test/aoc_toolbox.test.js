const { InputData, slidingWindow } = require('../aoc-toolbox')

test('lines()', () => {
    const i = new InputData({ filename: 'test/input.txt' })
    expect(i.lines()[0]).toBe('1337')
    expect(i.lines()[1]).toBe('42')
})

test('linesInts()', () => {
    const i = new InputData('test/input.txt')
    expect(i.linesInts()[0]).toBe(1337)
    expect(i.linesInts()[1]).toBe(42)
})

test('linefieldsRegexp()', () => {
    const i = new InputData({ filename: 'test/input-fields.txt' })
    const r = /(\w+): (\d+)\s(\d+)\s(\d+)/
    const fieldArray = i.linefieldsRegexp(r)
    expect(fieldArray[0][0]).toBe('kalle')
    expect(fieldArray[0][1]).toBe('123')
    expect(fieldArray[0][2]).toBe('456')
    expect(fieldArray[0][3]).toBe('879')
})

test('linefieldsSeparator() string', () => {
    const i = new InputData({ filename: 'test/input-fields-csv.txt' })
    let fieldsData = i.linefieldsSeparator() // ',' is default separator
    expect(fieldsData[0][0]).toBe('adam')
    expect(fieldsData[0][3]).toBe('34')
    expect(fieldsData[2][0]).toBe('cesar')
    expect(fieldsData[2][4]).toBe('a')
})

test('linefieldsSeparator() regexp', () => {
    const i = new InputData({ filename: 'test/input-fields-complex.txt' })
    let fieldsData = i.linefieldsSeparator(/\s?:=\s?/)
    expect(fieldsData[0][0]).toBe('a')
    expect(fieldsData[0][1]).toBe('23 + 34')
    expect(fieldsData[2][0]).toBe('boing')
    expect(fieldsData[2][1]).toBe('42')
})

test('sections()', () => {
    const i = new InputData({ filename: 'test/input-sections.txt' })
    let sections = i.sections()
    expect(sections[3].lines()[1]).toBe('banana')
})

test('sections() regexp', () => {
    const i = new InputData({ filename: 'test/input-sections-rx.txt' })
    let sections = i.sections(/(^$)|(^--)|(^#)/)
    expect(sections[3].lines()[1]).toBe('banana')
})

test('matrixChar()', () => {
    const i = new InputData({ filename: 'test/input-matrix.txt' })
    expect(i.matrixChar(1, 4)).toBe('.')
    expect(i.matrixChar(3, 15)).toBe('#')
})

test('matrixChar() with supplied lines', () => {
    const lines = ['0123456789', 'ABCDEFGHIK', 'abcdefghijk']
    const i = new InputData({ lines })
    expect(i.matrixChar(1, 3)).toBe('D')
})

test('subMatrix()', () => {
    const i = new InputData({ filename: 'test/input-matrix.txt' })
    expect(i.subMatrix(1, 1, 2, 2).lines()[0]).toBe('.#')
    expect(i.subMatrix(1, 1, 2, 2).lines()[1]).toBe('..')
})

test('sliding window', () => {
    const lines = [1,2,3,4,5,6]
    const windows = slidingWindow(lines, 3)
    expect(windows[0]).toStrictEqual([1,2,3])
    expect(windows[1]).toStrictEqual([2,3,4])
    expect(windows[2]).toStrictEqual([3,4,5])
})

