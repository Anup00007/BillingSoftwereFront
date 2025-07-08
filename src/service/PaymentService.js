import axios from "axios";
export const createRazorpayOrder=async(data)=>{

  return await axios.post( 'http://localhost:8080/api/v1.0/payments/create-order',data,{headers:{'Authorization':`Bearer ${localStorage.getItem('token')}` }})
}
export const varifyPayment=async(paymentData)=>{

  return await axios.post( 'http://localhost:8080/api/v1.0/payments/varify',paymentData,{headers:{'Authorization':`Bearer ${localStorage.getItem('token')}` }})


}