import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTestResults } from "../api/testResult";

const ResultPage = () => {
  const { id } = useParams(); // URL에서 결과 ID 가져오기
  const navigate = useNavigate();

  // React Query를 사용해 테스트 결과 가져오기
  const { data: results, isLoading, isError } = useQuery({
    queryKey: ["testResults"],
    queryFn: getTestResults, // 전체 테스트 결과 가져오기
  });

  // 특정 결과 찾기
  const result = results?.find((r) => r.id === id);

  // 결과를 찾을 수 없으면 목록 페이지로 이동
  useEffect(() => {
    if (!isLoading && results && !result) {
      navigate("/results");
    }
  }, [result, isLoading, results, navigate]);

  // 결과가 없을 경우에도 로딩 화면을 표시 (useEffect 실행 전)
  if (!result) return <p className="text-center mt-10">로딩 중...</p>;

  // 데이터가 로딩 중이면 로딩 표시
  if (isLoading) return <p className="text-center mt-10">로딩 중...</p>;

  // 에러 발생 시 처리
  if (isError) {
    console.error("결과 불러오기 실패");
    return <p className="text-center mt-10">결과를 불러오는 중 오류가 발생했습니다.</p>;
  }

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