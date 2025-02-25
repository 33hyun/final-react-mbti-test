import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { calculateMBTI, mbtiDescriptions } from "../utils/calculateMBTI";
import { createTestResult } from "../api/testResult";
import TestForm from "../components/TestForm";

const TestPage = ({ user }) => {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  // React Query의 `useMutation`을 사용하여 테스트 결과 저장
  const mutation = useMutation({
    mutationFn: createTestResult, // API 요청 함수
    onSuccess: (response) => {
      navigate(`/result/${response.id}`); // 결과 페이지로 이동
    },
    onError: (error) => {
      console.error("테스트 결과 저장 실패:", error);
      alert("테스트 결과 저장에 실패했습니다.");
    },
  });

  /**
   * 테스트 결과 제출 함수
   * @param {Object} answers - 사용자가 선택한 테스트 응답
   */
  const handleTestSubmit = (answers) => {
    const mbtiResult = calculateMBTI(answers);
    setResult(mbtiResult);

    mutation.mutate({
      userId: user?.id,
      mbti: mbtiResult,
      description: mbtiDescriptions[mbtiResult] || "MBTI 설명 없음",
      visibility: true,
    });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-white">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full shadow-md">
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
TestPage.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};

export default TestPage;