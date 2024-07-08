import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
function InstitutionItem() {
    const location = useLocation();
    const institution_id = location.pathname.split("/")[2];
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [institution, setInstitution] = useState(null);

    useEffect(() => {
        setLoading(true);
        const fetchInstitution = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Admin/Companies/${institution_id}`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );

                if (response.status === 200) {
                    setInstitution(response.data.company);
                } else if (response.status === 401) {
                    Swal.fire("Error", "You should login again", "error");
                    navigate("/Login");
                } else {
                    setError(response.data);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchInstitution();
    }, [institution_id, navigate]);

    if (loading) {
        return (
            <div className="w-screen h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-screen h-[80vh] flex items-center justify-center">
                <div className="text-red-600 font-semibold">
                    {error.message}
                </div>
            </div>
        );
    }

    if (!institution) {
        return null;
    }

    const director =
        institution.Directors.length > 0 ? institution.Directors[0] : null;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-wrap sm:justify-between justify-center gap-8  sm:gap-24 mb-12">
                <div className=" flex flex-col gap-3 text-black_text">
                    <h1 className="text-3xl font-bold">{institution.Name}</h1>
                    <div className=" pl-6 flex flex-col gap-2">
                        <p className="text-lg text-gray_v">
                            Wilaya :{" "}
                            <span className="text-md font-semibold">
                                {institution.Wilaya}
                            </span>
                        </p>
                        <p className="text-lg text-gray_v">
                            Location :{" "}
                            <span className="text-md font-semibold">
                                {institution.Location}
                            </span>
                        </p>
                        <p>
                            <span className="text-lg text-gray_v">Type :</span>{" "}
                            <span className="text-md font-semibold">
                                {institution.Type}
                            </span>
                        </p>
                    </div>
                </div>
                <div className=" flex flex-col gap-6 text-center">
                    <Link
                        to={`/Institustions/${institution_id}/Events`}
                        className="border-2 border-blue_v text-blue_v font-semibold px-4 py-2 rounded-md"
                    >
                        See events
                    </Link>
                    <Link
                        to={`/Institustions/${institution_id}/Edit`}
                        className="border-2 border-green_v text-green_v font-semibold
                        cursor-pointer
                        px-4 py-2 rounded-md"
                    >
                        Edite Institustion
                    </Link>
                    <div
                        className=" bg-red-500 cursor-pointer
                     text-white font-semibold px-4 py-2 rounded-md"
                    >
                        Delete Institustion
                    </div>
                </div>
            </div>
            {director && (
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Director</h2>
                    <div className="flex flex-wrap gap-4">
                        <div className="border p-2 rounded-md flex items-center justify-between gap-2 text-sm font-semibold min-w-[300px]">
                            <span>Email: {director.email}</span>
                            <button className="text-blue_v">✏️</button>
                        </div>
                        <div className="border p-2 rounded-md flex items-center justify-between gap-2 text-sm font-semibold min-w-[300px]">
                            <span>Password: {director.password}</span>
                            <button className="text-blue_v">✏️</button>
                        </div>
                    </div>
                </div>
            )}
            <div className=" mt-12">
                <h2 className="text-2xl font-semibold mb-2">Doctors</h2>
                {institution.Medecins.length === 0 ? (
                    <p className="text-gray_v text-center font-semibold pt-6">
                        No doctors found
                    </p>
                ) : (
                    <table className="table-auto w-full text-sm">
                        <thead>
                            <tr className="bg-gray_white font-normal">
                                <th className="px-4 border py-2  rounded-tl-lg">
                                    Name
                                </th>
                                <th className="px-4 border py-2">Wilaya</th>
                                <th className="px-4 border py-2">
                                    Localisation
                                </th>
                                <th className="px-4 border py-2 rounded-tr-lg">
                                    Doctor Profile
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-center font-semibold">
                            {institution.Medecins.map((doctor, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">
                                        {doctor.name}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {doctor.wilaya}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {doctor.localisation}
                                    </td>
                                    <td className="border px-4 py-2">
                                        <button className="bg-blue_v text-white px-4 py-2 rounded">
                                            See Profile
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default InstitutionItem;
