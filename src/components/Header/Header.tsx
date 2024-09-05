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
                    <Button size='sm' leftSection={<BsPerson size={20} />} variant="outline" color='white'
                            styles={{
                                root: { color: 'black' }
                            }} autoContrast>
                    <NavItem label="Business" link="/business" />
                    </Button>
                    <Button size='sm' leftSection={<BsSuitcaseLg size={20} />} variant="outline" color='white'
                            styles={{
                        root: { color: 'black' }
                    }}>
                    <NavItem label="Campaign" link="/campaign" />
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
