// Importing the required modules
const WebSocketServer = require('ws');
 
// Creating a new websocket server
const wss = new WebSocketServer.Server({ port: 8080 })

wss.listeners()

// Creating connection using websocket
wss.on("connection", ws => {
    console.log("new client connected");
    // event listener for when a message is received form client
    ws.on("message", data => {

        // printing received data in server console
        console.log(wss.clients.message);

        // sending back the data to the client
        if(isJSON(data)){
            console.log(JSON.parse(data.toString()));
            ws.send(`Your message is JSON Data : ${data} `);
        } else {
            ws.send(`Your message is text ${data} `);
            console.log(data.toString());
        }
        
    });

    // a counter to be increased each second and send to the client
    setInterval(() => {
        ws.send(JSON.stringify(timer));
        timer.value++;
    }, 1000);


    // handling what to do when clients disconnects from server
    ws.on("close", () => {
        console.log("the client has connected");
    });
    // handling client connection error
    ws.onerror = function () {
        console.log("Some Error occurred")
    }
});

// starting the program
console.log("The WebSocket server is running on port 8080");


// function to check if the data is JSON type
function isJSON(str){
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

// counter object to increase and send each second
let timer = {
    value : 1
};
