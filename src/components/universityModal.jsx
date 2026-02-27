import React ,{useState,useCallback} from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "./universityModal.css";
import { college_logo } from "../assets/images";
import { useSelector, useDispatch } from "react-redux";
import { closeModal ,setBrochureDownloadUrl, setCanBrochureDownload,setCollegeDetails} from "../store/slices/universityModalSlice";
import { apiImageWrapper } from "@/utils/helpers";
import { useGetCityState ,useGetCoursesForCollegeWise,useAddUniversityEnquiryForm,useGetCourses,useGetCity} from "@/hooks/collegeHook";
import Select from 'react-select';
import { toast } from 'react-toastify';
import FullPageLoader from "@/components/FullPageLoader";
import { useNavigate } from "react-router-dom";
import {  z } from "zod";
const UniversityModal = ({ sectionFrom = "others" }) => {
        const navigate = useNavigate();
    const isOpen = useSelector((state) => state.universityModal.isOpen);
    const college = useSelector((state) => state.universityModal.collegeDetails);
    const canBrochureDownload = useSelector((state) => state.universityModal.canBrochureDownload);
    const brochureDownloadUrl = useSelector((state) => state.universityModal.brochureDownloadUrl);
    const { mutateAsync: useAddUniversityEnquiryFormAdd, isPending } = useAddUniversityEnquiryForm();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        course: null,
        // state: null,
        city: null,
        collegeId: college?._id || null,
        appliedFrom: sectionFrom
    });
    const [errors, setErrors] = useState({});
    const formSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),

  phone: z
    .string()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits")
    .regex(/^[0-9]+$/, "Phone must contain only numbers"),

  course: z
    .string()
    .nullable()
    .refine(val => val !== null, {
      message: "Course is required",
    }),

