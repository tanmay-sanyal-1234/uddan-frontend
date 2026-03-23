import React, { useState,useRef,useEffect, useCallback, useMemo } from "react";
import { college_detail_image, image_2, college_logo } from "../assets/images";
import { useGetCollegeDetailsById } from "../hooks/collegeHook";
import { Link, useParams } from "react-router-dom";
import FullPageLoader from "../components/FullPageLoader";
import {apiImageWrapper} from "@/utils/helpers";
import { useSelector,useDispatch } from "react-redux";
import {setCollegeDetails,openModal,setBrochureDownloadUrl,setCanBrochureDownload} from "../store/slices/universityModalSlice";
import UniversityModal from "../components/universityModal";
import RecentlyViewed from "@/components/RecentlyViewed";
import {setTabActiveFor} from "../store/slices/collegeFilterSlice";
const CollegeDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { data, isLoading, isFetching, error } = useGetCollegeDetailsById(id);
    const [activeTab, setActiveTab] = useState(0);
    const isModalOpen = useSelector((state) => state.universityModal.isOpen);
    const collegeTabFillter = useSelector((state) => state.collegeFilterRedux.collegeTabActive);
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
    const tabsRef = useRef(null);

const scrollTabs = (direction) => {
  if (tabsRef.current) {
    tabsRef.current.scrollBy({
      left: direction === "left" ? -200 : 200,
      behavior: "smooth",
    });
  }
};

// const collegeTabIsActive = useCallback((str) => {
//     if(collegeTabFillter && str && data && !isFetching){
//         console.log(collegeTabFillter,"collegeTabFillter")
//         const regex = new RegExp(collegeTabFillter, "i");
//         console.log(str,"strstr")
//         if(regex.test(str)){
//            let fin = data?.tabs?.findIndex((item) => item?.title == str);
//            console.log(fin,"fin")
//            if(fin !== -1){
//             console.log("ddddddddddddddddddddddddddddddddddddddddddddddddddd")
//             setActiveTab(fin);
//            }
//         }
//     }
// },[collegeTabFillter,data,isFetching])


useEffect(() => {
    if(collegeTabFillter && data && !isFetching){
        const regex = new RegExp(collegeTabFillter, "i");
        for (let index = 0; index < data?.tabs.length; index++) {
            if(regex.test(data?.tabs[index]?.title)){
                setActiveTab(index);
                dispatch(setTabActiveFor(null))
                break;
            }
            
        }
    }
},[collegeTabFillter,data,isFetching])



useEffect(() => {
    if (data) {
      let viewedColleges = JSON.parse(localStorage.getItem("viewedColleges")) || [];

      // Remove if already exists (avoid duplicate)
      viewedColleges = viewedColleges.filter(
        (item) => item._id !== data._id
      );

      // Add new college at beginning
      viewedColleges.unshift(data);

      // Keep only last 5 viewed
      viewedColleges = viewedColleges.slice(0, 5);

      localStorage.setItem("viewedColleges", JSON.stringify(viewedColleges));
    }
  }, [data]);
    return (
        <div>
            <section className="section-top">
                {/* <div className="container">
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
                </div> */}
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
                                    <i className="fa fa-map-marker mt-1"></i> {data?.address?.cityD?.name}, {data?.address?.stateD?.name}
                                    {/* <span>| Autonomous University</span>
                                    <span>| AACSB, AMBA Approved</span> */}
                                </p>
                                <div className="apply-not-for-mobile">
                                <Link to="#" onClick={() => {
                                    setModalOpenFor("apply");
                                    dispatch(setCollegeDetails(data));
                                    dispatch(openModal());
                                }} className="apply-link">
                                
                                    ✔ Apply Now
                                </Link>
                                </div>
                            </div>
                        </div>
                         <div className="header-actions">
                            <div className="apply-for-mobile">
                                <Link to="#" onClick={() => {
                                    setModalOpenFor("apply");
                                    dispatch(setCollegeDetails(data));
                                    dispatch(openModal());
                                }} className="apply-link">
                                
                                    ✔ Apply Now
                                </Link>
                            </div>

    <button
      className="brochure-btn"
      onClick={() => {
        setModalOpenFor("brochure");
        dispatch(setCollegeDetails(data));
        dispatch(setCanBrochureDownload(true));
        dispatch(
          setBrochureDownloadUrl(apiImageWrapper(data?.media?.brochureUrl))
        );
        dispatch(openModal());
      }}
    >
      <i className="fa fa-download"></i> Download Brochure
    </button>
  </div>

                        
                    </div>

                    {/* TABS */}
                    {/* <div className="college-tabs">
                        {data?.tabs?.map((tab, index) => (
                            <button
                                key={index}
                                className={`tab ${activeTab === index ? "active" : ""}`}
                                onClick={() => setActiveTab(index)}
                            >
                                {tab?.title}
                            </button>
                        ))}
                    </div> */}

                    <div className="tabs-bar">

  <button className="nav-arrow mt-4 me-3" onClick={() => scrollTabs("left")}>
    ‹
  </button>
    
  <div className="college-tabs" ref={tabsRef}>
    {data?.tabs?.map((tab, index) => (
        <button
        key={index}
        className={`tab-item ${activeTab === index ? "active" :""}`}
        onClick={() => setActiveTab(index)}
      >
        {tab?.title}
      </button>
    ))}
  </div>

  <button className="nav-arrow mt-4 ms-3" onClick={() => scrollTabs("right")}>
    ›
  </button>

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
                        <RecentlyViewed/>
                        {/* <div className="content-right">
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
                        </div> */}
                    </div>

                </div>
            </section>
            {isModalOpen && <UniversityModal sectionFrom={modalOpenFor}/>}
        </div>
    );
};

export default CollegeDetails;