import { useParams, useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import ProblemCard from "../components/ProblemCard";
import AnswerForm from "../components/AnswerForm";

const problems = [
  { id: 1, img: "problem1.jpg", question: "첫 번째 문제입니다.", answer: "apple" },
  { id: 2, img: "problem2.jpg", question: "두 번째 문제입니다.", answer: "banana" },
  { id: 3, img: "problem3.jpg", question: "세 번째 문제입니다.", answer: "cherry" },
  { id: 4, img: "problem4.jpg", question: "네 번째 문제입니다.", answer: "date" },
  { id: 5, img: "problem5.jpg", question: "다섯 번째 문제입니다.", answer: "elderberry" },
  { id: 6, img: "problem6.jpg", question: "여섯 번째 문제입니다.", answer: "fig" },
  { id: 7, img: "problem7.jpg", question: "일곱 번째 문제입니다.", answer: "grape" },
  { id: 8, img: "problem8.jpg", question: "여덟 번째 문제입니다.", answer: "honeydew" },
  { id: 9, img: "problem9.jpg", question: "아홉 번째 문제입니다.", answer: "kiwi" }
];

const Problem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const problem = problems.find(p => p.id === parseInt(id));

  const handleCorrectAnswer = () => {
    if (problem.id < problems.length) {
      navigate(`/problem/${problem.id + 1}`);
    } else {
      navigate("/ranking");
    }
  };

  return (
    <PageLayout>
      <ProblemCard imgSrc={`/images/${problem.img}`} alt="문제 이미지" description={problem.question} />
      <AnswerForm correctAnswer={problem.answer} onCorrect={handleCorrectAnswer} />
    </PageLayout>
  );
};

export default Problem;
