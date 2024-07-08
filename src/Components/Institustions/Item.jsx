import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

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
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">{institution.Name}</h1>
                    <p className="text-lg text-gray_v">
                        {institution.Wilaya}/{institution.Location}
                    </p>
                </div>
                <button className="bg-blue_v text-white px-4 py-2 rounded">
                    See events
                </button>
            </div>
            {director && (
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Director</h2>
                    <div className="flex gap-4">
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
            <div>
                <h2 className="text-2xl font-semibold mb-2">Doctors</h2>
                <table className="table-auto w-full text-sm">
                    <thead>
                        <tr className="bg-gray_v font-normal">
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Wilaya</th>
                            <th className="px-4 py-2">Localisation</th>
                            <th className="px-4 py-2">Doctor Profile</th>
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
            </div>
        </div>
    );
}

export default InstitutionItem;
