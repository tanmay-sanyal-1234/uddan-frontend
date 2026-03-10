import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiImageWrapper, nameShortAndTootip } from "@/utils/helpers";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
const RecentlyViewed = () => {
    const [colleges, setColleges] = useState([]);

    useEffect(() => {
        const viewed = JSON.parse(localStorage.getItem("viewedColleges")) || [];
        setColleges(viewed);
    }, []);

    if (colleges.length === 0) return null;

    return (


        <div className="content-right">
            <h3>Students Also Visited</h3>

            {colleges.slice(0, 3).map((college, index) => (

                <div className="visited-card" key={index}>
                    <Link to={`/college-details/${college?._id}`}>
                        <img
                            src={apiImageWrapper(college?.logo)}
                            alt={college.name}
                            className="visited-logo"
                        />

                        <div className="visited-info">
                            <OverlayTrigger placement="top" overlay={<Tooltip>{nameShortAndTootip(college.name).tooltip}</Tooltip>}>
                                <h4>{nameShortAndTootip(college.name).displayName}</h4>
                            </OverlayTrigger>


                            <OverlayTrigger placement="left" overlay={<Tooltip>{nameShortAndTootip(college?.address?.cityD?.name).tooltip}</Tooltip>}>
                                <p>{nameShortAndTootip(college?.address?.cityD?.name).displayName}</p>
                            </OverlayTrigger>



                        </div>
                    </Link>
                </div>

            ))}
        </div>
    );
};

export default RecentlyViewed;