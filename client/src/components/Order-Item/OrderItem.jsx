import React, {useState, useEffect, useRef} from "react";
import './OrderItem.css'

const OrderItem = function({ menuItem, order, setOrder, index, scrollToMenuItem}){

    const [itemFormShown, setItemFormShown] = useState(false)
    const [itemFormPosition, setItemFormPosition] = useState({top: 0, left: 0})
    const [itemFormXPosition, setItemFormXPosition] = useState(0)
    const [itemQuantity, setItemQuantity] = useState(1)
    const [itemTotal, setItemTotal] = useState(0)
    const [itemFormTranslateX, setItemFormTranslateX] = useState(``)
    const [itemFormTranslateY, setItemFormTranslateY] = useState(``)
    const itemFormRef = useRef(null)
    const menuItemRef = useRef(null)

    function submitItem() {
        let prevQuantity = order[menuItem.name] || 0
        setOrder((prevState) => ({
            ...prevState,
            [menuItem.name]: itemQuantity+prevQuantity
        }))
        setItemFormShown(false)
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
        const menuItemContainer = menuItemRef.current
        const rect = menuItemContainer.getBoundingClientRect()
        
        const menuItemHeight  = menuItemContainer.clientHeight
        const menuItemWidth = menuItemContainer.clientWidth
        setItemFormTranslateY(`translateY(${(menuItemHeight*-.5)-150}px)`)
        
        if(index%2===0){
            setItemFormTranslateX(`translateX(${menuItemWidth+20}px)`)
            console.log('menuItemHeight', menuItemHeight)
        }else{
            setItemFormTranslateX(`translateX(-320px)`)
            console.log('odd')
        }
        console.log(rect.top + window.scrollY + (menuItemHeight/2))
        setItemFormPosition({
            top: 0,
            left: 0
        })
        // itemFormRef.current.scrollIntoView({behavior: 'smooth', block: 'center'})
    }
    function closeItemForm(event){
        event.stopPropagation()
        setItemFormShown(false)
    }
    function handleItemFormClick(event){
        event.stopPropagation()
    }
   
    useEffect(() => {
        if (itemFormShown && menuItemRef.current) {
          menuItemRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, [itemFormShown]);
    return(
        <div className="OrderItem_container" onClick={showItemForm} index={index} ref={menuItemRef}>
            <div className="single_item_container" >
                <div className="item_name_and_price" ><span>{menuItem.name}</span> <span className="order_item_price">${menuItem.price}</span></div>
                <p>{`${menuItem.description}`}</p>
            </div>
            {itemFormShown? (
            <>
            <div className="item_form_overlay" onClick={closeItemForm}></div>
            <div className={`item_form`} style = {{transform: `${itemFormTranslateX} ${itemFormTranslateY}`}} onClick={handleItemFormClick} ref={itemFormRef}> 
                <p>{menuItem.description}</p> 
                <p>Special Instructions</p>
                <textarea type="text" rows='2'></textarea><br/>
                <p>Quantity</p>
                <input type="number" defaultValue={itemQuantity} min={1} onChange={handleItemQuantityChange} pattern="^[1-9]\d*$"></input>
                <div className="add_to_cart_button">
                    <span>${itemTotal}</span>
                    <button onClick={submitItem}>Add To Cart</button>
                </div>
            </div>
            </>
            ) : <></>}
        </div>
       
    )
}

export default OrderItem