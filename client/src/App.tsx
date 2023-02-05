import io from "socket.io-client";
import { useEffect, useState } from "react";
interface Messages {
  body: string;
  from: string;
}

const socket = io("http://localhost:8000");
const App = () => {
  const [message, setMessage] = useState("");
  const [mesages, setMesages] = useState<Messages[]>([]);

  const handlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    socket.emit("message", message);
    const newMessage = { body: message, from: "me" };
    setMesages([newMessage, ...mesages]);
    setMessage("");
  };

  useEffect(() => {
    const mensajeRecibido = (mensaje: Messages) => {
      setMesages([mensaje, ...mesages]);
    };

    socket.on("msg", mensajeRecibido);

    return () => {
      socket.off("msg", mensajeRecibido);
    };
  }, [mesages]);

  return (
    <div className="">
      <form onSubmit={handlerSubmit}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="input input-bordered"
          type="text"
        />
        <button className=" btn">Enviar</button>
      </form>
      <div className=" grid  gap-3">
        {mesages.map((msg, i) => (
          <div key={i} className=" chat-bubble">
            <span
              className={`${
                msg.from === "me" ? "text-red-400" : ""
              } text-green-400 font-bold text-xl`}
            >
              {" "}
              {msg.from}:
            </span>{" "}
            {msg.body}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
