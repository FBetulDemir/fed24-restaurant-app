import "../styles/Awards.css";
import { useState } from "react";

const Awards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const awardsData = [
    {
      title: "JAPANSKA KULINARISKA GUIDEN",
      subtitle: "Stans bästa sushi",
    },
    {
      title: "TRIP ADVISOR",
      subtitle: "Känd från matbloggare & foodie-tips",
    },
    {
      title: "FOODORA",
      subtitle: "Topprankad sushi restaurangen",
    }
  ]

  const prev = () => {
    setCurrentIndex((currentIndex - 1 + awardsData.length) % awardsData.length)
  }

  const next = () => {
    setCurrentIndex((currentIndex + 1) % awardsData.length)
  }

  return (
    <div className="awards">
        <div className="awards-wrapper">
          {awardsData.map((award, index) => (
            <div
              key={index}
              className={`award-card ${index === currentIndex ? "active" : "hidden"}`}
            >
              <h3>★★★★★</h3>
              <h4>{award.title}</h4>
              <p className="card-subtitle">{award.subtitle}</p>
            </div>
          ))}
            <button className="arrow left" onClick={prev}>←</button>
            <button className="arrow right" onClick={next}>→</button>
        </div>
    </div>
  );
}

export default Awards;