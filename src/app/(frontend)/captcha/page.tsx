"use client";

import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useRouter } from 'next/navigation';

export default function CaptchaPage() {
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleReCAPTCHAVerification = async (token: string | null) => {
        if (token) {
            setLoading(true);
            const res = await fetch('/api/verify-captcha', {
                method: 'POST',
                body: JSON.stringify({ token }),
            });

            if (res.ok) {
                setCaptchaVerified(true);
                router.push('https://endless-dory-50.accounts.dev/sign-in');  // Redirect to Clerk account portal after CAPTCHA verification
            } else {
                alert("CAPTCHA verification failed. Try again.");
            }
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Please complete CAPTCHA to continue</h2>
            <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                onChange={handleReCAPTCHAVerification}
            />
            {loading && <div>Verifying...</div>}
        </div>
    );
}
