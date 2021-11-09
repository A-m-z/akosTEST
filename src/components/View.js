import axios from 'axios';
import {useState,useEffect} from 'react';
export default function View({products,sortBy}) {
    const [editProduct,setEditProduct] = useState({});
    const [randomTest,setRandomTest] = useState(false);
    const editAt = (property,value) => {
        console.log(property,value);
        let curProduct = editProduct;
        curProduct[property] = value;
        setEditProduct({...curProduct});
    }
    const submitChanges = () => {
        let newProducts = products.map(product => {
            if (product.id == editProduct.id) {
                return editProduct;
            }
            return product;
        });
        axios.put(`https://a.nacapi.com/amz4akos/products/`,newProducts).then((res) => {
          console.log("HOPEFULLY IT WORKED");
          console.log(res);
          window.location.reload(false);

        }).catch((err) => {
          console.log("it didnt work");
          alert("NETWORK ERROR");
          window.location.reload(false);
        })
    }
    const callSort = async (key) => {
       await sortBy(key);
       setRandomTest(!randomTest);
    }
    useEffect(()=> {
        console.log("used so it refreshes on props update!");
        console.log(products);
    },[products]);
    return (
        <>
        <h1>View</h1>
        <h4>sort by: </h4>
        {products.length && Object.keys(products[0]).map((key) => <button className="btn btn-sm btn-link" onClick={() => callSort(key)}>{key}</button>)}
        {products.map((product,ind)=>{
            if (product.id == editProduct.id) {
                return (
                    <div className="card">
                        <div className="card-body container">
                            <label>Name: </label>
                            <h5 className="card-title"><input value={editProduct.name} type="text" onChange={(e)=> editAt("name",e.target.value)}/></h5>
                            <h6 className="card-subtitle mb-2 text-muted">{product.id}</h6>
                            <p className="card-text"><input value={editProduct.Description} type="text" onChange={(e) => editAt("Description",e.target.value)}/></p>
                            <div className="row">
                                <div className="col">Price: $<input value={editProduct.Price} type="number" onChange={(e) => editAt("Price",e.target.value)}/></div>
                                <div className="col">Discount: <input value={editProduct.Discount} type="number" onChange={(e) => editAt("Discount",e.target.value)}/></div>
                            </div>
                            <p>Pricing: <input value={editProduct.Pricing} type="text" onChange={(e) => editAt("Pricing",e.target.value)}/></p>
                            <p>views: {product.userViews}</p>
                            <button className={`btn btn-success`} onClick={() => submitChanges()}>Confirm</button>
                        </div>
                    </div>
                )
            }
            return (
                <div className="card">
                    <div className="card-body container">
                        <label>Name:</label>
                        <h5 className="card-title">{product.name}</h5>
                        <label>ID:</label>
                        <h6 className="card-subtitle mb-2 text-muted">{product.id}</h6>
                        <label>Description:</label>
                        <p className="card-text">{product.Description}</p>
                        <div className="row">
                            <div className="col">Price: ${product.Price}</div>
                            <div className="col">Discount: {product.Discount}</div>
                        </div>
                        <p>Pricing: {product.Pricing}</p>
                        <p>views: {product.userViews}</p>
                        <button className={`btn btn-warning ${Object.keys(editProduct).length?"disabled":""} `} onClick={() => setEditProduct(product)}>Edit</button>
                    </div>
                </div>
            )
        })}
        </>
    )
}