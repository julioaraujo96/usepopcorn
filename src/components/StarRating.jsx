import { useState } from "react";
import PropTypes from "prop-types";
import Star from "./Star";

const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
};

const starContainerStyle = {
    display: 'flex',
};

StarRating.propTypes = {
    maxRating: PropTypes.number,
    defaultRating: PropTypes.number,
    color: PropTypes.string,
    size: PropTypes.number,
    messages: PropTypes.array,
    className: PropTypes.string,
    onSetRating: PropTypes.func,
}


export default function StarRating(
    { 
        maxRating = 5 ,
        color = "#fcc419",
        size = 48,
        className = "",
        messages = [],
        defaultRating = 0,
        onSetRating,
    }){

    const [rating, setRating] = useState(defaultRating);
    const [tempRating, setTempRating] = useState(defaultRating);

    function handleRating(rating){
        setRating(rating);
        onSetRating(rating);
    }

    function handleTempRating(rating){
        setTempRating(rating);
    }

    const textStyle = {
        lineHeight: "1",
        margin: "0",
        fontSize: `${size}px`,
        color,
    };

    return <div style={containerStyle} className={className}>
        <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star 
            key={i} 
            color={color}
            size={size}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1 } 
            onRate={ ()=> handleRating(i + 1)}
            onHoverIn={ ()=> handleTempRating(i + 1)}
            onHoverOut={ ()=> handleTempRating(0)}
        />
        ))}
        </div>
        <p 
            style={textStyle}
        > 
            { 
                messages.length === maxRating ? messages[tempRating ? tempRating -1 : rating - 1] : tempRating || rating || '' 
            } 
        </p>
    </div>
}