import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {apiImageWrapper} from "@/utils/helpers";
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

                            {colleges.slice(0,3).map((college,index) => (
                                 
                                <div className="visited-card" key={index}>
                                    <Link to={`/college-details/${college?._id}`}>
                                    <img
                                        src={apiImageWrapper(college?.logo)}
                                        alt={college.name}
                                        className="visited-logo"
                                    />

                                    <div className="visited-info">
                                        <h4>{college.name}</h4>
                                        <p>{college?.address?.cityD?.name}</p>
                                    </div>
                                    </Link>
                                </div>
                                
                            ))}
                        </div> 
  );
};

export default RecentlyViewed;