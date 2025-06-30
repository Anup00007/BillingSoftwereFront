
import React, { useContext, useState } from 'react';
import { AppContext } from '../../contect/AppContext';
import { deleteItem } from '../../service/ItemService';
import toast from 'react-hot-toast';



const ItemList=()=>
{
    const { items = [], setItems } = useContext(AppContext);
    const [searchTerm, setSearchTerm] = useState('');
   
  
    const filteredItems = (items || []).filter((item) => {
        return item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
               item.categoryName?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    });
    const removeItem = async (itemId) => {
        try {   

            const response = await deleteItem(itemId);
            if (response.status ===204) {
                const updatedItems = items.filter(item => item.itemId !== itemId);
                setItems(updatedItems);
                toast.success("Item deleted successfully");
            }
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    }



    
    return(
  <div className="category-list-container" style={{ height: '100vh', overflowX: 'auto', overflowY: 'hidden' }}>
           
            <div className="row pe-2 ">
                <div className="input-group mb-3">
                    <input type="text"
                        id="keyword"
                        name="keyword"
                        className="form-control"
                        placeholder="Search categories..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                   value={searchTerm}
                        />
                        <span className="input-group-text bg-warning">
<i className="bi bi-search"></i>
                        </span>
                </div>
            </div>
            <div className="row g-3 pe-2">
                {
                    filteredItems.map((item, index) => (
                        <div key={index} className="col-12">
                            <div className="card p-3  bg-dark">
                                <div className="d-flex align-items-center">
                                    <div style={{ marginRight: '15px' }}>
                                        <img src={item.imgUrl || "https://via.placeholder.com/50"} alt={item.name} className="category-image" />
                                    </div>
                                    <div className="flex-grow-1">
                                        <h5 className="mb-1 text-white">{item.name}</h5>
                                        <h5 className='"mb-1 text-white'>{item.categoryName}</h5>
                                    
                                        <h6 className="mb-1 text-white"> &#8377;{item.price} </h6>

                                    </div>
                                    <div>
                                        <button className='btn btn-danger btn-sm' onClick={()=>removeItem(item.itemId)}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            
                            </div>
                        </div>
                    
                
            
       

    )
}

export default ItemList;
