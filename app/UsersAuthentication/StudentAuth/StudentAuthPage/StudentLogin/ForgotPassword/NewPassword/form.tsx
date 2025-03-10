'use client'
import { useState } from 'react';
import Label3 from "@/app/UsersAuthentication/Components/Label3";
import "../../../../../../../app/globals.css";

export default function NewPasswordForm() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({
        length: false,
        lowercase: false,
        uppercase: false,
        special: false,
        match: false,
    });

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        validatePasswords(e.target.value, confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        validatePasswords(password, e.target.value);
    };

    const validatePasswords = (password, confirmPassword) => {
        setErrors({
            length: password.length >= 8,
            lowercase: /[a-z]/.test(password),
            uppercase: /[A-Z]/.test(password),
            special: /[!&.\-*$/]/.test(password),
            match: password === confirmPassword,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.values(errors).every((value) => value === true)) {
            console.log('Form submitted successfully');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col justify-start mt-[12.96px]">
            <Label3 text="Password" className="text-Blue4 text-start font-sans text-[16px] font-medium" />
            <div className="flex flex-row width-[100%] items-center border-b-[2px] border-Blue3 px-[4.91px] py-[4.91px] mt-[8px]">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="mr-[8px] w-[24px] h-[24px] text-Blue4"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="outline-none placeholder-Gray1 font-sans text-[21px] w-[95%]"
                />
            </div>

            <Label3 text="Confirm password" className="text-Blue4 text-start font-sans text-[16px] font-medium" />
            <div className="flex flex-row width-[100%] items-center border-b-[2px] border-Blue3 px-[4.91px] py-[4.91px] mt-[8px]">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="mr-[8px] w-[24px] h-[24px] text-Blue4"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
                <input
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className="outline-none placeholder-Gray1 font-sans text-[21px] w-[95%]"
                />
            </div>

            <div className="mt-[24px] flex flex-col items-center">
                <div className="flex items-center">
                    {errors.length ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-Green1 mr-[10px]">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-Gray1 mr-[10px]">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    )}
                    <span className='font-sans text-[21px]/[120%] text-Gray1'>8 characters</span>
                </div>

                <div className="flex items-center mt-2">
                    {errors.lowercase ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-Green1 mr-[10px]">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-Gray1 mr-[10px]">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    )}
                    <span className='font-sans text-[21px]/[120%] text-Gray1'>At least 1 lowercase letter</span>
                </div>

                <div className="flex items-center mt-2">
                    {errors.uppercase ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-Green1 mr-[10px]">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-Gray1 mr-[10px]">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    )}
                    <span className='font-sans text-[21px]/[120%] text-Gray1'>At least 1 uppercase letter</span>
                </div>
                <div className="flex items-center mt-2">
                    {errors.special ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-Green1 mr-[10px]">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="size-6 text-Gray1  mr-[10px]">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    )}
                    <span className='font-sans text-[21px]/[120%] text-Gray1'>At least 1 special character (!&.-*$)</span>
                </div>

                <div className="flex items-center mt-2">
                    {errors.match ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="size-6 text-Green1 mr-[10px]"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="size-6 text-Gray1 mr-[10px]"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    )}
                    <span className='font-sans text-[21px]/[120%] text-Gray1'>Passwords must match</span>
                </div>
            </div>

            {/* <button
                type="submit"
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                disabled={!Object.values(errors).every((value) => value === true)}
            >
                Submit
            </button> */}
        </form>
    );
}