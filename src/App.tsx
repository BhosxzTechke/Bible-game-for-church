import React, { useState } from "react";

const initialData = [
  {
    category: "Faith",
    questions: [
      { points: 100, question: "What is faith according to Hebrews 11:1?", answer: "The substance of things hoped for, the evidence of things not seen." },
      { points: 200, question: "Who is called the father of faith?", answer: "Abraham" },
      { points: 300, question: "Name three fruits of the Spirit.", answer: "Any three of: Love, Joy, Peace, Patience, Kindness, Goodness, Faithfulness, Gentleness, Self-control" },
      { points: 400, question: "Who walked on water besides Jesus?", answer: "Peter" },
      { points: 500, question: "What chapter is known as the Hall of Faith?", answer: "Hebrews 11" }
    ]
  },
  {
    category: "Miracles",
    questions: [
      { points: 100, question: "Jesus turned water into what?", answer: "Wine" },
      { points: 200, question: "How many people were fed with 5 loaves and 2 fish?", answer: "About 5,000" },
      { points: 300, question: "Who was raised from the dead after four days?", answer: "Lazarus" },
      { points: 400, question: "What sea was parted by Moses?", answer: "Red Sea" },
      { points: 500, question: "Who healed Naaman from leprosy?", answer: "Elisha" }
    ]
  },
  {
    category: "Bible Characters",
    questions: [
      { points: 100, question: "Who built the ark?", answer: "Noah" },
      { points: 200, question: "Who betrayed Jesus?", answer: "Judas Iscariot" },
      { points: 300, question: "Who interpreted Pharaoh's dreams?", answer: "Joseph" },
      { points: 400, question: "Who was thrown into the lions' den?", answer: "Daniel" },
      { points: 500, question: "Who was the first king of Israel?", answer: "Saul" }
    ]
  }
];

export default function BibleJeopardy() {
  const [data, setData] = useState(initialData);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);

  const handleSelect = (catIndex, qIndex) => {
    if (!data[catIndex].questions[qIndex].answered) {
      setSelected({ catIndex, qIndex });
      setShowAnswer(false);
    }
  };




  const awardPoints = (team) => {
    const points = data[selected.catIndex].questions[selected.qIndex].points;

    if (team === 1) {
      setTeam1Score(team1Score + points);
    } else {
      setTeam2Score(team2Score + points);
    }

    markAnswered();
  };




  const markAnswered = () => {
    const updated = [...data];
    updated[selected.catIndex].questions[selected.qIndex].answered = true;
    setData(updated);
    setSelected(null);
  };

  const resetGame = () => {
    setData(initialData);
    setTeam1Score(0);
    setTeam2Score(0);
    setSelected(null);
  };

  return (


    <div style={styles.container}>
      <h1 style={styles.title}>SDA Sucat Church Bible Jeopardy</h1>

      {/* SCOREBOARD */}
      <div style={styles.scoreBoard}>
        <div style={styles.scoreBox}>
          <h2>Team 1</h2>
          <p style={styles.score}>{team1Score}</p>
        </div>
        <div style={styles.scoreBox}>
          <h2>Team 2</h2>
          <p style={styles.score}>{team2Score}</p>
        </div>
      </div>





      <div style={styles.grid}>
        {data.map((cat, catIndex) => (
          <div key={catIndex} style={styles.categoryBox}>

            {/* 0 , 1 ,2  */}
            <h2 style={styles.categoryTitle}>{cat.category}</h2>
            {/* Faith , Miracle , Bible Character */}


            {cat.questions.map((q, qIndex) => (

              <button
                key={qIndex}
                style={{
                  ...styles.button,
                  backgroundColor: q.answered ? "#444" : "#1e3a8a"
                }}
                disabled={q.answered}
                onClick={() => handleSelect(catIndex, qIndex)}
              >
                {q.answered ? "✓" : q.points}
              </button>
            ))}
          </div>
        ))}
      </div>





              {/* MODAL */}

      {selected && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3 style={{ marginBottom: "20px" }}>
              {data[selected.catIndex].questions[selected.qIndex].question}
            </h3>

            {showAnswer && (
              <p style={{ fontWeight: "bold", marginTop: "20px" }}>
                Answer: {data[selected.catIndex].questions[selected.qIndex].answer}
              </p>
            )}

            <div style={{ marginTop: "30px" }}>
              {!showAnswer && (
                <button style={styles.actionButton} onClick={() => setShowAnswer(true)}>
                  Show Answer
                </button>
              )}


              {showAnswer && (
                <>
                  <button
                    style={{ ...styles.actionButton, backgroundColor: "green" }}
                    onClick={() => awardPoints(1)}
                  >
                    Team 1 Correct
                  </button>

                  <button
                    style={{ ...styles.actionButton, backgroundColor: "purple" }}
                    onClick={() => awardPoints(2)}
                  >
                    Team 2 Correct
                  </button>
                </>
              )}

              <button
                style={{ ...styles.actionButton, backgroundColor: "#b91c1c" }}
                onClick={markAnswered}
              >
                No One Correct
              </button>
            </div>
          </div>
        </div>
      )}

      <button style={{ ...styles.actionButton, marginTop: "40px" }} onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}







const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#0f172a",
    color: "white",
    padding: "20px",
    textAlign: "center",
    fontFamily: "Arial"
  },
  title: {
    fontSize: "36px",
    marginBottom: "20px"
  },
  scoreBoard: {
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    marginBottom: "40px"
  },
  scoreBox: {
    backgroundColor: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
    minWidth: "150px"
  },
  score: {
    fontSize: "28px",
    fontWeight: "bold"
  },
  grid: {
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    flexWrap: "wrap"
  },
  categoryBox: {
    minWidth: "200px"
  },
  categoryTitle: {
    marginBottom: "20px"
  },
  button: {
    display: "block",
    width: "100%",
    padding: "15px",
    marginBottom: "10px",
    fontSize: "18px",
    color: "white",
    border: "none",
    cursor: "pointer"
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    backgroundColor: "white",
    color: "black",
    padding: "40px",
    borderRadius: "10px",
    maxWidth: "600px",
    width: "90%"
  },
  actionButton: {
    padding: "10px 20px",
    margin: "10px",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#1e40af",
    color: "white"
  }
};
