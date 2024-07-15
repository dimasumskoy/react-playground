import { useState, useRef, useEffect, useCallback } from "react";

interface IWebSocketHook {
  messages: string[];
  sendMessage: (text: string) => void;
  readyState: number;
}

function useWebSocket(url: string): IWebSocketHook {
  const [messages, setMessages] = useState<string[]>([]);
  const [readyState, setReadyState] = useState<number>(WebSocket.CONNECTING);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // установка соединения
    const socket = new WebSocket(url);
    socketRef.current = socket;

    // обработчик открытия соединения
    socket.onopen = function () {
      console.log("Conntected");
      setReadyState(WebSocket.OPEN);
    };

    // обработчик получения сообщения
    socket.onmessage = function (event: MessageEvent) {
      const message = event.data;
      setMessages((prev) => [...prev, message]);
    };

    // обработчик ошибок
    socket.onerror = function (error: Event) {
      console.error("Websocket error: ", error);
    };

    // обработчик закрытия соединяния
    socket.onclose = function () {
      console.log("Websocket disconnected");
      setReadyState(WebSocket.CLOSED);
    };

    // закрыть при размонтировании
    return () => {
      socket.close();
    };
  }, [url]);

  const sendMessage = (message: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    } else {
      console.error("Webscoket disconnected");
    }
  };

  return { messages, sendMessage, readyState };
}

// Пример использования
// function ChatComponent() {
//   const { messages, sendMessage } = useWebSocket('ws://example.com/chat');

//   return (
//     <div>
//       {messages.map((msg, index) => (
//         <div key={index}>{msg}</div>
//       ))}
//       <button onClick={() => sendMessage('Hello')}>Send Hello</button>
//     </div>
//   );
// }
