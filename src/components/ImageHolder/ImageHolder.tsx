import Image from 'next/image';
import React from "react";

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