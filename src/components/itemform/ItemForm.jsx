import {useContext,useState} from "react";
import {assets} from "../../assets/assets";

import { AppContext } from "../../contect/AppContext";
import toast from "react-hot-toast";
import { addItems } from "../../service/ItemService";



const ItemForm=()=>{
  const { categories,items,setItems,setCategories} = useContext(AppContext);
     const [image, setImage] = useState(false);
    
     const[loading, setLoading] = useState(false);
     const [data, setData] = useState({
name: '',
categoryId: '',
price: '',
description: '',
     });
const onChangeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setData((Data) => ({
        ...Data, [name]: value
    }));
  
}
const onSubmitHandler = async(e) => {
    e.preventDefault( ); 
    setLoading(true);
const formData = new FormData();
    formData.append('item', JSON.stringify(data));  
    formData.append('file', image);
    try{
        if(!image) {
            toast.error("Please select an image");
            return;
        }
        setLoading(true);
        const response = await addItems(formData);
       if(response.status === 201) {   
    setItems([...(Array.isArray(items) ? items : []), response.data]);
    setCategories((prevCategories) => 
    prevCategories.map((category)= category.categoryId === data.categoryId ? {...category,items: category.items + 1} : category));
    toast.success("Item added successfully");
    setData({
        name: '',
        categoryId: '',   
        price: '',
        description: '',

    });
}
        else{
            toast.error("Failed to add item, please try again later");
        }
    }

catch(error) {
        console.error("Error adding item:", error);   
        toast.error("unable to add item");  
}
finally {
        setLoading(false);
    }
}

    return(
        <div className="item-form-container" style={{height:'100vh',overflowY:'auto',overflowX:'hidden'}}> 
          <div className="mx-2 mt-2">
            <div className="row">
                <div className="card col-md-12 form-container">
                    <div className="card-body">
                        <form  onSubmit={onSubmitHandler}>
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">
                                    <img src={image ? URL.createObjectURL(image): assets.uploadlogo} alt="" width={48} />
                                </label>
                                <input type="file" name="image" id="image"className= "form-control" hidden onChange={(e)=>setImage(e.target.files[0])} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text"
                                 name="name"
                                 id="name"
                                  className="form-control"
                                  value={data.name}
                                  placeholder="item name"
                                   onChange={onChangeHandler}
                                  required
                                  />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="category">Category
                                </label>
                                <select name="categoryId" id="categoryId" className="form-control" value={data.categoryId} onChange={onChangeHandler} required>
                                    <option value="">--SELECT Category</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category.categoryId}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">
                                    Price
                                </label>
                                <input type="number"
                                name="price"
                                id="price"
                                className="form-control"
                              placeholder="&#8377;200.00"
                              value={data.price}
                              onChange={onChangeHandler}
                              required
                              />
                            </div>
                              <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea 
                                rows="5"
                                 name="description"
                                 id="description"
                                  className="form-control"
                                  value={data.description}
                                  placeholder="category description" onChange={onChangeHandler} />
                            </div>
                            
                            <button type="submit"
                            className="btn btn-primary w-100"
                            disabled={loading}>{loading?"loading...":"Save"} </button>
                        </form>
                    </div>
                </div>
            </div>
            </div>
            </div>
            
    )
}

export default ItemForm;