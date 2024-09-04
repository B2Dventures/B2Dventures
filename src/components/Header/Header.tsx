"use client";

import React from 'react';
import { Container, Group } from '@mantine/core';
import classes from './Header.module.css';

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

export function Header() {
    return (
        <header className={classes.header}>
            <Container size="md" className={classes.inner}>
                <NavItem label="B2D" link="/" />
                <Group gap={5} visibleFrom="xs">
                    <NavItem label="Business" link="/business" />
                    <NavItem label="Campaign" link="/campaign" />
                </Group>
                <Group gap={5} visibleFrom="xs">
                    <NavItem label="Login" link="/" />
                    <NavItem label="Signup" link="/" />
                </Group>
            </Container>
        </header>
    );
}
