import { useEffect, useState } from "react";
import { getTestResults } from "../api/testResult";
import TestResultItem from "../components/TestResultItem";

const ResultPage = () => {
  const [results, setResults] = useState([]);

  /** 저장된 테스트 결과 가져오기 */
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
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-3xl font-bold mb-6">테스트 결과 목록</h2>
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        {results.length > 0 ? (
          results.map((result) => <TestResultItem key={result.id} result={result} />)
        ) : (
          <p className="text-gray-500 text-center">저장된 테스트 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default ResultPage;