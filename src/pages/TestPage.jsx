import { useState } from "react";
import PropTypes, { number } from "prop-types"; 
import { useNavigate } from "react-router-dom";
import TestForm from "../components/TestForm";
import { calculateMBTI, mbtiDescriptions } from "../utils/calculateMBTI";
import { createTestResult } from "../api/testResult";

const TestPage = ({ user }) => {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  /**
   * ✅ 테스트 결과 제출 핸들러
   * @param {Array} answers - 사용자의 선택한 답변 목록
   */
  const handleTestSubmit = async (answers) => {
    const mbtiResult = calculateMBTI(answers); // MBTI 결과 계산
    setResult(mbtiResult); // 결과 저장

    // ❌ user 정보가 없는 경우 API 요청을 하지 않음
    if (!user || !user.id) {
      console.error("❌ 로그인된 사용자 정보가 없습니다.");
      return;
    }

    try {
      // ✅ API 호출하여 결과 저장
      await createTestResult({
        userId: user.id, // 현재 로그인한 사용자 ID
        mbti: mbtiResult,
        description: mbtiDescriptions[mbtiResult] || "MBTI 설명 없음",
        visibility: true, // 기본값: 공개
      });

      console.log("✅ 테스트 결과 저장 완료!");
    } catch (error) {
      console.error("❌ 테스트 결과 저장 실패:", error);
    }
  };

  /**
   * ✅ 결과 페이지 이동 함수
   */
  const handleNavigateToResults = () => {
    navigate("/results"); // 결과 페이지로 이동
  };  

  return (
    <div className="w-full flex flex-col items-center justify-center bg-white">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full h-full overflow-y-auto">
        {!result ? (
          <>
            <h1 className="text-3xl font-bold text-primary-color mb-6">
              MBTI 테스트
            </h1>
            <TestForm onSubmit={handleTestSubmit} />
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-primary-color mb-6">
              테스트 결과: {result}
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              {mbtiDescriptions[result] || "해당 성격 유형에 대한 설명이 없습니다."}
            </p>
            <button
              onClick={handleNavigateToResults}
              className="w-full bg-primary-color text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition duration-300 hover:text-[#FF5A5F]"
            >
              결과 페이지로 이동하기
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// ✅ PropTypes 추가
TestPage.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string|number.isRequired,
  }),
};

export default TestPage;