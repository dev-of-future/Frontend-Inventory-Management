import api from "./api";

const getHomePageStats = () => {
  return api.get("/stats/home");
};

const getStorePageStats = (id: number) => {
  return api.get(`/stats/stores/${id}`);
};

const StatsService = {
  getHomePageStats,
  getStorePageStats,
};

export default StatsService;