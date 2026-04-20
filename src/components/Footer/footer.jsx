import { useEffect, useState } from "react";
import { footer_logo } from "../../assets/images/index";
import { Link } from "react-router-dom";
const Footer = () => {
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowTop(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <>
            <div className="footer section-padding">
                <div className="container">
                    <div className="row">

                        {/* Logo & About */}
                        <div className="col-lg-4 col-sm-6 col-xs-12">
                            <div className="single_footer">
                                {/* <a href="/">
                                    <img
                                        src={footer_logo}
                                        alt="Footer Logo"
                                    />
                                </a> */}
                                <p>
                                    A modern education platform offering Free career counselling, college admissions & scholarships up to ₹50,000 — all in one place.Udaan Scholars helps you choose the right future, not just a college.
                                </p>
                            </div>

                            <div className="foot_social">
                                <ul>
                                    <li><a href="https://www.linkedin.com/company/udaan-scholars/" target="_blank">
                                        <img src="https://img.icons8.com/ios-filled/50/ffffff/linkedin.png" alt="LinkedIn" />
                                    </a></li>
                                    <li><a href="https://www.facebook.com/UdaanScholars" target="_blank">
                                        <img src="https://img.icons8.com/ios-filled/50/ffffff/facebook-new.png" alt="Facebook" />
                                    </a></li>
                                    <li><a href="https://www.instagram.com/udaanscholars?igsh=MTk3NThqM2tlOG1rbA==" target="_blank">
                                        <img src="https://img.icons8.com/ios-filled/50/ffffff/instagram-new.png" alt="Instagram" />
                                    </a></li>
                                    <li><a href="https://www.youtube.com/@UdaanScholars" target="_blank">
                                        <img src="https://img.icons8.com/ios-filled/50/ffffff/youtube-play.png" alt="YouTube" />
                                    </a></li>
                                </ul>
                            </div>
                        </div>

                        {/* Courses */}
                        <div className="col-lg-4 col-sm-6 col-xs-12">
                            <div className="single_footer">
                                <h4>Quick Links</h4>
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/about-us">About</Link></li>
                                    <li><Link to="/contact-us">Contact</Link></li>
                                    <li><Link to="/refer-and-earn">Refer & Earn</Link></li>
                                    <li><Link to="/blogs">Blog</Link></li>
                                </ul>
                            </div>
                        </div>


                        {/* Contact Info */}
                        <div className="col-lg-4 col-sm-6 col-xs-12">
                            <div className="single_footer">
                                <h4>Contact Info</h4>

                                <div className="sf_contact">
                                    <p>Shivanna Building – 31, Dasarahalli, Byatarayanapura, Bengaluru, Karnataka 560024</p>
                                    <p><i class="fa fa-phone" aria-hidden="true"></i>  <a href="tel:+919734166618">+91 9734166618</a></p>
                                    <p><i class="fa fa-envelope" aria-hidden="true"></i>  <a href="mailto:uddanscholars@gmail.com">uddanscholars@gmail.com</a></p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Footer Bottom */}
                    <div className="row fc">
                        <div className="col-lg-6 col-sm-6 col-xs-12">
                            <div className="footer_copyright">
                                <p>&copy; {new Date().getFullYear()}. All Rights Reserved.</p>
                            </div>
                        </div>

                        {/* <div className="col-lg-6 col-sm-6 col-xs-12">
                            <div className="footer_menu">
                                <ul>
                                    <li><a href="#">Terms of use</a></li>
                                    <li><a href="#">Privacy Policy</a></li>
                                    <li><a href="#">Cookie Policy</a></li>
                                </ul>
                            </div>
                        </div> */}
                    </div>

                </div>
            </div>

            {showTop && (
                <button className="scroll-top" onClick={scrollToTop}>
                    <i className="fa fa-arrow-up"></i>
                </button>
            )}
        </>
    );
};

export default Footer;
