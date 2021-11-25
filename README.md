# aoc-toolbox

This is a small utility to read an input data file from an [Advent of Code](https://adventofcode.com/) problem, and offer a set of alternatives on how to extract and handle the data.

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
