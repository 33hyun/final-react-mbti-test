import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import TestForm from "../components/TestForm";
import { calculateMBTI, mbtiDescriptions } from "../utils/calculateMBTI";
import { createTestResult } from "../api/testResult";

const TestPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  /** 테스트 결과 제출 */
  const handleTestSubmit = async (answers) => {
    if (!user || !user.id) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    const mbtiResult = calculateMBTI(answers);
    setResult(mbtiResult);

    try {
      await createTestResult({
        userId: user.id,
        mbti: mbtiResult,
        description: mbtiDescriptions[mbtiResult] || "MBTI 설명 없음",
        visibility: true,
      });
    } catch (error) {
      alert("테스트 결과 저장 실패");
      console.error("에러:", error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        {!result ? (
          <>
            <h1 className="text-2xl font-bold text-center mb-6">MBTI 테스트</h1>
            <TestForm onSubmit={handleTestSubmit} />
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-center mb-6">테스트 결과: {result}</h1>
            <p className="text-gray-700 text-center">{mbtiDescriptions[result]}</p>
            <button
              onClick={() => navigate("/results")}
              className="mt-6 bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600"
            >
              결과 페이지로 이동
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TestPage;