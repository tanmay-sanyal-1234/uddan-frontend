import {
    image_2,
    image1,
    image3,
    image4,
    college_banner,
    college_logo,
} from "../assets/images";
import "./collegeListing.css";
import {
    useGetCollegeList,
    useGetCityState,
    useGetStreams,
    useGetCourses,
} from "../hooks/collegeHook";
import FullPageLoader from "../components/FullPageLoader";
import { useEffect, useState, useMemo, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import CollegeListComponent from "@/components/CollegeListComponent";
import { Accordion } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import ThreeDotLoader from '@/components/ThreeDotLoader';
import Select from "react-select";
const College = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchParamsAttr, setSearchParamsAttr] = useState(searchParams);
    const [showMobileFilter, setShowMobileFilter] = useState(false);
    const [pages, setPages] = useState(1);
    const [limit, setLimit] = useState(10);
    const [filterQuery, setFilterQuery] = useState("");
    const [checkItems, setCheckItems] = useState({
        course: [],
        state: [],
        city: [],
        stream: [],
        collegeType: [],
    });
    const [openSections, setOpenSections] = useState({
        course: true,
        state: true,
        city: true,
        stream: true,
    });
    const [courseSearch, setCourseSearch] = useState("");
    const [stateSearch, setStateSearch] = useState("");
    const [citySearch, setCitySearch] = useState("");
    const [streamSearch, setStreamSearch] = useState("");
    const [collegeTypeSearch, setCollegeTypeSearch] = useState("");
    const { data, isLoading, isFetching, refetch, error, fetchNextPage, hasNextPage ,isFetchingNextPage,isPending} = useGetCollegeList(
        pages,
        limit,
        filterQuery,
    );
    const collegeType = [
    {
        value:"GOVT" , label:"Government"},{
        value:"S_GOVT" , label:"Semi Government"},{
        value:"PVT" , label:"Private",
    }
]
 const filteredCollegeTypes = useMemo(() => {
        if (!collegeTypeSearch) return collegeType || [];
        return collegeType?.filter((ct) =>
            ct.label.toLowerCase().includes(collegeTypeSearch.toLowerCase()),
        );
    }, [collegeType, collegeTypeSearch]);
    const allData = useCallback(() => {
        return data?.pages?.flatMap(page => page.data) || [];
    },[data])
    const {
        data: cityStateData,
        isLoading: isLoadingCityState,
        isFetching: isFetchingCityState,
        error: cityStateError,
    } = useGetCityState();
    const {
        data: streamsData,
        isLoading: isLoadingStreams,
        isFetching: isFetchingStreams,
        error: streamsError,
    } = useGetStreams();
    const {
        data: coursesData,
        isLoading: isLoadingCourses,
        isFetching: isFetchingCourses,
        error: coursesError,
    } = useGetCourses();
    const clearAllUrlFilters = () => {
        setSearchParams({});
    };
    const cities = useMemo(() => {
        if (cityStateData) {
            let cityList = [];
            cityStateData.forEach((state) => {
                state.cities.forEach((city) => {
                    cityList.push({
                        _id: city._id,
                        name: city.name,
                    });
                });
            });
            return cityList;
        }
        return [];
    }, [cityStateData]);

    const states = useMemo(() => {
        if (cityStateData) {
            return cityStateData.map((item) => ({
                _id: item._id,
                name: item.name,
            }));
        }
        return [];
    }, [cityStateData]);

    // const handleFilterChange = (e) => {
    //     const { name, value, checked } = e.target;
    //     setCheckItems((prev) => {
    //         const updatedArray = checked
    //             ? [...prev[name], value]
    //             : prev[name].filter((item) => item !== value);
    //         return {
    //             ...prev,
    //             [name]: updatedArray
    //         };
    //     });
    // };

    // const handleFilterChange = (e) => {
    //     const { name, value, checked } = e.target;
    //     const itemName = e.target.getAttribute('data-name');
    //     setCheckItems((prev) => {
    //         const updatedArray = checked
    //             ? [...prev[name], {
    //                 id: value,
    //                 name: itemName
    //             }]
    //             : prev[name].filter((item) => item.id !== value);
    //         return {
    //             ...prev,
    //             [name]: updatedArray
    //         };
    //     });
    // };

    // const handleFilterChange = (e) => {
    //     const { name, value, checked } = e.target;
    //     const itemName = e.target.getAttribute('data-name');
    //     setCheckItems((prev) => {
    //         const updatedArray = checked
    //             ? [...prev[name], {
    //                 id: value,
    //                 name: itemName
    //             }]
    //             : prev[name].filter((item) => item.id !== value);
    //         return {
    //             ...prev,
    //             [name]: updatedArray
    //         };
    //     });
    // };

    const handleFilterChange = (e) => {
        const { name, value, checked } = e.target;

        const params = new URLSearchParams(searchParams);
        const current = params.get(name)?.split(",").filter(Boolean) || [];

        let updated;

        if (checked) {
            updated = [...new Set([...current, value])];
        } else {
            updated = current.filter((id) => id !== value);
        }

        if (updated.length > 0) {
            params.set(name, updated.join(","));
        } else {
            params.delete(name);
        }

        setSearchParams(params);
    };

    const checkItemSetFun = async (sP) => {
        const getIds = (key) => sP.get(key)?.split(",").filter(Boolean) || [];
        setCheckItems({
            course: getIds("course").map((id) => ({
                id,
                name: coursesData?.find((c) => c._id === id)?.name || "",
            })),
            state: getIds("state").map((id) => ({
                id,
                name: states.find((s) => s._id === id)?.name || "",
            })),
            city: getIds("city").map((id) => ({
                id,
                name: cities.find((c) => c._id === id)?.name || "",
            })),
            stream: getIds("stream").map((id) => ({
                id,
                name: streamsData?.find((s) => s._id === id)?.name || "",
            })),
            collegeType: getIds("collegeType").map((value) => ({
                value,
                name: collegeType.find((ct) => ct.value === value)?.label || "",
            })),

        });
    };

    useEffect(() => {
        const params = new URLSearchParams();

        ["course", "state", "city", "stream", "minPrice", "maxPrice","collegeType"].forEach(
            (key) => {
                searchParams.getAll(`${key}`).forEach((id) => {
                    params.append(key, id);
                });
            },
        );
        checkItemSetFun(searchParams);
        setFilterQuery(params.toString());
    }, [searchParams]);

    // useEffect(() => {
    //     const fetchFilteredColleges = async () => {
    //         console.log("Current checkItems:", checkItems);
    //         let query = [];
    //         if (checkItems.course.length > 0) {
    //             query.push(`course=${checkItems.course.map(item => item.id).join(",")}`);
    //         }
    //         if (checkItems.state.length > 0) {
    //             query.push(`state=${checkItems.state.map(item => item.id).join(",")}`);
    //         }
    //         if (checkItems.city.length > 0) {
    //             query.push(`city=${checkItems.city.map(item => item.id).join(",")}`);
    //         }
    //         if (checkItems.stream.length > 0) {
    //             query.push(`stream=${checkItems.stream.map(item => item.id).join(",")}`);
    //         }
    //         const queryString = query.length > 0 ? `${query.join("&")}` : "";
    //         console.log("Fetching colleges with query:", queryString);
    //         setFilterQuery(queryString);
    //     };
    //     fetchFilteredColleges();
    // }, [checkItems]);

    // useEffect(() => {
    //     refetch();
    // }, [filterQuery]);

    const filteredCourses = useMemo(() => {
        if (!courseSearch) return coursesData || [];
        return coursesData?.filter((c) =>
            c.name.toLowerCase().includes(courseSearch.toLowerCase()),
        );
    }, [coursesData, courseSearch]);

    const filteredStates = useMemo(() => {
        if (!stateSearch) return states;
        return states.filter((s) =>
            s.name.toLowerCase().includes(stateSearch.toLowerCase()),
        );
    }, [states, stateSearch]);

    const filteredCities = useMemo(() => {
        if (!citySearch) return cities;
        return cities.filter((c) =>
            c.name.toLowerCase().includes(citySearch.toLowerCase()),
        );
    }, [cities, citySearch]);

    const filteredStreams = useMemo(() => {
        if (!streamSearch) return streamsData || [];
        return streamsData?.filter((s) =>
            s.name.toLowerCase().includes(streamSearch.toLowerCase()),
        );
    }, [streamsData, streamSearch]);
   
    const budgetRanges = [
        {value:"Select", label:"Select Budget Range"},
        { value: "<100000", label: "Under ₹1,00,000" },
        { value: "100000-200000", label: "₹1,00,000 – ₹2,00,000" },
        { value: "200000-300000", label: "₹2,00,000 – ₹3,00,000" },
        { value: "300000-500000", label: "₹3,00,000 – ₹5,00,000" },
        { value: "500000-800000", label: "₹5,00,000 – ₹8,00,000" },
        { value: ">800000", label: "Above ₹8,00,000" },
    ];

    useEffect(() => {
        if (
            searchParams.toString() != "" &&
            !isFetchingCityState &&
            !isFetchingCourses &&
            !isFetchingStreams
        ) {
            console.log("Search Params changed:", searchParams.toString());
            // setFilterQuery(searchParams);
            checkItemSetFun(searchParams);
        }
    }, [
        searchParamsAttr,
        isFetchingCityState,
        isFetchingCourses,
        isFetchingStreams,
    ]);

    const toggleSection = (section) => {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const customStyles = {
  clearIndicator: (base) => ({
    ...base,
    pointerEvents: "auto", // important
    cursor: "pointer"
  })
};





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
            {(isFetchingCourses && isFetchingStreams && isFetchingCityState) && (<FullPageLoader />)}
            <div className="row">
                <div className="mobile_filter_bar mt-5">

                    {/* <div className="mobile_filter_btn">
                        <i className="fa fa-sort"></i> Sort
                    </div>

                    <div className="mobile_divider"></div> */}

                    <div
                        className="mobile_filter_btn"
                        onClick={() => setShowMobileFilter(true)}
                    >
                        <button className="btn btn-dark">
                        <i className="fa fa-filter"></i> Filter
                        </button>

                        {Object.values(checkItems).flat().length > 0 && (
                            <span className="filter_badge">
                                {Object.values(checkItems).flat().length}
                            </span>
                        )}
                    </div>

                </div>

                <div className="container">
                    {showMobileFilter && (
                        <div className="mobile_filter_overlay">

                            <div className="mobile_filter_drawer">

                                <div className="mobile_filter_header">
                                    <h5>Filters</h5>

                                    <button onClick={() => setShowMobileFilter(false)}>
                                        ✕
                                    </button>
                                </div>

                                <div className="mobile_filter_body">

                                    <Accordion defaultActiveKey={["0", "1", "2", "3","4","5"]} alwaysOpen>

                                        {/* COURSE */}
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>Price Filter</Accordion.Header>
                                            <Accordion.Body>

                                                <div className="">
                                   
                                        <Select
                                                          options={budgetRanges}
                                                          placeholder="Budget Range"
                                                          value={budgetRanges.find(option => {
                                                            const minPrice = searchParams.get("minPrice");
                                                            const maxPrice = searchParams.get("maxPrice");
                                                            return minPrice && maxPrice && option.value === `${minPrice}-${maxPrice}`;
                                                          })}

                                                          onChange={(e) => {
                                                            const params = new URLSearchParams(searchParams);
                                                            if (e.value) {
                                                                if(e.value == "Select"){
                                                                    params.delete("minPrice");
                                                                    params.delete("maxPrice");
                                                                }else{

                                                                params.set("minPrice", e.value.split("-")[0]);
                                                                params.set("maxPrice", (e.value.split("-")[1] || e.value.replace(">","")) );
                                                                }

                                                            } else {
                                                                params.delete("minPrice");
                                                                params.delete("maxPrice");
                                                            }
                                                            setSearchParams(params);
                                                        }}
                                                          isClearable={true}
                                                          styles={customStyles}
                                                        
                                                          
                                                        />
                                                        {(searchParams.get("minPrice") || searchParams.get("maxPrice")) && (
                                                        <button className="mt-3 btn-sm" onClick={() => {
                                                            const params = new URLSearchParams(searchParams);
                                                            params.delete("minPrice");
                                                            params.delete("maxPrice");
                                                            setSearchParams(params);
                                                        }}>
                                                            Clear X
                                                        </button>
                                                        )}
                                                        </div>

                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header>Course</Accordion.Header>
                                            <Accordion.Body>

                                                <input
                                                    type="text"
                                                    className="filter-search"
                                                    placeholder="Search course..."
                                                    value={courseSearch}
                                                    onChange={(e) => setCourseSearch(e.target.value)}
                                                />

                                                {filteredCourses.map((course) => (
                                                    <div key={course._id} className="single_langu">

                                                        <input
                                                            type="checkbox"
                                                            value={course._id}
                                                            name="course"
                                                            checked={checkItems.course.some(
                                                                (c) => c.id === course._id
                                                            )}
                                                            onChange={handleFilterChange}
                                                        />

                                                        {course.name}

                                                    </div>
                                                ))}

                                            </Accordion.Body>
                                        </Accordion.Item>

                                        {/* STATE */}

                                        <Accordion.Item eventKey="2">
                                            <Accordion.Header>State</Accordion.Header>
                                            <Accordion.Body>

                                                <input
                                                    type="text"
                                                    className="filter-search"
                                                    placeholder="Search state..."
                                                    value={stateSearch}
                                                    onChange={(e) => setStateSearch(e.target.value)}
                                                />

                                                {filteredStates.map((state) => (
                                                    <div key={state._id} className="single_langu">

                                                        <input
                                                            type="checkbox"
                                                            value={state._id}
                                                            name="state"
                                                            checked={checkItems.state.some(
                                                                (c) => c.id === state._id
                                                            )}
                                                            onChange={handleFilterChange}
                                                        />

                                                        {state.name}

                                                    </div>
                                                ))}

                                            </Accordion.Body>
                                        </Accordion.Item>

                                        {/* CITY */}

                                        <Accordion.Item eventKey="3">
                                            <Accordion.Header>City</Accordion.Header>
                                            <Accordion.Body>

                                                <input
                                                    type="text"
                                                    className="filter-search"
                                                    placeholder="Search city..."
                                                    value={citySearch}
                                                    onChange={(e) => setCitySearch(e.target.value)}
                                                />

                                                {filteredCities.map((city) => (
                                                    <div key={city._id} className="single_langu">

                                                        <input
                                                            type="checkbox"
                                                            value={city._id}
                                                            name="city"
                                                            checked={checkItems.city.some(
                                                                (c) => c.id === city._id
                                                            )}
                                                            onChange={handleFilterChange}
                                                        />

                                                        {city.name}

                                                    </div>
                                                ))}

                                            </Accordion.Body>
                                        </Accordion.Item>

                                        {/* STREAM */}

                                        <Accordion.Item eventKey="4">
                                            <Accordion.Header>Stream</Accordion.Header>
                                            <Accordion.Body>

                                                <input
                                                    type="text"
                                                    className="filter-search"
                                                    placeholder="Search stream..."
                                                    value={streamSearch}
                                                    onChange={(e) => setStreamSearch(e.target.value)}
                                                />

                                                {filteredStreams.map((stream) => (
                                                    <div key={stream._id} className="single_langu">

                                                        <input
                                                            type="checkbox"
                                                            value={stream._id}
                                                            name="stream"
                                                            checked={checkItems.stream.some(
                                                                (c) => c.id === stream._id
                                                            )}
                                                            onChange={handleFilterChange}
                                                        />

                                                        {stream.name}

                                                    </div>
                                                ))}

                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="5">
                                            <Accordion.Header>College Type</Accordion.Header>
                                            <Accordion.Body>

                                                <input
                                                    type="text"
                                                    className="filter-search"
                                                    placeholder="Search College Type..."
                                                    value={collegeTypeSearch}
                                                    onChange={(e) => setCollegeTypeSearch(e.target.value)}
                                                />

                                                {filteredCollegeTypes.map((collegeType) => (
                                                    <div key={collegeType.value} className="single_langu">

                                                        <input
                                                            type="checkbox"
                                                            value={collegeType.value}
                                                            name="collegeType"
                                                            checked={checkItems.collegeType?.some(
                                                                (c) => c.value === collegeType.value
                                                            )}
                                                            onChange={handleFilterChange}
                                                        />

                                                        {collegeType.label}

                                                    </div>
                                                ))}

                                            </Accordion.Body>
                                        </Accordion.Item>

                                    </Accordion>

                                </div>


                            </div>

                        </div>
                    )}
                </div>

            </div>
            <div className="best-cpurse section-padding">
                <div className="container">
                    {Object.keys(checkItems).some(
                        (key) => checkItems[key].length > 0,
                    ) && (
                            <div className="selected-filtered mb-4">
                                <h5>Selected Filters:</h5>
                                <div className="filters-list">
                                    {Object.keys(checkItems).map((key) =>
                                        checkItems[key].map((item) => (
                                            <span
                                                key={item.id}
                                                className="filter-item"
                                                onClick={() => {
                                                    // Remove filter on click
                                                    setCheckItems((prev) => {
                                                        const updatedArray = prev[key].filter(
                                                            (i) => i.id !== item.id,
                                                        );
                                                        return {
                                                            ...prev,
                                                            [key]: updatedArray,
                                                        };
                                                    });
                                                    // Update URL with new filter state
                                                    const params = new URLSearchParams(searchParams);
                                                    if(key === "collegeType"){
                                                        const current = params.get(key)?.split(",").filter(Boolean) || [];
                                                        const updated = current.filter((id) => id !== item.value);
                                                        if (updated.length > 0) {
                                                            params.set(key, updated.join(","));
                                                        } else {
                                                            params.delete(key);
                                                        }
                                                    }else{
                                                        const current =
                                                            params.get(key)?.split(",").filter(Boolean) || [];
                                                        const updated = current.filter((id) => id !== item.id);
                                                        if (updated.length > 0) {
                                                            params.set(key, updated.join(","));
                                                        } else {
                                                            params.delete(key);
                                                        }
                                                    }
                                                    setSearchParams(params);
                                                }}
                                            >
                                                {item.name} <i className="fa fa-times"></i>
                                            </span>
                                        )),
                                    )}
                                </div>
                            </div>
                        )}
                    <div className="row">
                        {/* LEFT CONTENT */}

                        {/* RIGHT SIDEBAR */}
                        <div className="col-lg-3 filter_sidebar">
                            {/* Search */}
                            {/* <div className="sidebar-post">
                                <div className="blog_search">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Type & Press Enter"
                                    />
                                </div>
                            </div> */}

                            {/* Price Filter */}
                            <div className="rs-slider">
                                <h4>Price Filter</h4>
                                {/* <div className="range-slider">
                                    <input type="range" min="0" max="500" />
                                    <span className="range-value">500</span>
                                </div> */}
                                <div className="range-slider">
                                   
                                        <Select
                                                          options={budgetRanges}
                                                          placeholder="Budget Range"
                                                          onChange={(e) => {
                                                            console.log(e,"eeeee")
                                                            const params = new URLSearchParams(searchParams);
                                                            if (e.value) {
                                                                if(e.value == "Select"){
                                                                    params.delete("minPrice");
                                                                    params.delete("maxPrice");
                                                                }else{

                                                                params.set("minPrice", e.value.split("-")[0]);
                                                                params.set("maxPrice", (e.value.split("-")[1] || e.value.replace(">","")) );
                                                                }

                                                            } else {
                                                                params.delete("minPrice");
                                                                params.delete("maxPrice");
                                                            }
                                                            setSearchParams(params);
                                                        }}
                                                          isClearable
                                                        
                                                          
                                                        />

                                </div>
                            </div>

                            {/* Skill Level */}
                            <Accordion defaultActiveKey={["0", "1", "2", "3","4"]} alwaysOpen>
                                <Accordion.Item eventKey="0" >
                                    <Accordion.Header>Course</Accordion.Header>
                                    <Accordion.Body>
                                        <div className="sidebar-post">
                                            <input
                                                type="text"
                                                className="filter-search"
                                                placeholder="Search course..."
                                                value={courseSearch}
                                                onChange={(e) => setCourseSearch(e.target.value)}
                                            />
                                            <div className="sidebar-scroll">
                                                {!isFetchingCourses &&
                                                    filteredCourses.map((course) => (
                                                        <div className="single_langu" key={course._id}>
                                                            <input
                                                                type="checkbox"
                                                                value={course._id}
                                                                data-name={course.name}
                                                                checked={checkItems.course.some(
                                                                    (c) => c.id === course._id,
                                                                )}
                                                                name="course"
                                                                onChange={handleFilterChange}
                                                            />{" "}
                                                            {course.name}
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>State</Accordion.Header>
                                    <Accordion.Body>
                                        <div className="sidebar-post">
                                            <div className="sidebar_title">
                                                <input
                                                    type="text"
                                                    className="filter-search"
                                                    placeholder="Search state..."
                                                    value={stateSearch}
                                                    onChange={(e) => setStateSearch(e.target.value)}
                                                />
                                            </div>
                                            <div className="sidebar-scroll">
                                                {filteredStates.map((state) => (
                                                    <div className="single_langu" key={state._id}>
                                                        <input
                                                            type="checkbox"
                                                            value={state._id}
                                                            name="state"
                                                            data-name={state.name}
                                                            checked={checkItems.state.some(
                                                                (c) => c.id === state._id,
                                                            )}
                                                            onChange={handleFilterChange}
                                                        />{" "}
                                                        {state.name}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>City</Accordion.Header>
                                    <Accordion.Body>
                                        <div className="sidebar-post">
                                            <div className="sidebar_title">
                                                <input
                                                    type="text"
                                                    className="filter-search"
                                                    placeholder="Search city..."
                                                    value={citySearch}
                                                    onChange={(e) => setCitySearch(e.target.value)}
                                                />
                                            </div>
                                            <div className="sidebar-scroll">
                                                {filteredCities.map((city) => (
                                                    <div className="single_langu" key={city._id}>
                                                        <input
                                                            type="checkbox"
                                                            value={city._id}
                                                            name="city"
                                                            checked={checkItems.city.some(
                                                                (c) => c.id === city._id,
                                                            )}
                                                            data-name={city.name}
                                                            onChange={handleFilterChange}
                                                        />{" "}
                                                        {city.name}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="3">
                                    <Accordion.Header>College Streams</Accordion.Header>
                                    <Accordion.Body>
                                        <div className="sidebar-post">
                                            <div className="sidebar_title">
                                                <input
                                                    type="text"
                                                    className="filter-search"
                                                    placeholder="Search stream..."
                                                    value={streamSearch}
                                                    onChange={(e) => setStreamSearch(e.target.value)}
                                                />
                                            </div>
                                            <div className="sidebar-scroll">
                                                {!isFetchingStreams &&
                                                    filteredStreams.map((stream) => (
                                                        <div className="single_langu" key={stream._id}>
                                                            <input
                                                                type="checkbox"
                                                                value={stream._id}
                                                                name="stream"
                                                                checked={checkItems.stream.some(
                                                                    (c) => c.id === stream._id,
                                                                )}
                                                                data-name={stream.name}
                                                                onChange={handleFilterChange}
                                                            />{" "}
                                                            {stream.name}
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="4">
                                    <Accordion.Header>College Type</Accordion.Header>
                                    <Accordion.Body>

                                        <input
                                            type="text"
                                            className="filter-search"
                                            placeholder="Search College Type..."
                                            value={collegeTypeSearch}
                                            onChange={(e) => setCollegeTypeSearch(e.target.value)}
                                        />

                                        {filteredCollegeTypes.map((collegeTypeAttr) => (
                                            <div key={collegeType.value} className="single_langu">

                                                <input
                                                    type="checkbox"
                                                    value={collegeTypeAttr.value}
                                                    name="collegeType"
                                                    checked={checkItems.collegeType?.some(
                                                        (c) => c.value === collegeTypeAttr.value
                                                    )}
                                                    onChange={handleFilterChange}
                                                />

                                                {collegeTypeAttr.label}

                                            </div>
                                        ))}

                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                        <div className="col-lg-9">
                            
                            <CollegeListComponent data={allData()} isFetching={isFetching} />
                            {(isPending || isFetchingNextPage || isFetching) && (
                                <div className="justify-content-center mt-4 d-flex text-center"><ThreeDotLoader loader={true}/></div>
                            )}
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
            </div>
            {/* <UniversityModal show={true} handleClose={() => {}}/> */}
            {/* <SubsidyModal show={true} handleClose={() => {}}/> */}
        </div>
    );
};

export default College;
