import React, { useState, useRef } from "react";
import "./App.css";
import musicFile from "./assets/music.mp3";
import chibi from "./assets/chibi.gif";
import Confetti from "react-confetti";

function App() {
  const [messagesVisible, setMessagesVisible] = useState(false);
  const [music] = useState(new Audio(musicFile));
  const [confetti, setConfetti] = useState(false);
  const [screen, setScreen] = useState("door"); // door | main
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");

const handleNoClick = () => {
  const firstConfirm = window.confirm("Chắc chắn không buồn nữa nhá?");
  if (!firstConfirm) return; // nếu Cancel, dừng

  const secondConfirm = window.confirm("Buồn nửa là ký đầu nhá 😜");
  if (!secondConfirm) return; // nếu Cancel, dừng

  // Nếu OK cả 2 lần
  setMessagesVisible(true);
  music.play();
  setConfetti(true);
};
const correctAnswer = "landmark"; // mật khẩu hoặc đáp án câu hỏi

const handleAuthSubmit = () => {
  if (passwordInput === correctAnswer) {
    setError("");
    window.confirm("Dữ chàiii, nhớ luôn trí nhớ thiệt siêu phàm 😜");
    setScreen("main"); // chuyển sang màn chính
  } else {
    setError("Sai rồi đi ra kìa quỳ hối lỗi điiii 😅");
  }
};

const containerRef = useRef(null);


const moveButtonRandom = (e) => {
  const btn = e.target;
  const container = containerRef.current;

  const padding = 10; // khoảng cách an toàn
  const rect = container.getBoundingClientRect();

  // lấy tọa độ max dựa trên container
  const maxX = rect.width - btn.offsetWidth - padding;
  const maxY = rect.height - btn.offsetHeight - padding;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  btn.style.position = "absolute";
  btn.style.left = `${x}px`;
  btn.style.top = `${y}px`;
};

  return (
  <div className="app">
    {screen === "door" && (
      <div className="door-screen">
        <h1>Bạn có phải là bạn Thương không?</h1>
        <button className="door-btn" onClick={() => setScreen("auth")}>
          Mở cửa để vào
        </button>
      </div>
    )}

  {screen === "auth" && (
    <div className="auth-screen">
      <h1>Hôm trước mình đã đi chơi và ngồi nói chuyện ở đâu ?</h1>
      <h2>Nhập đáp án để vào nhé: (hint: bắt đầu bằng chữ L, kết thúc là chữ K)</h2>
      <input
        type="text"
        value={passwordInput}
        onChange={(e) => setPasswordInput(e.target.value.toLowerCase())}
        placeholder="Nhập mật khẩu hoặc trả lời câu hỏi"
      />
      <button onClick={handleAuthSubmit}>Xác nhận</button>
      {error && <p className="error">{error}</p>}
    </div>
  )}

    {screen === "main" && (
      <div className="main-screen">
        {confetti && <Confetti />}
        <img src={chibi} alt="chibi" className="chibi" />
        <h1>Bạn đang buồn sao?</h1>
        <div className="buttons" ref={containerRef}>
          <button
            className="btn btn-run"
            onMouseEnter={moveButtonRandom}
            onTouchStart={moveButtonRandom}
          >
            Có
          </button>
          <button className="btn btn-calm" onClick={handleNoClick}>
            Không buồn nữa đâu
          </button>
        </div>

        {messagesVisible && (
          <div className="messages">
            <p>Đừng buồn nữa nha 💖</p>
            <p>Hay vui đi vì cuộc đời cho phép 🥰</p>
            <p>Mọi chuyện sẽ ổn thôi 😘</p>
          </div>
        )}
      </div>
    )}
  </div>
);

}

export default App;
