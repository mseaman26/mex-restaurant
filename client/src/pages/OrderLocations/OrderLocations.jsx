import React from "react";
import './OrderLocations.css'
import civiche from '../../assets/images/civiche.jpeg'
import { Link } from "react-router-dom";
const OrderLocations = () => {
    return(
        <>
        <div id="order_locations_page">
            <div id="order_online_page_image_container">
                <img src={civiche} id="order_online_page_image"></img>
            </div>
        </div>
        <div id="order_locations_info">
            <p>Please double-check the pick-up location before clicking the order now button.</p>
            <p>*No Refunds are given for selecting the incorrect pick-up location for online orders.</p>
            <div id="order_location_choices">
                <div className="order_location_choice">
                    <h1>Location 1</h1>
                    <p>street address<br/>city state<br/>1(555)-555-5555</p>
                    <Link to='/orderloactions/location1' className="order_location_link">ORDER NOW</Link> 
                </div>
                <div className="order_location_choice">
                    <h1>Location 2</h1>
                    <p>street address<br/>city state<br/>1(555)-555-5555</p>
                    <Link to='/orderloactions/location2' className="order_location_link">ORDER NOW</Link>
                </div>
            </div>
        </div>
        </>
    )
}

export default OrderLocations