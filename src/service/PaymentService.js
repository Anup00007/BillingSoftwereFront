import api from "./api";

export const createRazorpayOrder = async (data) => {
  return await api.post("/payments/create-order", data);
};

export const varifyPayment = async (paymentData) => {
  return await api.post("/payments/varify", paymentData);
};