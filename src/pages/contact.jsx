import { contact_image } from "../assets/images/index.js";

const Contact = () => {
    return (
        <div>
            <section className="section-top" style={{ backgroundImage: `url(${contact_image})` }}>
                <div className="container">
                    <div className="col-lg-10 offset-lg-1 text-center">
                        <div
                            className="section-top-title wow fadeInRight"
                            data-wow-duration="1s"
                            data-wow-delay="0.3s"
                            data-wow-offset="0"
                        >
                            <h1>Get In Touch</h1>
                            <ul>
                                <li>
                                    <a href="/">Home</a>
                                </li>
                                <li> / Contact</li>
                            </ul>
                        </div>
                        {/* //.HERO-TEXT */}
                    </div>
                    {/* END COL */}
                </div>
                {/* END CONTAINER */}
            </section>

            <section className="address_area">
                <div className="container">
                    <div className="row text-center">

                        <div
                            className="col-lg-4 col-sm-4 col-xs-12 no-padding wow fadeInUp"
                            data-wow-duration="1s"
                            data-wow-delay="0.1s"
                            data-wow-offset="0"
                        >
                            <div className="single_address sa_one">
                                <i class="fa fa-map-marker" aria-hidden="true"></i>
                                <h4>Our Location</h4>
                                <p>
                                    Kolkata
                                </p>
                            </div>
                        </div>
                        {/* END COL */}

                        <div
                            className="col-lg-4 col-sm-4 col-xs-12 no-padding wow fadeInUp"
                            data-wow-duration="1s"
                            data-wow-delay="0.2s"
                            data-wow-offset="0"
                        >
                            <div className="single_address sa_two">
                                <i class="fa fa-phone" aria-hidden="true"></i>
                                <h4>Telephone</h4>
                                <p>+91 97341 66618</p>
                            </div>
                        </div>
                        {/* END COL */}

                        <div
                            className="col-lg-4 col-sm-4 col-xs-12 no-padding wow fadeInUp"
                            data-wow-duration="1s"
                            data-wow-delay="0.3s"
                            data-wow-offset="0"
                        >
                            <div className="single_address sa_three">
                                <i class="fa fa-paper-plane" aria-hidden="true"></i>
                                <h4>Send email</h4>
                                <p>contact@udaanscholars.com</p>
                            </div>
                        </div>
                        {/* END COL */}

                    </div>
                    {/* END ROW */}
                </div>
                {/* END CONTAINER */}
            </section>

            <div id="contact" className="contact_area section-padding">
                <div className="container">
                    <div className="row">

                        {/* Contact Form */}
                        <div
                            className="col-lg-7 col-sm-12 col-xs-12 wow fadeInUp"
                            data-wow-duration="1s"
                            data-wow-delay="0.2s"
                            data-wow-offset="0"
                        >
                            <div className="section-title-two">
                                <h2>Send your message.</h2>
                            </div>

                            <div className="contact">
                                <form className="form">
                                    <div className="row">

                                        <div className="form-group col-md-6">
                                            <label>Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                required
                                            />
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label>Your Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                required
                                            />
                                        </div>

                                        <div className="form-group col-md-12">
                                            <label>Your Subject</label>
                                            <input
                                                type="text"
                                                name="subject"
                                                className="form-control"
                                                required
                                            />
                                        </div>

                                        <div className="form-group col-md-12">
                                            <label>Your Message</label>
                                            <textarea
                                                rows="6"
                                                name="message"
                                                className="form-control"
                                                required
                                            ></textarea>
                                        </div>

                                        <div className="col-md-12 text-center">
                                            <button
                                                type="submit"
                                                className="btn_one"
                                                title="Submit Your Message!"
                                            >
                                                Send Message
                                            </button>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* END COL */}

                        {/* Google Map */}
                        <div
                            className="col-lg-5 col-sm-12 col-xs-12 wow fadeInUp"
                            data-wow-duration="1s"
                            data-wow-delay="0.2s"
                            data-wow-offset="0"
                        >
                            <div className="map">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27661.54464133969!2d88.35180083608293!3d22.529580835696194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02771346ae015d%3A0xb540e4bce39763!2sVictoria%20Memorial!5e0!3m2!1sen!2sin!4v1766086869094!5m2!1sen!2sin"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Google Map"
                                ></iframe>
                            </div>
                        </div>
                        {/* END COL */}

                    </div>
                    {/* END ROW */}
                </div>
                {/* END CONTAINER */}
            </div>

        </div>
    );
};

export default Contact;
