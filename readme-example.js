const {InputData} = require('./aoc-toolbox')
const aoc = new InputData({filename: 'input-readme.txt'}) // input.txt is default filename

let teams = aoc.sections() // assumes sections separated by empty lines
teams = teams.map((team) => {
    let teamName = team.lines()[0] // name is in first line
    let memberData = team.lines()[1] // get second line as string
    let teamMembers = memberData.split(' ').map((m)=>{
        let mData = m.split(':')
        return {name: mData[0], age: parseInt(mData[1])}
    })
    return {teamName, teamMembers}
})
console.log(JSON.stringify(teams, null, 2))
