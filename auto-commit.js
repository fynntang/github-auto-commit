const schedule = require('node-schedule')
const chalk = require('chalk')
const fs = require('fs')
const readFile = fs.readFileSync;
const writeFile = fs.writeFileSync;

const exec = require('child_process').execSync
const cmd_pull = "git pull origin master"
const cmd_add = "git add ."
const cmd_commit = "git commit -m 'github - auto - commit'"
const cmd_push = "git push origin master"

try {
    function pullNewCode () {
        exec(cmd_pull)
    }
    
    function addNewCode () {
        let content = readFile('./README.md', 'utf-8')
        writeFile('./README.md', `${content}\n* ${new Date()}`)
    }
    function pushNewCode () {
        exec(cmd_add)
        exec(cmd_commit)
        exec(cmd_push)
    }
    let t = schedule.scheduleJob('1 1 1 * * *',()=>{
        pullNewCode()
        addNewCode()
        console.log('scheduleCronstyle:' + new Date());
        pushNewCode()
    });
} catch (err) {
    console.log(chalk.red('脚本出错 错误详情： ', err))
}
