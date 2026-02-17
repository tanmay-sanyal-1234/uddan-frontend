import { image_2, image1, image3, image4, college_banner, college_logo } from "../assets/images";
import './collegeListing.css';
import { useGetCollegeList, useGetCityState, useGetStreams, useGetCourses } from "../hooks/collegeHook";
import FullPageLoader from "../components/FullPageLoader";
import { useEffect, useState, useMemo, use } from "react";
import { Link, useSearchParams } from "react-router-dom";
import CollegeListComponent from "@/components/CollegeListComponent";
const College = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchParamsAttr, setSearchParamsAttr] = useState(searchParams);
    const [pages, setPages] = useState(1);
    const [limit, setLimit] = useState(10);
    const [filterQuery, setFilterQuery] = useState("");
    const [checkItems, setCheckItems] = useState({
        course: [],
        state: [],
        city: [],
        stream: []
    });
    const [courseSearch, setCourseSearch] = useState("");
    const [stateSearch, setStateSearch] = useState("");
    const [citySearch, setCitySearch] = useState("");
    const [streamSearch, setStreamSearch] = useState("");
    const { data, isLoading, isFetching, refetch, error } = useGetCollegeList(pages, limit, filterQuery);
    const { data: cityStateData, isLoading: isLoadingCityState, isFetching: isFetchingCityState, error: cityStateError } = useGetCityState();
    const { data: streamsData, isLoading: isLoadingStreams, isFetching: isFetchingStreams, error: streamsError } = useGetStreams();
    const { data: coursesData, isLoading: isLoadingCourses, isFetching: isFetchingCourses, error: coursesError } = useGetCourses();
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
                        name: city.name
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
                name: item.name
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
            updated = current.filter(id => id !== value);
        }

        if (updated.length > 0) {
            params.set(name, updated.join(","));
        } else {
            params.delete(name);
        }

        setSearchParams(params);
    };

    const checkItemSetFun = async (sP) => {
        const getIds = (key) =>
            sP.get(key)?.split(",").filter(Boolean) || [];
        setCheckItems({
            course: getIds("course").map((id) => ({
                id,
                name: coursesData?.find(c => c._id === id)?.name || "",
            })),
            state: getIds("state").map((id) => ({
                id,
                name: states.find(s => s._id === id)?.name || "",
            })),
            city: getIds("city").map((id) => ({
                id,
                name: cities.find(c => c._id === id)?.name || "",
            })),
            stream: getIds("stream").map((id) => ({
                id,
                name: streamsData?.find(s => s._id === id)?.name || "",
            })),
        });
    }

    useEffect(() => {

        const params = new URLSearchParams();

        ["course", "state", "city", "stream", "minPrice", "maxPrice"].forEach(key => {
            searchParams.getAll(`${key}`).forEach(id => {
                params.append(key, id);
            });
        });
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
        return coursesData?.filter(c =>
            c.name.toLowerCase().includes(courseSearch.toLowerCase())
        );
    }, [coursesData, courseSearch]);

    const filteredStates = useMemo(() => {
        if (!stateSearch) return states;
        return states.filter(s =>
            s.name.toLowerCase().includes(stateSearch.toLowerCase())
        );
    }, [states, stateSearch]);

    const filteredCities = useMemo(() => {
        if (!citySearch) return cities;
        return cities.filter(c =>
            c.name.toLowerCase().includes(citySearch.toLowerCase())
        );
    }, [cities, citySearch]);

    const filteredStreams = useMemo(() => {
        if (!streamSearch) return streamsData || [];
        return streamsData?.filter(s =>
            s.name.toLowerCase().includes(streamSearch.toLowerCase())
        );
    }, [streamsData, streamSearch]);

    useEffect(() => {
        if (searchParams.toString() != "" && !isFetchingCityState && !isFetchingCourses && !isFetchingStreams) {
            console.log("Search Params changed:", searchParams.toString());
            // setFilterQuery(searchParams);
            checkItemSetFun(searchParams);
        }
    }, [searchParamsAttr, isFetchingCityState, isFetchingCourses, isFetchingStreams]);




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
                            <h1>List of Top Management Colleges</h1>
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

            <div className="best-cpurse section-padding">
                <div className="container">

                    {Object.keys(checkItems).some((key) => checkItems[key].length > 0) && (
                        <div className="selected-filtered mb-4">
                            <h5>Selected Filters:</h5>
                            <div className="filters-list">
                                {Object.keys(checkItems).map((key) =>
                                    checkItems[key].map((item) => (
                                        <span key={item.id} className="filter-item" onClick={() => {
                                            // Remove filter on click
                                            setCheckItems((prev) => {
                                                const updatedArray = prev[key].filter((i) => i.id !== item.id);
                                                return {
                                                    ...prev,
                                                    [key]: updatedArray
                                                };
                                            });
                                            // Update URL with new filter state
                                            const params = new URLSearchParams(searchParams);
                                            const current = params.get(key)?.split(",").filter(Boolean) || [];
                                            const updated = current.filter(id => id !== item.id);
                                            if (updated.length > 0) {
                                                params.set(key, updated.join(","));
                                            } else {
                                                params.delete(key);
                                            }
                                            setSearchParams(params);
                                        }}>
                                            {item.name} <i className="fa fa-times"></i>
                                        </span>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                    <div className="row">

                        {/* LEFT CONTENT */}


                        {/* RIGHT SIDEBAR */}
                        <div className="col-lg-4">


                            {/* Search */}
                            <div className="sidebar-post">
                                <div className="blog_search">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Type & Press Enter"
                                    />
                                </div>
                            </div>

                            {/* Price Filter */}
                            <div className="rs-slider">
                                <h4>Price Filter</h4>
                                {/* <div className="range-slider">
                                    <input type="range" min="0" max="500" />
                                    <span className="range-value">500</span>
                                </div> */}
                                <div className="range-slider">
                                    <input
                                        type="range"
                                        className="price-input"
                                        placeholder="Min Price"
                                        value={searchParams.get("minPrice") || ""}
                                        onChange={(e) => {
                                            const params = new URLSearchParams(searchParams);
                                            if (e.target.value) {
                                                params.set("minPrice", e.target.value);
                                            } else {
                                                params.delete("minPrice");
                                            }
                                            setSearchParams(params);
                                        }}
                                    />
                                    <span className="range-value">{searchParams.get("minPrice") || 0}</span>
                                </div>
                            </div>



                            {/* Skill Level */}
                            <div className="sidebar-post">
                                <div className="sidebar_title">
                                    <h4>Course</h4>
                                    <input
                                        type="text"
                                        className="filter-search"
                                        placeholder="Search course..."
                                        value={courseSearch}
                                        onChange={(e) => setCourseSearch(e.target.value)}
                                    />
                                </div>
                                <div className="sidebar-scroll">
                                    {!isFetchingCourses && filteredCourses.map((course) => (
                                        <div className="single_langu" key={course._id}>

                                            <input type="checkbox" value={course._id} data-name={course.name} checked={checkItems.course.some(c => c.id === course._id)} name="course" onChange={handleFilterChange} /> {course.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="sidebar-post">
                                <div className="sidebar_title">
                                    <h4>State</h4>
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
                                            <input type="checkbox" value={state._id} name="state" data-name={state.name} checked={checkItems.state.some(c => c.id === state._id)} onChange={handleFilterChange} /> {state.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="sidebar-post">
                                <div className="sidebar_title">
                                    <h4>City</h4>
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

                                            <input type="checkbox" value={city._id} name="city" checked={checkItems.city.some(c => c.id === city._id)} data-name={city.name} onChange={handleFilterChange} /> {city.name}
                                        </div>

                                    ))}
                                </div>
                            </div>
                            <div className="sidebar-post">
                                <div className="sidebar_title">
                                    <h4>College Streams</h4>
                                    <input
                                        type="text"
                                        className="filter-search"
                                        placeholder="Search stream..."
                                        value={streamSearch}
                                        onChange={(e) => setStreamSearch(e.target.value)}
                                    />
                                </div>
                                <div className="sidebar-scroll">
                                    {!isFetchingStreams && filteredStreams.map((stream) => (
                                        <div className="single_langu" key={stream._id}>
                                            <input type="checkbox" value={stream._id} name="stream" checked={checkItems.stream.some(c => c.id === stream._id)} data-name={stream.name} onChange={handleFilterChange} /> {stream.name}
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                        <div className="col-lg-8">
                            <CollegeListComponent data={data?.data} isFetching={isFetching} />
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
