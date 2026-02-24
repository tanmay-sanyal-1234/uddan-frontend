import React,{useCallback} from "react";
import "./instituteComponent.css";
import { Link } from "react-router-dom";
import {formatINR,apiImageWrapper} from "@/utils/helpers";
import { Button , OverlayTrigger ,Overlay,Tooltip } from "react-bootstrap";
const InstituteCard = ({
    logo,
    name,
    location,
    program,
    fees,
    id
}) => {
    const courseNames = useCallback(() => {
        let names = program?.flatMap(stream =>
                            stream?.courses?.map(p => p?.courseD?.name) || []
                            )
                            .filter(Boolean)
                            .slice(0,2)
                            .join(" / ");
        let hasMore = program?.flatMap(stream =>
                            stream?.courses?.map(p => p?.courseD?.name) || []
                            )
                            .filter(Boolean)
                            .length > 2 ? " & more" : "";
        let displayNames = names + hasMore || "";
        names = names.length > 30 ? names.slice(0,30) + "..." : names;
        return {
            names,
            displayNames
        }
        
    },[program])

    const feesDisplay = useCallback(() => {
        let feesList = program?.flatMap(stream =>
                            stream?.courses?.map(p => p?.fees) || []
                            )
                            .filter(Boolean)
                            .slice(0,2)
                            .map(f => formatINR(f, true))
                            .join(" / ");
        return feesList || "";
    },[program]);
    const getName = useCallback(() => {
        let displayName = name.length > 30 ? name.slice(0,30) + "..." : name;
        let tooltip = name || "";
        return {
            displayName,
            tooltip
        }

    },[name])
    return (
        <div className="institute-card">
            {/* Top */}
            <div className="institute-header">
                <Link to={`/college-details/${id}`}>
                    <img src={apiImageWrapper(logo)} alt={name} className="institute-logo" />
                </Link>

                <div className="institute-info" onH>
                    <Link to={`/college-details/${id}`}>
                        <OverlayTrigger placement="top" overlay={<Tooltip>{getName().tooltip}</Tooltip>}>
                            <h4>{getName().displayName}</h4>
                        </OverlayTrigger>
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
                        
                        <OverlayTrigger placement="top" overlay={<Tooltip>{courseNames().displayNames}</Tooltip>}><span>{courseNames().names}</span></OverlayTrigger>
                    </p>
                    <p className="fees">
                        Fees: {
                            feesDisplay()
                        }
                        
                        
                        
                        
                        
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
