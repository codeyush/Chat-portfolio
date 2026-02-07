function StatsPanel({ activeTopic, isActive }) {
  return (
    <div
  className={`side-panel right-panel ${
    isActive ? "panel-active" : "panel-dim"
  }`}
>


      <h3>Projects / Stats</h3>

      {activeTopic === "projects" && (
  <div className="panel-text">
    <strong>Key Projects</strong>
    <ul>
      <li>Machine Learning based Image Dehazing System</li>
      <li>GAN-based Data Generation Pipeline</li>
      <li>Computer Vision & Systems Engineering Projects</li>
    </ul>
  </div>
)}

    </div>
  )
}

export default StatsPanel
