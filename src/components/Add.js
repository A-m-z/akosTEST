import axios from 'axios';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
export default function Add({products}) {
    let navigate = useNavigate();
    const [product,setProduct] = useState({});
    const editAt = (property,value) => {
        console.log(property,value);
        let curProduct = product;
        curProduct[property] = value;
        setProduct({...curProduct});
    }
    const addProdcut = () => {
        if (Object.keys(product).length !== 5) {
            alert("please complete all fields");
            return;
        }
        product["id"] = '_' + Math.random().toString(32).substr(2);
        let newProducts = [...products,product]
        axios.put(`https://a.nacapi.com/amz4akos/products/`,newProducts).then((res) => {
            console.log("HOPEFULLY IT WORKED");
            console.log(res);
        //   window.location.reload(false);
            navigate('../');
        }).catch((err) => {
          console.log("it didnt work",err);
          alert("NETWORK ERROR");
        })
    }
    return (
        <>
        <h1>Add a new product:</h1>
        <div className="card">
            <div className="card-body container">
                <label>Name: </label>
                <h5 className="card-title"><input value={product.name} type="text" onChange={(e)=> editAt("name",e.target.value)}/></h5>
                <label> Description:</label>
                <p className="card-text"><input value={product.Description} type="text" onChange={(e) => editAt("Description",e.target.value)}/></p>
                <div className="row">
                    <div className="col">Price: $<input value={product.Price} type="number" onChange={(e) => editAt("Price",e.target.value)}/></div>
                    <div className="col">Discount: <input value={product.Discount} type="number" onChange={(e) => editAt("Discount",e.target.value)}/></div>
                </div>
                <p>Pricing: <input value={product.Pricing} type="text" onChange={(e) => editAt("Pricing",e.target.value)}/></p>
                <button className={`btn btn-success`} onClick={() => addProdcut()}>Add Product</button>
            </div>
        </div>
        </>
    )
}