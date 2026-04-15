import React, { useState } from "react";
import {referaearn} from "../assets/images";
import { FaWhatsapp } from "react-icons/fa";

const ReferAndEarn = () => {
        const [activeIndex, setActiveIndex] = useState(0);
        const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

        const faqs = [
        {
            question: "What is Future Lift, and how can it help me with my career goals ?",
            answer:
                "Future Lift is an online career counseling platform dedicated to helping you make informed career decisions. Our AI-integrated assessment tests, affordable counseling sessions, and Instant Advice are designed to guide you toward a successful future."
        },
        {
            question: "How does FutureLift better than other brands ?",
            answer:
                "FutureLift combines AI-driven assessments with personalized counseling, offering transparent guidance and affordable solutions tailored to individual needs."
        },
        {
            question: "How do the AI-integrated assessment test work?",
            answer:
                "Our AI-integrated assessment analyzes your skills, interests, and aptitude to recommend suitable career paths using data-driven insights."
        },
        {
            question: "Are the counseling sessions conducted online ?",
            answer:
                "Yes, all counseling sessions are conducted online through secure video conferencing platforms."
        },
        {
            question: "How can I get started with FutureLift?",
            answer:
                "You can get started by signing up on our website and booking your first assessment or counseling session."
        }
    ];
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
                            Help your friends choose the right college — and earn real rewards when they take admission. 
                        </p>
                        <p>
                            No investment. No experience needed. Anyone can start.
                        </p>

                        <div className="refer-buttons">
                            <button className="btn btn-success">Ask Now <FaWhatsapp size={28} /></button>
                            <button className="btn-outline">Know More</button>
                        </div>
                    </div>
                    <div className="refer-hero-right">
                        <img src={referaearn} alt="" srcset="" />
                    </div>
                </div>

                {/* HOW IT WORKS */}
                <div className="how-it-works">
                    <h2>How It Works?</h2>
                    <p className="sub-text">
                        Starting your earning journey with Udaan Scholars is simple, transparent, and rewarding. 
                    </p>

                    <div className="steps">
                        <div className="step">
                            <span>1</span>
                            <h4>Share Your Referral</h4>
                            <p>Share your unique referral code or simply connect your friend with us through call or WhatsApp.</p>
                        </div>

                        <div className="step">
                            <span>2</span>
                            <h4>We Guide Your Friend</h4>
                            <p>Our expert counsellors help them choose the right course and college, and complete the admission process. </p>
                        </div>

                        <div className="step">
                            <span>3</span>
                            <h4>You Earn Rewards</h4>
                            <p>Once your friend successfully enrolls, you receive secure referral earnings — up to ₹50,000.</p>
                        </div>
                    </div>

                    {/* <div className="note">
                        No limits. No targets. Refer as many people as you want and maximize
                        your earnings.
                    </div> */}
                </div>

                {/* FRIEND BENEFITS */}
                <div className="friend-benefits">
                    <h2 className="text-center">What Your Friends Get</h2>
                         <p className="sub-text text-center">
                        Your Friends Get Real Benefits Too
                    </p>
                    <div className="benefit-grid">
                        <div className="benefit-card">
                            <h4>Free Expert Career Counselling</h4>
                            <p>Personalised guidance to choose the right course and college. </p>
                        </div>

                        <div className="benefit-card">
                            <h4>Scholarship Up to ₹25,000</h4>
                            <p>Financial support to reduce education costs.</p>
                        </div>

                        <div className="benefit-card">
                            <h4>Verified College Options</h4>
                            <p>Access to 400+ trusted institutes across India and abroad. </p>
                        </div>

                        <div className="benefit-card">
                            <h4>Transparent & Honest Guidance </h4>
                            <p>No hidden charges — only clear and genuine advice.</p>
                        </div>
                    </div>
                </div>
                <div className="how-it-works">
                    <h2 className="text-center">Why This Is A Win-Win</h2>
                         
                    <div className="steps">
                        <div className="step">
                            <span>1</span>
                            <p>You help your friends make the right decision</p>
                        </div>

                        <div className="step">
                            <span>2</span>
                            <p>Your friends get expert guidance and benefits </p>
                        </div>

                        <div className="step">
                            <span>3</span>
                            <p>You earn without any investment or risk</p>
                        </div>
                    </div>
                </div>








                


                {/* CTA */}
                <div className="final-cta">
                    <h2>Have Questions? We’re Here to Help</h2>
                    <p className="mt-2">
                        Not sure how to start or how much you can earn? Talk to our team and we’ll guide you step-by-step.
                    </p>
                    <div className="row">
                        <div className="col-md-4"></div>
                        <div className="col-lg-4 mx-auto">
                            <button className="btn-whatsapp mt-2">
                                Talk to Our Team <FaWhatsapp size={28} />
                            </button>
                        </div>
                        <div className="col-md-4"></div>
                    </div>
                </div>

                 <section className="faq-section">
                <div className="container">
                    <h2 className="faq-title">FAQs</h2>

                    <div className="faq-list">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`faq-item ${activeIndex === index ? "active" : ""}`}
                            >
                                <div
                                    className="faq-question"
                                    onClick={() => toggleFAQ(index)}
                                >
                                    <span>{faq.question}</span>
                                    <span className="faq-icon">
                                        {activeIndex === index ? "−" : "+"}
                                    </span>
                                </div>

                                {activeIndex === index && (
                                    <div className="faq-answer">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            </div>
        </section>
    );
};

export default ReferAndEarn;
