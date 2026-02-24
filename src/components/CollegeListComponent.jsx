import React, { useCallback } from "react";
import FullPageLoader from "@/components/FullPageLoader";
import { Link } from "react-router-dom";
import { formatINR, apiImageWrapper } from "@/utils/helpers";
import { useNavigate } from "react-router-dom";
import { Button, OverlayTrigger, Overlay, Tooltip } from "react-bootstrap";
const CollegeListComponent = ({ isFetching, data }) => {
    const navigate = useNavigate();
    const courseNames = useCallback((college) => {
        let names = college?.flatMap(stream =>
            stream?.courses?.map(p => p?.courseD?.name) || []
        )
            .filter(Boolean)
            .slice(0, 2)
            .join(" / ");
        let hasMore = college?.flatMap(stream =>
            stream?.courses?.map(p => p?.courseD?.name) || []
        )
            .filter(Boolean)
            .length > 2 ? " & more" : "";
        let displayNames = names + hasMore || "";
        names = names.length > 30 ? names.slice(0, 30) + "..." : names;
        return {
            names,
            displayNames
        }

    }, [data])
    const getName = useCallback((college) => {
        let displayName = college?.name.length > 30 ? college?.name.slice(0, 30) + "..." : college?.name;
        let tooltip = college?.name || "";
        return {
            displayName,
            tooltip
        }

    }, [data])

    const feesDisplay = useCallback((college) => {
        let feesList = college?.flatMap(stream =>
            stream?.courses?.map(p => p?.fees) || []
        )
            .filter(Boolean)
            .slice(0, 2)
            .map(f => formatINR(f, true))
            .join(" / ");
        return feesList || "";
    }, [data]);

    const viewMore = (link) => {
        return (
            <Link className="view-more-course" to={`/college-details/${link}`}>
                View More
            </Link>
        )
    }
    return (
        <div className="row">
            {isFetching && <FullPageLoader />}
            {!isFetching && data?.length === 0 && (
                <div className="col-12 text-center">
                    <p>No colleges found matching the selected filters.</p>
                </div>
            )}
            {data?.map((college, index) => (
                <div
                    key={index}
                    className="col-lg-12 col-sm-12 col-xs-12 wow fadeInUp mt-2"
                    data-wow-delay="0.1s"
                >




                    <div className="listing-card">

                        {/* Image */}
                        <Link to={`/college-details/${college._id}`}>
                            <div className="listing-image">
                                <img
                                    src={apiImageWrapper(college?.thumbnail)}
                                    alt={college.name}
                                />
                            </div>
                        </Link>

                        {/* Content */}
                        <div className="listing-content">

                            {/* Header */}
                            <div className="listing-header">
                                <div className="listing-title">
                                    <img
                                        src={apiImageWrapper(college?.logo)}
                                        alt={college.name}
                                        className="listing-logo"
                                    />
                                    <div className="ms-3">
                                        <h3>{college.name}</h3>
                                        <p className="location">
                                            <i className="fa fa-map-marker"></i>
                                            <span className="location-name ms-2"></span>{college?.address?.cityD?.name}, {college?.address?.stateD?.name}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="divider"></div>

                            {/* Middle */}
                            <div className="listing-details">
                                <ul className="quick-links">
                                    <li><Link to={`/college-details/${college._id}`}>Course Fees</Link></li>
                                    <li><Link to={`/college-details/${college._id}`}>Admission</Link></li>
                                </ul>

                                <div className="program-fees ms-3">

                                    {college?.streamAndCourse
                                        ?.flatMap(stream => stream?.courses || [])
                                        ?.slice(0, 2)
                                        ?.map((courseFee, index) => (
                                            <div key={index}>
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={<Tooltip>{courseFee.courseD?.name}</Tooltip>}
                                                >
                                                    <p className="program">
                                                        {courseFee.courseD?.name?.length > 10
                                                            ? courseFee.courseD?.name.slice(0, 10) + "..."
                                                            : courseFee.courseD?.name}
                                                    </p>
                                                </OverlayTrigger>

                                                
                                                <p className="fees">{formatINR(courseFee?.fees, true)}</p>
                                            </div>
                                        ))}
                                        {college?.streamAndCourse?.flatMap(stream => stream?.courses || [])?.length > 2 && viewMore(college._id)}

                                </div>
                            </div>

                            {/* Footer */}
                            <div className="listing-footer">
                                <p className="ranking">

                                </p>

                                <div className="action-buttons">
                                    <button className="apply-btn" onClick={() => navigate(`/college-details/${college._id}`)}>Apply Now</button>
                                    <button className="brochure-btn" onClick={() => navigate(`/college-details/${college._id}`)}>Brochure</button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            ))}
        </div>
    )
};

export default CollegeListComponent;