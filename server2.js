const http = require('http');
const async = require('async');
const port = 8080;
var counterModule = (function () {
  var instance,
      counter = 0;

  var getCounter = function () {
    return counter;
  }

  var increaseCounter = function () {
    counter++;
    console.log("+")
  }

  var decreaseCounter = function () {
    counter--;
    console.log("-")
  }

  var createInstance = function () {
    return {
      getCounter: getCounter,
      increaseCounter: increaseCounter,
      decreaseCounter: decreaseCounter
    }
  }

  return {
    getInstance: function () {
      return instance || (instance = createInstance());
    }
  }
})();

var workers = async.queue(worker, 10);
const requestHandler = async function load(request, response){ //вызываеться при получении запроса
		if (counterModule.getInstance().getCounter() < 10){
			counterModule.getInstance().increaseCounter();
			workers.push({request : request, response : response}, show);
			console.log("Yes");
		}else{
			response.writeHead(500,"");
			console.log("No");
      response.end('It is run')
		};
}

async function worker (task, callback){
	task.response.writeHead(200,"yes");
  setTimeout(()=>{task.response.end(counterModule.getInstance().getCounter()+ "");counterModule.getInstance().decreaseCounter();}, 10000)
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }    console.log(`server is listening on ${port}`)
})

function show(response){
	
}