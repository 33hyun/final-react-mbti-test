import axios from "axios";

const API_URL = "http://localhost:5001/testResults"; // ✅ JSON Server API

// ✅ 테스트 결과 생성 API
export const createTestResult = async (testData) => {
  return await axios.post(API_URL, testData);
};

// ✅ 테스트 결과 가져오기 API
export const getTestResults = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// ✅ 테스트 결과 삭제 API
export const deleteTestResult = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};

// ✅ 테스트 결과 공개 여부 변경 API
export const updateTestResultVisibility = async (id, visibility) => {
  return await axios.patch(`${API_URL}/${id}`, { visibility });
};