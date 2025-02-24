import PropTypes from "prop-types";
import { deleteTestResult, updateTestResultVisibility } from "../api/testResult";

const TestResultItem = ({ result, isOwner }) => {
  // result가 없을 경우, 안전하게 반환
  if (!result || !result.mbti) {
    return <p className="text-red-500">결과 데이터를 불러올 수 없습니다.</p>;
  }

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteTestResult(result.id);
        window.location.reload(); // 새로고침하여 리스트 업데이트
      } catch (error) {
        console.error("❌ 삭제 실패:", error);
      }
    }
  };

  const handleToggleVisibility = async () => {
    try {
      await updateTestResultVisibility(result.id, result.visibility);
      window.location.reload();
    } catch (error) {
      console.error("❌ 공개 여부 변경 실패:", error);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg mb-3">
      <h3 className="text-lg font-semibold">{result.mbti}</h3>
      <p className="text-sm text-gray-700">{result.description || "설명 없음"}</p>

      {isOwner && (
        <div className="mt-3 flex gap-2">
          <button
            onClick={handleToggleVisibility}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            {result.visibility ? "비공개" : "공개"}
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
};

// PropTypes 추가하여 result 객체 검증
TestResultItem.propTypes = {
  result: PropTypes.shape({
    id: PropTypes.number.isRequired,
    mbti: PropTypes.string.isRequired,
    description: PropTypes.string,
    visibility: PropTypes.bool.isRequired,
  }),
  isOwner: PropTypes.bool,
};

export default TestResultItem;