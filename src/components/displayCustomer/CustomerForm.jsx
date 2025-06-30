import './CustomerForm.css';
const CustomerForm = ({customerName,mobileNumber,SetMobliNumber,setCustomerName}) => {
    return(
        <div className='p-3'>
<div className="mb-3">
<div className="d-flex align-items-center gap-2">
    <label htmlFor="customerName" className="col-4">Customer Name</label>
    <input type="text"  className="form-control from-control-sm"
    id="customerName" onChange={(e)=>setCustomerName(e.target.value)} value={customerName}/>
</div>

</div>
<div className="mb-3">
<div className="d-flex align-items-center gap-2">
    <label htmlFor="mobileNumber" className="col-4">Mobile number</label>
    <input type="text"  className="form-control from-control-sm"id="mobileNumber" onChange={(e)=>SetMobliNumber(e.target.value)} value={mobileNumber}/>
</div>

</div>


        </div>
    )
}
export default CustomerForm;