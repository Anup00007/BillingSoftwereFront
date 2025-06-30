import { useContext,useState } from 'react';
import './CartSummery.css';
import { AppContext } from '../../contect/AppContext';
import ReceiptPopup from '../reciptpopup/ReceiptPopup';
import toast from 'react-hot-toast';
import { createRazorpayOrder, varifyPayment } from '../../service/PaymentService';
import { AppConstants } from '../../utill/Constants';
import { Await } from 'react-router-dom';
const CartSummery=({customerName,mobileNumber,setMobileNumber,setCustomerName})=>{

const {cartItems}=useContext(AppContext);
const[isProcessing, setIsProcessing]=useState(false);
const [orderDetails,setOrderDetails]=useState(null);




const totalAmount=cartItems.reduce((total,item)=>total +item.price*item.quantity,0);
const tax=totalAmount*0.01;
const grandTotal=totalAmount+tax;

const loadRazorpayScript=()=>{
    return new Promise((resolve,reject)=>{
const script=document.createElement('script');
script.src="https://checkout.razorpay.com/v1/checkout.js"
script.onload=()=>resolve(true);
script.onerror=()=>resolve(false);
document.body.appendChild(script);
    })
}
const deleteOrderOnFailure=async(orderId)=>{
try{
  await  deleteOrder(orderId);
}
catch(error){
console.log(error);
toast.error("something went wrong");
}

const completePayment=async(paymentMode)=>{
if(!customerName || !mobileNumber||paymentMode){
toast.error("plese enter customer details");
return ;

}
if(cartItems.length===0){
    toast.error("your cart is empty");
    return;
}
 const orderData={
        customerName,
        phoneNumber:mobileNumber,
        cartItems,
        subtotal:totalAmount,
        tax,
        grandTotal,
        paymentMode:paymentMode.toUpperCase()
    }
setIsProcessing(true);
try{
 const response=await createOrder(orderData);
 const savedData=response.data;
 if (response.status===201 && paymentMode==="cash") {
    toast.success("cash received");
    setOrderDetails(savedData);
 }
 else if(response.status===201 && paymentMode==="upi"){
  const  razorpayLoaded =await loadRazorpayScript();
  if(!razorpayLoaded){
    toast.error("unable to load razorpay");
  await  deleteOrderOnFailure(savedData.orderId);
    return ;
  }
//create razorpay order
const razorpayResponse=await createRazorpayOrder({amount:grandTotal,currency:'INR'});
const options={
    key:AppConstants.RAZORPAY_KEY_ID,
    amount:razorpayResponse.data.amount,
    currency:razorpayResponse.data.currency,
    order_id:razorpayResponse.data.id,
    name:"My Retail shop",
    description: "order payment",
    handler:async function(response){
await varifyPaymentHandler(response,savedData);
    },
    prefill:{
        name:customerName,
        contact:mobileNumber,

    },
    theme:{
        color:"#3399cc"

    },
    modal:{
        ondismiss: async ()=>{
          await deleteOrderOnFailure(savedData.orderId);
          toast.error("Payment cancelled");
        }
    },
};
const rzp =new window.Razorpay(options);
rzp.on("payment.failed",async(response)=>{
   await deleteOrderOnFailure(savedData.orderId);
   toast.error("Payment failed");
   console.error(response.error.description);
});
rzp.open();
 }
}
catch(error){
console.error(error);
toast.error("Payment processing failed");
}
finally{
    setIsProcessing(false);
}

}

const varifyPaymentHandler=async(response,savedOrder)=>{
const paymentData={
    razorpayOrderId:response.razorpay_order_id,
    razorpayPaymentId:response.razorpay_payment_id,
    razorpaySignature:response.razorpay_signature,
    orderId:savedOrder.orderId
};
try{
  const paymentResponse=await  varifyPayment(paymentData);
  if (paymentResponse.status===200) {
    toast.success("Payment successful");
    setOrderDetails({
...savedOrder,
paymentDetails:{
    razorpayOrderId:response.razorpay_order_id,
    razorpayPaymentId:response.razorpay_payment_id,
    razorpaySignature:response.razorpay_signature
},
    });
  }else{
    toast.error("Payment processing failed");
  }
  

  }
  catch{
    console.error(error);
    toast.error("Payment failed");
  }
}
}


    return(
<div className='mt-2'>
<div className="cart-summery-details">
    <div className="d-flex justify-content-between mb-2">
        <span className="text-light">Item:</span>
        <span className="text-light">₹{totalAmount.toFixed(2)}</span>

    </div>
    <div className='d-flex justify-content-between mb-2'>
        <span className='text-light'>Tax (1%)</span>
        <span className='text-light'>{tax.toFixed(2)}</span>
    </div>
 <div className='d-flex justify-content-between mb-4'>
        <span className='text-light'>Total :</span>
        <span className='text-light'>{grandTotal.toFixed(2)}</span>
    </div>
</div>
<div className="d-flex gap-3">
<button className='btn btn-success flex-grow-1' >
Cash
</button>
<button className='btn btn-primary flex-grow-1' >
UPI
</button>
</div>
<div className='d-flex gap-3 mt-3'>
<button className='btn btn-warning flex-grow-1' >
Place Order
</button>

</div>

</div>
    )
}
export default CartSummery;