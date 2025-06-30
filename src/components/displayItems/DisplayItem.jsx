import './DisplayItem.css';
import { useContext } from 'react';
import Item from '../item/Item';
import { AppContext } from '../../contect/AppContext';
import SearchBox from '../SearchBoy/SearchBox';
import { useState } from 'react';

const DisplayItem = ({selectedCategory}) => {
  

const [searchText,setSearchText]=useState('');
    const {items}=useContext(AppContext);
const filteredItems=items.filter(item=>{
 if(!selectedCategory){
    return true;
    
 }
 return item.categoryId===selectedCategory;


}).filter(item=>item.name.toLowerCase().includes(searchText.toLowerCase()));



    return(
        <div className='p-3'>
            <div className="d-flex justify-content-between align-item-center mb-4">
                <div></div>
                <div>
                <SearchBox onSearch={setSearchText}>

                </SearchBox>
            </div></div>
            <div className="row g-3">
                {
                filteredItems.map((item,index)=>(
<div key={index} className="col-md-4 col-sm-6">
<Item
itemName={item.name}
itemImage={item.imgUrl}
itemPrice={item.price}
itemId={item.itemId}

/>
</div>

                    ))
                }
            </div>
        </div>
    )
}
export default DisplayItem;