import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import SEO from "../components/SEO";
import { college_detail_image, image_2, college_logo } from "../assets/images";
import { useGetCollegeDetailsById } from "../hooks/collegeHook";
import { Link, useParams } from "react-router-dom";
import FullPageLoader from "../components/FullPageLoader";
import { apiImageWrapper } from "@/utils/helpers";
import { useSelector, useDispatch } from "react-redux";
import { setCollegeDetails, openModal, setBrochureDownloadUrl, setCanBrochureDownload } from "../store/slices/universityModalSlice";
import UniversityModal from "../components/universityModal";
import RecentlyViewed from "@/components/RecentlyViewed";
import { setTabActiveFor } from "../store/slices/collegeFilterSlice";
import "./college-details-new.css";
import { useGetAdvertisments } from "../hooks/advertismentHook";

const CollegeDetails = () => {
    const dispatch = useDispatch();
    const scrollRef = useRef(null);
    const { id } = useParams();
    const { data, isLoading, isFetching, error } = useGetCollegeDetailsById(id);
    const { data: adsData } = useGetAdvertisments();
    const [activeTab, setActiveTab] = useState(0);
    const isModalOpen = useSelector((state) => state.universityModal.isOpen);
    const collegeTabFillter = useSelector((state) => state.collegeFilterRedux.collegeTabActive);
    const [modalOpenFor, setModalOpenFor] = useState("brochure"); // 'brochure' or 'enquiry'
    const sectionTabs = [
        { id: "overview", label: "Overview", icon: "" },
        { id: "realityScore", label: "Reality Score", icon: "" },
        { id: "expectationVsReality", label: "Expectation vs Reality", icon: "" },
        { id: "redFlags", label: "Red Flags", icon: "" },
        { id: "placementBreakdown", label: "Placements", icon: "" },
        { id: "academicPressure", label: "Pressure", icon: "" },
        { id: "coursesAndFees", label: "Courses", icon: "" },
        { id: "admissionReality", label: "Admission", icon: "" },
        { id: "scholarships", label: "Scholarships", icon: "" },
        { id: "hostelExperience", label: "Hostel", icon: "" },
        { id: "studentVoices", label: "Voices", icon: "" },
        { id: "verdict", label: "Verdict", icon: "" }
    ];

    const [activeSectionTab, setActiveSectionTab] = useState("overview");

    useEffect(() => {
        if (collegeTabFillter && data && !isFetching) {
            for (let index = 0; index < sectionTabs.length; index++) {
                if (collegeTabFillter.toLowerCase() == sectionTabs[index]?.id.toLowerCase()) {
                    setActiveSectionTab(sectionTabs[index]?.id);
                    dispatch(setTabActiveFor(null));

                    // Scroll to tabs after a short delay to allow content to render
                    setTimeout(() => {
                        document.querySelector(".section-tabs-container")?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 300);
                    break;
                }
            }
        }
    }, [sectionTabs, collegeTabFillter, data, isFetching, dispatch]);



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

    // Reality Check Data Mapping (Dynamic from API or fallback)
    const rc = useMemo(() => {
        if (!data) return null;

        let allData = data?.section;

        let pushData = [];
        data?.streamAndCourse?.map((item) => {
            item?.courses.map((course) => {
                let data = {
                    ...course,
                    name: course?.courseD.name,
                    duration: course?.courseD.duration,
                    fees: course?.fees,
                    type: course?.courseD.type,
                    eligibility: course?.eligibility
                }
                pushData.push(data)
            })
        })


        return {
            ...allData,
            coursesAndFees: pushData
        }

        return data.realityCheck || {
            realityScore: data.realityScore || [
                { label: "PLACEMENTS", score: 6.5, color: "#264691" },
                { label: "ROI", score: 6, color: "#3b5ba5" },
                { label: "CAMPUS VIBE", score: 5, color: "#c0392b" },
                { label: "FACULTY", score: 7, color: "#27ae60" }
            ],
            expectationGaps: data.expectationGaps || [
                { title: "The \"top package\" confusion", description: "Marketing highlights ₹12–18 LPA from top firms. The median salary sits closer to ₹4–6 LPA. The gap is real and worth knowing." },
                { title: "Discipline over development", description: "Strict culture (mandatory attendance, dress code, no phones) is sold as \"professional readiness.\" Many feel it leaves little room for actual skill-building." },
                { title: "Brand ≠ automatic placement", description: "The name opens doors for interviews — but closing them depends entirely on you. Soft skills and internships matter more than the degree here." }
            ],
            expectationVsReality: data.expectationVsReality || [
                {
                    category: "PLACEMENT",
                    expectation: ["100% placement, ₹35+ LPA average", "MBB (McKinsey, BCG, Bain) for all top performers", "International roles easily accessible"],
                    reality: ["100% placed, but median is ₹32.5 LPA (2024)", "MBB hires selectively — a fraction of the batch", "Only 29 international offers in 2024 (out of 516)"]
                },
                {
                    category: "ACADEMIC",
                    expectation: ["Engaging, practical, startup-friendly curriculum", "Professors as mentors, accessible faculty", "A well-rounded MBA experience"],
                    reality: ["First two terms are relentlessly intense", "CGPA matters more than expected — influences placement day access", "Faculty quality is strong, but classroom time competes with placements and clubs"]
                }
            ],
            redFlags: data.redFlags || [
                { title: "Attendance policy is strict", description: "75% attendance is mandatory — and it's enforced. Missing classes due to internships, events, or health can become stressful to manage." },
                { title: "Mobile phones restricted in campus zones", description: "Mobile-free zones and strict timing rules exist. If you rely heavily on your phone for study tools or freelance work, this can be limiting." },
                { title: "High fees relative to some outcomes", description: "PG programs can cost ₹3–4.5L/year. If your placement package turns out average (~₹4–5L), the ROI math needs careful thinking." }
            ],
            placementBreakdown: data.placementBreakdown || {
                top: { range: "₹12–18 LPA", description: "Finance, Consulting, select FMCG/Tech roles. Limited seats — competitive selection within campus itself." },
                avg: { range: "₹4–6 LPA", description: "Most students land here. Sales, operations, marketing, and back-office roles dominate." },
                low: { range: "₹2.4–3 LPA", description: "Typically niche program graduates or students who opted out of campus placements. Some go for higher studies." },
                recruiters: ["Deloitte", "KPMG", "Accenture", "HDFC Bank", "Axis Bank", "Amazon", "ITC", "Startups"],
                description: "The placement reality here is mixed — like many colleges, the advertised 'best packages' are rare exceptions. The median is closer to ₹4–6 LPA. However, the college does have solid industry connections, and if you perform well academically and build strong soft skills, you can secure good offers. The key is not to rely solely on the college brand, but to actively work on your profile through internships, live projects, and networking."
            },
            admissionReality: data.admissionReality || {
                isPartner: true,
                title: "Direct Admission Through Udaan Scholars — Zero Donation",
                description: `This institution is officially partnered with Udaan Scholars. If you apply through us, you don't pay any donation or capitation fee — direct, merit-based admission is possible. No middlemen, no hidden costs, no stress.`,
                pills: ["No Donation Fee", "Direct Admission", "Guidance Included"],
                process: [
                    { title: "Entrance Exam Score", description: "CAT / MAT / KMAT / CMAT / ATMA / NMAT / PGCET accepted. No exceptionally high cutoff for PGDM — roughly 50–70 percentile for most programs." },
                    { title: "ISBR Aptitude Test", description: "If you don't have a strong score, this is your second shot. It's conducted in-house and is fairly approachable." },
                    { title: "Micro Presentation (MP)", description: "A short structured talk — tests communication and confidence, not just IQ. Practise this seriously." },
                    { title: "Personal Interview (PI)", description: "Mostly about clarity of thought, career goals, and why ISBR. Don't bluff. Be specific." },
                    { title: "Final Selection", description: "Merit-based on exam score + MP + PI. No donation needed through Udaan Scholars. Call us directly to start the process." }
                ],
                advantage: "Since this college is our official partner, students who apply through us get direct admission without any donation or capitation fees. Reach out to our counsellors — we'll handle the process end-to-end."
            },
            academicPressure: data.academicPressure || {
                ratings: [
                    { label: "Exam intensity", score: 8, color: "#264691" },
                    { label: "Assignment load", score: 7.5, color: "#3b5ba5" },
                    { label: "Attendance rules", score: 9, color: "#c0392b" },
                    { label: "Faculty accessibility", score: 7, color: "#27ae60" },
                    { label: "Grading fairness", score: 6, color: "#8e44ad" }
                ],
                description: "The CCE (Continuous and Comprehensive Evaluation) model means you're being assessed constantly — surprise tests, class participation, assignments, midterms, and finals all count. For students who thrive with structure, this works. For free-range learners, it can feel like school never ended. The workload is real — don't join expecting a relaxed college life."
            },
            coursesAndFees: data.coursesAndFees || [
                { type: "UG", name: "BBA (General / Finance / Analytics)", duration: "3 yrs", fees: "₹1.6–2.2L" },
                { type: "UG", name: "BCom (General / Finance / Professional)", duration: "3 yrs", fees: "₹1.2–1.8L" },
                { type: "UG", name: "BA (English / Journalism / Psychology)", duration: "3 yrs", fees: "₹1–1.5L" },
                { type: "UG", name: "BSc (Computer Science / Data Science / AI)", duration: "3 yrs", fees: "₹1.5–2.5L" },
                { type: "PG", name: "MBA (General / Finance / Marketing)", duration: "2 yrs", fees: "₹3.5–4.5L" },
                { type: "PG", name: "MCA (Computer Applications)", duration: "2 yrs", fees: "₹2–2.5L" },
                { type: "PG", name: "MSc (Data Science / Computer Science / AI)", duration: "2 yrs", fees: "₹2–3L" },
                { type: "PG", name: "MCom / MA (Economics / Psychology)", duration: "2 yrs", fees: "₹1–1.8L" },
                { type: "RES", name: "PhD (multiple disciplines)", duration: "3–5 yrs", fees: "₹60K–1L" },
                { type: "CERT", name: "Short-term / Add-on Programs", duration: "Varies", fees: "₹5K–25K" }
            ],
            scholarships: data.scholarships || [
                { title: "Merit Scholarship (Top rank, entrance exam)", benefit: "Up to ₹1L/yr" },
                { title: "Need-Based Aid", benefit: "25–100% fee waiver" },
                { title: "SC/ST Government Scholarship (State/Central)", benefit: "As per govt. norms" },
                { title: "Minority Scholarship (Central Govt.)", benefit: "₹20K–50K/yr" },
                { title: "Sports / Cultural Achievement Scholarships", benefit: "Partial fee relief" },
                { title: "Sibling Concession (if another sibling enrolled)", benefit: "Up to 10% reduction" }
            ],
            hostelExperience: data.hostelExperience || {
                good: "Well-maintained campus facilities, decent food quality, 24/7 security, and a relatively safe environment — especially reassuring for students from outside Bangalore.",
                reality: "Strict curfew timings (typically 9–10 PM). Visitors are limited. Room sharing is the norm. Hostel fees add ₹80K–1.5L/year on top of tuition.",
                alternative: "Many students prefer PGs around Hosur Road or Koramangala. More freedom, often cheaper. But commute and safety due diligence fall on you.",
                sentiment: "Mixed reviews — some find the hostel community supportive and lifelong friendships form here. Others feel the rules are excessive for college-aged adults."
            },
            studentVoices: data.studentVoices || [
                {
                    quote: "The BBA program genuinely helped me — the faculty was approachable and the alumni network opened doors. But I wish someone told me the placement process isn't automatic. You have to be on it from Day 1.",
                    name: "Rohan K.",
                    details: "BBA Graduate, 2024 • placed at an FMCG firm",
                    initials: "RK",
                    color: "var(--reality-blue)"
                },
                {
                    quote: "I joined for the MBA and the infrastructure and brand gave me confidence in interviews. But the median salary reality hit me — most of my batch landed 5–6 LPA. The ₹8L+ offers went to maybe 10–12 students.",
                    name: "Sneha P.",
                    details: "MBA (Marketing), 2023 batch",
                    initials: "SP",
                    color: "var(--reality-orange)"
                },
                {
                    quote: "The strict rules were a culture shock at first. No phones in corridors, compulsory chapel attendance, uniform-like dress code. But honestly, the discipline did help me stay on track. Just adjust your expectations.",
                    name: "Aarav T.",
                    details: "BCom (Professional), 2nd year",
                    initials: "AT",
                    color: "#8e44ad"
                }
            ],
            verdict: data.verdict || {
                goForIt: [
                    "Targeting BBA / BCom / MBA with a clear career path",
                    "Someone who works well with structure and rules",
                    "Looking for a strong alumni network in Bangalore",
                    "Planning to complement degree with internships",
                    "Okay with a high-discipline, low-chaos environment"
                ],
                thinkCarefully: [
                    "Expecting placements to happen automatically",
                    "Paying 3.5L+ per year for an arts/humanities PG",
                    "Someone who values freedom and self-directed learning",
                    "Comparing ROI with state university options",
                    "Sensitive to religious or institutional culture on campus"
                ],
                reconsider: [
                    "Expecting a tier-1 B-school level placement outcome",
                    "Joining niche science/arts for campus placement alone",
                    "Not willing to put in extra effort beyond classroom",
                    "Comparing it directly with IIMs, NMIMS, or Symbiosis"
                ],
                disclaimer: "This analysis is based on publicly available information and student feedback. Outcomes vary depending on individual performance and market conditions. Readers are advised to verify details from official sources before making decisions."
            }
        };
    }, [data]);

    if (isLoading || isFetching) return <FullPageLoader />;

    return (
        <div className="college-details-premium">
            <SEO
                key={data?._id || "loading"}
                title={data?.name ? `${data.name} - Uddan Scholars College` : "College Details - Uddan Scholars"}
                description={`Discover details about ${data?.name || 'this college'} on Uddan Scholars.`}
                image={apiImageWrapper(data?.logo)}
            />

            {/* SECTION: REALITY HEADER */}
            <section className="reality-header-section">
                <div className="header-container">
                    <div className="header-left">
                        <div className="college-logo-container">
                            <img src={apiImageWrapper(data?.logo)} alt={data?.name} className="main-college-logo" />
                        </div>
                        <div className="header-info">
                            <h1 className="main-college-title">
                                {data?.name}
                            </h1>
                            <div className="main-college-location">
                                <i className="fa fa-map-marker"></i>  {data?.address?.cityD?.name}, {data?.address?.stateD?.name}
                            </div>
                            <div className="reality-meta-tags header-meta-tags-wrapper">
                                {data?.university && <span className="meta-tag">{data?.university}</span>}
                                {data?.est && <span className="meta-tag">Est. {data?.est}</span>}
                                {data?.accreditation && <span className="meta-tag">{data.accreditation}</span>}
                            </div>
                            <div className="reality-quote header-quote-text">
                                "We don't show colleges. We show reality."
                            </div>
                            <div className="header-apply-btn-wrapper">
                                <Link to="#" onClick={() => {
                                    setModalOpenFor("apply");
                                    dispatch(setCollegeDetails(data));
                                    dispatch(openModal());
                                }} className="main-apply-btn">
                                    <i className="fa fa-check"></i> Apply Now
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="header-right">
                        <button
                            className="main-download-btn"
                            onClick={() => {
                                setModalOpenFor("brochure");
                                dispatch(setCollegeDetails(data));
                                dispatch(setCanBrochureDownload(true));
                                dispatch(setBrochureDownloadUrl(apiImageWrapper(data?.media?.brochureUrl)));
                                dispatch(openModal());
                            }}
                        >
                            <i className="fa fa-download"></i> Download Brochure
                        </button>
                    </div>
                </div>
            </section>

            <div className="college-main-layout">
                <div className="college-left-column">

                    {/* SECTION: TAB NAVIGATION */}
                    <div className="section-tabs-container">
                        <div className="section-tabs-wrapper">
                            <button
                                className="tab-scroll-btn left"
                                onClick={() => {
                                    scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
                                }}
                            >
                                <i className="fa fa-chevron-left"></i>
                            </button>

                            <div className="section-tabs-scroll" ref={scrollRef}>
                                {sectionTabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        className={`section-tab-btn ${activeSectionTab === tab.id ? "active" : ""}`}
                                        onClick={() => {
                                            setActiveSectionTab(tab.id);
                                            document.querySelector(".section-tabs-container")?.scrollIntoView({ behavior: "smooth", block: "start" });
                                        }}
                                    >
                                        <span className="tab-icon">{tab.icon}</span>
                                        <span className="tab-label">{tab.label}</span>
                                    </button>
                                ))}
                            </div>

                            <button
                                className="tab-scroll-btn right"
                                onClick={() => {
                                    scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
                                }}
                            >
                                <i className="fa fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>

                    {/* SECTION: OVERVIEW (Moved inside tabs) */}
                    {activeSectionTab === "overview" && (
                        <section className="reality-section overview-section">
                            <span className="section-label">OVERVIEW</span>
                            <div className="premium-card">
                                <div className="overview-text text-content-p">
                                    {data?.description ? (
                                        <div dangerouslySetInnerHTML={{ __html: data.description }} />
                                    ) : (
                                        <p>{data?.name} is a prominent institution known for its academic rigour and campus life. The placement reality in 2026 is more nuanced than the brochure suggests, offering a mix of opportunities across various sectors.</p>
                                    )}

                                    <div className="bottom-line-box">
                                        <p><span dangerouslySetInnerHTML={{ __html: data?.bottomLine || `${data?.name} is a high-discipline institution with good infrastructure and active campus life, though placement outcomes depend heavily on your specific program and individual performance.` }} /></p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* SECTION: REALITY SCORE (Including Expectation Gaps) */}
                    {activeSectionTab === "realityScore" && (
                        <section className="reality-section">
                            <span className="section-label">REALITY SCORE</span>
                            <h2 className="reality-title reality-title-small">How it really scores</h2>
                            <p className="reality-subtitle">Four dimensions rated honestly, with context.</p>

                            <div className="scores-grid">
                                {rc?.realityScore?.map((item, index) => (
                                    <div className="score-card" key={index}>
                                        <div className="score-value" style={{ color: item.color }}>{item.score}</div>
                                        <div className="score-label">{item.label}</div>
                                        <div className="score-bar">
                                            <div className="score-fill" style={{ width: `${(item.score / 10) * 100}%`, background: item.color }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="premium-card">
                                <h5 className="header-small-label">BIGGEST EXPECTATION GAPS</h5>
                                <div className="expectation-gaps">
                                    {rc?.expectationGaps?.map((gap, index) => (
                                        <div className="gap-item" key={index}>
                                            <div className="gap-num">0{index + 1}</div>
                                            <div className="gap-content">
                                                <h4>{gap.title}</h4>
                                                <p dangerouslySetInnerHTML={{ __html: gap.description }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* SECTION: EXPECTATION VS REALITY */}
                    {activeSectionTab === "expectationVsReality" && (
                        <section className="reality-section">
                            <span className="section-label">EXPECTATION VS REALITY</span>
                            <h2 className="reality-title reality-title-small">What you're told vs what's true</h2>
                            <p className="reality-subtitle">Placement and academic reality, side by side.</p>

                            {rc?.expectationVsReality?.map((comp, index) => (
                                <div className="comparison-grid" key={index}>
                                    <div className="comparison-box expectation">
                                        <h5>{comp.category} — EXPECTATION</h5>
                                        <ul>
                                            {comp.expectation.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}
                                        </ul>
                                    </div>
                                    <div className="comparison-box reality">
                                        <h5>{comp.category} — REALITY</h5>
                                        <ul>
                                            {comp.reality.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </section>
                    )}

                    {/* SECTION: RED FLAGS */}
                    {activeSectionTab === "redFlags" && (
                        <section className="reality-section">
                            <span className="section-label">RED FLAGS</span>
                            <h2 className="reality-title reality-title-small">Things to be careful about</h2>
                            <p className="reality-subtitle">Honest warnings before you decide.</p>

                            <div className="premium-card">
                                {rc?.redFlags?.map((flag, index) => (
                                    <div className="red-flag-item" key={index}>
                                        <div className="flag-num">{index + 1}</div>
                                        <div className="gap-content">
                                            <h4>{flag.title}</h4>
                                            <p dangerouslySetInnerHTML={{ __html: flag.description }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* SECTION: PLACEMENT BREAKDOWN */}
                    {activeSectionTab === "placementBreakdown" && (
                        <section className="reality-section">
                            <span className="section-label">PLACEMENT BREAKDOWN</span>
                            <h2 className="reality-title reality-title-small">Where students actually land</h2>
                            <p className="reality-subtitle">The full picture — top offers, median, and the floor.</p>

                            <div className="breakdown-grid">
                                <div className="breakdown-card top">
                                    <h5>TOP OFFERS</h5>
                                    <div className="breakdown-value">{rc?.placementBreakdown?.top?.range}</div>
                                    <p dangerouslySetInnerHTML={{ __html: rc?.placementBreakdown?.top?.description }} />
                                </div>
                                <div className="breakdown-card avg">
                                    <h5>AVERAGE / MEDIAN</h5>
                                    <div className="breakdown-value">{rc?.placementBreakdown?.avg?.range}</div>
                                    <p dangerouslySetInnerHTML={{ __html: rc?.placementBreakdown?.avg?.description }} />
                                </div>
                                <div className="breakdown-card low">
                                    <h5>LOWEST / UNPLACED</h5>
                                    <div className="breakdown-value">{rc?.placementBreakdown?.low?.range}</div>
                                    <p dangerouslySetInnerHTML={{ __html: rc?.placementBreakdown?.low?.description }} />
                                </div>
                            </div>

                            <div className="premium-card">
                                <h5 className="header-small-label">TOP RECRUITERS</h5>
                                <div className="recruiter-tags">
                                    {rc?.placementBreakdown?.recruiters?.map((rec, index) => (
                                        <span className="recruiter-tag" key={index}>{rec}</span>
                                    ))}
                                </div>
                                <p className="text-small-muted" style={{ marginTop: '15px' }} dangerouslySetInnerHTML={{ __html: rc?.placementBreakdown?.description }}></p>
                            </div>
                        </section>
                    )}

                    {/* SECTION: ACADEMIC PRESSURE */}
                    {activeSectionTab === "academicPressure" && (
                        <section className="reality-section">
                            <span className="section-label">ACADEMIC PRESSURE</span>
                            <h2 className="reality-title reality-title-small">How intense is it really?</h2>
                            <p className="reality-subtitle">Rated across five dimensions of academic load.</p>

                            <div className="premium-card">
                                <div className="academic-ratings">
                                    {rc?.academicPressure?.ratings?.map((item, index) => (
                                        <div className="academic-rating-row" key={index}>
                                            <div className="rating-label">{item.label}</div>
                                            <div className="rating-bar-container">
                                                <div className="rating-bar-bg">
                                                    <div className="rating-bar-fill" style={{ width: `${(item.score / 10) * 100}%`, background: item.color }}></div>
                                                </div>
                                                <div className="rating-score">{item.score}/10</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="premium-card premium-card-light">
                                <p className="text-content-p" dangerouslySetInnerHTML={{ __html: rc?.academicPressure?.description }} />
                            </div>
                        </section>
                    )}

                    {/* SECTION: COURSES & FEES */}
                    {activeSectionTab === "coursesAndFees" && (
                        <section className="reality-section">
                            <span className="section-label">COURSES & FEES</span>
                            <h2 className="reality-title reality-title-small">Programs and what they cost</h2>
                            <p className="reality-subtitle">Approximate annual fees — confirm with the admissions office.</p>

                            <div className="premium-card premium-card-no-padding">
                                <div className="courses-table">
                                    <div className="table-header">
                                        <div className="col-program">PROGRAM</div>
                                        <div className="col-duration">DURATION</div>
                                        <div className="col-fees">ANNUAL FEES</div>
                                    </div>
                                    {rc?.coursesAndFees?.map((course, index) => (
                                        <div className="table-row" key={index}>
                                            <div className="col-program">
                                                <span className={`type-badge ${course.type.toLowerCase()}`}>{course.type}</span>
                                                <span className="course-name">{course.name} {course.extra_text ? `${course.extra_text}` : ''}</span>
                                            </div>
                                            <div className="col-duration">{course.duration}</div>
                                            <div className="col-fees">
                                                {new Intl.NumberFormat('en-IN', {
                                                    style: 'currency',
                                                    currency: 'INR',
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                }).format(Number(String(course.fees).replace(/[^0-9.-]+/g, "")))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* SECTION: ADMISSION REALITY */}
                    {activeSectionTab === "admissionReality" && (
                        <section className="reality-section">
                            <span className="section-label">ADMISSION REALITY</span>
                            {rc?.admissionReality?.isPartner && (
                                <div className="admission-gradient-card">
                                    <span className="partner-label">Official Admission Partner</span>
                                    <h2 className="admission-title">{rc?.admissionReality?.title}</h2>
                                    <p className="admission-desc" dangerouslySetInnerHTML={{ __html: rc?.admissionReality?.description }} />

                                    <div className="admission-pills">
                                        {rc?.admissionReality?.pills?.map((pill, i) => (
                                            <span className="admission-pill" key={i}>{pill}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="premium-card">
                                <p className="text-content-p mb-25">Here's how the admission process actually works — no fluff:</p>

                                <div className="admission-process">
                                    {rc?.admissionReality?.process?.map((step, index) => (
                                        <div className="red-flag-item" key={index}>
                                            <div className="flag-num process-step-num-light">{index + 1}</div>
                                            <div className="gap-content">
                                                <h4 className="process-step-title">{step.title}</h4>
                                                <p className="process-step-desc" dangerouslySetInnerHTML={{ __html: step.description }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="advantage-box">
                                    <p>
                                        <strong>Udaan Scholars Advantage:</strong> <span dangerouslySetInnerHTML={{ __html: rc?.admissionReality?.advantage }} />
                                    </p>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* SECTION: SCHOLARSHIPS */}
                    {activeSectionTab === "scholarships" && (
                        <section className="reality-section">
                            <span className="section-label">SCHOLARSHIPS</span>
                            <h2 className="reality-title reality-title-small">Financial aid available</h2>
                            <p className="reality-subtitle">Apply early — scholarship seats are limited and competition is high.</p>

                            <div className="premium-card premium-card-no-padding">
                                <div className="scholarship-list">
                                    {rc?.scholarships?.map((item, index) => (
                                        <div className="scholarship-row" key={index}>
                                            <div className="scholarship-title">{item.title}</div>
                                            <div className="scholarship-benefit">{item.benefit}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* SECTION: HOSTEL EXPERIENCE */}
                    {activeSectionTab === "hostelExperience" && (
                        <section className="reality-section">
                            <span className="section-label">HOSTEL EXPERIENCE</span>
                            <h2 className="reality-title reality-title-small">Life on campus</h2>
                            <p className="reality-subtitle">The good, the strict, and the alternatives.</p>

                            <div className="hostel-grid">
                                <div className="hostel-card good">
                                    <h5>THE GOOD</h5>
                                    <p dangerouslySetInnerHTML={{ __html: rc?.hostelExperience?.good }} />
                                </div>
                                <div className="hostel-card reality">
                                    <h5>THE REALITY</h5>
                                    <p dangerouslySetInnerHTML={{ __html: rc?.hostelExperience?.reality }} />
                                </div>
                                <div className="hostel-card alternative">
                                    <h5>OFF-CAMPUS ALTERNATIVE</h5>
                                    <p dangerouslySetInnerHTML={{ __html: rc?.hostelExperience?.alternative }} />
                                </div>
                                <div className="hostel-card sentiment">
                                    <h5>STUDENT SENTIMENT</h5>
                                    <p dangerouslySetInnerHTML={{ __html: rc?.hostelExperience?.sentiment }} />
                                </div>
                            </div>
                        </section>
                    )}

                    {/* SECTION: STUDENT VOICES */}
                    {activeSectionTab === "studentVoices" && (
                        <section className="reality-section">
                            <span className="section-label">STUDENT VOICES</span>
                            <h2 className="reality-title reality-title-small">Real opinions, unfiltered</h2>
                            <p className="reality-subtitle">Individual perspectives from students and graduates.</p>

                            <div className="voices-list">
                                {rc?.studentVoices?.map((voice, index) => (
                                    <div className="voice-card" key={index} style={{ borderLeft: `4px solid ${voice.color}` }}>
                                        <p className="voice-quote">"<span dangerouslySetInnerHTML={{ __html: voice.quote }} />"</p>
                                        <div className="voice-footer">
                                            <div className="voice-avatar" style={{ background: `${voice.color}15`, color: voice.color }}>{voice.initials}</div>
                                            <div className="voice-info">
                                                <div className="voice-name">{voice.name}</div>
                                                <div className="voice-details">{voice.details}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* SECTION: THE HONEST VERDICT */}
                    {activeSectionTab === "verdict" && (
                        <section className="reality-section">
                            <span className="section-label">SHOULD YOU CONSIDER THIS?</span>
                            <h2 className="reality-title reality-title-small">The honest verdict</h2>
                            <p className="reality-subtitle">Three categories to help you decide.</p>

                            <div className="verdict-grid">
                                <div className="verdict-card go">
                                    <h5>GO FOR IT IF YOU ARE...</h5>
                                    <ul>
                                        {rc?.verdict?.goForIt?.map((item, i) => <li key={i}><span className="v-icon">✓</span> <span dangerouslySetInnerHTML={{ __html: item }} /></li>)}
                                    </ul>
                                </div>
                                <div className="verdict-card think">
                                    <h5>THINK CAREFULLY IF YOU ARE...</h5>
                                    <ul>
                                        {rc?.verdict?.thinkCarefully?.map((item, i) => <li key={i}><span className="v-icon">?</span> <span dangerouslySetInnerHTML={{ __html: item }} /></li>)}
                                    </ul>
                                </div>
                                <div className="verdict-card reconsider">
                                    <h5>RECONSIDER IF YOU ARE...</h5>
                                    <ul>
                                        {rc?.verdict?.reconsider?.map((item, i) => <li key={i}><span className="v-icon">✕</span> <span dangerouslySetInnerHTML={{ __html: item }} /></li>)}
                                    </ul>
                                </div>
                            </div>

                            <div className="premium-card premium-card-light mt-30">
                                <p className="text-small-muted" dangerouslySetInnerHTML={{ __html: rc?.verdict?.disclaimer }} />
                            </div>
                        </section>
                    )}
                </div>

                <aside className="college-right-sidebar">

                    {adsData && adsData.length > 0 && adsData.map((ad, index) => (
                        <div className="sidebar-ad-card" key={index}>
                            {ad.redirectUrl ? (
                                <a href={ad.redirectUrl} target="_blank" rel="noopener noreferrer">
                                    <img src={apiImageWrapper(ad.image)} alt={`Ad ${index}`} className="ad-banner" />
                                </a>
                            ) : (
                                <img src={apiImageWrapper(ad.image)} alt={`Ad ${index}`} className="ad-banner" />
                            )}
                        </div>
                    ))}

                    <RecentlyViewed />
                </aside>
            </div>
            {isModalOpen && <UniversityModal sectionFrom={modalOpenFor} />}
        </div>
    );
};

export default CollegeDetails;