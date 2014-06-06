var currentCodeFlower;
var createCodeFlower = function(json) {
// update the jsonData textarea
// remove previous flower to save memory
if (currentCodeFlower) currentCodeFlower.cleanup();
// adapt layout size to the total number of elements
var total = countElements(json);
w = parseInt(1000);
h = parseInt(600);
// create a new CodeFlower
currentCodeFlower = new CodeFlower("#visualization", w, h).update(json);
};
var socket = io.connect();
var json = {name: "root", children:[]};
socket.on('filerefresh', function (data) {
	console.log(data);
    if(!data){
        json = {name: "root", children:[]};
        return;
    }
     data.obj.children;
   setChild(data.obj, data.path);
   // json.children.push(data.obj);
    createCodeFlower(json);
});
function setChild(child, path){
    var temp = [json];
    path = path.split("/");
    path.shift();
    for(var i=0; i<path.length; i++){
        temp = getName(path[i], temp);
    }
    function getName(path, temp){
        for(var i=0; i < temp.length; i++){
             if(temp[i].name == path){
                if( !temp[i].children){
                    temp[i].children = [];
                }
                 return temp[i].children;
             }
       }
       temp.push({
            name : path,
            children: []
       });
       return temp;
    }
   temp &&  temp.push(child);
}

d3.json('data/wordpress.json', createCodeFlower);