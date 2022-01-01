import React from 'react';
import './ItemList.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const ItemList = (props) => {

    

    return <div>
        <div className="itemlist">
        <button className="fa fa-times" aria-hidden="true" onClick={()=>{props.onSelect(props.id)}}>x</button>            
        <li className="itemli"> {props.item}</li>
        </div>
    </div>;
}
export default ItemList;