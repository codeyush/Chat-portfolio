import { useState, useRef, useEffect } from 'react'
import './App.css'
import resumeData from './resumeData'
import Header from './components/Header'
import AboutPanel from './components/AboutPanel'
import StatsPanel from './components/StatsPanel'
import IntroScreen from "./components/IntroScreen"


function App() {
  const [messages, setMessages] = useState([
    { text: "Hi, I’m Ayush’s portfolio. Ask me anything.", sender: "bot" }
  ])

  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const [activeTopic, setActiveTopic] = useState(null)
  const [entered, setEntered] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const [introExiting, setIntroExiting] = useState(false)
  const [mainVisible, setMainVisible] = useState(false)



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
const isExperience = userText.includes("experience") || userText.includes("work")
const isProjects = userText.includes("project")
const isEducation = userText.includes("education") || userText.includes("study")

if (isExperience) {
  botReply = resumeData.experience
  setActiveTopic("experience")
} else if (isProjects) {
  botReply = resumeData.projects
  setActiveTopic("projects")
} else if (isEducation) {
  botReply = resumeData.education
  setActiveTopic("education")
} else {
  botReply =
    "You can ask about Ayush’s experience, projects, or education."
  setActiveTopic(null)
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

  const renderMainApp = () => (
  <div className="app-layout">
    <Header />

    <div className="arena">
      <AboutPanel
        activeTopic={activeTopic}
        isActive={activeTopic === "experience" || activeTopic === "education"}
      />

      <div className="center-court">
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
      </div>

      <StatsPanel
        activeTopic={activeTopic}
        isActive={activeTopic === "projects"}
      />
    </div>
  </div>
)

if (showIntro) {
  return (
    <>
      <IntroScreen
        exiting={introExiting}
        onEnter={() => {
          setIntroExiting(true)

          // Start fading IN main app slightly before intro disappears
          setMainVisible(true)

          setTimeout(() => {
            setShowIntro(false)
          }, 500)

          return renderMainApp()
}
      }
      />

      {/* Main app exists but is invisible at first */}
      <div className={`main-app ${mainVisible ? "main-visible" : ""}`}>
        {renderMainApp()}
      </div>
    </>
  )

}




  return(
  <div className="app-layout">
    <Header />

    {/* existing chat UI stays below */}
    <div className="arena">
   <AboutPanel
  activeTopic={activeTopic}
  isActive={activeTopic === "experience" || activeTopic === "education"}
/>

  <div className="center-court">
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
  </div>

  <StatsPanel
  activeTopic={activeTopic}
  isActive={activeTopic === "projects"}
/>

</div>
</div>

)

}

export default App
