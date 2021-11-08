import axios from 'axios';
import {useState} from 'react';

export default function Delete({products}) {
    const deleteById = (id) => {
        console.log("DELETING ID:",id);
        // axios.delete(`https://a.nacapi.com/amz4akos/products/?id=${id}`).then((res) => {
        //   console.log("HOPEFULLY IT WORKED");
        //   console.log(res.data);
        // //   window.location.reload(false);

        // }).catch((err) => {
        //   console.log("it didnt work");
        //   alert("NETWORK ERROR");
        // //   window.location.reload(false);
        // })
        let newProducts = products.filter(product => product.id !== id);
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
    return (
        <>
        <h1>Delete</h1>
        {products.map((product,ind)=>{
            return(
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
                        <button className={`btn btn-danger`} onClick={() => deleteById(product.id)}>Delete</button>
                    </div>
                </div>
            )
        })
        }
        </>
    )
}