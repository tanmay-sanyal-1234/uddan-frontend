import React, { useState } from "react";
import { college_detail_image, image_2, college_logo } from "../assets/images";
import { useGetCollegeDetailsById } from "../hooks/collegeHook";
import { Link, useParams } from "react-router-dom";
import FullPageLoader from "../components/FullPageLoader";
import {apiImageWrapper} from "@/utils/helpers";
import { useSelector,useDispatch } from "react-redux";
import {setCollegeDetails,openModal,setBrochureDownloadUrl,setCanBrochureDownload} from "../store/slices/universityModalSlice";
import UniversityModal from "../components/universityModal";
const CollegeDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { data, isLoading, isFetching, error } = useGetCollegeDetailsById(id);
    const [activeTab, setActiveTab] = useState(0);
    const isModalOpen = useSelector((state) => state.universityModal.isOpen);
    const [modalOpenFor , setModalOpenFor] = useState("brochure"); // 'brochure' or 'enquiry'
    const visitedColleges = [
        {
            name: "IIM Shillong Indian Institute of Management",
            city: "Shillong",
            image: college_logo
        },
        {
            name: "IIMA - Indian Institute of Management",
            city: "Ahmedabad",
            image: college_logo
        },
        {
            name: "IIM Ranchi - Indian Institute of Management",
            city: "Ranchi",
            image: college_logo
        }
    ];
    return (
        <div>
            <section className="section-top">
                <div className="container">
                    <div className="col-lg-10 offset-lg-1 text-center">
                        <div
                            className="section-top-title wow fadeInRight"
                            data-wow-duration="1s"
                            data-wow-delay="0.3s"
                            data-wow-offset="0"
                        >
                            <h1>College Details</h1>
                            <ul>
                                <li>
                                    <a href="/">Home</a>
                                </li>
                                <li> / Colleges</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>


            <section className="college-page premium">
                <div className="container">

                    {/* HEADER */}

                    {(isLoading || isFetching) && <FullPageLoader />}

                    <div className="college-header">
                        <div className="header-left">
                            <img src={apiImageWrapper(data?.logo)} alt="IIMK" className="college-logo" />

                            <div>
                                <h1>
                                    {data?.name}
                                </h1>

                                <p className="meta">
                                    <i className="fa fa-map-marker"></i> {data?.address?.cityD?.name}, {data?.address?.stateD?.name}
                                    {/* <span>| Autonomous University</span>
                                    <span>| AACSB, AMBA Approved</span> */}
                                </p>
                                <Link to="#" onClick={() => {
                                    setModalOpenFor("apply");
                                    dispatch(setCollegeDetails(data));
                                    dispatch(openModal());
                                }} className="apply-link">
                                
                                    ✔ Apply Now
                                </Link>
                            </div>
                        </div>

                        <button className="brochure-btn" onClick={() => {
                            setModalOpenFor("brochure");
                            dispatch(setCollegeDetails(data));
                            dispatch(setCanBrochureDownload(true));
                            dispatch(setBrochureDownloadUrl(apiImageWrapper(data?.media?.brochureUrl)));
                            dispatch(openModal());
                        }}>
                            <i className="fa fa-download"></i> Download Brochure
                        </button>
                    </div>

                    {/* TABS */}
                    <div className="college-tabs">
                        {data?.tabs?.map((tab, index) => (
                            <button
                                key={index}
                                className={`tab ${activeTab === index ? "active" : ""}`}
                                onClick={() => setActiveTab(index)}
                            >
                                {tab?.title}
                            </button>
                        ))}
                    </div>

                    {/* CONTENT */}
                    <div className="college-content">
                        {/* LEFT */}
                        <div className="content-left">
                            {data?.tabs?.[activeTab]?.content ? (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: data.tabs[activeTab].content,
                                    }}
                                />
                            ) : (
                                <p>No content available</p>
                            )}


                        </div>

                        {/* RIGHT */}
                        <div className="content-right">
                            <h3>Students Also Visited</h3>

                            {visitedColleges.map((college, index) => (
                                <div className="visited-card" key={index}>
                                    <img
                                        src={college.image}
                                        alt={college.name}
                                        className="visited-logo"
                                    />

                                    <div className="visited-info">
                                        <h4>{college.name}</h4>
                                        <p>{college.city}</p>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>
            {isModalOpen && <UniversityModal sectionFrom={modalOpenFor}/>}
        </div>
    );
};

export default CollegeDetails;