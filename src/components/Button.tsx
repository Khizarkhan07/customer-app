import React from "react";


type buttonProps = {
    icon?: string ;
    text?: string ;
    color?: string ;
    callback?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Button: React.FC<buttonProps> = ({icon, text, color, callback,}) => {

    const styles = {
        background: color,
    }

    return (
        <button
            style={styles}
            onClick={callback}
            className="btn btn-dark btn-outline mb-1"
        >
            {icon && <i className={icon + " mr-1"}/>}
            {text && <span>{text}</span>}
        </button>
    );
};
