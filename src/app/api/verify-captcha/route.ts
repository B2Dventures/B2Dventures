import { NextRequest, NextResponse } from 'next/server';

// Handle the POST request
export async function POST(req: NextRequest) {
    const { token } = await req.json(); // Get the captcha token from the request body

    // Ensure that the token is provided and secret key exists in the environment
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!token || !secretKey) {
        return NextResponse.json({ message: 'Token or secret key missing' }, { status: 400 });
    }

    // URL for Google reCAPTCHA verification API
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

    try {
        // Send a POST request to Google reCAPTCHA API to verify the token
        const response = await fetch(verifyUrl, {
            method: 'POST',
        });

        const data = await response.json(); // Parse the JSON response

        // Check the success status from Google reCAPTCHA API
        if (data.success) {
            // If CAPTCHA verification is successful, return a success response
            return NextResponse.json({ message: 'Verification successful' });
        } else {
            // If CAPTCHA verification failed, return an error response
            return NextResponse.json({ message: 'Verification failed' }, { status: 400 });
        }
    } catch (error) {
        console.error('Error verifying CAPTCHA:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
