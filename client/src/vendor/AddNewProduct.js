import React from 'react';
import AddProductForm from "./AddProductForm";

function AddNewProduct(props) {
    return (
        <div className="add-new-product">
            <div className="content">
                <AddProductForm />
            </div>
        </div> 
    );
}

export default AddNewProduct;