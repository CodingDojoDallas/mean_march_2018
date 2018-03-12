// get the http module:
var http = require('http');
// fs module allows us to read and write content for responses!!
var fs = require('fs');
// creating a server using http module:
var server = http.createServer(function (request, response){
    // see what URL the clients are requesting:
    console.log('client request URL: ', request.url);
    // this is how we do routing:
    if(request.url === '/cars') {
        fs.readFile('./views/cars.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});  // send data about response
            response.write(contents);  //  send response body
            response.end(); // finished!
        });
    }
    else if(request.url === '/cats') {
        fs.readFile('./views/cats.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});  // send data about response
            response.write(contents);  //  send response body
            response.end(); // finished!
        });
    }
    else if(request.url === '/cars/new') {
        fs.readFile('./views/cars_new.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});  // send data about response
            response.write(contents);  //  send response body
            response.end(); // finished!
        });
    }
    else if(request.url === '/images/car1.jpeg'){
        fs.readFile('./images/car1.jpeg', function(errors, contents) {
          response.writeHead(200, {'Content-type': 'image/jpg'});
          response.write(contents);
          response.end();
        })
    }
    else if(request.url === '/images/car2.jpeg'){
        fs.readFile('./images/car2.jpeg', function(errors, contents) {
          response.writeHead(200, {'Content-type': 'image/jpg'});
          response.write(contents);
          response.end();
        })
    }
    else if(request.url === '/images/car3.jpeg'){
        fs.readFile('./images/car3.jpeg', function(errors, contents) {
          response.writeHead(200, {'Content-type': 'image/jpg'});
          response.write(contents);
          response.end();
        })
    }
    else if(request.url === '/images/cat1.jpeg'){
        fs.readFile('./images/cat1.jpeg', function(errors, contents) {
          response.writeHead(200, {'Content-type': 'image/jpg'});
          response.write(contents);
          response.end();
        })
    }
    else if(request.url === '/images/cat2.jpeg'){
        fs.readFile('./images/cat2.jpeg', function(errors, contents) {
          response.writeHead(200, {'Content-type': 'image/jpg'});
          response.write(contents);
          response.end();
        })
    }
    else if(request.url === '/images/cat3.jpeg'){
        fs.readFile('./images/cat3.jpeg', function(errors, contents) {
          response.writeHead(200, {'Content-type': 'image/jpg'});
          response.write(contents);
          response.end();
        })
    }
    else if (request.url === "/style.css") {
       fs.readFile('style.css', 'utf8', function (errors, contents){
           response.writeHead(200, {'Content-type': 'text/css'});
           response.write(contents);
           response.end();
       });
    }
    // request didn't match anything:
    else {
        response.writeHead(404);
        response.end('The URL requested is not available.');
    }
});
// tell your server which port to run on
server.listen(6789);
// print to terminal window
console.log("Running in localhost at port 6789");
