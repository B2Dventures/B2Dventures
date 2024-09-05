import Image from 'next/image';
import Link from 'next/link';
import React from "react";
import classes from "@/components/Header/Header.module.css";

interface ImageHolderProps {
    imgSrc: string;
    imgAlt: string;
    linkUrl: string;
}

export const ImageHolder: React.FC<ImageHolderProps> = ({ imgSrc, imgAlt, linkUrl }) => {
    return (
        <a href={linkUrl}>
            <Image src={imgSrc} alt={imgAlt} width={420} height={230} />
        </a>
    );
};