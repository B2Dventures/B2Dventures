"use client";

import React from 'react';
import { Container, Group, Button } from '@mantine/core';
import classes from './Header.module.css';
import {NavItem} from "@/components/Header/NavItem/NavItem";
import {Logo} from "@/components/Header/Logo/Logo";
import { BsPerson, BsSuitcaseLg } from "react-icons/bs";

export function Header() {
    return (
        <header className={classes.header}>
            <Container className={classes.inner} fluid>
                <Group gap={30} visibleFrom="xs" justify="center">
                    <Logo />
                    <Button size='md' leftSection={<BsPerson size={20} color='black'/>} variant="outline" color='white'>
                    <NavItem label="Investor" link="/investor" />
                    </Button>
                    <Button size='md' leftSection={<BsSuitcaseLg size={20} color='black'/>} variant="outline" color='white'>
                    <NavItem label="Business" link="/business" />
                    </Button>
                </Group>
                <Group gap={20} visibleFrom="xs">
                    <NavItem label="Login" link="/" />
                    <NavItem label="Signup" link="/" />
                </Group>
            </Container>
        </header>
    );
}
