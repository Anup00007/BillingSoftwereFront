import React, { useState, useEffect, useContext } from "react";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";
import { addCategory } from "../../service/categoryService";

import { AppContext } from "../../contect/AppContext";

const CategoryForm = () => {
    const { categories, setCategories } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: '',
        description: '',
        bgColor: '#ffffff',
    });
    useEffect(() => {
        console.log(data);
    }, [data]);
    const onChangeHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setData((Data) => ({
            ...Data, [name]: value
        }));
    }
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
       if (!image) {
            toast.error("Please select an image");
        
         return;
        }
         setLoading(true);
        const formData = new FormData();
        formData.append('category', JSON.stringify(data));
        formData.append('file', image);

        try {
            const response = await addCategory(formData);
            if (response.status === 201 ) {
                setCategories([...categories, response.data]);
                toast.success("Category added successfully");
                setData({
                    name: '',
                    description: '',
                    bgColor: ' #ffffff',
                });
                setImage(true);
            }
        }
        catch (error) {
            console.error("Error adding category:", error);
            toast.error("Failed to add category");
        }
        finally {
            setLoading(false);
        }
    }


    return (
        <div className="mx-2 mt-2">
            <div className="row">
                <div className="card col-md-12 form-container">
                    <div className="card-body">
                        <form onSubmit={onSubmitHandler}>
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">
                                    <img src={image ? URL.createObjectURL(image) : assets.uploadlogo} alt="" width={48} />
                                </label>
                                <input type="file"
                                    name="image"
                                    id="image"
                                    className='form-control'
                                    
                                    hidden onChange={e => setImage(e.target.files[0])} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text"
                                    name="name"
                                    id="name"
                                    className="form-control"
                                    placeholder="category name"
                                    onChange={onChangeHandler}
                                    value={data.name}
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
                                    placeholder="category description"
                                    onChange={onChangeHandler}
                                    value={data.description}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="bgColor" className="form-label">Background Color</label>
                                <br></br>
                                <input
                                    type="color"
                                    name="bgColor"
                                    id="bgColor"
                                    className="width-10%"
                                    placeholder="#ffffff"
                                    onChange={onChangeHandler}
                                    value={data.bgColor}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                                disabled={loading}
                            >
                                {loading ? "saving..." : "Save"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CategoryForm;