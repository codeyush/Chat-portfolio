import { useState, useRef, useEffect } from 'react'
import './App.css'
import resumeData from './resumeData'
import Header from './components/Header'
import AboutPanel from './components/AboutPanel'
import StatsPanel from './components/StatsPanel'
import IntroScreen from './components/IntroScreen'
import arenaBg from "./assets/arena-bg.png"
import appBg from "./assets/app-bg.png"



function App() {
  const [messages, setMessages] = useState([
    { text: "Hi, I’m Ayush’s portfolio. Ask me anything.", sender: "bot" }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [activeTopic, setActiveTopic] = useState(null)

  const messagesEndRef = useRef(null)

  // 🔑 Cross-fade states
  const [showIntro, setShowIntro] = useState(true)
  const [introExiting, setIntroExiting] = useState(false)
  const [mainVisible, setMainVisible] = useState(false)

  const sendMessage = () => {
    if (!input.trim()) return

    const userText = input.toLowerCase()
    setMessages(prev => [...prev, { text: input, sender: "user" }])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)

      let botReply = ""

      if (userText.includes("experience") || userText.includes("work")) {
        botReply = resumeData.experience
        setActiveTopic("experience")
      } else if (userText.includes("project")) {
        botReply = resumeData.projects
        setActiveTopic("projects")
      } else if (userText.includes("education") || userText.includes("study")) {
        botReply = resumeData.education
        setActiveTopic("education")
      } else {
        botReply = "You can ask about Ayush’s experience, projects, or education."
        setActiveTopic(null)
      }

      setMessages(prev => [...prev, { text: botReply, sender: "bot" }])
    }, 1000)
  }

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight
    }
  }, [messages, isTyping])

  return (
    <>
      {/* ===== INTRO SCREEN (on top) ===== */}
      {showIntro && (
        <IntroScreen
          exiting={introExiting}
          onEnter={() => {
            setIntroExiting(true)
            setMainVisible(true)

            setTimeout(() => {
              setShowIntro(false)
            }, 5000)
          }}
        />
      )}

      {/* ===== MAIN APP (always mounted) ===== */}
      <div className={`main-app ${mainVisible ? "main-visible" : ""}`}>
        <div className="app-layout">
          <Header />

          <div
  className="arena"
  style={{ backgroundImage: `url(${arenaBg})` }}
>
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
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type your question here..."
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
      </div>
    </>
  )
}

export default App