//   state: z
//     .string()
//     .nullable()
//     .refine(val => val !== null, {
//       message: "State is required",
//     }),

  city: z
    .string()
    .nullable()
    .refine(val => val !== null, {
      message: "City is required",
    }),

  collegeId: z.string().nullable()
});
    const dispatch = useDispatch();
    const { data: cityStateData, isFetching } = useGetCityState();
    const { data: coursesData, isFetching: isFetchingCourses } = useGetCourses();
    const { data: cityData, isFetching: isFetchingcity } = useGetCity();

    const downloadFile = async (url, filename) => {
        const res = await fetch(url);
        const blob = await res.blob();

        const blobUrl = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = filename;

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
    };
    const stateOption = useCallback(() => {
        if (!isFetching && cityStateData) {
            return cityStateData.map(state => ({ value: state._id, label: state.name }));
        } else {
            return [];
        }
    }, [isFetching, cityStateData])
    const courseOption = useCallback(() => {
        if (!isFetchingCourses && coursesData) {
            return coursesData.map(course => ({ value: course._id, label: course.name }));
        } else {
            return [];
        }
    }, [isFetchingCourses, coursesData])

    // const cityOption = useCallback(() => {
    //     if (cityStateData && form.state) {
    //         const state = cityStateData.find(s => s._id === form.state?.value);
    //         if (state) {
    //             return state.cities.map(city => ({ value: city._id, label: city.name }));
    //         } else {
    //             return [];
    //         }
    //     } else {
    //         return [];
    //     }
    // }, [form.state, cityStateData])
    const cityOption = useCallback(() => {
        if (cityData && !isFetchingcity) {
            return cityData.map(city => ({ value: city._id, label: city.name }));
            
        } else {
            return [];
        }
    }, [isFetchingcity, cityData])
    const handelSubmit = async(e) => {
        
        e.preventDefault();
        let payload = {
            name: form.name,
            email: form.email,
            phone: form.phone,
            course: form.course?.value || null,
            state: form.state?.value || null,
            city: form.city?.value || null,
            collegeId: form.collegeId,
            appliedFrom: form.appliedFrom
        }
        const validationResult = formSchema.safeParse(payload);
        if (!validationResult.success) {
            const fieldErrors = validationResult.error.flatten().fieldErrors;

            const formattedErrors = {};
            Object.keys(fieldErrors).forEach((key) => {
                formattedErrors[key] = fieldErrors[key][0];
            });

            setErrors(formattedErrors);
            toast.error("Please fix the errors in the form.");
            return;

        } else {
            setLoading(true);
            setErrors({});
            let fullPayload = {
                name: payload.name,
                email: payload.email,
                phone: payload.phone,
                courseId: payload.course,
                stateId: payload.state,
                cityId: payload.city,
                collegeId: payload.collegeId,
                appliedFrom: payload.appliedFrom
            }
            
            await useAddUniversityEnquiryFormAdd(fullPayload, {
            onSuccess: (data) => {
                setLoading(false);
                console.log(data, "success")
                toast.success("Enquiry form submitted successfully!");
                if (canBrochureDownload && brochureDownloadUrl) {
                    setTimeout(() => {
                        downloadFile(brochureDownloadUrl, `${college?.name}_brochure.pdf`);
                    }, 1000);
                }
                dispatch(closeModal());
                dispatch(setBrochureDownloadUrl(null));
                dispatch(setCanBrochureDownload(false));
                dispatch(setCollegeDetails(null));
            },
            onError: (error) => {
                setLoading(false);
                    toast.error("Failed to submit university enquiry form. Please try again.");
                console.log(error, "error")
            }
        })
        }
    }
    
    return (
        <Modal
            show={isOpen}
            onHide={() => {
                dispatch(closeModal());
                dispatch(setBrochureDownloadUrl(null));
                dispatch(setCanBrochureDownload(false));
                dispatch(setCollegeDetails(null));
            }}
            centered
            backdrop="static"
            size="md"
        >
            <Modal.Header closeButton>
                <Modal.Title className="w-100 text-center">
                    <h5 className="text-center text-primary fw-bold">
                        Compare & Select from 100+
                    </h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4 position-relative">

                {/* Header */}

                <p className="text-center text-muted small mb-3">
                    Best University for your Online Courses Course
                </p>


                {loading && <FullPageLoader />}
                {/* Form */}
                {college && (
                   <div className="card shadow-sm border-0 rounded-4 p-4 text-center mx-auto border-top border-4 border-primary">

  
  <h5 className="fw-bold text-primary mb-4">
    Register Now To Apply
  </h5>

  <div className="d-flex align-items-center justify-content-center gap-3">
    
    {/* Logo */}
    <div className="bg-light rounded-3 p-2 d-flex align-items-center justify-content-center">
      <img
        src={apiImageWrapper(college?.logo)}
        alt={college?.name}
        className="img-fluid"
        style={{ width: "60px", height: "60px", objectFit: "contain" }}
      />
    </div>

    {/* College Details */}
    <div className="text-start">
      <h6 className="fw-semibold mb-1">
        {college?.name}
      </h6>
      <p className="text-muted mb-0 small">
        {college?.address?.cityD?.name}, {college?.address?.stateD?.name}
      </p>
    </div>

  </div>
</div>
                )}
                <Form>
                    <Form.Control className="mb-2" name="name" onChange={(e) => {
                        setForm({
                            ...form,
                            name: e.target.value
                        })
                    }} placeholder="Your Name" />
                    {errors.name && <span className="text-danger">{errors.name}</span>}
                    <Form.Control className="mb-2" name="email" onChange={(e) => {
                        setForm({
                            ...form,
                            email: e.target.value
                        })
                    }} placeholder="Your Email" type="email" />
                    {errors.email && <span className="text-danger">{errors.email}</span>}
                    <Form.Control className="mb-2" name="phone" onChange={(e) => {
                        setForm({
                            ...form,
                            phone: e.target.value
                        })
                    }} placeholder="Contact No." />
                    {errors.phone && <span className="text-danger">{errors.phone}</span>}
                    {/* <div className="form-group">
                    <Select
                        name="state"
                        value={form.state}
                        className="mb-2"
                        placeholder="Select State"
                        isLoading={isFetching}
                        onChange={(selected) => {
                            console.log(selected, "selected")
                            setForm({
                                ...form,
                                state: selected,
                                city: null, 
                            })
                        }}
                        options={stateOption()}
                    />
                    {errors.state && <span className="text-danger">{errors.state}</span>}
                    </div> */}
                    <div className="form-group">
                        <Select
                                name="city"
                                className="mb-2"
                                placeholder="Select City"
                                isLoading={isFetching}
                                value={form.city}
                                onChange={(selected) =>
                                    setForm({ ...form, city: selected })
                                }
                                
                                options={cityOption()}
                            />
                            {errors.city && <span className="text-danger">{errors.city}</span>}
                    </div>
                    <div className="form-group">
                        <Select
                                name="course"
                                className="mb-2"
                                placeholder="Select Course"
                                isLoading={isFetchingCourses}
                                value={form.course}
                                onChange={(selected) =>
                                    setForm({ ...form, course: selected })
                                }
                                options={courseOption()}
                            />
                            {errors.course && <span className="text-danger">{errors.course}</span>}
                    </div>
                </Form>

                {/* Offer */}
                <div className="offer-box mb-3">
                    <div>
                        <strong>CV Exclusive Offer!</strong>
                        <div className="small text-muted">
                            Upto ₹20,000 Cashback Available*
                        </div>
                    </div>
                    <Button size="sm" className="apply-btn">
                        Tap to apply
                    </Button>
                </div>

                {/* Privacy */}
                <div className="text-center small text-muted mb-3">
                    🔒 Your personal information is secure with us
                </div>

                {/* CTA */}
                <Button className="w-100 main-cta" onClick={handelSubmit}>
                    Find best University
                </Button>
            </Modal.Body>
        </Modal>
    );
};

export default UniversityModal;
