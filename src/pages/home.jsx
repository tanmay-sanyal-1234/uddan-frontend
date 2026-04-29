import Slider from "react-slick";
import SEO from "../components/SEO";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { student_profiling, One_on_One_Counselling, Action_Plan_Creation } from "../assets/images";
import Cities from "../components/cities";
import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import InstituteCard from "../components/instituteComponent";
import { Link, useNavigate } from "react-router-dom";
import { useGetCourses, useGetCollegeListHome, useGetCity, useGetTestimonialsList } from "../hooks/collegeHook";
import SkeletonLoader from "@/components/SkeletonLoader";
import { Button, OverlayTrigger, Overlay } from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import { apiImageWrapper, whatsappLink } from "../utils/helpers";
import Select from "react-select";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useGetPopulerBlogList, useGetPopulerBlogFirst, useGetRecentBlogList, useGetPopulerBlogHeading } from "@/hooks/blogHook";
import { toast } from 'react-toastify';
import FullPageLoader from "@/components/FullPageLoader";
import moment from "moment";
import { useNewsLetterSubscribe } from "@/hooks/contactUsHook";
import CTASection from "@/components/CtaSection";
import FaqComponent from "@/components/FaqComponent";
import { openModal } from "@/store/slices/universityModalSlice";
import { useSelector, useDispatch } from "react-redux";
import UniversityModal from "@/components/universityModal";
const Home = () => {
    const dispatch = useDispatch();
    const isModalOpen = useSelector((state) => state.universityModal.isOpen);
    const [modalOpenFor, setModalOpenFor] = useState("apply");
    const navigate = useNavigate();
    const [courseFilterId, setCourseFilterId] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [subscribeEmail, setSubscribeEmail] = useState("");
    const [pages, setPages] = useState(1);
    const [limit, setLimit] = useState(10);
    const { data: getRecentBlogData, isLoading: isLoadingRecentBlogData, isFetching: isFetchingRecentBlogData, error: errorRecentBlogData, isFetchingNextPage: isFetchingNextPageRecentBlogData, hasNextPage: hasNextPageRecentBlogData, fetchNextPage: fetchNextFetchRecentBlogData, refetch: refetchRecentBlogData } = useGetRecentBlogList(1, 3);
    const { data: coursesData, isLoading: isLoadingCourses, isFetching: isFetchingCourses, error: coursesError } = useGetCourses();
    const { data: citiesData, isLoading: isLoadingCities, isFetching: isFetchingCities, error: citiesError } = useGetCity();
    const { data: collegeListData, isLoading: isCollegeListLoading, isFetching: isCollegeListFetching, refetch: refetchCollegeList, error: collegeListError } = useGetCollegeListHome({ courseId: courseFilterId });
    const { mutateAsync: newsLetterSubscribe, isPending } = useNewsLetterSubscribe();
    const [activeTab, setActiveTab] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    const recentBlogs = useMemo(() => {
        return getRecentBlogData?.pages?.flatMap(page => page.data) || [];
    }, [getRecentBlogData]);
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


    const [homeBannerSearch, setHomeBannerSearch] = useState({
        course: null,
        city: null,
        budget: null
    })

    const { data: testimonial, isLoading, isFetching, refetch, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetTestimonialsList(
        pages,
        limit
    );
    const alumni = useCallback(() => {
        return testimonial?.pages?.flatMap(page => page?.data) || [];
    }, [testimonial])
    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % alumni().length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? alumni().length - 1 : prev - 1
        );
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



    const customSelectStyles = {
        control: (base) => ({
            ...base,
        }),
        option: (base, state) => ({
            ...base,
            fontSize: "11px",   // 👈 reduce dropdown item text
            padding: "0px",
            borderBottom: "2px solid #eee", // 👈 border between items
            backgroundColor: state.isFocused ? "#f5f7ff" : "#fff",
            color: "#333",
            cursor: "pointer",
            fontWeight: state.isFocused ? "bold" : "normal", // 👈 bold selected item
        }),
        menu: (base) => ({
            ...base,
            fontSize: "8px",   // 👈 fallback for menu
        }),
        singleValue: (base) => ({
            ...base,
            // fontSize: "8px",   // 👈 selected value text
        }),
        placeholder: (base) => ({
            ...base,
            fontSize: "13px",
        }),
    };



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

    const sendSubscribeEmail = async () => {
        if (subscribeEmail) {
            let submit = await newsLetterSubscribe({ email: subscribeEmail });
            if (submit?.success) {
                setSubscribeEmail("");
                toast.success("✅ Subscription successful! Stay tuned for updates.");
            }
        } else {
            toast.error("Please enter the email address");
        }
    }

    const getNameBlog = (name) => {
        let displayName = name.length > 30 ? name.slice(0, 30) + "..." : name;
        let tooltip = name || "";
        return {
            displayName,
            tooltip
        }

    }

    const getName = (name) => {
        let displayName = name.length > 30 ? name.slice(0, 30) + "..." : name;
        let tooltip = name || "";
        return {
            displayName,
            tooltip
        }

    }

    return (
        <div>
            <SEO title="Home - Uddan Scholars" description="Welcome to Uddan Scholars." />
            <section id="home" className="home_bg mb-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">

                            <div className="home_content">
                                <h1>
                                    Discover the Reality of Colleges
                                    <br className="d-none d-md-block" /> for Your Career
                                </h1>
                                <p>
                                    Real college insights with free career counselling for the right career choice.
                                </p>
                            </div>

                            <div className="home_sb">
                                <form className="banner_subs" onSubmit={(e) => e.preventDefault()}>

                                    <div className="mobile-filter-card">

                                        <div className="filter-item_home">
                                            <Select
                                                options={getCourseData}
                                                placeholder="Search Course"
                                                isLoading={isFetchingCourses}
                                                onChange={(e) => handleChangeForSearch(e, "course")}
                                                isClearable
                                                styles={customSelectStyles}
                                            />
                                        </div>

                                        <div className="filter-item_home">
                                            <Select
                                                options={getCities}
                                                placeholder="Search City"
                                                isLoading={isFetchingCities}
                                                onChange={(e) => handleChangeForSearch(e, "city")}
                                                isClearable
                                                styles={customSelectStyles}
                                            />
                                        </div>

                                        <div className="filter-item_home">
                                            <Select
                                                options={budgetRanges}
                                                placeholder="Budget Range"
                                                onChange={(e) => handleChangeForSearch(e, "budget")}
                                                isClearable
                                                styles={customSelectStyles}
                                            />
                                        </div>

                                    </div>

                                    <button type="button" className="search_home_btn d-flex justify-content-center align-items-center" onClick={handleSearch}>
                                        Explore College <i className="fa fa-search"></i>
                                    </button>

                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <section className="tp_feature section-padding">
                <div className="container">
                    <div className="ab_content">
                        <h2 className="text-center">
                            Top Cities
                        </h2>
                    </div>


                    <div className="row">

                        <div className="col-lg-12">

                            <Swiper
                                slidesPerView={5}
                                spaceBetween={12}
                                loop={false}
                                loopAdditionalSlides={5}
                                navigation={true}
                                breakpoints={{
                                    0: { slidesPerView: 2 },
                                    768: { slidesPerView: 3 },
                                    992: { slidesPerView: 4 },
                                    1200: { slidesPerView: 5 }
                                }}
                                modules={[Autoplay, Navigation, Pagination]}
                                onSwiper={(swiper) => swiper.navigation.update()}
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

                            <a href="#callback" className="impact-cta" onClick={() => {
                                setModalOpenFor("request_callback");
                                dispatch(openModal());
                            }}>
                                Request a callback <span className="arrow">→</span>
                            </a>
                        </div>

                        {/* Right Stats */}
                        <div className="impact-right">

                            <div className="impact-card">

                                <h4>
                                    <span className="impact-icon">
                                        <i className="fa fa-heart-o"></i>
                                    </span>
                                    <span><strong className="fs-3">5,500+</strong> Students Counselled</span>
                                </h4>
                                <p>Helping students across India make confident career decisions through personalised guidance and real insights.</p>
                            </div>

                            <div className="impact-card">

                                <h4>
                                    <span className="impact-icon">
                                        <i className="fa fa-thumbs-o-up"></i>
                                    </span>
                                    <span><strong className="fs-3">93%</strong> Student Satisfaction Rate</span>
                                </h4>
                                <p>Because we don’t sell colleges — we recommend what actually fits the student.</p>
                            </div>

                            <div className="impact-card">

                                <h4>
                                    <span className="impact-icon">
                                        <i className="fa fa-line-chart"></i>
                                    </span>
                                    <span>Up to <strong className="fs-3">₹25,000</strong> Cashback After Admission</span>
                                </h4>
                                <p>Every successful enrolment comes with financial benefits, not hidden charges.</p>
                            </div>

                            <div className="impact-card">

                                <h4>
                                    <span className="impact-icon">
                                        <i className="fa fa-star-o"></i>
                                    </span>
                                    <span><strong className="fs-3">End-to-End</strong> Personalised Support</span>
                                </h4>
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
                        {/* <p className="text-center">
                            From choosing the right course to securing your admission, we support you at every step of your higher education journey.
                        </p> */}
                    </div>

                    <div className="col-lg-12 howitsection1 p-4 ps-5 pe-5 rounded-3 mb-4">
                        <div className="row align-items-center">

                            <div className="col-lg-3 text-center text-lg-start">
                                <h4>Student Profiling</h4>
                                <img src={student_profiling} className="img-fluid" alt="Student Profiling" />
                            </div>
                            <div className="col-lg-1"></div>
                            <div className="col-lg-8 d-flex align-items-center howitworkT">
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
                            <div className="col-lg-1"></div>
                            <div className="col-lg-8 d-flex align-items-center howitworkT">
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
                            <div className="col-lg-1"></div>
                            <div className="col-lg-8 d-flex align-items-center howitworkT">
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
            <section>
                <CTASection />
            </section>
            <section className="marketing_content_area section-padding">
                <div className="container">
                    <div className="ab_content">
                        <h2 className="text-center">
                            What You’ll Get From Us
                        </h2>
                        {/* <p className="text-center">
                            From choosing the right course to securing your admission, we support you at every step of your higher education journey.
                        </p> */}
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-sm-6 col-xs-12 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="single_feature_one">
                                <div className="sf_top">
                                    <span className="ti-book ss_one mb-3">
                                        <i class="fa fa-users"></i>
                                    </span>
                                    <h2>
                                        <a href="single-service.html" target="_blank" rel="noreferrer">
                                            100% Free Expert Counselling:
                                        </a>
                                    </h2>
                                </div>
                                <h5 className="what_will_sub_heading">Confused about your career path & college?</h5>
                                <p className="mt-3"> Get personalised career counselling in India to identify the right course and college based on your strengths and goals — completely free for Indian students.</p>
                            </div>
                        </div>

                        <div className="col-lg-6 col-sm-6 col-xs-12 wow fadeInUp" data-wow-delay="0.2s">
                            <div className="single_feature_one">
                                <div className="sf_top">
                                    <span className="ti-heart ss_two mb-3">
                                        <i class="fa fa-graduation-cap"></i>
                                    </span>
                                    <h2>
                                        <a href="single-service.html" target="_blank" rel="noreferrer">
                                            400+ Verified Indian & Global Institutes:
                                        </a>
                                    </h2>
                                </div>
                                <h5 className="what_will_sub_heading">Choose from trusted colleges that match your profile</h5>
                                <p className="mt-3">We connect you with 400+ partner institutes across India and abroad, helping you secure admission based on your budget, location preference, and career ambitions.</p>
                            </div>
                        </div>

                        <div className="col-lg-6 col-sm-6 col-xs-12 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="single_feature_one">
                                <div className="sf_top">
                                    <span className="ti-user ss_three mb-3">
                                        <i class="fa fa-graduation-cap"></i>
                                    </span>
                                    <h2>
                                        <a href="single-service.html" target="_blank" rel="noreferrer">
                                            Up to ₹50,000 Scholarship & Loan Support:
                                        </a>
                                    </h2>
                                </div>
                                <h5 className="what_will_sub_heading">Financial support to reduce your burden</h5>
                                <p className="mt-3">Eligible students can receive up to ₹50,000 in scholarship assistance, along with complete education loan guidance for a stress-free admission journey.</p>
                            </div>
                        </div>

                        <div className="col-lg-6 col-sm-6 col-xs-12 wow fadeInUp" data-wow-delay="0.4s">
                            <div className="single_feature_one">
                                <div className="sf_top">
                                    <span className="ti-eye ss_four mb-3">
                                        <i class="fa fa-phone"></i>
                                    </span>
                                    <h2>
                                        <a href="single-service.html" target="_blank" rel="noreferrer">
                                            Support Till Course Completion:
                                        </a>
                                    </h2>
                                </div>
                                <h5 className="what_will_sub_heading">We stay with you beyond admission</h5>
                                <p className="mt-3">From course selection to placements, we provide ongoing academic and career guidance to help you succeed until graduation.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* START POPULAR COURSES (tab-wise) */}

            <div className="best-cpurse section-padding">
                <div className="container">
                    <div className="ab_content">
                        <h2 className="text-center">
                            Explore Your Future College
                        </h2>
                        {/* <p className="text-center">
                            From choosing the right course to securing your admission, we support you at every step of your higher education journey.
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
                                {alumni().map((a, index) => (
                                    <div key={a._id} className="alumni-card text-center">

                                        <div className="avatar" onClick={() => openGallery(index)}>
                                            <img
                                                src={apiImageWrapper(a.image)}
                                                alt={`Alumni ${a._id}`}
                                                className="img-fluid"
                                            />
                                        </div>

                                        <div className="company-logo">
                                            {a?.name}
                                        </div>

                                    </div>
                                ))}
                                {isFetching && (<SkeletonLoader count={1} width={'100%'} height={200} />)}

                            </div>
                            {hasNextPage && (
                                <div className="text-center mt-3">
                                    <button className="btn_one " onClick={fetchNextPage}>
                                        {isFetchingNextPage ? "Loading..." : "View More"}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                </div>


            </section>




            <section id="blog" className="blog_area section-padding">
                <div className="container">
                    <div className="ab_content">
                        <h2 className="text-center">
                            Our Latest Blogs
                        </h2>

                    </div>

                    <div className="row">
                        {isFetchingRecentBlogData && (
                            <>
                                <div className="col-lg-4 col-sm-4 col-xs-12">
                                    <SkeletonLoader count={1} width={'100%'} height={400} />
                                </div>

                                <div className="col-lg-4 col-sm-4 col-xs-12">
                                    <SkeletonLoader count={1} width={'100%'} height={400} />
                                </div>

                                <div className="col-lg-4 col-sm-4 col-xs-12">
                                    <SkeletonLoader count={1} width={'100%'} height={400} />
                                </div>
                            </>
                        )}
                        {recentBlogs?.map((blog, index) => (
                            <div key={index} className="col-lg-4 col-sm-4 col-xs-12">
                                <div className="single_blog">
                                    <img
                                        src={apiImageWrapper(blog?.coverImage)}
                                        className="img-fluid"
                                        alt={blog?.title}
                                    />
                                    <div className="content_box">
                                        <span>
                                            {moment(blog?.publishedAt).format("DD MMM YYYY")}
                                        </span>
                                        <h2>
                                            <Link to={`/blog-details/${blog?.slug}`}>{getName(blog?.title)?.displayName}</Link>
                                        </h2>
                                        <Link to={`/blog-details/${blog?.slug}`} className="cta">
                                            <span>READ MORE</span>

                                        </Link>
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
                                <div className="ab_content">
                                    <h2 className="text-center mb-0">
                                        Subscribe to our Newsletter
                                    </h2>
                                    <p>
                                        We don't send any spam.
                                    </p>
                                </div>



                                <form className="home_subs">
                                    <input
                                        type="email"
                                        name="subscribeEmail"
                                        value={subscribeEmail}
                                        onChange={(e) => {
                                            setSubscribeEmail(e.target.value);
                                        }}
                                        className="subscribe__input"
                                        placeholder="Enter your Email Address"
                                    />
                                    <button type="button" className="subscribe__btn" onClick={sendSubscribeEmail}>
                                        <i className="fa fa-paper-plane-o"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <FaqComponent section="home" />

            {showModal && (
                <div className="gallery-modal">
                    <div className="gallery-content">

                        <button className="close-btn" onClick={() => setShowModal(false)}>×</button>

                        <button className="nav-btn left" onClick={prevSlide}>❮</button>

                        <div className="image-container">
                            <img
                                src={apiImageWrapper(alumni()[currentIndex].image)}
                                alt="Selected Alumni"
                            />
                            <div className="feedback-box">
                                <h5>{alumni()[currentIndex].name}</h5>
                                <p>{alumni()[currentIndex].message}</p>
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

export default Home;