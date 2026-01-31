import { useState, useRef, useEffect } from 'react'
import './App.css'
import resumeData from './resumeData'

function App() {
  const [messages, setMessages] = useState([
    { text: "Hi, I’m Ayush’s portfolio. Ask me anything.", sender: "bot" }
  ])

  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const sendMessage = () => {
    if (input.trim() === "") return

    const userText = input.toLowerCase()
    const userMessage = { text: input, sender: "user" }

    setMessages((prevMessages) => [
      ...prevMessages,
      userMessage
    ])

    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)

      let botReply = ""

      if (userText.includes("experience")) {
        botReply = resumeData.experience
      } else if (userText.includes("project")) {
        botReply = resumeData.projects
      } else if (userText.includes("education")) {
        botReply = resumeData.education
      } else {
        botReply =
          "You can ask about Ayush’s experience, projects, or education."
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botReply, sender: "bot" }
      ])
    }, 1000)
  }

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop =
        messagesEndRef.current.scrollHeight
    }
  }, [messages, isTyping])

  return (
    <div className="chat-container">
      <div className="chat-header">Chat Portfolio</div>

      <div className="chat-messages" ref={messagesEndRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}

        {isTyping && (
  <div className="thinking-indicator">
    <span className="basketball">🏀</span>
  </div>
)}

      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your question here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage()
            }
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}

export default App
