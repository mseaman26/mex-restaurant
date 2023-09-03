import React, {useState, useEffect} from "react";
import './OrderItem.css'

const OrderItem = function({ menuItem, order, setOrder, index}){

    const [itemFormShown, setItemFormShown] = useState(false)
    const [itemFormPosition, setItemFormPosition] = useState({top: 0, left: 0})
    const [itemFormXPosition, setItemFormXPosition] = useState(0)
    const [itemQuantity, setItemQuantity] = useState(1)
    const [itemTotal, setItemTotal] = useState(0)

    const addItem = () => {
        if(!order[menuItem.name]){
            setOrder((prevState) => ({
                ...prevState,
                [menuItem.name]: 1
            }))
        }else{
            setOrder((prevState) => ({
                ...prevState,
                [menuItem.name]: order[menuItem.name] + 1
            }))
        }
    }
    function handleItemQuantityChange(event) {
        // Get the value from the input
        const newValue = event.target.value;
        if(parseInt(newValue) < 1){
            console.log(parseInt(newValue))
            console.log('lessthanone')
            setItemQuantity(0)
            setItemTotal(0*menuItem.price)
        }else{
            setItemQuantity(newValue)
            setItemTotal(newValue*menuItem.price)
        }
        
    }
    function showItemForm(event){
        setItemFormShown(true)
        const menuItemContainer = event.currentTarget
        const rect = menuItemContainer.getBoundingClientRect()
        const menuItemHeight  = menuItemContainer.clientHeight
        const menuItemWidth = menuItemContainer.clientWidth
        let itemFormXPosition
        console.log('width', menuItemWidth)
        if(index%2===0){
            setItemFormXPosition(rect.right+20)
            console.log('menuItemHeight', menuItemHeight)
        }else{
            setItemFormXPosition(rect.right - (menuItemWidth+300+20))
            console.log('odd', itemFormXPosition)
        }
        console.log(rect.top + window.scrollY + (menuItemHeight/2))
        setItemFormPosition({
            top: rect.top - 150 + (menuItemHeight/2),
            left: itemFormXPosition
        })
    }
    function closeItemForm(event){
        event.stopPropagation()
        setItemFormShown(false)
    }
    function handleItemFormClick(event){
        event.stopPropagation()
    }
   
    useEffect(() => {
        console.log(itemFormShown);
    }, [itemFormShown]);
    return(
        <div className="OrderItem_container" onClick={showItemForm}>
            <div className="single_item_container">
                <div className="item_name_and_price"><span>{menuItem.name}</span> <span className="order_item_price">${menuItem.price}</span></div>
                <p>{`${menuItem.description}`}</p>
            </div>
            {itemFormShown? (
            <div className="item_form_overlay" onClick={closeItemForm}>
                <div className={`${index%2 === 0 ? 'item_form_left' : 'item_form_right'} item_form`} style = {{top: itemFormPosition.top, left: itemFormXPosition}} onClick={handleItemFormClick}> 
                    <p>{menuItem.description}</p> 
                    <p>Special Instructions</p>
                    <textarea type="text" rows='2'></textarea><br/>
                    <p>Quantity</p>
                    <input type="number" defaultValue={itemQuantity} min={1} onChange={handleItemQuantityChange} pattern="^[1-9]\d*$"></input>
                    <div className="add_to_cart_button">
                        <span>${itemTotal}</span>
                        <span>Add To Cart</span>
                    </div>
                </div>
            </div>
            ) : <></>}
        </div>
       
    )
}

export default OrderItem