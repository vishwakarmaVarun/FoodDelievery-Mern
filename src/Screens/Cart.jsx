import React from 'react'
import { useCart, useDispatchCart } from '../components/ContextReducer'

const Cart = () => {

    let data = useCart();
    let dispatch = useDispatchCart();
    if(data.length === 0){
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
            </div>
        )
    }

    // const handleCheckOut = async (e) => {
    //     e.preventDefault()
    //     try {
    //         let userEmail = localStorage.getItem("userEmail");
    //         let response = await fetch("http://localhost:5000/api/orderdata", {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 email: userEmail,
    //                 order_data: data,
    //                 order_date: new Date().toDateString()
    //             })
    //         });
    
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch');
    //         }
    
    //         console.log('Order Response', response);
    //         const responseData = await response.json();
    //         if (responseData) {
    //             dispatch({ type: 'DROP' });
    //         }
    //     } catch (error) {
    //         console.error('Error during fetch:', error);
    //     }
    // }

    let totalPrice = data.reduce((total, food) => total + food.price, 0)

    return (
        <div>
            <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
                <table className='table table-hover'>
                    <thead className='text-white fs-4'>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Option</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => {
                            return (
                                <tr key={index}>
                                    <th scope='row'>{index + 1}</th>
                                    <td>{food.name}</td>
                                    <td>{food.qty}</td>
                                    <td>{food.size}</td>
                                    <td>{food.price}</td>
                                    <td><button type='button' className='btn bg-white text-dark fw-bold p-0' onClick={() => {dispatch({type: 'REMOVE', index: index})}}>DEL</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
                <div>
                    <button className='btn bg-white text-dark fw-bold mt-5'>Check Out</button>
                </div>
            </div>
        </div>
  )
}

export default Cart;