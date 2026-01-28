import './App.css'

function App() {
  return (
    <div className="chat-container">
      <div className="chat-header">
        Chat Portfolio
      </div>

      <div className="chat-messages">
        <div className="message bot">
          Hi, I’m Ayush’s portfolio. Ask me anything.
        </div>
      </div>

      <div className="chat-input">
        <input type="text" placeholder="Type your question here..." />
        <button>Send</button>
      </div>
    </div>
  )
}

export default App
