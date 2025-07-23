import api from "./api";

export const latestOrders = async () => {
  return await api.get("/admin/orders/latest");
};

export const createOrder = async (order) => {
  return await api.post("/admin/orders", order);
};

export const deleteOrder = async (id) => {
  return await api.delete(`/admin/orders/${id}`);
};
