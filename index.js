let path = require('path');
process.env.DIR = __dirname
process.env.EXPRESS_IP = "127.0.0.1"
process.env.EXPRESS_PORT = 8080

require(path.join(process.env.DIR, "express"));
const start = require(path.join(process.env.DIR, "border_calendar"));

let start_num = 0;

function st(){
    setInterval(start, 1000, start_num)
}
setTimeout(
    st, 5000
)


