import React from 'react';
import classes from '../Header.module.css';
import Image from 'next/image';


export const Logo: React.FC = () => {
    return (
        <a className={classes.logo} href='/'>
            <Image
                src="/logo.ico"
                width={47}
                height={47}
                alt="logo"
            />
        </a>
    );
};
