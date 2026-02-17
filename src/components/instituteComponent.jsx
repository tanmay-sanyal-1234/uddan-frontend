import React from "react";
import "./instituteComponent.css";
import { Link } from "react-router-dom";
import {formatINR,apiImageWrapper} from "@/utils/helpers";
const InstituteCard = ({
    logo,
    name,
    location,
    program,
    fees,
    id
}) => {
    return (
        <div className="institute-card">
            {/* Top */}
            <div className="institute-header">
                <Link to={`/college-details/${id}`}>
                    <img src={apiImageWrapper(logo)} alt={name} className="institute-logo" />
                </Link>

                <div className="institute-info">
                    <Link to={`/college-details/${id}`}>
                        <h4>{name}</h4>
                    </Link>
                    <p className="location">
                        <i className="fa fa-map-marker"></i> {location}
                    </p>
                </div>
            </div>

            {/* Divider */}
            <div className="divider"></div>

            {/* Bottom */}
            <div className="institute-footer">
                <div>
                    <p className="program">
                        {program?.map((stream) => (
                            stream?.courses?.map((p) => p?.courseD?.name).join(" / ")
                        ))}
                    </p>
                    <p className="fees">
                        Fees: {program?.map((stream) => (
                            stream?.courses?.map((p) => formatINR(p?.fees,true)).join(" / ")
                        ))}
                    </p>
                </div>
                <Link to={`/college-details/${id}`}>
                    <button className="course-btn">Courses & Fees</button>
                </Link>
            </div>
        </div>
    );
};

export default InstituteCard;
