import { useState } from "react";
import PropTypes from "prop-types";
import { updateTestResultVisibility, deleteTestResult } from "../api/testResult";

const TestResultItem = ({ result, isOwner }) => {
  const [visibility, setVisibility] = useState(result.visibility);

  /**
   * ✅ 테스트 결과 공개 여부 변경
   */
  const handleToggleVisibility = async () => {
    try {
      const updatedResult = await updateTestResultVisibility(result.id, !visibility);
      setVisibility(updatedResult.visibility);
    } catch (error) {
      console.error("공개 여부 변경 실패:", error);
    }
  };

  /**
   * ✅ 테스트 결과 삭제
   */
  const handleDelete = async () => {
    try {
      await deleteTestResult(result.id);
      alert("테스트 결과가 삭제되었습니다.");
      // TODO: 부모 컴포넌트에서 리스트 갱신 필요
    } catch (error) {
      console.error("테스트 결과 삭제 실패:", error);
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-sm mb-4">
      <h3 className="text-xl font-semibold">{result.mbti}</h3>
      <p className="text-gray-600 mt-2">{result.description}</p>

      {isOwner && (
        <div className="mt-4 flex gap-2">
          {/* 공개 여부 변경 버튼 */}
          <button
            onClick={handleToggleVisibility}
            className={`px-4 py-2 rounded-md text-white ${
              visibility ? "bg-green-500" : "bg-gray-500"
            }`}
          >
            {visibility ? "공개" : "비공개"}
          </button>

          {/* 삭제 버튼 */}
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
};

// PropTypes 설정
TestResultItem.propTypes = {
  result: PropTypes.shape({
    id: PropTypes.string.isRequired,
    mbti: PropTypes.string.isRequired,
    description: PropTypes.string,
    visibility: PropTypes.bool.isRequired,
  }).isRequired,
  isOwner: PropTypes.bool.isRequired,
};

export default TestResultItem;