import {useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {NavLink} from 'react-router-dom'
import axios from 'axios';

import View from './components/View.js'
import Edit from './components/Edit.js'
import Del from './components/Delete.js'
import Add from './components/Add.js'

function App() {
  const [products,setProducts] = useState([]);
  useEffect(() => {
    axios.get('https://a.nacapi.com/amz4akos/products/').then((res) => {
      console.log(res.data);
      setProducts(res.data);
    }).catch((err) => {
      console.log(err);
    })
  },[])
  const sortBy = async (key) => {
    console.log(products);
    let newProducts = products;
    console.log("old products:",products);
    newProducts = await newProducts.sort((a,b) => {
      if (parseInt(a[key]) > parseInt(b[key])) return 1;
      if (parseInt(a[key]) < parseInt(b[key])) return -1;
      return 0;
    });
    console.log("new products:",newProducts);
    setProducts(newProducts);
  }

  return (
    <Router>
      <NavLink exact to="" className="text-center">
        <h1>ADMIN PAGE</h1>
      </NavLink>
      <ul className="nav justify-content-center">
        <NavLink exact to="/view" className="nav-item">
          <li className="nav-link">View/Edit products</li>
        </NavLink>
        <NavLink exact to="/addnew" className="nav-item">
          <li className="nav-link">Add a new product</li>
        </NavLink>
        <NavLink exact to="/delete" className="nav-item">
          <li className="nav-link">Delete a prodcut</li>
        </NavLink>
      </ul>
      <Routes>
        <Route exact path="/view" element={<View products={products} sortBy={sortBy}/>}/>
        <Route exact path="/delete" element={<Del products={products} sortBy={sortBy}/>}/>
        <Route exact path="/addnew" element={<Add products={products}/>}/>
      </Routes>
    </Router>

  );
}

export default App;
