import React from 'react';
import './CreditCard.css';

const CreditCard = ({ name, balance, expiry }) => {
    return (
        <div className="glow-card">
            <div className="glow-card-inner">
                <div className="glow-card-front">
                    <div className="d-flex justify-content-between align-items-start mb-4">
                        <div className="chip"></div>
                        <i className="bi bi-contactless fs-2 text-white-50"></i>
                    </div>
                    <div className="card-number mb-4">
                        **** **** **** 4242
                    </div>
                    <div className="d-flex justify-content-between align-items-end">
                        <div>
                            <div className="card-label">Card Holder</div>
                            <div className="card-info">{name}</div>
                        </div>
                        <div>
                            <div className="card-label">Expires</div>
                            <div className="card-info">{expiry}</div>
                        </div>
                        <div className="visa-logo">Glow<span>Pay</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreditCard;