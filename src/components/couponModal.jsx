import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./subsidyModal.css";

const SubsidyModal = ({ show, handleClose }) => {
    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            backdrop="static"
            dialogClassName="subsidy-modal"
        >
            <Modal.Header closeButton className="subsidy-body subsidy-header">
                <Modal.Title className="w-100 text-center">
                    <h5 className="text-center text-white fw-bold">
                        Exclusive Subsidy Just for You!
                    </h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="subsidy-body position-relative">
                {/* Close Button */}


                {/* Timer */}
                <div className="expiry-text">
                    Expiring in <strong>3 seconds</strong>
                </div>

                {/* White Card */}
                <div className="subsidy-card">
                    <div className="small text-muted">Get Upto</div>
                    <div className="amount">₹20,000</div>
                    <div className="fw-bold">Subsidy*</div>
                    <div className="small text-muted">(Cashback)</div>
                </div>

                {/* CTA */}
                <Button className="claim-btn">
                    CLAIM NOW →
                </Button>

                {/* Bottom Stats */}
                <div className="stats-row">
                    <div>
                        😊 <strong>1 Lakh+</strong>
                        <div>Trusted by Students</div>
                    </div>
                    <div>
                        🧑‍🏫 <strong>500+</strong>
                        <div>Expert Mentors</div>
                    </div>
                    <div>
                        ⭐ <strong>4.8/5</strong>
                        <div>Google Rating</div>
                    </div>
                </div>

                {/* Footer Link */}
                <div className="view-all">
                    VIEW ALL →
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default SubsidyModal;
