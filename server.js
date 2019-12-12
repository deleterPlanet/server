const http = require('http');
const async = require('async');
const port = 8080;

var workers = async.queue(worker, 10);
const requestHandler = async function load(request, response){ //вызываеться при получении запроса
	workers.push({request : request, response : response}, show);
	console.log("Yes");
}

async function worker (task, callback){//singleton
	task.response.writeHead(200,"yes");
	setTimeout(()=>{task.response.end("Its run")}, 1000)
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }    console.log(`server is listening on ${port}`)
})

function show(response){
  /*response.end(counterModule.getInstance().getCounter());*/
}