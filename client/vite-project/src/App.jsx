import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const [room, setRoom] = useState("");

  const sendMessage = () => {
    // socket.emit("send_message", { message: message });

    socket.emit("send_message", { message, room });
  };

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  useEffect(() => {
    socket.on("welcome", (msg) => {
      console.log(msg);
    });

    socket.on("receive_message", (data) => {
      // alert(data.message);
      setMessageReceived(data.message);
    });
  }, [socket]);
  return (
    <div className="App">
      <input onChange={(e) => setRoom(e.target.value)} placeholder="Room..." />
      <button onClick={joinRoom}>JOIN ROOM</button>
      <input
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message..."
      />
      <button onClick={sendMessage}>Send Message</button>
      <h1>Message:</h1>
      <p>{messageReceived}</p>
    </div>
  );
}

export default App;
