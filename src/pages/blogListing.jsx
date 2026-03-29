import React, { useCallback ,useMemo,useState} from "react";
import { Container, Row, Col, Card, Form, InputGroup } from "react-bootstrap";
import "./blogListing.css";
import {useGetPopulerBlogList,useGetPopulerBlogFirst,useGetRecentBlogList,useGetPopulerBlogHeading,useGetPopulerBlogHeadingSearch} from "@/hooks/blogHook";
import { apiImageWrapper } from "@/utils/helpers";
import SkeletonLoader from "@/components/SkeletonLoader";
import moment from "moment";
import { Link, useParams,useNavigate } from "react-router-dom";
import Select from "react-select";
const BlogListing = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState("");
    const { data, isLoading, isFetching, error ,isFetchingNextPage,hasNextPage,fetchNextPage,refetch } = useGetPopulerBlogList();
    const { data:getFirstPropulerData, isFetching:isFetchinggetFirstPropulerData, error:isErrorgetFirstPropulerData} = useGetPopulerBlogFirst();
    const { data:getPopularHeading, isFetching:isFetchinggetPopularHeading, error:isErrorgetPopularHeading} = useGetPopulerBlogHeading();
    const { data:getRecentBlogData, isLoading:isLoadingRecentBlogData, isFetching:isFetchingRecentBlogData, error:errorRecentBlogData ,isFetchingNextPage:isFetchingNextPageRecentBlogData,hasNextPage:hasNextPageRecentBlogData,fetchNextPage:fetchNextFetchRecentBlogData,refetch:refetchRecentBlogData } = useGetRecentBlogList();
    const { data:getPopulerBlogHeadingSearch, isFetching:isFetchingGetPopulerBlogHeadingSearch, error:isErrorGetPopulerBlogHeadingSearch} = useGetPopulerBlogHeadingSearch();
    const blogs = useMemo(() => {
        return data?.pages?.flatMap(page => page.data.slice(1)) || [];
    }, [data]);
    const recentBlogs = useMemo(() => {
        return getRecentBlogData?.pages?.flatMap(page => page.data) || [];
    }, [getRecentBlogData]);
    const populerHeading = useMemo(() => {
            if(getPopularHeading && !isFetchinggetPopularHeading){
                return getPopularHeading || [];
            }
    }, [getPopularHeading,isFetchinggetPopularHeading]);
    const blogOne = useCallback(() => {
        if(getFirstPropulerData && !isFetchinggetFirstPropulerData){
            
            return getFirstPropulerData[0];
        }
    },[getFirstPropulerData,isFetchinggetFirstPropulerData])

    const getSearchBlogHeading = useMemo(() => {
        if(!isFetchingGetPopulerBlogHeadingSearch && getPopulerBlogHeadingSearch){
            let opt = getPopulerBlogHeadingSearch?.map(item => ({
                value: item.slug,
                label: item.title,
                data: item
            }));
            return opt;
        }else{
            return [];
        }
    },[getPopulerBlogHeadingSearch,isFetchingGetPopulerBlogHeadingSearch])

    const handleChange = (selectedOption) => {
    if (selectedOption) {
      navigate(`/blog-details/${selectedOption.value}`);
    }
  };

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
            <Container fluid="lg" className="blog_page">

                {/* POPULAR BLOG */}
                <Row className="mb-4">
                    <Col lg={8}>
                        <h4 className="section_title">Popular Blogs</h4>
                        
                        {isFetchinggetFirstPropulerData ? (
                            <SkeletonLoader count={1} width={'100%'} height={400}  />
                        ):(
                        <Card className="hero_blog">
                            <Link to={`/blog-details/${blogOne()?.slug}`}>
                            <Card.Img variant="top" src={apiImageWrapper(blogOne()?.coverImage)} />
                            <Card.Body>
                                <h5 className="blog_title">{blogOne()?.title}</h5>
                                <p className="blog_desc mt-2">
                                    {blogOne()?.heading}
                                </p>

                                <div className="blog_meta mt-2">
                                    <div className="author">
                                        <img
                                            src={apiImageWrapper(blogOne()?.author?.image)}
                                            alt=""
                                        />
                                        <span>{blogOne()?.author?.name}</span>
                                    </div>

                                    <span className="read_time"> 
                                        {moment(blogOne()?.publishedAt).format("DD MMM YYYY")}
                                    </span>
                                </div>
                            </Card.Body>
                            </Link>
                        </Card>
                        )}
                        {!isErrorgetFirstPropulerData && getFirstPropulerData && getFirstPropulerData.length == 0 && (
                            <p className="text-center">No Data Found</p>
                        )}
                    </Col>

                    {/* SIDEBAR */}
                    <Col lg={4}>
                        <InputGroup className="mt-3" style={{width:"100%"}}>
                        <Select
                            options={inputValue ? getSearchBlogHeading : []}
                            onInputChange={(value) => setInputValue(value)}
                            placeholder="Search"
                            className="form-control"
                            isLoading={isFetchingGetPopulerBlogHeadingSearch}
                            onChange={handleChange}
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    border: "none"
                                }),
                            }}
                            isClearable
                        />
                            {/* <Form.Control placeholder="Search" /> */}
                        </InputGroup>
                        <div className="trending_box">

                            <h5 className="trending_heading">🔥 Trending</h5>

                                {isFetchinggetPopularHeading ? (
                                    <SkeletonLoader count={1} width={'100%'} height={200}  />
                                ):(
                                    <>
                                        {populerHeading?.map((item, index) => (

                                            <div className="trending_item" key={index} onClick={() => {
                                                navigate(`/blog-details/${item?.slug}`);
                                            }}>

                                                <div className="trend_number">
                                                    {index + 1}
                                                </div>

                                                <p className="trend_title">{item?.title}</p>

                                            </div>

                                        ))}
                                    </>
                                )}



                            

                        </div>
                    </Col>
                </Row>

                {/* GRID BLOGS */}
                
                <Row className="g-4 mb-1">
                    {blogs?.map((item,index) => (
                        <Col lg={4} md={6} key={index}>
                            <Card className="blog_card">
                                <Link to={`/blog-details/${item?.slug}`}>
                                <Card.Img src={apiImageWrapper(item?.coverImage)} />

                                <Card.Body>
                                    <h6 className="blog_card_title">{item.title}</h6>

                                    <p className="blog_desc small">
                                        {item?.heading}
                                    </p>

                                    <div className="blog_meta">
                                        <div className="author">
                                            <img
                                                src={apiImageWrapper(item?.author?.image)}
                                                alt=""
                                            />
                                            <span>{item?.author?.name}</span>
                                        </div>

                                        <span className="read_time">{moment(item?.publishedAt).format("DD MMM YYYY")}</span>
                                    </div>
                                </Card.Body>
                                </Link>
                            </Card>
                        </Col>
                    ))}
                    {(isFetchingNextPage || isFetching )&& (
                    <>
                        <Col lg={4} md={6}>
                            <SkeletonLoader count={1} width={'100%'} height={250}/>
                        </Col>

                        <Col lg={4} md={6}>
                            <SkeletonLoader count={1} width={'100%'} height={250}/>
                        </Col>

                        <Col lg={4} md={6}>
                            <SkeletonLoader count={1} width={'100%'} height={250}/>
                        </Col>
                    </>
                )}
                </Row>

                
                

                {!isFetching && blogs && blogs?.length == 0 && (
                    <Row className="g-4 mb-5">
                        <Col lg={12} md={12}>
                            <p className="text-center">No Data Found</p>
                        </Col>
                    </Row>
                )}
                {hasNextPage && (
                <div className="text-center mt-1 mb-3">
                    <button className="btn_one " onClick={fetchNextPage}>
                        {isFetchingNextPage ? "Loading..." : "View More"}
                    </button>
                </div>
                )}
                

                {/* LATEST BLOG */}
                <h4 className="section_title">Latest Blogs</h4>

                <Row className="g-4">
                {recentBlogs?.map((item,index) => (
                    <Col md={6} key={index}>
                        <Link to={`/blog-details/${item?.slug}`}>
                        <Card className="hero_blog">
                            <Card.Img src={apiImageWrapper(item?.coverImage)} />
                            <Card.Body>
                                <h5 className="blog_title">{item.title}</h5>
                                <p className="blog_desc">
                                    {item?.heading}
                                </p>
                                <div className="blog_meta">
                                    <div className="author">
                                        <img
                                            src={apiImageWrapper(item?.author?.image)}
                                            alt=""
                                        />
                                        <span>{item?.author?.name}</span>
                                    </div>

                                    <span className="read_time">{moment(item?.publishedAt).format("DD MMM YYYY")}</span>
                                </div>
                            </Card.Body>
                        </Card>
                        </Link>
                    </Col>
                    ))}
                    
                    {(isFetchingNextPageRecentBlogData || isFetchingRecentBlogData )&& (
                    <>
                        <Col md={6}>
                            <SkeletonLoader count={1} width={'100%'} height={400}/>
                        </Col>

                        <Col md={6}>
                            <SkeletonLoader count={1} width={'100%'} height={400}/>
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

            </Container>
        </>
    );
};

export default BlogListing;