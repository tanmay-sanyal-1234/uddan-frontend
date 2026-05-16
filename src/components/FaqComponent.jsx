import React, { useState, useCallback } from "react";
import {
    useGetFaqList
} from "@/hooks/collegeHook";
import SkeletonLoader from "@/components/SkeletonLoader";
const FaqComponent = ({ section }) => {
    const [pages, setPages] = useState(1);
    const [limit, setLimit] = useState(10);
    const [activeIndex, setActiveIndex] = useState(0);
    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    const { data, isLoading, isFetching, refetch, error, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } = useGetFaqList({
        page: pages,
        limit,
        section
    });
    const allData = useCallback(() => {
        return data?.pages?.flatMap(page => page.data) || [];
    }, [data])
    return (
        <section className="faq-section">
            <div className="container">
                <h2 className="faq-title">FAQs</h2>
                <div className="faq-list">

                    {allData().map((faq, index) => (
                        <div
                            key={index}
                            className={`faq-item ${activeIndex === index ? "active" : ""}`}
                        >
                            <div
                                className="faq-question"
                                onClick={() => toggleFAQ(index)}
                            >
                                <span>{faq.question}</span>
                                <span className="faq-icon">
                                    {activeIndex === index ? "−" : "+"}
                                </span>
                            </div>

                            {activeIndex === index && (
                                <div className="faq-answer" dangerouslySetInnerHTML={{ __html: faq.answer }}>

                                </div>
                            )}
                        </div>
                    ))}


                    {isFetching && (<SkeletonLoader count={1} width={'100%'} height={200} />)}

                    {hasNextPage && (
                        <div className="text-center mt-3">
                            <button className="btn_one " onClick={fetchNextPage}>
                                {isFetchingNextPage ? "Loading..." : "View More"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default FaqComponent;