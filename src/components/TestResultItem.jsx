import { deleteTestResult, updateTestResultVisibility } from "../api/testResult";
import PropTypes from 'prop-types';

const TestResultItem = ({ result }) => {
  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      await deleteTestResult(result.id);
      window.location.reload(); // 삭제 후 페이지 새로고침
    }
  };

  const handleToggleVisibility = async () => {
    await updateTestResultVisibility(result.id, !result.visibility);
    window.location.reload(); // 변경 후 새로고침
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md mb-4">
      <h3 className="text-lg font-bold">{result.mbti}</h3>
      <p className="text-gray-700">{result.description}</p>
      <div className="mt-4 flex justify-between">
        <button onClick={handleToggleVisibility} className="bg-blue-500 text-white px-4 py-2 rounded">
          {result.visibility ? "비공개로 전환" : "공개로 전환"}
        </button>
        <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
          삭제
        </button>
      </div>
    </div>
  );
};
TestResultItem.propTypes = {
  result: PropTypes.shape({
    id: PropTypes.number.isRequired,
    mbti: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    visibility: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TestResultItem;
