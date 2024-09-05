"use client";

import React from 'react';
import { Container, Group } from '@mantine/core';
import classes from './Header.module.css';
import {NavItem} from "@/components/Header/NavItem/NavItem";
import {Logo} from "@/components/Header/Logo/Logo";

export function Header() {
    return (
        <header className={classes.header}>
            <Container className={classes.inner} >
                <Group gap={40} visibleFrom="xs">
                    <Logo />
                    <NavItem label="Business" link="/business" />
                    <NavItem label="Campaign" link="/campaign" />
                </Group>
                <Group gap={10} visibleFrom="xs">
                    <NavItem label="Login" link="/" />
                    <NavItem label="Signup" link="/" />
                </Group>
            </Container>
        </header>
    );
}
