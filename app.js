const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer(function (request, response) {
    console.log('request ', request.url);

    
    
    var way = '.' + request.url;
    if (way == './') {
        way = './index.html';
    }
    if( way == './about') {
        way = './about.html';
    }
    if( way == './img/gallery/graduation') {
        way = './img/gallery/graduation.jpg';
    }
    if( way == './img/gallery/study') {
        way = './img/gallery/study.jpg';
    }

    if( way == './video/memes') {
        way = './video/students/memes.mp4';
    }


    let extname = String(path.extname(way)).toLowerCase();
    var mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.png': 'image/png',
        '.js': 'text/javascript',
        '.jpg': 'image/jpg',
        '.mp4': 'video/mp4',
    };

    let contentType = mimeTypes[extname] || 'application/octet-stream';


    fs.readFile(way, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT') {
                fs.readFile('./error.html', function(error, content) {
                    response.writeHead(404, { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Internal error with a response code 500: '+error.code+' ..\n');
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(3000);
console.log('Server running at http://127.0.0.1:3000/');