import api from "./api";

export const fetchDashboardData = async () => {
  try {
    const res = await api.get("/admin/dashboard");
    return res;
  } catch (err) {
    console.error("Error fetching dashboard data:", err);
    throw err; // Re-throw so caller can still handle it
  }
};
