import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    Spinner,
} from "@heroui/react";
import { createEvent, getMyEvents } from "../service/userService";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import uploadImageToCloudinary from "../utils/UploadCloudinary";
import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import type { RootState } from "../ReduxStore/store";
import { EventCard } from "../components/ui/Card";

interface IEvent {
    _id: string;
    title: string;
    description: string;
    venue: string;
    address: string;
    startAt: string;
    endAt: string;
    capacity: number;
    images: string[];
}

interface IEventForm {
    title: string;
    description: string;
    venue: string;
    address: string;
    startAt: string;
    endAt: string;
    capacity: number | "";
    price: number | "";
    currency: string;
    quantity: number | "";
    image: string;
}


export default function Events() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const user = useSelector((state: RootState) => state.auth.user);
    console.log('userdata', user)
    const [events, setEvents] = useState<IEvent[]>([]);
    const [loading, setLoading] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);
    const [imageUploadSuccess, setImageUploadSuccess] = useState(false);
    // Fetch all events
    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                const data: IEvent[] = await getMyEvents(user._id);
                setEvents(data);
            } catch (error) {
                toast.error("Failed to fetch events");
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    // Formik setup
    const formik = useFormik<IEventForm>({
        initialValues: {
            title: "",
            description: "",
            venue: "",
            address: "",
            startAt: "",
            endAt: "",
            capacity: "",
            price: "",
            currency: "",
            quantity: "",
            image: "",
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Title is required"),
            description: Yup.string().required("Description is required"),
            venue: Yup.string().required("Venue is required"),
            address: Yup.string().required("Address is required"),
            startAt: Yup.date()
                .required("Start date/time is required")
                .min(new Date(), "Start date/time cannot be in the past"),
            endAt: Yup.date()
                .required("End date/time is required")
                .when("startAt", (startAt: any, schema: Yup.DateSchema) => {
                    if (!startAt) return schema;
                    const startDate = new Date(startAt);
                    return schema.min(startDate, "End date/time must be after start date/time");
                }),
            capacity: Yup.number().typeError("Capacity must be a number").required("Capacity is required"),
            price: Yup.number().typeError("Price must be a number"),
            currency: Yup.string().required("Currency is required"),
            quantity: Yup.number().typeError("Quantity must be a number").required("Quantity is required"),
            
            image: Yup.string().required("Image is required"),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                setLoading(true);
                const eventData = {
                    ...values,
                    capacity: Number(values.capacity),
                    price: Number(values.price),
                    quantity: Number(values.quantity),
                    images: values.image ? [values.image] : [],
                };
                const response = await createEvent(eventData, user._id);
                toast.success("Event created successfully");
                setEvents((prev) => [response.event, ...prev]);

                onOpenChange();
                resetForm();
            } catch (error) {
                toast.error("Error creating event");
            } finally {
                setLoading(false);
            }
        },
    });

    const handleFileInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setImageUploading(true);
        setImageUploadSuccess(false);
        try {
            const data = await uploadImageToCloudinary(file);
            if (data.url) {
                formik.setFieldValue("image", data.url);
                setImageUploadSuccess(true);
            } else {
                toast.error("Failed to upload image");
            }
        } catch (error) {
            toast.error("Error uploading image");
        } finally {
            setImageUploading(false);
        }
    };

    return (
        <div className="min-h-screen w-full relative flex items-center flex-col text-white pt-16">
            {/* Crimson Depth Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "radial-gradient(125% 125% at 50% 10%, #000000 40%, #2b0707 100%)",
                }}
            />
            <div className="relative z-10 flex flex-col items-center w-full bg-gradient-to-l from-indigo-500 via-red-500 to-indigo-500 text-transparent bg-clip-text ">
                <div className="z-10">
                    <Toaster position="top-center" />
                </div>
                <h1 className="text-3xl mt-20 mb-3 bg-gradient-to-l from-indigo-500 via-red-500 to-indigo-500 text-transparent bg-clip-text">Click Here To Add An Event</h1>
                <Button color="danger" variant="shadow" onPress={onOpen}>
                    Add Event
                </Button>

                <Modal isOpen={isOpen} placement="top-center" backdrop="opaque" onOpenChange={onOpenChange} >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader>Add Event</ModalHeader>
                                <ModalBody className="flex flex-col gap-3 max-h-[300px] overflow-y-auto">
                                    <Input
                                        label="Title"
                                        name="title"
                                        value={formik.values.title}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}

                                    />
                                    {formik.touched.title && formik.errors.title && (
                                        <span className="text-red-500 text-sm">{formik.errors.title}</span>
                                    )}
                                    <Input
                                        label="Description"
                                        name="description"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.description && formik.errors.description && (
                                        <span className="text-red-500 text-sm">{formik.errors.description}</span>
                                    )}
                                    <Input
                                        label="Venue"
                                        name="venue"
                                        value={formik.values.venue}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.venue && formik.errors.venue && (
                                        <span className="text-red-500 text-sm">{formik.errors.venue}</span>
                                    )}
                                    <Input
                                        label="Address"
                                        name="address"
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.address && formik.errors.address && (
                                        <span className="text-red-500 text-sm">{formik.errors.address}</span>
                                    )}
                                    <Input
                                        label="Start Date & Time"
                                        type="datetime-local"
                                        name="startAt"
                                        value={formik.values.startAt}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.startAt && formik.errors.startAt && (
                                        <span className="text-red-500 text-sm">{formik.errors.startAt}</span>
                                    )}
                                    <Input
                                        label="End Date & Time"
                                        type="datetime-local"
                                        name="endAt"
                                        value={formik.values.endAt}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.endAt && formik.errors.endAt && (
                                        <span className="text-red-500 text-sm">{formik.errors.endAt}</span>
                                    )}
                                    <Input
                                        label="Capacity"
                                        type="number"
                                        name="capacity"
                                        value={formik.values.capacity.toString()}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}

                                    />
                                    {formik.touched.capacity && formik.errors.capacity && (
                                        <span className="text-red-500 text-sm">{formik.errors.capacity}</span>
                                    )}

                                    <Input
                                        label="Currency"
                                        name="currency"
                                        value={formik.values.currency}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.currency && formik.errors.currency && (
                                        <span className="text-red-500 text-sm">{formik.errors.currency}</span>
                                    )}

                                    <Input
                                        label="Quantity"
                                        type="number"
                                        name="quantity"
                                        value={formik.values.quantity.toString()}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.quantity && formik.errors.quantity && (
                                        <span className="text-red-500 text-sm">{formik.errors.quantity}</span>
                                    )}
                                    <Input
                                        label="Upload Image"
                                        type="file"
                                        onChange={handleFileInputChange}
                                        accept=".jpg, .png"
                                        endContent={
                                            imageUploading ? (
                                                <Spinner size="sm" color="primary" />
                                            ) : imageUploadSuccess ? (
                                                <span className="text-green-500 font-bold">&#10003;</span>
                                            ) : null
                                        }
                                    />
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="flat" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button
                                        color="primary"
                                        onPress={() => formik.handleSubmit()} // wrap in lambda to match PressEvent
                                    >
                                        Add Event
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>

                <div className="w-full mt-10 px-2 flex flex-col items-center">
                    <h1 className="text-2xl font-bold  mb-5 bg-gradient-to-l from-indigo-500 via-red-500 to-indigo-500 text-transparent bg-clip-text">My Events</h1>
                    {loading ? (
                        <Spinner size="lg" color="primary" />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full p-4">
                            {events.length > 0 ? (
                                events.map((event) => (
                                    <EventCard key={event._id} event={event} />
                                ))
                            ) : (
                                <p>No events available</p>
                            )}
                        </div>



                    )}
                </div>
            </div>
        </div>
    );
}
