import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const New_institution = () => {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-semibold mb-4">Add new institution</h1>
            <Formik
                initialValues={{
                    name: "",
                    localisation: "",
                    wilaya: "",
                    doctorsNumber: "",
                    email: "",
                    password: "",
                }}
                validationSchema={Yup.object({
                    name: Yup.string().required("Required"),
                    localisation: Yup.string().required("Required"),
                    wilaya: Yup.string().required("Required"),
                    doctorsNumber: Yup.number()
                        .required("Required")
                        .positive("Must be a positive number")
                        .integer("Must be an integer"),
                    email: Yup.string()
                        .email("Invalid email address")
                        .required("Required"),
                    password: Yup.string()
                        .required("Required")
                        .min(8, "Password must be at least 8 characters long"),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        const response = await axios.post(
                            "http://localhost:3000/Admin/Institutions",
                            values,
                            {
                                withCredentials: true,
                                validateStatus: () => true,
                            }
                        );
                        if (response.status === 201) {
                            Swal.fire(
                                "Success",
                                "Institution added successfully",
                                "success"
                            );
                            navigate("/Institutions");
                        } else {
                            Swal.fire(
                                "Error",
                                "Failed to add institution",
                                "error"
                            );
                        }
                    } catch (error) {
                        Swal.fire("Error", "An error occurred", "error");
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Full name
                        </label>
                        <Field
                            name="name"
                            type="text"
                            className="mt-1 block w-full border rounded-md p-2"
                        />
                        <ErrorMessage
                            name="name"
                            component="div"
                            className="text-red-600 text-sm"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="localisation"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Localisation
                        </label>
                        <Field
                            name="localisation"
                            type="text"
                            className="mt-1 block w-full border rounded-md p-2"
                        />
                        <ErrorMessage
                            name="localisation"
                            component="div"
                            className="text-red-600 text-sm"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="wilaya"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Wilaya
                        </label>
                        <Field
                            name="wilaya"
                            type="text"
                            className="mt-1 block w-full border rounded-md p-2"
                        />
                        <ErrorMessage
                            name="wilaya"
                            component="div"
                            className="text-red-600 text-sm"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="doctorsNumber"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Doctors number
                        </label>
                        <Field
                            name="doctorsNumber"
                            type="text"
                            className="mt-1 block w-full border rounded-md p-2"
                        />
                        <ErrorMessage
                            name="doctorsNumber"
                            component="div"
                            className="text-red-600 text-sm"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <Field
                            name="email"
                            type="email"
                            className="mt-1 block w-full border rounded-md p-2"
                        />
                        <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-600 text-sm"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <Field
                            name="password"
                            type="password"
                            className="mt-1 block w-full border rounded-md p-2"
                        />
                        <ErrorMessage
                            name="password"
                            component="div"
                            className="text-red-600 text-sm"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-md"
                        >
                            Complete
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default New_institution;
