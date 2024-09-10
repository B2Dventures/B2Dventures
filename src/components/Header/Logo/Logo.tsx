import React from 'react';
import classes from '../Header.module.css';
import Image from 'next/image';
import { TbCircleLetterB } from "react-icons/tb";


export const Logo: React.FC = () => {
    return (
        <a className={classes.logo} href='/'>
            <TbCircleLetterB/>
        </a>
    );
};
