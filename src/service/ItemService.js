import api from "./api";

export const addItems = async (items) => {
  return await api.post("/admin/items", items);
};

export const deleteItem = async (itemId) => {
  return await api.delete(`/admin/items/${itemId}`);
};

export const fetchItems = async () => {
  return await api.get("/items");
};
