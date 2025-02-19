import { useState } from "react";

const AnswerForm = ({ correctAnswer, onCorrect }) => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
      alert("정답입니다!");
      onCorrect();
    } else {
      alert("틀렸습니다. 다시 시도하세요.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <input 
        type="text" 
        placeholder="정답 입력" 
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="border p-2 rounded-md"
      />
      <button type="submit" className="ml-2 bg-purple-600 text-white px-4 py-2 rounded-md">
        제출
      </button>
    </form>
  );
};

export default AnswerForm;
