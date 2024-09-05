import React from "react";
import classes from "@/components/Header/Header.module.css";

interface NavItemProps {
    label: string;
    link: string;
}

export const NavItem: React.FC<NavItemProps> = ({ label, link }) => {
    return (
        <a href={link} className={classes.navItem}>
            {label}
        </a>
    );
};