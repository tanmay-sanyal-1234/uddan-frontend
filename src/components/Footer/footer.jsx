import { useEffect, useState } from "react";
import { footer_logo } from "../../assets/images/index";
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
                        <div className="col-lg-3 col-sm-6 col-xs-12">
                            <div className="single_footer">
                                <a href="/">
                                    <img
                                        src={footer_logo}
                                        alt="Footer Logo"
                                    />
                                </a>
                                <p>
                                    Udaan Scholars is a student-first career counselling and admission guidance platform helping students across India choose the right future.
                                </p>
                            </div>

                            <div className="foot_social">
                                <ul>
                                    <li><a href="http://">
                                        <img src="https://img.icons8.com/ios-filled/50/ffffff/twitter.png" alt="Twitter" />
                                    </a></li>
                                    <li><a href="http://">
                                        <img src="https://img.icons8.com/ios-filled/50/ffffff/facebook-new.png" alt="Facebook" />
                                    </a></li>
                                    <li><a href="http://">
                                        <img src="https://img.icons8.com/ios-filled/50/ffffff/instagram-new.png" alt="Instagram" />
                                    </a></li>
                                    <li><a href="http://">
                                        <img src="https://img.icons8.com/ios-filled/50/ffffff/youtube-play.png" alt="YouTube" />
                                    </a></li>
                                </ul>
                            </div>
                        </div>

                        {/* Courses */}
                        <div className="col-lg-3 col-sm-6 col-xs-12">
                            <div className="single_footer">
                                <h4>Quick Links</h4>
                                <ul>
                                    <li><a href="#">Home</a></li>
                                    <li><a href="#">About</a></li>
                                    <li><a href="#">Contact</a></li>
                                    <li><a href="#">Refer & Earn</a></li>
                                    <li><a href="#">Blog</a></li>
                                </ul>
                            </div>
                        </div>

                        {/* Company */}
                        <div className="col-lg-3 col-sm-6 col-xs-12">
                            <div className="single_footer">
                                <h4>Company</h4>
                                <ul>
                                    <li><a href="#">About us</a></li>
                                    <li><a href="#">Knowledge Base</a></li>
                                    <li><a href="#">Affiliate Program</a></li>
                                    <li><a href="#">Community</a></li>
                                    <li><a href="#">Market API</a></li>
                                    <li><a href="#">Support team</a></li>
                                </ul>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="col-lg-3 col-sm-6 col-xs-12">
                            <div className="single_footer">
                                <h4>Contact Info</h4>

                                <div className="sf_contact">
                                    <p>Damani Bhawan , Chinar Park , Kolkata , India</p>
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

                        <div className="col-lg-6 col-sm-6 col-xs-12">
                            <div className="footer_menu">
                                <ul>
                                    <li><a href="#">Terms of use</a></li>
                                    <li><a href="#">Privacy Policy</a></li>
                                    <li><a href="#">Cookie Policy</a></li>
                                </ul>
                            </div>
                        </div>
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
