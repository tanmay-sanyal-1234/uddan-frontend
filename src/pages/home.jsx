import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { student_profiling, One_on_One_Counselling, Action_Plan_Creation } from "../assets/images";
import Cities from "../components/cities";
import { useState, useMemo, useRef, useEffect } from "react";
import InstituteCard from "../components/instituteComponent";
import { Link, useNavigate } from "react-router-dom";
import { useGetCourses, useGetCollegeListHome, useGetCity } from "../hooks/collegeHook";
import SkeletonLoader from "@/components/SkeletonLoader";
import { Button , OverlayTrigger ,Overlay } from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import { apiImageWrapper } from "../utils/helpers";
import Select from "react-select";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
const Home = () => {

    const navigate = useNavigate();
    const [courseFilterId, setCourseFilterId] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    
        
    const { data: coursesData, isLoading: isLoadingCourses, isFetching: isFetchingCourses, error: coursesError } = useGetCourses();
    const { data: citiesData, isLoading: isLoadingCities, isFetching: isFetchingCities, error: citiesError } = useGetCity();
    const { data: collegeListData, isLoading: isCollegeListLoading, isFetching: isCollegeListFetching, refetch: refetchCollegeList, error: collegeListError } = useGetCollegeListHome({ courseId: courseFilterId });
    const [activeTab, setActiveTab] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
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
    const openGallery = (index) => {
        setCurrentIndex(index);
        setShowModal(true);
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % alumni.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? alumni.length - 1 : prev - 1
        );
    };
    const [homeBannerSearch, setHomeBannerSearch] = useState({
        course: null,
        city: null,
        budget: null
    })

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
    const blogs = [
        {
            img: "1.png",
            date: "August 26, 2024",
            category: "Education",
            title: "Professional Mobile Painting and Sculpting",
        },
        {
            img: "2.png",
            date: "August 26, 2024",
            category: "Education",
            title: "Professional Ceramic Moulding for Beginner",
        },
        {
            img: "3.png",
            date: "August 28, 2024",
            category: "Programming",
            title: "Education Is About Create Leaders For Tomorrow",
        },
    ];
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,

        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false, // better UX
                },
            },
            {
                breakpoint: 576, // better than 480
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
        ],
    };






    const alumni = [
        { id: 1, avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&q=80", companyLogo: partners[0], feedback: "Udaan Scholars transformed my college search experience. The personalized guidance and genuine support helped me find the perfect fit for my higher education journey.", name: "Rahul Sharma" },
        { id: 2, avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&q=80", companyLogo: partners[1], feedback: "I was overwhelmed with the college admission process, but Udaan Scholars made it so much easier. Their expert counseling and real student benefits gave me the confidence to make informed decisions.", name: "Anjali Verma" },
        { id: 3, avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&q=80", companyLogo: partners[2], feedback: "Udaan Scholars is a game-changer for students like me. The end-to-end personalized support and verified institutes made my college admission process stress-free and successful.", name: "Suresh Kumar" },
        { id: 4, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80", companyLogo: partners[3], feedback: "I can't thank Udaan Scholars enough for their guidance and support. The scholarships and financial benefits they offered made a significant difference in my higher education journey.", name: "Priya Patel" },
        { id: 5, avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&q=80", companyLogo: partners[4], feedback: "Udaan Scholars provided me with the clarity and trust I needed to navigate the college admission process. Their expert counseling and genuine support helped me make smart decisions for my future.", name: "Rajesh Gupta" },
        { id: 6, avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&q=80", companyLogo: partners[5], feedback: "Udaan Scholars is more than just a college counseling service. They truly care about their students and go above and beyond to ensure their success. I'm grateful for the personalized support I received throughout my higher education journey.", name: "Neha Singh" },
        { id: 7, avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80", companyLogo: partners[6], feedback: "Udaan Scholars made my college admission process seamless and stress-free. Their expert guidance and real student benefits helped me find the right college and career path for my future.", name: "Amitabh Choudhary" },
        { id: 8, avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&q=80", companyLogo: partners[7], feedback: "I highly recommend Udaan Scholars to any student looking for guidance in their higher education journey. Their personalized support and verified institutes helped me make informed decisions and secure my admission to the college of my dreams.", name: "Deepika Sharma" },
        { id: 9, avatar: "https://images.unsplash.com/photo-1524503033411-c9566986fc8f?w=400&q=80", companyLogo: partners[8], feedback: "Udaan Scholars is a trusted partner for students seeking guidance in their higher education journey. Their expert counseling and genuine support helped me navigate the college admission process with confidence and ease.", name: "Rohit Mehta" },
        { id: 10, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80", companyLogo: partners[9], feedback: "Udaan Scholars provided me with the clarity and trust I needed to navigate the college admission process. Their expert counseling and genuine support helped me make smart decisions for my future.", name: "Sneha Agarwal" },
        { id: 11, avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&q=80", companyLogo: partners[10], feedback: "Udaan Scholars is more than just a college counseling service. They truly care about their students and go above and beyond to ensure their success. I'm grateful for the personalized support I received throughout my higher education journey.", name: "Vikram Singh" },
        { id: 12, avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&q=80", companyLogo: partners[11], feedback: "Udaan Scholars made my college admission process seamless and stress-free. Their expert guidance and real student benefits helped me find the right college and career path for my future.", name: "Ananya Reddy" },
        { id: 13, avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80", companyLogo: partners[12], feedback: "Udaan Scholars is a trusted partner for students seeking guidance in their higher education journey. Their expert counseling and genuine support helped me navigate the college admission process with confidence and ease.", name: "Karan Sharma" },
    ];
    const scrollRef = useRef(null);

    const scrollCourse = (direction) => {
        const value = direction === "left" ? -250 : 250;
        scrollRef.current.scrollBy({
            left: value,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        if (!courseFilterId) {
            if (!isFetchingCourses && coursesData) {
                console.log("Setting course filter id to:", coursesData[0]?._id);
                const t = setTimeout(() => {
                    setCourseFilterId(coursesData[0]?._id);
                }, 0);
                return () => clearTimeout(t);
            }
        }
    }, [coursesData, isFetchingCourses, courseFilterId, setCourseFilterId])

    const getCities = useMemo(() => {
        if (citiesData && citiesData?.length > 0 && !isFetchingCities) {
            return citiesData?.map((city) => {
                return {
                    value: city._id,
                    label: city.name
                }
            })
        } else {
            return [];
        }
    }, [citiesData, isFetchingCities])

    const getCourseData = useMemo(() => {
        if (!isFetchingCourses && coursesData) {
            return coursesData?.map((cou) => {
                return {
                    value: cou._id,
                    label: cou.name
                }
            })
        } else {
            return [];
        }
    }, [coursesData, isFetchingCourses])

    const budgetRanges = [
        { value: "<100000", label: "Under ₹1,00,000" },
        { value: "100000-200000", label: "₹1,00,000 – ₹2,00,000" },
        { value: "200000-300000", label: "₹2,00,000 – ₹3,00,000" },
        { value: "300000-500000", label: "₹3,00,000 – ₹5,00,000" },
        { value: "500000-800000", label: "₹5,00,000 – ₹8,00,000" },
        { value: ">800000", label: "Above ₹8,00,000" },
    ];

    const handleChangeForSearch = (selectedOption, name) => {
        setHomeBannerSearch((prev) => ({
            ...prev,
            [name]: selectedOption?.value || null
        }));
    };

    const handleSearch = () => {
        const { course, city, budget } = homeBannerSearch;
        let queryParams = "";
        if (course) {
            queryParams += `course=${course}&`;
        }
        if (city) {
            queryParams += `city=${city}&`;
        }
        if (budget) {
            if (budget === "<100000") {
                queryParams += `maxPrice=100000&`;
            }
            else if (budget === ">800000") {
                queryParams += `minPrice=800000&`;
            }
            else {
                const [minBudget, maxBudget] = budget.split("-");
                queryParams += `minPrice=${minBudget}&maxPrice=${maxBudget}&`;
            }
        }
        navigate(`/colleges?${queryParams}`);
    }

    return (
        <div>
            <section id="home" className="home_bg mb-4" >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-sm-12 col-xs-12 text-center">

                            <div className="home_content">
                                <h1>
                                    Find the Right College & Career Path - With <br/>Expert Guidance
                                </h1>
                                <p>
                                    Udaan Scholars helps you make smart, stress-free decisions with expert counselling,
                                    verified institutes, and real student benefits.
                                </p>
                            </div>
                            <div className="home_sb">
                                <form className="banner_subs" onSubmit={(e) => e.preventDefault()}>
                                    <Select
                                        options={getCourseData}
                                        className="form-control home_si"
                                        placeholder="Courses"
                                        name="course"
                                        isLoading={isFetchingCourses}
                                        onChange={(e) => handleChangeForSearch(e, "course")}
                                        styles={{
                                            control: (base) => ({
                                                ...base,
                                                border: "none"
                                            }),
                                        }}
                                        isClearable
                                    />
                                    <Select
                                        options={getCities}
                                        className="form-control home_si"
                                        placeholder="Cities"
                                        name="city"
                                        isLoading={isFetchingCities}
                                        onChange={(e) => handleChangeForSearch(e, "city")}
                                        styles={{
                                            control: (base) => ({
                                                ...base,
                                                border: "none"
                                            }),
                                        }}
                                        isClearable
                                    />
                                    <Select
                                        options={budgetRanges}
                                        className="form-control home_si"
                                        placeholder="Budget Range"
                                        name="budget"
                                        onChange={(e) => handleChangeForSearch(e, "budget")}
                                        styles={{
                                            control: (base) => ({
                                                ...base,
                                                border: "none"
                                            }),
                                        }}
                                        isClearable
                                    />

                                    <button type="button" className="search_home_btn d-flex justify-content-center align-items-center" onClick={handleSearch}>
                                        Explore College <i className="fa fa-search"></i>
                                    </button>
                                </form>
                            </div>


                            <div className="home_tag">
                                <span>Popular Topic:</span>
                                {isFetchingCourses && (
                                    <SkeletonLoader count={1} width={300} height={20} />
                                )}
                                {getCourseData?.slice(0, 5).map((course) => (
                                    <Link key={course._id} to={`/colleges?course=${course.value}`}>{course.label}</Link>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <section className="tp_feature section-padding">
                <div className="container">

                    <div className="section_top text-center">
                        <h4>Top Cities</h4>
                        <h2>Explore the best cities for learning</h2>

                    </div>

                    <div className="row">

                        <div className="col-lg-12">

                            <Swiper
                                slidesPerView={5}
                                spaceBetween={12}
                                loop={true}
                                //   autoplay={{ delay: 3000 }}
                                navigation={true}
                                breakpoints={{
                                    0: {
                                        slidesPerView: 2, // 👈 mobile
                                    },
                                    768: {
                                        slidesPerView: 3,
                                    },
                                    992: {
                                        slidesPerView: 4,
                                    },
                                    1200: {
                                        slidesPerView: 5,
                                    }
                                }}
                                modules={[Autoplay, Navigation, Pagination]}
                            >


                                {isFetchingCities ? (
                                    <SkeletonLoader count={1} width={500} height={100} />
                                ) : (
                                    citiesData?.map((city) => {

                                        return (
                                            city?.isTop && (
                                                <SwiperSlide key={city._id}>
                                                    <div className="px-1">
                                                        <div className="rounded-2xl overflow-hidden border border-primary top-college" onClick={() => navigate(`/colleges?city=${city._id}`)} >
                                                            <img
                                                                src={apiImageWrapper(city?.image)}
                                                                alt={city?.name}
                                                                className="city-img"
                                                            />

                                                            <div className="city-content">
                                                                <h3>{city?.name}</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            )
                                        )

                                    })

                                )}
                            </Swiper>
                        </div>



                    </div>
                </div>
            </section>


            <section className="impact-section">
                <div className="container">
                    <div className="impact-wrapper">

                        {/* Left Content */}
                        <div className="impact-left">
                            <h2 className="impact-title">
                                Our Impact at a <br /> Glance.
                            </h2>

                            <p className="impact-description">
                                Empowering students and parents with trust, clarity, and strategic
                                solutions for unparalleled success.
                            </p>

                            <a href="#callback" className="impact-cta">
                                Request a callback <span className="arrow">→</span>
                            </a>
                        </div>

                        {/* Right Stats */}
                        <div className="impact-right">

                            <div className="impact-card">
                                <div className="impact-icon">
                                    <i className="fa fa-heart-o"></i>
                                </div>
                                <h4>5,500+ Students Counselled</h4>
                                <p>Helping students across India make confident career decisions through personalised guidance and real insights.</p>
                            </div>

                            <div className="impact-card">
                                <div className="impact-icon">
                                    <i className="fa fa-thumbs-o-up"></i>
                                </div>
                                <h4>93% Student Satisfaction Rate</h4>
                                <p>Because we don’t sell colleges — we recommend what actually fits the student.</p>
                            </div>

                            <div className="impact-card">
                                <div className="impact-icon">
                                    <i className="fa fa-line-chart"></i>
                                </div>
                                <h4>Up to ₹25,000 Cashback After Admission</h4>
                                <p>Every successful enrolment comes with financial benefits, not hidden charges.</p>
                            </div>

                            <div className="impact-card">
                                <div className="impact-icon">
                                    <i className="fa fa-star-o"></i>
                                </div>
                                <h4>End-to-End Personalised Support</h4>
                                <p>From counselling to admission — and even support till course completion.</p>
                            </div>

                        </div>
                    </div>
                </div>
            </section>



            <section className="ab_one section-padding">
                <div className="container">
                    <div className="ab_content">
                        <h2 className="text-center">
                            How It Works
                        </h2>
                        <p className="text-center">
                            From choosing the right course to securing your admission, we support you at every step of your higher education journey.
                        </p>
                    </div>

                    <div className="col-lg-12 howitsection1 p-4 ps-5 pe-5 rounded-3 mb-4">
                        <div className="row align-items-center">

                            <div className="col-lg-3 text-center text-lg-start">
                                <h4>Student Profiling</h4>
                                <img src={student_profiling} className="img-fluid" alt="Student Profiling" />
                            </div>
                            <div className="col-lg-3"></div>
                            <div className="col-lg-6 d-flex align-items-center howitworkT">
                                <p className="mb-0">
                                    Gather deep insights into student strengths,
                                    weaknesses, interests, and potential through
                                    structured assessments and data-driven evaluation techniques.
                                </p>
                            </div>

                        </div>
                    </div>
                    <div className="col-lg-12 p-4 rounded-3 mb-4 ps-5 pe-5">
                        <div className="row align-items-center flex-lg-row-reverse">

                            <div className="col-lg-3 text-center text-lg-start">
                                <h4>One-on-One Counselling</h4>
                                <img src={One_on_One_Counselling} className="img-fluid" alt="Counselling" />
                            </div>
                                <div className="col-lg-3"></div>
                            <div className="col-lg-6 d-flex align-items-center howitworkT">
                                <p className="mb-0">
                                    Experienced counselors provide tailored guidance by understanding each student's goals,
                                    challenges, and aspirations to create a personalized growth strategy.
                                </p>
                            </div>

                        </div>
                    </div>
                    <div className="col-lg-12 howitsection1 p-4 rounded-3 mb-4 ps-5 pe-5">
                        <div className="row align-items-center">

                            <div className="col-lg-3 text-center text-lg-start">
                                <h4>Action Plan Creation</h4>
                                <img src={Action_Plan_Creation} className="img-fluid" alt="Action Plan" />
                            </div>
                                <div className="col-lg-3"></div>
                            <div className="col-lg-6 d-flex align-items-center howitworkT">
                                <p className="mb-0">
                                    Deliver a detailed and actionable roadmap,
                                    outlining clear steps, goals, and timelines tailored to meet each student's unique objectives.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* <section className="topic_content_p2 section-padding">
                <div className="container">
                    <div className="section-title">
                        <h2>Start Learning</h2>
                        <p>
                            Popular <span><u>Categories</u></span> From Today.
                        </p>
                    </div>

                    <div className="row">
                        <div className="col-lg-4 col-sm-6 col-xs-12">
                            <div className="single_tca sc_one">
                                <img src="assets/images/icon/ct1.svg" alt="UI/UX Design" />
                                <h2><a href="#">UI/UX Design</a></h2>
                                <span>71 Courses</span>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 col-xs-12">
                            <div className="single_tca sc_two">
                                <img src="assets/images/icon/ct2.svg" alt="Digital Program" />
                                <h2><a href="#">Digital Program</a></h2>
                                <span>59 Courses</span>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 col-xs-12">
                            <div className="single_tca sc_three">
                                <img src="assets/images/icon/ct3.svg" alt="Finance" />
                                <h2><a href="#">Finance</a></h2>
                                <span>68 Courses</span>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 col-xs-12">
                            <div className="single_tca sc_four">
                                <img src="assets/images/icon/ct4.svg" alt="Modern Physics" />
                                <h2><a href="#">Modern Physics</a></h2>
                                <span>83 Courses</span>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 col-xs-12">
                            <div className="single_tca sc_five">
                                <img src="assets/images/icon/ct5.svg" alt="Music Production" />
                                <h2><a href="#">Music Production</a></h2>
                                <span>37 Courses</span>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 col-xs-12">
                            <div className="single_tca sc_six">
                                <img src="assets/images/icon/ct6.svg" alt="Data Science" />
                                <h2><a href="#">Data Science</a></h2>
                                <span>51 Courses</span>
                            </div>
                        </div>

                        <div className="col-lg-12 text-center">
                            <div className="cc_btn">
                                <a className="btn_one" href="course.html">
                                    View All category
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
            <section className="marketing_content_area section-padding">
                <div className="container">
                    <div className="section-title">
                        <h2>What You’ll Get From Us</h2>
                        <p>
                            We're committed to making quality higher education accessible to every Indian student through expert guidance and genuine support.
                        </p>
                    </div>

                    <div className="row">
                        <div className="col-lg-6 col-sm-6 col-xs-12 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="single_feature_one">
                                <div className="sf_top">
                                    <span className="ti-book ss_one">
                                        <i class="fa fa-users"></i>
                                    </span>
                                    <h2>
                                        <a href="single-service.html" target="_blank" rel="noreferrer">
                                            100% Free Expert Counselling: Confused about your career path & college?
                                        </a>
                                    </h2>
                                </div>
                                <p>Get personalised career counselling in India to identify the right course and college based on your strengths and goals — completely free for Indian students.</p>
                            </div>
                        </div>

                        <div className="col-lg-6 col-sm-6 col-xs-12 wow fadeInUp" data-wow-delay="0.2s">
                            <div className="single_feature_one">
                                <div className="sf_top">
                                    <span className="ti-heart ss_two">
                                        <i class="fa fa-graduation-cap"></i>
                                    </span>
                                    <h2>
                                        <a href="single-service.html" target="_blank" rel="noreferrer">
                                            400+ Verified Indian & Global Institutes: Choose from trusted colleges that match your profile
                                        </a>
                                    </h2>
                                </div>
                                <p>We connect you with 400+ partner institutes across India and abroad, helping you secure admission based on your budget, location preference, and career ambitions.</p>
                            </div>
                        </div>

                        <div className="col-lg-6 col-sm-6 col-xs-12 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="single_feature_one">
                                <div className="sf_top">
                                    <span className="ti-user ss_three">
                                        <i class="fa fa-graduation-cap"></i>
                                    </span>
                                    <h2>
                                        <a href="single-service.html" target="_blank" rel="noreferrer">
                                            Up to ₹50,000 Scholarship & Loan Support: Financial support to reduce your burden.
                                        </a>
                                    </h2>
                                </div>
                                <p>Eligible students can receive up to ₹50,000 in scholarship assistance, along with complete education loan guidance for a stress-free admission journey.</p>
                            </div>
                        </div>

                        <div className="col-lg-6 col-sm-6 col-xs-12 wow fadeInUp" data-wow-delay="0.4s">
                            <div className="single_feature_one">
                                <div className="sf_top">
                                    <span className="ti-eye ss_four">
                                        <i class="fa fa-phone"></i>
                                    </span>
                                    <h2>
                                        <a href="single-service.html" target="_blank" rel="noreferrer">
                                            Support Till Course Completion: We stay with you beyond admission.
                                        </a>
                                    </h2>
                                </div>
                                <p>From course selection to placements, we provide ongoing academic and career guidance to help you succeed until graduation.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* START POPULAR COURSES (tab-wise) */}

            <div className="best-cpurse section-padding">
                <div className="container">
                    <div className="section-title">
                        <h2>Explore Your Future College</h2>
                        {/* <p>
                            Choose from the best colleges across India to kickstart your higher education journey.
                        </p> */}
                    </div>

                    <div className="row mb-4">
                        <div className="col-12">
                            <div className="course-tabs d-flex align-items-center">
                                {isFetchingCourses ? (
                                    <>
                                        <SkeletonLoader width={100} height={40} count={1} additionals={{ className: "me-2" }} />
                                        <SkeletonLoader width={100} height={40} count={1} additionals={{ className: "me-2" }} />
                                        <SkeletonLoader width={100} height={40} count={1} additionals={{ className: "me-2" }} />
                                        <SkeletonLoader width={100} height={40} count={1} additionals={{ className: "me-2" }} />
                                        <SkeletonLoader width={100} height={40} count={1} additionals={{ className: "me-2" }} />
                                    </>

                                ) : (
                                    <>
                                        <Button
                                            variant="light"
                                            className="arrow-btn me-2"
                                            onClick={() => scrollCourse("left")}
                                        >
                                            <ChevronLeft />
                                        </Button>
                                        <div className="course-scroll flex-grow-1 gap-3" ref={scrollRef}>
                                            {coursesData?.map((cat, indf) => (
                                                <button
                                                    key={cat?._id}
                                                    type="button"
                                                    onClick={() => {
                                                        setCourseFilterId(cat?._id);
                                                        setActiveTab(cat?._id)

                                                    }}
                                                    className={`btn ${courseFilterId === cat?._id ? "btn-primary" : (!courseFilterId && indf == 0) ? "btn-primary" : "btn-outline-secondary"}`}
                                                    aria-pressed={courseFilterId === cat?._id}
                                                >
                                                    {cat?.name}
                                                </button>
                                            ))}
                                        </div>

                                        <Button
                                            variant="light"
                                            className="arrow-btn ms-2"
                                            onClick={() => scrollCourse("right")}
                                        >
                                            <ChevronRight />
                                        </Button>
                                    </>
                                )}
                            </div>

                        </div>
                    </div>

                    <div className="row">
                        {isCollegeListFetching ? (
                            <>
                                <div className="col-lg-4 col-sm-6 col-xs-12">
                                    <SkeletonLoader width={400} height={150} count={1} />
                                </div>
                            </>
                        ) : (
                            collegeListData?.data && collegeListData?.data?.length > 0 ? (
                                collegeListData?.data?.map((course, index) => (
                                    <div
                                        key={index}
                                        className="col-lg-4 col-sm-6 col-xs-12 wow fadeInUp"
                                        data-wow-delay="0.1s"
                                    >
                                        <InstituteCard
                                            logo={course?.logo}
                                            name={course?.name}
                                            location={`${course?.address?.cityD?.name} , ${course?.address?.stateD?.name}`}
                                            program={course.streamAndCourse}
                                            fees={course.streamAndCourse}
                                            id={course?._id}
                                        />

                                    </div>
                                ))

                            ) : (
                                <div className="col-lg-12 col-sm-6 col-xs-12 text-center">
                                    <p>No colleges found for the selected course.</p>
                                </div>
                            )


                        )}


                        <div className="col-lg-12 text-center">
                            <div className="cc_btn">
                                <Link className="btn_one" to="/colleges">
                                    View All
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* END COURSE */}

            {/* START COURSE PROMOTION */}

            {/* END COURSE PROMOTION */}
            {/* <div className="partner-logo section-padding">
                <div className="container">
                    <div className="row">
                        
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

                        
                        <div className="col-lg-6">
                            <Slider {...partnerSettings}>
                                {partners.map((logo, index) => (
                                    <div key={index} className="px-3">
                                        <div className="partner_logo text-center">
                                            <a href="#" aria-label={`Partner ${index + 1}`}>
                                                <img
                                                    src={logo}
                                                    alt={`Partner ${index + 1}`}
                                                    className="img-fluid"
                                                    style={{ maxHeight: 80, margin: "0 auto" }}
                                                />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div> */}



            <section className="alumni_section section-padding" aria-label="Alumni and Placements">
                <div className="container text-center">
                    <h1 className="alumni-number"></h1>

                    <div className="ab_content">
                        <h2 className="text-center">
                            Student Stories
                        </h2>
                        {/* <p className="text-center">
                            Hear directly from our students about their transformative journeys and successful placements after choosing Udaan Scholars.
                        </p> */}
                    </div>

                    <div className="row justify-content-center mt-4">
                        <div className="col-12">
                            <div className="alumni-grid d-flex flex-wrap justify-content-center gap-4">
                                {alumni.map((a, index) => (
                                    <div key={a.id} className="alumni-card text-center">

                                        <div className="avatar" onClick={() => openGallery(index)}>
                                            <img
                                                src={a.avatar}
                                                alt={`Alumni ${a.id}`}
                                                className="img-fluid"
                                            />
                                        </div>

                                        <div className="company-logo">
                                            {a?.name}
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>


            </section>




            <section id="blog" className="blog_area section-padding">
                <div className="container">
                    <div className="section-title">
                        <h2>News</h2>
                        <p>
                            Our Latest <span><u>Blogs</u></span>
                        </p>
                    </div>

                    <div className="row">
                        {blogs.map((blog, index) => (
                            <div key={index} className="col-lg-4 col-sm-4 col-xs-12">
                                <div className="single_blog">
                                    <img
                                        src={`assets/images/blog/${blog.img}`}
                                        className="img-fluid"
                                        alt={blog.title}
                                    />
                                    <div className="content_box">
                                        <span>
                                            {blog.date} | <a href="#">{blog.category}</a>
                                        </span>
                                        <h2>
                                            <a href="#">{blog.title}</a>
                                        </h2>
                                        <a href="#" className="cta">
                                            <span>READ MORE</span>
                                            <svg width="13" height="10" viewBox="0 0 13 10">
                                                <path d="M1,5 L11,5"></path>
                                                <polyline points="8 1 12 5 8 9"></polyline>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="newsletter_area section-padding">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-lg-6 offset-lg-3">
                            <div className="subs_form">
                                <h3>
                                    Subscribe to our Newsletter
                                </h3>
                                <p>
                                    We don’t make any spam.
                                </p>

                                <form className="home_subs">
                                    <input
                                        type="email"
                                        className="subscribe__input"
                                        placeholder="Enter your Email Address"
                                    />
                                    <button type="button" className="subscribe__btn">
                                        <i className="fa fa-paper-plane-o"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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

            {showModal && (
                <div className="gallery-modal">
                    <div className="gallery-content">

                        <button className="close-btn" onClick={() => setShowModal(false)}>×</button>

                        <button className="nav-btn left" onClick={prevSlide}>❮</button>

                        <div className="image-container">
                            <img
                                src={alumni[currentIndex].avatar}
                                alt="Selected Alumni"
                            />
                            <div className="feedback-box">
                                <h5>{alumni[currentIndex].name}</h5>
                                <p>{alumni[currentIndex].feedback}</p>
                            </div>
                        </div>

                        <button className="nav-btn right" onClick={nextSlide}>❯</button>

                    </div>
                </div>
            )}

        </div>
    );
};

export default Home;