"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser, login } from "../../services/api";

export default function RegisterLoginPage() {
    const [isRegister, setIsRegister] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        try {
            let token: string;

            if (isRegister) {
                const result = await registerUser(name, email);
                token = result.token;
            } else {
                const result = await login(email);
                token = result.token;
            }

            localStorage.setItem("token", token);
            router.push("/");
        } catch (error: any) {
            setMessage(
                (isRegister ? "Registration" : "Login") +
                " failed. " +
                (error.response?.data?.error || "")
            );
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">
                    {isRegister ? "Register" : "Login"}
                </h1>
                <button
                    className="text-sm text-blue-600 underline"
                    onClick={() => {
                        setIsRegister(!isRegister);
                        setMessage("");
                    }}
                >
                    {isRegister ? "Switch to Login" : "Switch to Register"}
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {isRegister && (
                    <div>
                        <label className="block">Name</label>
                        <input
                            className="border px-3 py-2 w-full"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                )}

                <div>
                    <label className="block">Email</label>
                    <input
                        className="border px-3 py-2 w-full"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                >
                    {isRegister ? "Register" : "Login"}
                </button>
            </form>

            {message && <p className="mt-4 text-sm text-red-600">{message}</p>}
        </div>
    );
}
