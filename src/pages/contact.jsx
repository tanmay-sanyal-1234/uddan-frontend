import { contact_image } from "../assets/images/index.js";
import React ,{ useState,useCallback} from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./contact.css";
import { FaFacebook, FaInstagram, FaWhatsapp, FaTwitter } from 'react-icons/fa';
import Select from 'react-select';
import { toast } from 'react-toastify';
import FullPageLoader from "@/components/FullPageLoader";
import {  email, z } from "zod";
import { useGetCourses,useGetCity} from "@/hooks/collegeHook";
import {useContactForm} from "@/hooks/contactUsHook";
const Contact = () => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        fName: "",
        lName: "",
        email: "",
        phone: "",
        course: null,
        city: null,
        subject: "",
        message: ""
    });
        const [errors, setErrors] = useState({});
        const { data: coursesData, isFetching: isFetchingCourses } = useGetCourses();
    const { data: cityData, isFetching: isFetchingcity } = useGetCity();
    const { mutateAsync: useContactFormAdd, isPending } = useContactForm();
    const courseOption = useCallback(() => {
        if (!isFetchingCourses && coursesData) {
            return coursesData.map(course => ({ value: course._id, label: course.name }));
        } else {
            return [];
        }
    }, [isFetchingCourses, coursesData])
    const cityOption = useCallback(() => {
        if (cityData && !isFetchingcity) {
            return cityData.map(city => ({ value: city._id, label: city.name }));
            
        } else {
            return [];
        }
    }, [isFetchingcity, cityData])
    const contactSchema = z.object({
        fName: z.string().min(1, "First name is required"),
        lName: z.string().min(1, "Last name is required"),
        email: z.string().email("Invalid email"),
        phone: z.string().min(10, "Phone must be at least 10 digits"),
        city: z.object({
            value: z.string(),
            label: z.string()
        }).nullable().refine(val => val !== null, {
            message: "City is required"
        }),
        course: z.object({
            value: z.string(),
            label: z.string()
        }).nullable().refine(val => val !== null, {
            message: "Course is required"
        }),

        // ✅ OPTIONAL FIELDS
        subject: z.string().optional(),
        message: z.string().optional()
    });

    const handleSubmit = async() => {
        const result = contactSchema.safeParse(form);

    if (!result.success) {

        const fieldErrors = {};

        result.error.issues.forEach(err => {
            const field = err.path[0];
            fieldErrors[field] = err.message;
        });

        setErrors(fieldErrors);
        return;
    }
    setLoading(true);
    setErrors({});

    let playload = {
        name:`${form.fName} ${form.lName}`,
        email:form.email,
        subject:form.subject,
        message:form.message,
        courseId:form.course?.value || null,
        cityId:form.city?.value || null,
        phone:form.phone
    }

    await useContactFormAdd(playload, {
            onSuccess: (data) => {
                if(data.success){

                    setLoading(false);
                    console.log(data, "success")
                    setForm({
                        fName: "",
                        lName: "",
                        email: "",
                        phone: "",
                        course: null,
                        city: null,
                        subject: "",
                        message: ""
                    })
                    toast.success("Thanks! Our team will contact you soon 🚀");
                }else{
                    toast.error("Failed to send message. Try again ❌");
                }
                
            },
            onError: (error) => {
                setLoading(false);
                    toast.error("Failed to send message. Try again ❌");
                console.log(error, "error")
            }
        })

        
    }
    return (
        <>
            <section className="section-top" style={{ backgroundImage: `url(${contact_image})` }}>

            </section>
            <div className="contact-us-page-section-all">
                {loading && <FullPageLoader />}
                <Container>
                    <Row className="align-items-stretch contact-main-row">

                        {/* LEFT FORM */}
                        <Col lg={8}>
                            <div className="contact-form-box">

                                <h2 className="heading">Send us a message</h2>
                                <p className="sub-heading">
                                    Do you have a question? A complaint? Or need help choosing the right product?
                                </p>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control placeholder="Enter your first name" name="fName" value={form.fName}
                                            onChange={(e)=> setForm({...form , fName:e.target.value})}/>
                                            {errors.fName && <span className="text-danger">{errors.fName}</span>}
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control placeholder="Enter your last name" name="lName" value={form.lName}
                                            onChange={(e)=> setForm({...form , lName:e.target.value})}/>
                                            {errors.lName && <span className="text-danger">{errors.lName}</span>}
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control placeholder="Enter your email" name="email" value={form.email}
                                            onChange={(e)=> setForm({...form , email:e.target.value})}/>
                                            {errors.email && <span className="text-danger">{errors.email}</span>}
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Contact</Form.Label>
                                            <Form.Control type="number" placeholder="Enter your contact number" name="phone" value={form.phone}
                                            onChange={(e)=> setForm({...form , phone:e.target.value})} />
                                            {errors.phone && <span className="text-danger">{errors.phone}</span>}
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>City</Form.Label>
                                            <Select
                                                name="city"
                                                className="mb-2"
                                                placeholder="Select City"
                                                isLoading={isFetchingcity}
                                                value={form.city}
                                                onChange={(selected) =>
                                                    setForm({ ...form, city: selected })
                                                }
                                                
                                                options={cityOption()}
                                            />
                                            {errors.city && <span className="text-danger">{errors.city}</span>}
                                            </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Course</Form.Label>
                                            <Select
                                                name="course"
                                                className="mb-2"
                                                placeholder="Select Course"
                                                isLoading={isFetchingCourses}
                                                value={form.course}
                                                onChange={(selected) =>
                                                    setForm({ ...form, course: selected })
                                                }
                                                options={courseOption()}
                                            />
                                            {errors.course && <span className="text-danger">{errors.course}</span>}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group className="mb-3">
                                    <Form.Label>Subject</Form.Label>
                        
                                       
                                    <Form.Control placeholder="Enter Subject" name="subject" value={form.subject}
                                        onChange={(e)=> setForm({...form , subject:e.target.value})} />
                                        {errors.subject && <span className="text-danger">{errors.subject}</span>}
                                   
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        placeholder="Enter your message"
                                        name="message"
                                        value={form.message}
                                        onChange={(e)=> setForm({...form , message:e.target.value})}
                                    />
                                    {errors.message && <span className="text-danger">{errors.message}</span>}
                                </Form.Group>
                                <button className="btn_one " type="button" onClick={handleSubmit}>
                                    Send a Message
                                </button>
                                {/* <Button className="submit-btn">Send a Message</Button> */}

                            </div>
                        </Col>

                        {/* RIGHT CARD */}
                        <Col lg={4}>
                            <div className="contact-info-box">

                                <h4 className="info-title">
                                    Hi! We are always here to help you.
                                </h4>

                                <div className="info-card">
                                    <div className="info-label">Hotline</div>
                                    <div className="info-value">+971 55 409 3456</div>
                                </div>

                                <div className="info-card">
                                    <div className="info-label">SMS / Whatsapp</div>
                                    <div className="info-value">+971 55 343 6433</div>
                                </div>

                                <div className="info-card">
                                    <div className="info-label">Email</div>
                                    <div className="info-value">support@email.com</div>
                                </div>

                                <div className="social-section">
                                    <div className="social-title">Connect with us</div>

                                    <div className="social-icons">
                                        <i className="fa-brands"><FaFacebook width={200} height={200} /></i>
                                        <i className="fa-brands ">
                                            <FaTwitter />
                                        </i>
                                        <i className="fa-brands ">
                                            <FaInstagram />
                                        </i>
                                        <i className="fa-brands ">
                                            <FaWhatsapp />
                                        </i>

                                    </div>
                                </div>

                            </div>
                        </Col>

                    </Row>
                </Container>
            </div>
        </>
    );
};

export default Contact;
