import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

const Home = () => {

  const [search, setSearch] = useState("");
  const [foodItem, setfoodItem] = useState([]);
  const [foodCat, setfoodCat] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    response = await response.json();

    setfoodItem(response[0]);
    setfoodCat(response[1]);
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <div>
      <div><Navbar /></div>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{zIndex: "4"}}>
            <div className="d-flex justify-content-center">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => {setSearch(e.target.value)}}/>
            </div>
          </div>
          <div className="carousel-item active" style={{objectFit: "contain"}}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg9sTYvZhxRvNGURxvWuYqwWwlmK-DnJBCkA&s" style={{filter: "brightness(50%)", objectFit: 'contain'}} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item" style={{objectFit: "fill"}}>
            <img src="https://www.bakerbychance.com/media/catalog/product/cache/6b95abd50ce8dc7005af20c3c925dbbe/1/_/1_pineapple_resized.png" style={{filter: "brightness(50%)", objectFit: 'contain'}} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item" style={{objectFit: "fill"}}>
            <img src="https://www.freeiconspng.com/thumbs/grill-png/barbecue-grill-png-22.png" style={{filter: "brightness(50%)", objectFit:'contain'}} className="d-block w-100" alt="..." />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container">
        {foodCat.length !== 0 ? foodCat.map((data)=>{
            return (
              <div key={data._id} className="row mb-3">
                <div className="fs-4 m-3">
                  {data.CategoryName}
                </div>
                <hr />
                {foodItem.length !== 0 ? foodItem.filter((item) => (item.CategoryName == data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()))).map((filterItems) => {
                  return (
                    <div key={filterItems.id} className="col-12 col-md-6 col-lg-3">
                      <Card foodItem={filterItems} options={filterItems.options[0]} />
                    </div>
                  )
                }) : <div>No such data found</div>}
              </div>
            )
          })
          : ""
        }
      </div>
      <div><Footer /></div>
    </div>
  );
};

export default Home;
