import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";
// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState([]);

	console.log('cart', cart)

	const addItem = item => {
	const newItem = {
		id: Date.now(),
		image: item.image,
		price: item.price,
		title: item.title,
	}
	localStorage.setItem('myCart', JSON.stringify(cart))
	setCart(JSON.parse(localStorage.getItem('myCart')))
	
	setCart([newItem, ...cart ])
	
};

	const removeItem = (itemId) => {
		const items = cart.filter(item => item.id !== itemId);
		setCart(items)
	}

	return (
		<ProductContext.Provider value={{ products, addItem }}>
			<CartContext.Provider value={{cart, removeItem}}>
				<div className="App">
					<Navigation cart={cart} />

					{/* Routes */}
					<Route exact path="/" component={Products} />
					
					<Route path="/cart" component={ShoppingCart} />
				</div>
				</CartContext.Provider>
		</ProductContext.Provider>
	);
}

export default App;
