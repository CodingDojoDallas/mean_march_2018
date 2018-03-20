var http = require('http');

var fs = require('fs');

var server = http.createServer(function (request, response){
    // see what URL the clients are requesting:
    console.log('client request URL: ', request.url);
    // this is how we do routing:
    if(request.url === '/cars') {
        fs.readFile('views/index.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(contents); 
            response.end();
        });
    }
    else if(request.url === "/images/lambo.jpg"){
    	fs.readFile('./images/lambo.jpg', function(errors, contents){
    		response.writeHead(200, {'Content-type': 'image/jpg'});
    		response.write(contents);
    		response.end();
    	});
    }
    else if(request.url === '/cats') {
        fs.readFile('views/index2.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(contents); 
            response.end();
        });
    }
    else if(request.url === "/images/cat1.jpg"){
    	fs.readFile('./images/cat1.jpg', function(errors, contents){
    		response.writeHead(200, {'Content-type': 'image/jpg'});
    		response.write(contents);
    		response.end();
    	});
    }
    else if(request.url === '/cars/new') {
        fs.readFile('views/form.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(contents); 
            response.end();
        });
    }
    else {
        response.end('File not found!!!');
    }
});
// tell your server which port to run on
server.listen(6780);
// print to terminal window
console.log("Running in localhost at port 6780");