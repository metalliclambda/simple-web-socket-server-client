// websocket object on client and give it the address and port number of the server
const ws = new WebSocket("ws://localhost:8080");

// event listener to check if it is connected to the server
ws.addEventListener("open", () =>{
  console.log("We are connected");
  ws.send("How are you?");
});

// event listener for when a message is received from the server
ws.addEventListener("message" , (data)=> {
    if(isJSON(data.data)){
        let value = JSON.parse(data.data).value;
        counter.textContent = value;
    }else {
        console.log(data.data);
    }
})


// html dom objects
const testBtn = document.getElementById("test-btn");
const counter = document.getElementById("counter");
const form = document.getElementById("form");

// event listener for when form is being submitted
form.addEventListener('submit' , doSth)

function doSth(e) {
    // sneding text filed in the form as object to server
    e.preventDefault();
    const o1 = {
        text : e.target.text.value
    }
    ws.send(JSON.stringify(o1));
}


// fucntion to check if the data is JSON type
function isJSON(str){
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}