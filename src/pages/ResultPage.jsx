import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTestResults } from "../api/testResult";

const ResultPage = () => {
  const { id } = useParams(); // URL에서 결과 ID 가져오기
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  /** ✅ 특정 테스트 결과 불러오기 */
  useEffect(() => {
    const fetchResult = async () => {
      try {
        const results = await getTestResults(); // 전체 결과 가져오기
        const foundResult = results.find((r) => r.id === id); // 해당 ID의 결과 찾기
        if (foundResult) {
          setResult(foundResult);
        } else {
          alert("결과를 찾을 수 없습니다.");
          navigate("/results"); // 결과 없으면 리스트 페이지로 이동
        }
      } catch (error) {
        console.error("결과 불러오기 실패:", error);
      }
    };

    fetchResult();
  }, [id, navigate]);

  if (!result) return <p className="text-center mt-10">로딩 중...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">당신의 MBTI 유형</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-lg">
        <h2 className="text-4xl font-bold text-blue-500">{result.mbti}</h2>
        <p className="text-gray-700 mt-4">{result.description}</p>
      </div>
      <button
        onClick={() => navigate("/results")}
        className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
      >
        결과 목록 보기
      </button>
    </div>
  );
};

export default ResultPage;