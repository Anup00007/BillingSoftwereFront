import { useContext, useState } from 'react';
import './Explore.css';
import DisplayCategory from '../../components/displayCategory/DisplayCategory';
import CustomerForm from '../../components/displayCustomer/CustomerForm';
import DisplayItem from '../../components/displayItems/DisplayItem';
import CartItem from '../../components/displayCartItem/CartItem';       
import CartSummery from '../../components/displayCartSummery/CartSummery';
import { AppContext } from '../../contect/AppContext';
const Explore=()=>{
    const{categories}=useContext(AppContext);
   const [ selectedCategory, setSelectedCategory ] = useState('');
   const [customerName,setCustomerName] =useState('');
   const [mobileNumber,setMobileNumber]=useState('');

    return(
        <div className="explore-container text-light">
            <div className="left-column">
<div className="first-row"style={{overflowY:'auto'}}>
<DisplayCategory
selectedCategory={selectedCategory}
setSelectedCategory={setSelectedCategory}
categories={categories}></DisplayCategory>
</div>
<hr className="horizontal-line"/>
<div className="second-row"style={{overflowY:'auto'}}>
   <DisplayItem
   selectedCategory={selectedCategory}
   ></DisplayItem>
</div>
            </div>
            <div className="right-column d-flex flex-column">
<div className="customer-form-container"style={{height:'15%'}}>
<CustomerForm
customerName={customerName}
mobileNumber={mobileNumber}
setCustomerName={setCustomerName}
setMobileNumber={setMobileNumber}
></CustomerForm>
</div>
<hr className="my-3 text-light" />
<div className="cart-items-container" style={{height:'55%',overflowY:'auto'}}>
<CartItem ></CartItem>
</div>
<div className="cart-summery-container"style={{height:'30%'}}>
<CartSummery
customerName={customerName}
mobileNumber={mobileNumber}
setCustomerName={setCustomerName}
setMobileNumber={setMobileNumber}

></CartSummery>
</div>
            </div>
        </div>
    )
}
export default Explore;