import React, {useEffect, useRef, useState} from 'react'
import { useDispatchCart, useCart } from './ContextReducer';

const Card = (props) => {

  let dispatch = useDispatchCart();
  let data = useCart();
  let priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  const [qty, setqty] = useState(1);
  const [size, setsize] = useState("");

  let finalPrice = qty*parseInt(options[size]);
  useEffect(() => {
    setsize(priceRef.current.value);
  }, [])

  const handleAddToCart = async () => {
    let food = []
    for(const item of data){
      if(item.id === props.foodItem._id){
        food = item;
        break;
      }
    }

    if(food.length !== 0){
      if(food.size === size){
        await dispatch({type: 'UPDATE', id: props.foodItem._id, price: finalPrice, qty: qty})
        return
      }
      else if(food.size !== size){
        await dispatch({type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size})
        return
      }
      return
    }

    await dispatch({type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size})
  }

  

  return (
    <div>
        <div
          className="card mt-4"
          style={{ width: "18rem"}}
        >
          <img src={props.foodItem.img} className="card-img-top" style={{height: "180px", objectFit: "fill"}} alt="..." />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <div className="container w-100">
              <select className="m-2 h-100 bg-light rounded" onChange={(e)=> setqty(e.target.value)}>
                {Array.from(Array(6), (e, l) => {
                  return (
                    <option key={l + 1} value={l + 1}>
                      {l + 1}
                    </option>
                  );
                })}
              </select>
              <select className="m-2 h-100 bg-light rounded" ref={priceRef} onChange={(e)=> setsize(e.target.value)}>
                {priceOptions.map((opt) => {
                  return <option key={opt} value={opt}>{opt}</option>
                })}
              </select>
              <div className="d-inline h-100 fs-5">&#8377;{finalPrice}/-</div>
            </div>
            <hr />
            <button className='btn btn-dark text-white justify-center mx-2' onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
  )
}

export default Card