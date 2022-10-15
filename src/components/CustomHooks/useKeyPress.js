const { useState, useEffect } = require("react")

const useKeyPressed = ({key, onKeyLeft, onKeyRight}) => {
    const [isPressed, setIsPressed] = useState(false);


    useEffect(() => {
        const handleLeft = ({keyCode}) => {
            if(key === keyCode){
                
            }
        }
    })
}