import React from "react";

import PropTypes from "prop-types";

export default function Footer(props) {
     
    return (
        <div>
            <hr />
            Copyrights @{props.year}, @{props.company}

            {props.children}
        </div>
    )
}

//propTypes is a keyword
Footer.propTypes = {
    year: PropTypes.number.isRequired, //mandatory
    company: PropTypes.string   //optional props
}

//defaultProps is a keyword
Footer.defaultProps = {
    company: "Product App"
}