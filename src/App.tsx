import { useState,useEffect,useRef} from 'react';
import './App.css'

function App() {
  const [messages, setMessages] = useState(["Hi there","Hello,How are you"]);
  //const inputRef=useRef(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(()=>{
    const ws=new WebSocket("http://localhost:8080");
    wsRef.current=ws;

    ws.onmessage=(event)=>{
      setMessages((m)=>[...m,event.data]);
    }

    ws.onopen=()=>{
      ws.send(JSON.stringify({
        type:"join",
        payload:{
          roomID:"red"
        }
      }))
    }

    return ()=>{
      ws.close();
    }
  },[])

  return (
    <div className='h-screen bg-black'>
      <br></br>
      <div className='h-[95vh]'>
        {messages.map(message=><div className='my-8'>
            <span className='bg-white text-black p-4 rounded-sm'>{message}</span>
          </div>
        )}
      </div>
      <div className='w-full bg-white'>
        <input id="message" className='text p-4 rounded-sm w-[90vw]'></input>
        <button onClick={()=>{
          //@ts-ignore
          //const message=inputRef.current.value;
          const message=document.getElementById("message").value
          //@ts-ignore
          wsRef.current.send(JSON.stringify({
            type:"chat",
            payload:{
              message:message
            }
          }))

        }} className='bg-purple-800 p-4 text-white rounded-md'>Send Message</button>
      </div>
    </div>
  )
}

export default App
