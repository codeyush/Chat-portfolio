import avatar from "../assets/avatar.png"
import "./IntroScreen.css"

function IntroScreen({ onEnter, exiting }) {

  return (
    <div className={`intro-screen ${exiting ? "fade-out" : ""}`}>

      <div className="intro-content">
        <div className="intro-avatar">
          <img src={avatar} alt="Ayush avatar" />
        </div>

        <button className="intro-button" onClick={onEnter}>
          Click to get started
        </button>
      </div>
    </div>
  )
}

export default IntroScreen
