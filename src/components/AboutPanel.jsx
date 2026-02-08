function AboutPanel({ activeTopic, isActive }) {
  return (
    <div
      className={`side-panel left-panel ${
        isActive ? "panel-active" : "panel-dim"
      }`}
    >
     {/* Animated Identity Emoji */}
<div className={`identity-emoji ${isActive ? "emoji-active" : ""}`}>
  🏀
</div>


      <div className="panel-text muted" style={{ textAlign: "center" }}>
      <h3> About </h3>
</div>


      {/* Content */}
     {activeTopic === "experience" && (
  <div className="panel-text">
    <strong>Software Engineer — Bharat Electronics Limited (BEL)</strong>
    <ul>
      <li>Working on real-world, production-grade systems</li>
      <li>Contributing to high-reliability software in mission-critical environments</li>
      <li>Hands-on experience with system-level problem solving</li>
    </ul>
  </div>
)}


      {activeTopic === "education" && (
        <p className="panel-text">
          Ayush has a strong academic foundation in engineering, with hands-on experience
          in software, systems, and applied problem-solving.
        </p>
      )}

      
    </div>
  )
}

export default AboutPanel
