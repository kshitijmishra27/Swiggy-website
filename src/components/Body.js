import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import { swiggy_api_URL } from "../utils/constants";
import Shimmer from "./Shimmer";

const Body = () =>{

const [ListOfRestaurants, setListOfRestaurants] = useState([]);
const [filteredRestaurants, setfilteredRestaurants] = useState(ListOfRestaurants);
const [searchText, setsearchText] = useState("")

useEffect(() => {
    getRestaurants();
}, []);


// async function getRestaurant to fetch Swiggy API data
async function getRestaurants() {
    // handle the error using try... catch
    try {
      const response = await fetch(swiggy_api_URL);
      const json = await response.json();
      
        // call the checkJsonData() function which return Swiggy Restaurant data
        const resData = await checkJsonData(json);

        // update the state variable restaurants with Swiggy API data
        setListOfRestaurants(resData);
        setfilteredRestaurants(resData);
            
      // initialize checkJsonData() function to check Swiggy Restaurant data
      async function checkJsonData(jsonData) {
        for (let i = 0; i < jsonData?.data?.cards.length; i++) {

          // initialize checkData for Swiggy Restaurant data
          let checkData = json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
          
          // if checkData is not undefined then return it
          if (checkData !== undefined) {
            return checkData;
          }
        }
      }

    } catch (error) {
      console.log(error);
    }
  }


  // if allRestaurants is empty don't render restaurants cards
  if (ListOfRestaurants.length === 0){
    return <Shimmer/> ;       
  }

    return ListOfRestaurants.length === 0 ? <Shimmer/> : (
        <div className="body">
           <div className="filter">

            <div className="search">
                <input className="input"
                type="text"
                value={searchText}
                onChange={(e)=>{
                    setsearchText(e.target.value);
                }}  
                ></input>

                <button className="searchBtn"
                  onClick={()=>{
                    const restaurants = ListOfRestaurants.filter((res) =>{
                        return res.info.name.toLowerCase().includes(searchText.toLowerCase());
                    })
                    setfilteredRestaurants(restaurants);
                  }}
                >Search</button>

                <button className="btn"
                onClick={()=>{
                    const updated = ListOfRestaurants.filter((res)=>{
                        return res.info.avgRating > 4;
                    });
                    setfilteredRestaurants(updated);
                }}                
                > Top Rated </button>
            </div>
               
           </div> 
           <div className="res-container">
            {
                filteredRestaurants.map((restaurant)=>{
                  return <RestaurantCard key={restaurant?.info?.id} {...restaurant?.info} />
                })
            }
           </div>
        </div>
    )
};

export default Body;
