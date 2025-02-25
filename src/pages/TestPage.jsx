import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { calculateMBTI, mbtiDescriptions } from "../utils/calculateMBTI";
import { createTestResult } from "../api/testResult";
import TestForm from "../components/TestForm";

const TestPage = ({ user }) => {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  const handleTestSubmit = async (answers) => {
    const mbtiResult = calculateMBTI(answers);
    setResult(mbtiResult);

    try {
      const response = await createTestResult({
        userId: user?.id,
        mbti: mbtiResult,
        description: mbtiDescriptions[mbtiResult] || "MBTI 설명 없음",
        visibility: true,
      });

      console.log("테스트 결과 저장 완료!", response);
      navigate(`/result/${response.id}`); // ✅ 결과 페이지로 이동
    } catch (error) {
      console.error("테스트 결과 저장 실패:", error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-white">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full">
        {!result ? (
          <>
            <h1 className="text-3xl font-bold mb-6">MBTI 테스트</h1>
            <TestForm onSubmit={handleTestSubmit} />
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-6">테스트 결과: {result}</h1>
            <p className="text-lg text-gray-700 mb-6">{mbtiDescriptions[result] || "설명 없음"}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default TestPage;