const koa = require('koa')
const app = new koa()
const schedule = require('node-schedule')
const chalk = require('chalk')
const fs = require('fs')
const promisify = require('util').promisify
const readFile = fs.readFileSync;
const writeFile = fs.writeFileSync;

const execPromise = promisify(require('child_process').exec)
const cmd_pull = "git pull origin master"
const cmd_add = "git add ."
const cmd_commit = "git commit -m 'github - auto - commit'"
const cmd_push = "git push origin master"

async function pullNewCode () {
    await execPromise(cmd_pull).then(res => {
        console.log(chalk.green(cmd_pull, ':  ', res))
    }).catch(err => {
        console.log(chalk.red(cmd_pull, ':  ', err))
    })
}

function addNewCode () {
    let content = readFile('./README.md', 'utf-8')
    writeFile('./README.md', `${content}\n* ${new Date()}`)
}
let t = schedule.scheduleJob('* * * * * *',()=>{
    // pullNewCode()
    addNewCode()
    console.log('scheduleCronstyle:' + new Date());
});
console.log('启动成功 localhost: 3000')
app.listen(3000)