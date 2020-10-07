const path = require('path');
const express = require('express');
const http = require('http');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');

let app = express();
let errors = require(path.join(process.env.DIR, '/express/middleware/errors'));

app.set('views', path.join(process.env.DIR, '/express/views/ejs'));
app.set('view engine', 'ejs');
app.disable('x-powered-by');
app.use(favicon(path.join(process.env.DIR, '/express/public/img/favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(process.env.DIR, '/express/public')));
app.use('/', require(path.join(process.env.DIR, '/express/routes/gtk_tt')));
app.use('/gtk_tt', require(path.join(process.env.DIR, '/express/routes/gtk_tt')));
app.use('/tt_masty', require(path.join(process.env.DIR, '/express/routes/tt_masty')));
app.use('/tt_nums', require(path.join(process.env.DIR, '/express/routes/tt_nums')));
app.use(errors.notfound);
app.use(errors.serverError);

let server = http.createServer(app);

server.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Server running at http://${process.env.EXPRESS_IP}:${process.env.EXPRESS_PORT}/`);
});

setTimeout(function(){
    let used = process.memoryUsage();
    for (let key in used) {
        console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
    }
}, 2000);