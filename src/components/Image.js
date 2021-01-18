import React, { useContext} from "react"
import {Context} from "../Context"
import PropTypes from 'prop-types'
import useHover from '../hooks/useHover'

function Image({className, img}) {
    // const [hovered, setHovered] = useState(false)
    const [hovered, ref] = useHover()
    const {toggleFav, addToCart, cartItems, removeFromCart} = useContext(Context)
    
    function heartIcon() {
        if(img.isFavorite) {
            return <i className="ri-heart-fill favorite" onClick={() => toggleFav(img.id)} ref={ref}></i>
        } else if(hovered) {
            return <i className="ri-heart-line favorite" onClick={() => toggleFav(img.id)} ref={ref}></i>
        }
    }
        
    function cartIcon() {
        const alreadyCart = cartItems.some(item => item.id === img.id)
        if(alreadyCart) {
            return <i className="ri-shopping-cart-fill cart" onClick={() => removeFromCart(img.id)}></i>
        } else if(hovered) {
          return  <i className="ri-add-circle-line cart" onClick={() => addToCart(img)}></i>
        }
    }   
    
    return (
        <div 
            className={`${className} image-container`}
            ref={ref}
        >
            <img src={img.url} className="image-grid" alt={img.id}/>
            {heartIcon()}
            {cartIcon()}
        </div>
    )
}
Image.propTypes = {
    className: PropTypes.string,
    img: PropTypes.shape({
        id:PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        isFavorite: PropTypes.bool
    })
}

export default Image
