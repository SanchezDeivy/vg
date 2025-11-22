import API from "./api";

// ✅ GET /api/aiome
export const getAll = () => API.get("");

// ✅ POST /api/aiome?question=...&aitype=...
export const createAiome = ({ question, aitype }) =>
  API.post("", null, { params: { question, aitype } });

// ✅ PUT /api/aiome/{id}?question=...&response=...
export const updateAiome = (id, { question, response }) =>
  API.put(`/${id}`, null, { params: { question, response } });

// ✅ Otros endpoints
export const getByAitype = (aitype) => API.get(`/aitype/${aitype}`);
export const getByStatus = (status) => API.get(`/status/${status}`);
export const getById = (id) => API.get(`/${id}`);
export const softDelete = (id) => API.delete(`/soft/${id}`);
export const restore = (id) => API.patch(`/restore/${id}`);
export const permanentDelete = (id) => API.delete(`/${id}`);

// ✅ POST /api/aiome/test-ai?question=...&aitype=...
export const testAi = ({ question, aitype }) =>
  API.post("/test-ai", null, { params: { question, aitype } });

export default {
  getAll,
  createAiome,
  updateAiome,
  getByAitype,
  getByStatus,
  getById,
  softDelete,
  restore,
  permanentDelete,
  testAi,
};
