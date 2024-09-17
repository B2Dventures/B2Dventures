"use client";
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



export default function RichTextEditor() {
    const [content, setContent] = useState('');

    const handleContentChange = (value: string) => {
        setContent(value); // Store the HTML content in state
    };

    return (
        <div>
            <ReactQuill theme="snow" value={content} onChange={handleContentChange} />
            <div>
                <h2>Preview</h2>
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </div>
    );
}
