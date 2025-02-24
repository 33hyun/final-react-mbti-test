import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { getTestResults } from "../api/testResult";
import TestResultItem from "./TestResultItem";

const TestResultList = ({ userId }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await getTestResults();
        setResults(data);
      } catch (error) {
        console.error("❌ 테스트 결과 가져오기 실패:", error);
      }
    };
    fetchResults();
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">테스트 결과 목록</h2>
      {results.length > 0 ? (
        results.map((result) => (
          <TestResultItem key={result.id} result={result} isOwner={result.userId === userId} />
        ))
      ) : (
        <p>저장된 테스트 결과가 없습니다.</p>
      )}
    </div>
  );
};
TestResultList.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default TestResultList;