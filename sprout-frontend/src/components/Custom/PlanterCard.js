import React, { Component } from "react";
import '../../styles/planterCard.scss';

import { faLeaf, faTint, faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ColorsEnum = Object.freeze({"low":'#F85151', "med":'#FFAF41', "high":'#6DE86D'});

class PlanterCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            health: ColorsEnum.low,
            nutrients: ColorsEnum.low,
            harvest: ColorsEnum.low,
        };
    }

    componentWillMount() {
        this.setState({
            health: ColorsEnum[this.props.health],
            nutrients: ColorsEnum[this.props.nutrients],
            harvest: ColorsEnum[this.props.harvest]
        });
    }



    render() {
        return (
            <div className="col mb-4">
                <div className="card">
                    <img src="https://www.mtpr.org/sites/kufm/files/styles/x_large/public/201812/farm-ag-crops_thinkreaction-iStock.jpg" className="card-img-top" alt="failed to load"/>
                    <div className="card-body">
                        <h2 className="card-title">{this.props.name}</h2>
                        <h5 className="card-subtitle">{this.props.type}</h5>
                    </div>
                    <div className="tag-container">
                        <FontAwesomeIcon className="circle-tag" icon={faLeaf} style={{backgroundColor:this.state.health}}/>
                        <FontAwesomeIcon className="circle-tag" icon={faTint} style={{backgroundColor:this.state.nutrients}}/>
                        <FontAwesomeIcon className="circle-tag" icon={faShoppingBasket} style={{backgroundColor:this.state.harvest}}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default PlanterCard;