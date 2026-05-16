import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiImageWrapper } from "@/utils/helpers";

const RecentlyViewed = () => {
    const [colleges, setColleges] = useState([]);

    useEffect(() => {
        const viewed = JSON.parse(localStorage.getItem("viewedColleges")) || [];
        setColleges(viewed);
    }, []);

    if (colleges.length === 0) return null;

    return (
        <div className="visited-colleges-widget">
            <h3 className="visited-widget-title">Students Also Visited</h3>
            {colleges.slice(0, 3).map((college, index) => (
                <div className="visited-college-card" key={index}>
                    <div className="visited-card-top">
                        <div className="visited-college-logo">
                            <img src={apiImageWrapper(college?.logo)} alt={college.name} />
                        </div>
                        <div className="visited-college-info">
                            <div className="visited-college-name">{college.name}</div>
                            <div className="visited-college-location">
                                <i className="fa fa-map-marker"></i>  {college?.address?.cityD?.name}, {college?.address?.stateD?.name}
                            </div>
                        </div>
                    </div>

                    <div className="visited-card-divider"></div>

                    <div className="visited-card-actions">
                        <Link to={`/college-details/${college?._id}`} className="action-btn placement">
                            Placement
                        </Link>
                        <Link to={`/college-details/${college?._id}`} className="action-btn courses">
                            Courses & Fees
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RecentlyViewed;