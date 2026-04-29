import React, { useState } from "react";
import SEO from "../components/SEO";
import { about_banner, skillImage, mission_image } from "../assets/images";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FaqComponent from "@/components/FaqComponent";
import { openModal } from "@/store/slices/universityModalSlice";
import { useSelector, useDispatch } from "react-redux";
import UniversityModal from "@/components/universityModal";
const About = () => {
    const dispatch = useDispatch();
    const isModalOpen = useSelector((state) => state.universityModal.isOpen);
    const [modalOpenFor, setModalOpenFor] = useState("apply");
    const [activeIndex, setActiveIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const openGallery = (index) => {
        setCurrentIndex(index);
        setShowModal(true);
    };
    const partners = [
        {
            name: "dd",
            logo: "https://cdn.gamma.app/wgu6c0i1jdpm1pv/93ea745d085c45d18a1c10775d13a3dd/optimized/Asset-1-2.svg"
        },
        {
            name: "jhdbbs",
            logo: "https://cdn.gamma.app/wgu6c0i1jdpm1pv/c171101356644c19baa387caa516b39a/original/logo-2.png"
        }
    ];
    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % partners.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? partners.length - 1 : prev - 1
        );
    };
    const partnerSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            { breakpoint: 1200, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
        ],
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
        <div>
            <SEO title="About Us - Uddan Scholars" description="Learn more about Uddan Scholars." />
            <section className="section-top" style={{ backgroundImage: `url(${about_banner})` }}>
                {/* <div className="container">
                    <div className="col-lg-10 offset-lg-1 text-center">
                        <div
                            className="section-top-title wow fadeInRight"
                            data-wow-duration="1s"
                            data-wow-delay="0.3s"
                            data-wow-offset="0"
                        >
                            <h1>About Us</h1>
                            <ul>
                                <li>
                                    <a href="/">Home</a>
                                </li>
                                <li> / About Us</li>
                            </ul>
                        </div>
                    </div>
                </div> */}
            </section>


            {/* TOP FEATURES */}


            {/* ABOUT SECTION */}
            <section className="ab_one section-padding">
                <div className="container">

                    <div className="row">

                        <div className="col-lg-12 col-sm-12 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.2s">
                            <div className="ab_img">
                                <img
                                    src={mission_image}
                                    className="img-fluid"
                                    alt="About"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5 text-center">
                        <div className="col-lg-6 col-sm-12 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.1s">
                            <div className="ab_content p-2">
                                <h3 className="">
                                    <strong>Our Vision</strong>
                                </h3>
                                <p className="mt-2">
                                    To make career clarity accessible to every student in India, regardless of their background, location, or financial condition.
                                </p>


                                {/* <a className="btn_one" href="/about">
                                    Read More us
                                </a> */}
                            </div>
                        </div>
                        <div className="col-lg-6 col-sm-12 col-xs-12 wow fadeInUp border-start" data-wow-duration="1s" data-wow-delay="0.1s">
                            <div className="ab_content p-2">

                                <h3>
                                    <strong>Our Mission </strong>
                                </h3>
                                <p className="mt-2">
                                    To provide personalised, transparent, and affordable career counselling that helps students choose the right course and college — and succeed in their careers.
                                </p>

                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <section className="tp_feature section-padding">
                <div className="container-fluid">
                    <div className="ab_content">
                        <h2 className="text-center">
                            Our Impact So Far
                        </h2>
                        {/* <p className="text-center">
                            From choosing the right course to securing your admission, we support you at every step of your higher education journey.
                        </p> */}
                    </div>
                    <div className="row">

                        <div className="col-lg-3 col-sm-3 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.2s">
                            <div className="single_tp">
                                <h3>6000+ Students Enrolled</h3>
                                <p>
                                    Helping thousands of students across India take confident career decisions
                                </p>
                                <br />
                                <a href="#" className="cta" onClick={() => {
                                    setModalOpenFor("explore");
                                    dispatch(openModal());
                                }}>
                                    <span>Explore</span>
                                    <svg width="13px" height="10px" viewBox="0 0 13 10">
                                        <path d="M1,5 L11,5"></path>
                                        <polyline points="8 1 12 5 8 9"></polyline>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-3 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.3s">
                            <div className="single_tp">
                                <h3>93% Satisfaction Rate</h3>
                                <p>
                                    Trusted by students and parents for honest and personalised guidance
                                </p>
                                <br />
                                <a href="#" className="cta" onClick={() => {
                                    setModalOpenFor("explore");
                                    dispatch(openModal());
                                }}>
                                    <span>Explore</span>
                                    <svg width="13px" height="10px" viewBox="0 0 13 10">
                                        <path d="M1,5 L11,5"></path>
                                        <polyline points="8 1 12 5 8 9"></polyline>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-3 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.4s">
                            <div className="single_tp">
                                <h3>400+ Partner Institutes</h3>

                                <p>
                                    Access to verified colleges in India and abroad
                                </p>
                                <br />
                                <a href="#" className="cta" onClick={() => {
                                    setModalOpenFor("explore");
                                    dispatch(openModal());
                                }}>
                                    <span>Explore</span>
                                    <svg width="13px" height="10px" viewBox="0 0 13 10">
                                        <path d="M1,5 L11,5"></path>
                                        <polyline points="8 1 12 5 8 9"></polyline>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-3 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.4s">
                            <div className="single_tp">
                                <h3>Up to ₹50,000 Scholarships after Admission</h3>

                                <p>
                                    Financial support to make quality education more accessible
                                </p>

                                <a href="#" className="cta" onClick={() => {
                                    setModalOpenFor("explore");
                                    dispatch(openModal());
                                }}>
                                    <span>Explore</span>
                                    <svg width="13px" height="10px" viewBox="0 0 13 10">
                                        <path d="M1,5 L11,5"></path>
                                        <polyline points="8 1 12 5 8 9"></polyline>
                                    </svg>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            {/* WHY CHOOSE US */}
            <section className="marketing_content_area section-padding">
                <div className="container">
                    <div className="ab_content">
                        <h2 className="text-center">
                            What Makes Udaan Scholars Different
                        </h2>
                        {/* <p className="text-center">
                            From choosing the right course to securing your admission, we support you at every step of your higher education journey.
                        </p> */}
                    </div>


                    <div className="row">

                        <div className="col-lg-4 col-sm-6 col-xs-12 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="single_feature_one">
                                <div className="sf_top">
                                    <span className="ti-book ss_one"><i class="fa fa-info-circle"></i></span>
                                    <h2><a href="/single-service"> Guidance That Feels Personal</a></h2>
                                </div>
                                <p>We don’t give template advice — every recommendation is tailored to your goals, strengths, and situation. </p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 col-xs-12 wow fadeInUp" data-wow-delay="0.2s">
                            <div className="single_feature_one">
                                <div className="sf_top">
                                    <span className="ti-heart ss_two"><i class="fa fa-user"></i></span>
                                    <h2><a href="/single-service">Clarity Over Confusion</a></h2>
                                </div>
                                <p>No overwhelming options. We simplify choices so you can take clear, confident decisions.</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 col-xs-12 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="single_feature_one">
                                <div className="sf_top">
                                    <span className="ti-user ss_three"><i class="fa fa-group"></i></span>
                                    <h2><a href="/single-service">We Recommend, Not Sell</a></h2>
                                </div>
                                <p>Our focus is your future — not promoting random colleges.</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 col-xs-12 wow fadeInUp" data-wow-delay="0.4s">
                            <div className="single_feature_one">
                                <div className="sf_top">
                                    <span className="ti-eye ss_four"><i class="fa fa-list-alt"></i></span>
                                    <h2><a href="/single-service">Opportunities Beyond Limits</a></h2>
                                </div>
                                <p>From local colleges to global institutes — we open doors you didn’t know existed.</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 col-xs-12 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="single_feature_one">
                                <div className="sf_top">
                                    <span className="ti-light-bulb ss_five"><i class="fa fa-graduation-cap"></i></span>
                                    <h2><a href="/single-service"> Career-Focused Approach</a></h2>
                                </div>
                                <p>We don’t just help you get admission — we help you build a long-term career path.</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 col-xs-12 wow fadeInUp" data-wow-delay="0.6s">
                            <div className="single_feature_one">
                                <div className="sf_top">
                                    <span className="ti-email ss_six"><i class="fa fa-life-ring fa-2x" aria-hidden="true"></i></span>
                                    <h2><a href="/single-service">Support That Stays With You</a></h2>
                                </div>
                                <p>From counselling to course completion — we stay connected at every step.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* FUN FACT / COUNTS */}
            {/* <section id="counts" className="counts section-padding">
                <div className="container" data-aos="fade-up">
                    <div className="section-title">
                        <h2>Some Fun Fact</h2>
                        <p>
                            Our Great <span><u>Achievement</u></span>
                        </p>
                    </div>

                    <div className="row gy-4">
                        {[
                            { icon: "fa fa-users", count: 8232, text: "Enrolled Students", color: "#bb0852" },
                            { icon: "fa fa-university", count: 521, text: "Colleges", color: "#ee6c20" },
                            { icon: "fa fa-trophy", count: 163, text: "Winning Award", color: "#15be56" },
                            { icon: "fa fa-certificate", count: 93, text: "Certified Students", color: "#bb0852" },
                        ].map((item, index) => (
                            <div className="col-lg-3 col-md-6" key={index}>
                                <div className="count-box">
                                    <i className={item.icon} style={{ color: item.color }}></i>
                                    <div>
                                        <span className="purecounter">{item.count}</span>
                                        <p>{item.text}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}






            {/* FAQ SECTION */}






            {/* <section className="partner_ins_section">
                <div className="partner_ins_container">

                    <div className="ab_content">
                        <h2 className="text-center">
                            Our Partner
                        </h2>
                        
                    </div>

                    <div className="partner_ins_grid">
                        {partners.map((partner, index) => (
                            <div className="partner_ins_card" key={index}>
                                <div className="partner_ins_logo">
                                    <img src={partner.logo} alt={partner.name} />
                                </div>
                                <p className="partner_ins_name">{partner.name}</p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-3">
                        <button className="btn_one " onClick={() => openGallery(0)}>
                            Read More
                        </button>
                    </div>
                </div>
            </section> */}





            <FaqComponent section="about_us" />
            {showModal && (
                <div className="gallery-modal">
                    <div className="gallery-content">

                        <button className="close-btn" onClick={() => setShowModal(false)}>×</button>

                        <button className="nav-btn left" onClick={prevSlide}>❮</button>

                        <div className="image-container">
                            <img
                                src={partners[currentIndex].logo}
                                alt="Selected Alumni"
                            />
                            <div className="feedback-box">
                                <h5>{partners[currentIndex].name}</h5>
                            </div>
                        </div>

                        <button className="nav-btn right" onClick={nextSlide}>❯</button>

                    </div>
                </div>
            )}
            {isModalOpen && <UniversityModal sectionFrom={modalOpenFor} />}
        </div>



    );
};

export default About;