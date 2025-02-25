import axios from "axios";

const API_URL = "http://localhost:5001/testResults";

/**
 * 모든 테스트 결과 가져오기
 * @returns {Promise<Array>} - 저장된 테스트 결과 목록
 */
export const getTestResults = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("테스트 결과 가져오기 실패:", error);
    return [];
  }
};

/**
 * 새로운 테스트 결과 생성
 * @param {Object} resultData - 저장할 테스트 결과 데이터
 * @returns {Promise<Object>} - 생성된 테스트 결과 데이터
 */
export const createTestResult = async (resultData) => {
  try {
    const response = await axios.post(API_URL, resultData);
    return response.data;
  } catch (error) {
    console.error("테스트 결과 저장 실패:", error);
    return null;
  }
};

/**
 * 특정 테스트 결과 삭제
 * @param {string} id - 삭제할 테스트 결과 ID
 * @returns {Promise<void>}
 */
export const deleteTestResult = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    console.log(`테스트 결과 삭제 완료 (ID: ${id})`);
  } catch (error) {
    console.error(`테스트 결과 삭제 실패 (ID: ${id}):`, error);
  }
};

/**
 * 테스트 결과 공개 여부 변경
 * @param {string} id - 변경할 테스트 결과 ID
 * @param {boolean} visibility - 공개 여부 (true: 공개, false: 비공개)
 * @returns {Promise<Object>} - 업데이트된 테스트 결과 데이터
 */
export const updateTestResultVisibility = async (id, visibility) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, { visibility });
    return response.data;
  } catch (error) {
    console.error(`공개 여부 변경 실패 (ID: ${id}):`, error);
    return null;
  }
};