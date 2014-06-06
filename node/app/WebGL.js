fm.Package("app");
fm.Include("web");
var io = require('socket.io');
fm.Class("WebGL", "Base");
app.WebGL = function (base, me, Base){this.setMe=function(_me){me=_me;};
	Static.main=function(){
		web = webPath;
		var server = require('http').createServer();
		Starter.handle(server.listen(8881, "localhost"));
        io = io.listen(server);
        console.log("WebGL");
        io.sockets.on('connection', function (socket){
            console.log("socket connected");
        });
        var fileData;
        require('fs').readFile( web.sources + "/data.json", function( err, data ) {
            fileData = JSON.parse(data.toString('utf-8'));
        });
        setTimeout(function(){
            senData(io, fileData);
        }, 5000);
	};

    function senData(io, fileData){
        fileData = convertPath(fileData);
        fileData.pop();
        setInterval(function(){
            var p = fileData.pop();
            if(!p){
                fileData = convertPath(fileData);
                fileData.pop();
                informClient(null)
            }
            informClient(fileData.pop());
        }, 500)
    }
    function informClient(data){
        var sockets = io.sockets.sockets;
        sockets.forEach(function(socket){
            socket.emit("filerefresh", data);
        });
    }
    function convertPath(a){
        var files = [];
        function getFilePath(obj, path){
            if(obj.children){
                obj.children.forEach(function(child){
                  return getFilePath(child, path + "/"+ obj.name) + path;
               });
            };
            files.push({obj:obj, path: path});
            return "";
        }
        getFilePath(a, "");
        return files;
    }
	this.method = function( req, res ) {
		var path =  web.sources + "/index.html";
		require('fs').readFile(path, function( err, data ) {
			if (err) {

				res.writeHead(400, {'Content-Type': 'text/html'});

				console.log(err);
			}
			else {
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write(data);
				res.end();
			}
		});
	};

    this.WebGL = function () {
          console.log("WebGLWebGL");
    };
};