import React, { Component } from "react";
import container from "./container";
import "./style.css";


class Card extends Component {
    constructor() {
        super();
        this.state = {
            container
        };
    }

    render() {
        return (
            <>
                {this.state.container.map(({ title, price, accessProvided, accessDenied }) => {
                    return (
                        <section className="pricing py-5">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className="card mb-5 mb-lg-0">
                                            <div className="card-body">
                                                <h5 className="card-title text-muted text-uppercase text-center">{title}</h5>
                                                <h6 className="card-price text-center">{price}<span className="period">/month</span></h6>
                                                <hr />
                                                <table>
                                                    <tbody>
                                                        {accessProvided.map((data) => {
                                                            return (
                                                                <tr>
                                                                    <td>
                                                                        <ul className="fa-ul">
                                                                            <li><span className="fa-li"><i className="fas fa-check"></i></span>{data}</li>
                                                                        </ul>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                                <table>
                                                    <tbody>
                                                        {accessDenied.map((data) => {
                                                            return (
                                                                <tr>
                                                                    <td>
                                                                        <ul className="fa-ul">
                                                                            <li className="text-muted"><span className="fa-li"><i className="fas fa-times"></i></span>{data}</li>
                                                                        </ul>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                                <a href="#" className="btn btn-block btn-primary text-uppercase">Button</a>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </section>
                    )
                })
                }

            </>
        )
    }
}


export default Card;
