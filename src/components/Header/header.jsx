import { useState } from "react";
import { logo } from "../../assets/images/index";
import { NavLink } from "react-router-dom";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <div
                id="navigation"
                className="ffixed-top navbar-light bg-faded site-navigation navbar-fixed"
            >
                <div className="top_menu_bg">
                    <div className="row align-items-center">

                        {/* Logo */}
                        <div className="col-lg-6 col-md-3 col-6">
                            <div className="site-logo">
                                <a href="/">
                                    <img src={logo} alt="Site Logo" />
                                </a>
                            </div>
                        </div>

                        {/* Hamburger (Mobile) */}
                        <div className="col-6 d-lg-none d-flex justify-content-end">
                            <button
                                className="mobile-toggle"
                                onClick={() => setMenuOpen(!menuOpen)}
                            >
                                <i className={menuOpen ? "fa fa-times" : "fa fa-bars"} />
                            </button>
                        </div>

                        {/* Desktop Menu */}
                        <div className="col-lg-4 d-none d-lg-block">
                            <nav id="main-menu">
                                <ul>
                                    <li>
                                        <NavLink to="/" end>
                                            Home
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="/about-us">
                                            About Us
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="/colleges">
                                            Colleges
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="/contact-us">
                                            Contact
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="/blogs">
                                            Blogs
                                        </NavLink>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        {/* Desktop CTA */}
                        <div className="col-lg-2 d-none d-lg-block">
                            <div className="call_to_action text-end">
                                <a className="btn_two" href="/refer-and-earn">
                                    Refer & Earn 🎁
                                </a>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
                    <ul>
                        <li><a href="/" onClick={() => setMenuOpen(false)}>Home</a></li>
                        <li><a href="/about-us" onClick={() => setMenuOpen(false)}>About Us</a></li>
                        <li><a href="/colleges" onClick={() => setMenuOpen(false)}>Colleges</a></li>
                        <li><a href="/contact-us" onClick={() => setMenuOpen(false)}>Contact</a></li>
                        <li><a href="/blogs" onClick={() => setMenuOpen(false)}>Blogs</a></li>
                        <li className="mobile-cta">
                            <a className="btn_two" href="/refer-and-earn">
                                Refer & Earn 🎁
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Header;
