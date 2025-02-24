import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { questions } from "../data/questions"; // 질문 데이터
import { calculateMBTI } from "../utils/calculateMBTI"; // MBTI 결과 계산 함수

const Test = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0); // 현재 질문 인덱스
  const [answers, setAnswers] = useState([]); // 사용자의 선택 저장 배열
  const navigate = useNavigate();

  /**
   * ✅ 사용자가 답변을 선택하면 실행되는 함수
   * @param {number} answerIndex - 선택한 옵션 인덱스 (0 또는 1)
   */
  const handleAnswer = (answerIndex) => {
    const updatedAnswers = [...answers, answerIndex]; // 기존 답변 배열에 추가

    // 모든 질문에 답변한 경우 결과 페이지로 이동
    if (currentQuestion === questions.length - 1) {
      const result = calculateMBTI(updatedAnswers, questions);
      navigate("/result", { state: result }); // MBTI 결과를 상태로 전달
    } else {
      setAnswers(updatedAnswers); // 선택한 답변 저장
      setCurrentQuestion((prev) => prev + 1); // 다음 질문으로 이동
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 p-4">
      <h2 className="text-2xl font-bold mb-6">MBTI 테스트</h2>

      {/* 질문 영역 */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
        <p className="text-lg mb-4">{questions[currentQuestion].question}</p>
        
        {/* 답변 버튼 */}
        <div className="flex flex-col gap-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition"
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* 진행 상황 표시 */}
      <p className="mt-4 text-gray-500">
        {currentQuestion + 1} / {questions.length}
      </p>
    </div>
  );
};

export default Test;