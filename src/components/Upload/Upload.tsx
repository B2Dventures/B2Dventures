'use client';

import { UploadButton } from "@/utils/uploadthing";
import { useState } from 'react';
import {TextInput} from "@mantine/core";

interface UploadSingleProps {
    onUploadComplete: (url: string) => void;
}

interface UploadMultipleProps {
    onUploadComplete: (urls: string[]) => void;
}

export function UploadSingle({ onUploadComplete }: UploadSingleProps) {
    // const [imageUrl, setImageUrl] = useState<string | null>(null);

    return (
        <div>
            <UploadButton
                endpoint="ImageSingle"
                onClientUploadComplete={(res) => {
                    // Ensure there is at least one file in the response
                    if (res.length > 0) {
                        const url = res[0].url;
                        // setImageUrl(url); // Set the image URL using state
                        onUploadComplete(url); // Call the provided callback
                        alert("Upload Completed");
                    }
                }}
                onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                }}
            />
            {/* Optional: Show the uploaded image */}

            {/*{imageUrl &&*/}
            {/*<TextInput*/}
            {/*    disabled={true}*/}
            {/*    value={imageUrl}*/}
            {/*/>*/}
            {/*}*/}

        </div>
    );
}

export function UploadMultiple({ onUploadComplete }: UploadMultipleProps) {
    // const [imageUrls, setImageUrls] = useState<string[]>([]);

    return (
        <div>
            <UploadButton
                endpoint="ImageMultiple"
                onClientUploadComplete={(res) => {
                    if (res.length > 0) {
                        const urls = res.map((file) => file.url);
                        // setImageUrls(urls); // Set the array of URLs using state
                        onUploadComplete(urls); // Call the provided callback
                        alert("Upload Completed");
                    }
                }}
                onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                }}
            />
            {/* Optional: Show the uploaded image */}
            {/*{imageUrls.length > 0 && (*/}
            {/*    <div>*/}
            {/*        {imageUrls.map((url, index) => (*/}
            {/*            <img key={index} src={url} alt={`Uploaded ${index}`} /> // Optional: Show uploaded images*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
}
