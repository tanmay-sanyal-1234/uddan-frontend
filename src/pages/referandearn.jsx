import React from "react";

const ReferAndEarn = () => {
    return (
        <section className="refer-section">
            <div className="container">

                {/* HERO */}
                <div className="refer-hero">
                    <div className="refer-hero-left">
                        <h1>
                            Earn Up To <span>₹50,000</span> By <br /> Referring Your Friends
                        </h1>

                        <p>
                            More than 850 Lakh earned by our ambassadors in the last 3 years.
                            Join 50+ people who earn with Udaan Scholars every year – 100%
                            guaranteed payments.
                        </p>

                        <div className="refer-buttons">
                            <button className="btn-primary">Start Now</button>
                            <button className="btn-outline">Know More</button>
                        </div>
                    </div>

                </div>

                {/* HOW IT WORKS */}
                <div className="how-it-works">
                    <h2>How It Works?</h2>
                    <p className="sub-text">
                        Starting your earning journey with Udaan Scholars is incredibly
                        straightforward.
                    </p>

                    <div className="steps">
                        <div className="step">
                            <span>1</span>
                            <h4>Share Your Code</h4>
                            <p>Share your referral code or contact us directly.</p>
                        </div>

                        <div className="step">
                            <span>2</span>
                            <h4>Your Friend Enrolls</h4>
                            <p>We guide them and verify the admission process.</p>
                        </div>

                        <div className="step">
                            <span>3</span>
                            <h4>You Earn Up To ₹50,000</h4>
                            <p>Receive your referral earnings safely and securely.</p>
                        </div>
                    </div>

                    <div className="note">
                        No limits. No targets. Refer as many people as you want and maximize
                        your earnings.
                    </div>
                </div>

                {/* FRIEND BENEFITS */}
                <div className="friend-benefits">
                    <h2>What Will Your Friends Get?</h2>

                    <div className="benefit-grid">
                        <div className="benefit-card">
                            <h4>Free Expert Counselling</h4>
                            <p>Personalised guidance for course selection.</p>
                        </div>

                        <div className="benefit-card">
                            <h4>Scholarship up to ₹25,000</h4>
                            <p>Exclusive scholarships to reduce costs.</p>
                        </div>

                        <div className="benefit-card">
                            <h4>Verified Institute Options</h4>
                            <p>Access to 100+ trusted colleges.</p>
                        </div>

                        <div className="benefit-card">
                            <h4>Transparent Guidance</h4>
                            <p>No hidden charges. Honest advice.</p>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="final-cta">
                    <h2>Start Earning Today</h2>
                    <p>
                        Refer students. Help them get scholarships. Earn rewards.
                    </p>
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-lg-4 mx-auto">
                            <button className="btn-primary">
                                Refer Now With Code: EARN500
                            </button>
                        </div>
                        <div className="col-lg-4 mx-auto">
                            <button className="btn-whatsapp">
                                WhatsApp: +91 98765 43210
                            </button>
                        </div>
                        <div className="col-md-2"></div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ReferAndEarn;
