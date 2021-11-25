# aoc-toolbox

This is a small utility to read an input data file from an [Advent of Code](https://adventofcode.com/) problem, and offer a set of alternatives on how to extract and handle the data.

## Features

The AoC problems start with a file of input data (`input.txt`), which need to be parsed and handled. After that, of course, there is solving the actual problem, but you won't even get that far until you've decided how to get data in.

The AoC Toolbox is currently only one class, `InputData` which reads the datafile and allows you to access the data in different ways, depending on how it is structured.

So, which typical input data structures will `InputData` be useful with? Here is a summary:
- **string per line** - this is of course just a mirror of the actual file. Use the `InputData.lines()` method to access.
- **integers per line** - if all lines contains a single integer (not uncommon in AoC problems), use `InputData.linesInts()` to access.
- **csv per line** - each line consists of a set of fields, separated by a specific character (such as comma or colon). Use `InputData.linefieldsSeparator()`.
- **complex field structure** - sometimes, each line consists of fields, but has a more complex structure. If the fields can be identified with a regular expression, use `InputData.linefieldsRegexp()`.
- **sections of the file** - when the input data is separated into sections, by having eg empty lines in between, use `InputData.sections()` to be able to handle each section separately.
- **input data is a character matrix** - when you need to access characters in the file by coordinates or extracting a sub matrix to work with, use `InputData.matrixChar()` and `InputData.subMatrix()` respectively.

Many of the above methods actually return a new `InputData` instance instead of raw data, allowing the use cases above to be chained in a string of steps.

## Example use

Assuming the below `input.txt`, which describes a number of teams, separated in sections. First line in each section is team name, second line is team members and their ages:
```bash
The Wonderboys
carl:12 jonas:47 doug:38

The Fast Ladies
karen:51 taylor:21 alicia:28 billie:18
```

This code extracts these elements in a structured way:

```javascript
const {InputData} = require('aoc-toolbox')
const aoc = new InputData() // input.txt is default filename

let teamSections = aoc.sections() // assumes sections separated by empty lines
let teams = teamSections.map((team) => {
    let teamName = team.lines()[0] // name is in first line
    let memberData = team.lines()[1] // get second line as string
    let teamMembers = memberData.split(' ').map((m) => {
        let mData = m.split(':')
        return {name: mData[0], age: parseInt(mData[1])}
    })
    return {teamName, teamMembers}
})
console.log(JSON.stringify(teams, null, 2))
```
The code above will print out this:
```json
[
  {
    "teamName": "The Wonderboys",
    "teamMembers": [
      {
        "name": "carl",
        "age": 12
      },
      {
        "name": "jonas",
        "age": 47
      },
      {
        "name": "doug",
        "age": 38
      }
    ]
  },
  {
    "teamName": "The Fast Ladies",
    "teamMembers": [
      {
        "name": "karen",
        "age": 51
      },
      {
        "name": "taylor",
        "age": 21
      },
      {
        "name": "alicia",
        "age": 28
      },
      {
        "name": "billie",
        "age": 18
      }
    ]
  }
]
```
