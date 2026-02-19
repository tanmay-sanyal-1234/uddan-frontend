import React, { useState } from "react";
import { about_banner, skillImage, faq_img } from "../assets/images";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const About = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const partners = [
        "https://cdn.gamma.app/wgu6c0i1jdpm1pv/93ea745d085c45d18a1c10775d13a3dd/optimized/Asset-1-2.svg",
        "https://cdn.gamma.app/wgu6c0i1jdpm1pv/c171101356644c19baa387caa516b39a/original/logo-2.png",
        "https://cdn.gamma.app/wgu6c0i1jdpm1pv/4f8a9164ee7f470c8010fe85dce0683b/original/Jaipuria_Institute_of_management_logo-1200x319-2.webp",
        "https://cdn.gamma.app/wgu6c0i1jdpm1pv/a02a36e2cf284b2eb488a1777a280eb6/original/ISBRlogo.png",
        "https://cdn.gamma.app/wgu6c0i1jdpm1pv/d03375b1727943e5b1fc747e6f0bb9fe/original/BIBS-Logo-white.webp",
        "https://cdn.gamma.app/wgu6c0i1jdpm1pv/c15462912ccc40a18bd7991e15311d9f/optimized/AIMS-logo.svg",
        "https://cdn.gamma.app/wgu6c0i1jdpm1pv/10a32d3af6d840f7a1a9a4b3d81559a9/original/gibs-bangalore-logo.png",
        "https://cdn.gamma.app/wgu6c0i1jdpm1pv/763cfc147b9249bdac1d5bfaae8b9bc2/original/Globe-and-ISME-Logo.webp",
        "https://cdn.gamma.app/wgu6c0i1jdpm1pv/b093f29ce523441292bbf4c51782e5da/original/logo-1.png",
        "https://cdn.gamma.app/wgu6c0i1jdpm1pv/4e36c791a17c4fc8b0901225f8969030/original/logo-4.png",
        "https://cdn.gamma.app/wgu6c0i1jdpm1pv/ab7785f6825c4262a43b79759ac17f7b/original/logo.png",
        "https://cdn.gamma.app/wgu6c0i1jdpm1pv/6b18977271c9438294e68639364fa761/original/logo.webp",
        "https://cdn.gamma.app/wgu6c0i1jdpm1pv/192553e14c7e48d5ae825dad1365082e/optimized/174df9_1a4f9315e28d4873bb2616c8c041dc9f_mv2.avif",
        "https://cdn.gamma.app/wgu6c0i1jdpm1pv/6e260505504642faab5bb204a7763b43/original/logo-3.png",
        "https://cdn.gamma.app/wgu6c0i1jdpm1pv/ef19aebbd26845b5bae065d600ccd13f/original/logo-4.png",
        "https://cdn.gamma.app/wgu6c0i1jdpm1pv/c1bfe691cd6b4faa80c2fbc5d7ecaa16/original/TNU-Logo-Last-01-e1751626402981.png",
        "https://cdn.gamma.app/wgu6c0i1jdpm1pv/28833ab97b68462aab0a76183d362e8d/original/au-footer-logo.png",
        "https://cdn.gamma.app/wgu6c0i1jdpm1pv/61d7f4d84a5b4ac2be8864ea56a87a9a/optimized/nmit-logo.svg",
        "https://cdn.gamma.app/wgu6c0i1jdpm1pv/d856a46313da4819978b7fe8291e7f9f/original/logo-alliance-university.webp",
    ];
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
            <section className="section-top" style={{ backgroundImage: `url(${about_banner})` }}>
                <div className="container">
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
                </div>
            </section>


            {/* TOP FEATURES */}
            <section className="tp_feature section-padding">
                <div className="container-fluid">
                    <div className="row">

                        <div className="col-lg-4 col-sm-4 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.2s">
                            <div className="single_tp">
                                <h3>Quality Education</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur notted adipisicing elit sed do eiusmod tempor incididunt ut labore.
                                </p>
                                <a href="#" className="cta">
                                    <span>Explore</span>
                                    <svg width="13px" height="10px" viewBox="0 0 13 10">
                                        <path d="M1,5 L11,5"></path>
                                        <polyline points="8 1 12 5 8 9"></polyline>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-4 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.3s">
                            <div className="single_tp">
                                <h3>Experienced Teachers</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur notted adipisicing elit sed do eiusmod tempor incididunt ut labore.
                                </p>
                                <a href="#" className="cta">
                                    <span>Explore</span>
                                    <svg width="13px" height="10px" viewBox="0 0 13 10">
                                        <path d="M1,5 L11,5"></path>
                                        <polyline points="8 1 12 5 8 9"></polyline>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-4 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.4s">
                            <div className="single_tp">
                                <h3>Life Time Support</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur notted adipisicing elit sed do eiusmod tempor incididunt ut labore.
                                </p>
                                <a href="#" className="cta">
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

            {/* ABOUT SECTION */}
            <section className="ab_one section-padding">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-6 col-sm-12 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.2s">
                            <div className="ab_img">
                                <img
                                    src={skillImage}
                                    className="img-fluid"
                                    alt="About"
                                />
                            </div>
                        </div>

                        <div className="col-lg-6 col-sm-12 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.1s">
                            <div className="ab_content">
                                <h2>
                                    Learn new skills to go <u><span>ahead for your </span></u> career.
                                </h2>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur notted adipisicing elit sed do eiusmod tempor incididunt ut labore et simply.
                                </p>
                                <p>
                                    <strong>
                                        Auto-generate catchy original and high-converting copies in popular tones languages.
                                    </strong>
                                </p>
                                <a className="btn_one" href="/about">
                                    Read More us
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* WHY CHOOSE US */}
            <section className="marketing_content_area section-padding">
                <div className="container">

                    <div className="section-title">
                        <h2>Why Choose Udaan Scholars</h2>
                        <p>
                            Find the <span><u>best features</u></span> of Udaan Scholars.
                        </p>
                    </div>

                    <div className="row">

                        <div className="col-lg-4 col-sm-6 col-xs-12 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="single_feature_one">
                                <div className="sf_top">
                                    <span className="ti-book ss_one"><i class="fa fa-info-circle"></i></span>
                                    <h2><a href="/single-service">Learn More Anywhere</a></h2>
                                </div>
                                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor ut labore.</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 col-xs-12 wow fadeInUp" data-wow-delay="0.2s">
                            <div className="single_feature_one">
                                <div className="sf_top">
                                    <span className="ti-heart ss_two"><i class="fa fa-user"></i></span>
                                    <h2><a href="/single-service">Expert Instructor</a></h2>
                                </div>
                                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor ut labore.</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 col-xs-12 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="single_feature_one">
                                <div className="sf_top">
                                    <span className="ti-user ss_three"><i class="fa fa-group"></i></span>
                                    <h2><a href="/single-service">Team Management</a></h2>
                                </div>
                                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor ut labore.</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 col-xs-12 wow fadeInUp" data-wow-delay="0.4s">
                            <div className="single_feature_one">
                                <div className="sf_top">
                                    <span className="ti-eye ss_four"><i class="fa fa-list-alt"></i></span>
                                    <h2><a href="/single-service">Course Planning</a></h2>
                                </div>
                                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor ut labore.</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 col-xs-12 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="single_feature_one">
                                <div className="sf_top">
                                    <span className="ti-light-bulb ss_five"><i class="fa fa-graduation-cap"></i></span>
                                    <h2><a href="/single-service">Teacher Monitoring</a></h2>
                                </div>
                                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor ut labore.</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 col-xs-12 wow fadeInUp" data-wow-delay="0.6s">
                            <div className="single_feature_one">
                                <div className="sf_top">
                                    <span className="ti-email ss_six"><i class="fa fa-life-ring fa-2x" aria-hidden="true"></i></span>
                                    <h2><a href="/single-service">24/7 Strong Support</a></h2>
                                </div>
                                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor ut labore.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* FUN FACT / COUNTS */}
            <section id="counts" className="counts section-padding">
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
            </section>

            <div className="partner-logo section-padding">
                <div className="container">
                    <div className="row">
                        {/* LEFT CONTENT */}
                        <div className="col-lg-6">
                            <div className="partner_title">
                                <h4>Our Partner</h4>
                                <h1>Trusted Company Arround The World!</h1>
                                <p>
                                    Lorem ipsum dolor sit amet consectur adipiscing elit sed eiusmod
                                    tempor incididunt.
                                </p>
                            </div>
                        </div>

                        {/* RIGHT LOGOS */}
                        <div className="col-lg-6">
  <Slider {...partnerSettings}>
    {partners.map((logo, index) => (
      <div key={index} className="px-3">
        <div className="partner_logo">
          <a href="#" aria-label={`Partner ${index + 1}`}>
            <img
              src={logo}
              alt={`Partner ${index + 1}`}
              className="img-fluid"
            />
          </a>
        </div>
      </div>
    ))}
  </Slider>
</div>
                    </div>
                </div>
            </div>

            {/* FAQ SECTION */}


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

    );
};

export default About;