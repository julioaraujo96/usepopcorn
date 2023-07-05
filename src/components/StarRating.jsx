import { useState } from "react";
import Star from "./Star";

const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
};

const starContainerStyle = {
    display: 'flex',
};

const textStyle = {
    lineHeight: "1",
    margin: "0",
    // fontSize: "48px",
};

export default function StarRating({ maxRating = 5 }){

    const [rating, setRating] = useState(0);
    const [tempRating, setTempRating] = useState(0);

    function handleRating(rating){
        setRating(rating);
    }

    function handleTempRating(rating){
        setTempRating(rating);
    }

    return <div style={containerStyle}>
        <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star 
            key={i} 
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1 } 
            onRate={ ()=> handleRating(i + 1)}
            onHoverIn={ ()=> handleTempRating(i + 1)}
            onHoverOut={ ()=> handleTempRating(0)}
        />
        ))}
        </div>
        <p style={textStyle}> { tempRating || rating || '' } </p>
    </div>
}