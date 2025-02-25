import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { getTestResults } from "../api/testResult";
import TestResultItem from "../components/TestResultItem";

const TestResultList = ({ userId }) => {
  // React Query를 사용하여 테스트 결과 가져오기
  const {
    data: results = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["testResults"], // 캐싱 키 설정 (데이터 변경 시 자동으로 갱신됨)
    queryFn: getTestResults,   // 테스트 결과를 가져오는 함수
    staleTime: 1000 * 60 * 5,  // 데이터가 5분 동안은 최신 상태로 유지됨
    cacheTime: 1000 * 60 * 10, // 10분 동안 캐싱하여 불필요한 요청 방지
  });

  // 데이터 로딩 중일 때
  if (isLoading) return <p className="text-center text-gray-500">로딩 중...</p>;

  // 오류 발생 시
  if (isError) return <p className="text-center text-red-500">테스트 결과를 불러오는 중 오류가 발생했습니다.</p>;

  return (
    <div className="w-full max-w-lg mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">테스트 결과 목록</h2>
      {results.length > 0 ? (
        results.map((result) => (
          <TestResultItem
            key={result.id}
            result={result}
            isOwner={result.userId === userId} // 현재 사용자가 작성한 결과인지 확인
          />
        ))
      ) : (
        <p className="text-center text-gray-500">저장된 테스트 결과가 없습니다.</p>
      )}
    </div>
  );
};

// PropTypes 설정 (컴포넌트에 전달할 props의 타입 지정)
TestResultList.propTypes = {
  userId: PropTypes.string.isRequired, // 현재 로그인한 사용자 ID
};

export default TestResultList;