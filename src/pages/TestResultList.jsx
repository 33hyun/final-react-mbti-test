import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { getTestResults } from "../api/testResult";

const TestResultList = ({ userId }) => {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  /** ✅ 서버에서 테스트 결과 가져오기 */
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await getTestResults();
        setResults(data);
      } catch (error) {
        console.error("테스트 결과 가져오기 실패:", error);
      }
    };
    fetchResults();
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">테스트 결과 목록</h2>
      {results.length > 0 ? (
        results.map((result) => (
          <div
            key={result.id}
            onClick={() => navigate(`/result/${result.id}`)} // ✅ 클릭 시 `ResultPage.jsx`로 이동
            className="cursor-pointer p-4 border rounded-lg mb-4 shadow hover:bg-gray-100 transition"
          >
            <h3 className="text-lg font-bold">{result.mbti}</h3>
            <p className="text-sm text-gray-600">
              {result.visibility ? "공개됨" : "비공개"}
            </p>
          </div>
        ))
      ) : (
        <p>저장된 테스트 결과가 없습니다.</p>
      )}
    </div>
  );
};

// ✅ PropTypes 설정
TestResultList.propTypes = {
  userId: PropTypes.string.isRequired, // 현재 로그인한 사용자 ID
};

export default TestResultList;