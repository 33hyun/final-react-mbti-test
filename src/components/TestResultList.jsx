import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getTestResults } from "../api/testResult";
import TestResultItem from "./TestResultItem";

const TestResultList = ({ userId, latestResult }) => {
  const [results, setResults] = useState([]);

  /**
   * ✅ 서버에서 테스트 결과를 가져오는 함수
   */
  const fetchResults = async () => {
    try {
      const data = await getTestResults();
      setResults(data);
    } catch (error) {
      console.error("테스트 결과 가져오기 실패:", error);
    }
  };

  /**
   * ✅ 컴포넌트가 처음 렌더링될 때 서버에서 결과를 가져옴
   */
  useEffect(() => {
    fetchResults();
  }, []);

  /**
   * ✅ 새로운 결과가 추가되면 리스트를 업데이트
   */
  useEffect(() => {
    if (latestResult) {
      setResults((prevResults) => [latestResult, ...prevResults]);
    }
  }, [latestResult]);

  return (
    <div className="w-full max-w-lg mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">테스트 결과 목록</h2>
      {results.length > 0 ? (
        results.map((result) => (
          <TestResultItem
            key={result.id}
            result={result}
            isOwner={result.userId === userId}
          />
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
  latestResult: PropTypes.object, // 새로 추가된 테스트 결과
};

export default TestResultList;
