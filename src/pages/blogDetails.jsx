import React, { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import "./blogDetails.css";
import { FaFacebook, FaInstagram, FaWhatsapp, FaTwitter } from 'react-icons/fa';
import { useGetBlogDetails, useGetRecentBlogList, useBlogDetailsViewUpdate } from "@/hooks/blogHook";
import { Link, useParams } from "react-router-dom";
import FullPageLoader from "../components/FullPageLoader";
import { apiImageWrapper } from "@/utils/helpers";
import SkeletonLoader from "@/components/SkeletonLoader";
import moment from "moment";
import { Helmet } from "react-helmet-async";
const BlogDetails = () => {
    const { slug } = useParams();
    const { data, isLoading, isFetching, error, refetch } = useGetBlogDetails({ slug });
    const { data: getRecentBlogData, isLoading: isLoadingRecentBlogData, isFetching: isFetchingRecentBlogData, error: errorRecentBlogData, isFetchingNextPage: isFetchingNextPageRecentBlogData, hasNextPage: hasNextPageRecentBlogData, fetchNextPage: fetchNextFetchRecentBlogData, refetch: refetchRecentBlogData } = useGetRecentBlogList();
    const { mutateAsync: useBlogDetailsViewUpdateAdd, isPending } = useBlogDetailsViewUpdate();
    const [activeId, setActiveId] = useState("");
    const tocItems = [
        { id: "section1", label: "Building Genuine Connections" },
        { id: "section2", label: "Boosting Confidence Through Personalized Guidance" },
        { id: "section3", label: "Gaining Clarity in Your Career Path" },
        { id: "section4", label: "Why Choose Face-to-Face Online Counseling?" }
    ];

    const blogs = [
        {
            id: 1,
            title:
                "Benefits of Face-to-Face Online Career Counseling: Building Connections, Confidence, and Clarity",
            img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
        },
        {
            id: 2,
            title: "Benefits of Face-to-Face Online Career Counseling Building...",
            img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        },
        {
            id: 3,
            title: "Benefits of Face-to-Face Online Career Counseling Building...",
            img: "https://images.unsplash.com/photo-1493244040629-496f6d136cc3",
        },
        {
            id: 4,
            title: "Benefits of Face-to-Face Online Career Counseling Building...",
            img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        },
    ];

    const blog = useMemo(() => {
        if (data && !isFetching) {
            return data || null;
        }
    }, [data, isFetching])

    const sortedBlocks = useMemo(() => {
        return blog?.blocks
            ? [...blog.blocks].sort((a, b) => a.order - b.order)
            : [];
    }, [blog]);




    const recentBlogs = useMemo(() => {
        return getRecentBlogData?.pages?.flatMap(page => page.data) || [];
    }, [getRecentBlogData]);

    useEffect(() => {
        if (data && !isFetching) {
            useBlogDetailsViewUpdateAdd({ slug });
        }
    }, [data, isFetching])

    const handleNativeShare = async () => {
        const shareData = {
            title: blog?.title,
            text: blog?.heading,
            url: window.location.href
        };

        if (navigator.share) {

            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log("Share cancelled");
            }

        } else {

            // fallback → copy link
            navigator.clipboard.writeText(window.location.href);
            alert("Sharing not supported. Link copied!");

        }

    };

    useEffect(() => {

        const handleScroll = () => {

            const scrollPosition = window.scrollY + 200;

            sortedBlocks.forEach((item, index) => {

                const section = document.getElementById(index);

                if (section) {
                    if (
                        scrollPosition >= section.offsetTop &&
                        scrollPosition < section.offsetTop + section.offsetHeight
                    ) {
                        setActiveId(index);
                    }
                }

            });

        };


        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);

    }, [blog]);
    return (
        <>
            <section className="section-top mt-3">
                {/* <div className="container">
                    <div className="col-lg-10 offset-lg-1 text-center">
                        <div
                            className="section-top-title wow fadeInRight"
                            data-wow-duration="1s"
                            data-wow-delay="0.3s"
                            data-wow-offset="0"
                        >
                            <h1>List of Top Management Colleges</h1>
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
            <div className="blog_details_page">
                {(isLoading || isFetching) && <FullPageLoader />}
                <Container>
                    {!isFetching && blog && (
                        <Helmet key={blog?._id || "loading"} defer={false}>
                            <title>{blog?.title ? `${blog.title} - Uddan Scholars Blog` : "Blog Details - Uddan Scholars"}</title>
                            <meta name="description" content={blog?.seoDescription || blog?.title || "Blog Details"} />
                            <meta property="og:title" content={blog?.seoTitle} />
                            <meta property="og:description" content={blog?.seoDescription || blog?.title} />
                            <meta property="og:image" content={apiImageWrapper(blog?.coverImage)} />
                            <meta property="og:url" content={window.location.href} />
                            <meta property="og:type" content="article" />

                            {/* Twitter Preview */}
                            <meta name="twitter:card" content="summary_large_image" />
                            <meta name="twitter:title" content={blog?.title} />
                            <meta name="twitter:image" content={apiImageWrapper(blog?.coverImage)} />



                        </Helmet>
                    )}
                    {!isFetching && data && blog && (<>
                        <div className="blog_header">

                            <h2 className="blog_main_title">
                                {blog?.title}
                            </h2>

                            {/* <div className="read_time">3 min read</div> */}

                            <div className="blog_author_row">

                                <div className="author_box">
                                    {/* <Image
                                        src={apiImageWrapper(blog?.author?.image)}
                                        roundedCircle
                                    /> */}
                                    <div>
                                        {/* <div className="author_name">{blog?.author?.name}</div> */}
                                        <div className="author_date">{moment(blog?.publishedAt).format("DD MMM YYYY")}</div>
                                    </div>
                                </div>

                                {/* <div className="blog_actions">
              👍 <span>65</span>
              💬 <span>31</span>
            </div> */}

                            </div>

                        </div>

                        {/* FEATURE IMAGE */}
                        <div className="blog_feature_image">
                            <img
                                src={apiImageWrapper(blog?.coverImage)}
                                alt=""
                            />
                        </div>


                        {/* CONTENT AREA */}
                        <Row className="blog_main_row">

                            {/* LEFT TOC */}
                            <Col xxl={3} xl={3} lg={4} md={12}>
                                <div className="blog_left_fixed">
                                    <div className="toc_box">

                                        {sortedBlocks?.map((item, index) => (

                                            <div
                                                key={index}
                                                className={`toc_item ${activeId === index ? "active" : ""}`}
                                                onClick={() =>
                                                    document.getElementById(index).scrollIntoView({
                                                        behavior: "smooth",
                                                        block: "start"
                                                    })
                                                }
                                            >
                                                {item.title}
                                            </div>

                                        ))}
                                        <div className="share_block desktop_share">

                                            <div className="share_title">Share Article</div>

                                            <div className="share_icons mt-2">

                                                <a
                                                    href={`#`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="share_icon fb"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleNativeShare();
                                                    }}
                                                >
                                                    <FaFacebook />
                                                </a>

                                                <a href="#" className="share_icon ig" onClick={(e) => {
                                                    e.preventDefault();
                                                    handleNativeShare();
                                                }}>
                                                    <FaInstagram />
                                                </a>

                                                <a href="#" className="share_icon wa" onClick={(e) => {
                                                    e.preventDefault();
                                                    handleNativeShare();
                                                }}>
                                                    <FaWhatsapp />
                                                </a>

                                                <a href="#" className="share_icon tw" onClick={(e) => {
                                                    e.preventDefault();
                                                    handleNativeShare();
                                                }}>
                                                    <FaTwitter />
                                                </a>

                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </Col>

                            {/* RIGHT CONTENT */}
                            <Col xxl={7} xl={8} lg={8} md={12}>
                                <div className="blog_content">
                                    <p className="mt-3" dangerouslySetInnerHTML={{ __html: blog?.content }}></p>
                                    {sortedBlocks?.map((item, index) => (
                                        item?.type == "image" ? (
                                            <img className="mt-2 mb-2" src={apiImageWrapper(item?.imageUrl)} alt="" />
                                        ) : (
                                            <>

                                                <h5 dangerouslySetInnerHTML={{ __html: item?.title }} id={index}></h5>
                                                <p className="mt-3" dangerouslySetInnerHTML={{ __html: item?.content }}></p>
                                            </>
                                        )
                                    ))}


                                </div>

                                {/* ✅ MOBILE SHARE BLOCK */}
                                <div className="share_block mobile_share">
                                    <div className="share_title">Share Article</div>

                                    <div className="share_icons mt-2">
                                        <a
                                            href={`#`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="share_icon fb"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleNativeShare();
                                            }}
                                        >
                                            <FaFacebook />
                                        </a>
                                        <a href="#" className="share_icon ig" onClick={(e) => {
                                            e.preventDefault();
                                            handleNativeShare();
                                        }}><FaInstagram /></a>
                                        <a href="#" className="share_icon wa" onClick={(e) => {
                                            e.preventDefault();
                                            handleNativeShare();
                                        }}><FaWhatsapp /></a>
                                        <a href="#" className="share_icon tw" onClick={(e) => {
                                            e.preventDefault();
                                            handleNativeShare();
                                        }}><FaTwitter /></a>
                                    </div>
                                </div>
                            </Col>

                        </Row>
                    </>)}

                    {!isFetching && blog && !blog && (
                        <Row className="g-4 mb-5">
                            <Col lg={12} md={12}>
                                <p className="text-center">No Data Found</p>
                            </Col>
                        </Row>
                    )}

                    <div className="mt-3">
                        <h4 className="section_title">Latest Blogs</h4>

                        <Row className="g-4">
                            {recentBlogs?.map((item, index) => (
                                <Col md={6} key={index}>
                                    <Link to={`/blog-details/${item?.slug}`} className="d-block h-100">
                                        <Card className="hero_blog h-100">
                                            <Card.Img src={apiImageWrapper(item?.coverImage)} />
                                            <Card.Body className="d-flex flex-column">
                                                <h5 className="blog_title">{item.title}</h5>
                                                <p className="blog_desc">
                                                    {item?.heading}
                                                </p>
                                                <div className="blog_meta mt-auto">
                                                    {/* <div className="author">
                                                                    <img
                                                                        src={apiImageWrapper(item?.author?.image)}
                                                                        alt=""
                                                                    />
                                                                    <span>{item?.author?.name}</span>
                                                                </div> */}

                                                    <span className="read_time">{moment(item?.publishedAt).format("DD MMM YYYY")}</span>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </Col>
                            ))}

                            {(isFetchingNextPageRecentBlogData || isFetchingRecentBlogData) && (
                                <>
                                    <Col md={6}>
                                        <SkeletonLoader count={1} width={'100%'} height={400} />
                                    </Col>

                                    <Col md={6}>
                                        <SkeletonLoader count={1} width={'100%'} height={400} />
                                    </Col>
                                </>
                            )}

                        </Row>

                        {!isFetchingRecentBlogData && recentBlogs && recentBlogs?.length == 0 && (
                            <Row className="g-4 mb-5">
                                <Col lg={12} md={12}>
                                    <p className="text-center">No Data Found</p>
                                </Col>
                            </Row>
                        )}
                        {hasNextPageRecentBlogData && (
                            <div className="text-center mt-3">
                                <button className="btn_one " onClick={fetchNextFetchRecentBlogData}>
                                    {isFetchingNextPageRecentBlogData ? "Loading..." : "View More"}
                                </button>
                            </div>
                        )}
                    </div>

                </Container>

            </div>
        </>
    );
};

export default BlogDetails;