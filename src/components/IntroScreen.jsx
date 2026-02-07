import avatar from "../assets/avatar.png"
import "./IntroScreen.css"

function IntroScreen({ onEnter, exiting }) {

  return (
    <div className={`intro-screen ${exiting ? "fade-out" : ""}`}>

      <div className="intro-content">
        <div className="intro-avatar" onClick={onEnter}>
  <img src={avatar} alt="Ayush avatar" />
</div>


        <div className="speech-bubble" onClick={onEnter}>
  Hey, tap me to get started 👋
</div>

      </div>
    </div>
  )
}

export default IntroScreen
