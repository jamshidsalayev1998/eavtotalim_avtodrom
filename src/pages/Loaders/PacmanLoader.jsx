import React from 'react';
import './style_loader.css';



const PacmanLoader = ({ title }) => {



    return (
        <div className="loader_pacman">
            <div className="circles_pacman">
                <span className="one_pacman">{title}</span>
                <span className="two_pacman">{title}</span>
                <span className="three_pacman">{title}</span>
            </div>
            <div className="pacman_pacman">
                <span className="top_pacman"></span>
                <span className="bottom_pacman"></span>
                <span className="left_pacman"></span>
                <div className="eye_pacman"></div>
            </div>
        </div>
    )
}

export default PacmanLoader;