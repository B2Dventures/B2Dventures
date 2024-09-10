"use client";

import React from 'react';
import { Container, Group, Button } from '@mantine/core';
import classes from './Header.module.css';
import {NavItem} from "@/components/Header/NavItem/NavItem";
import {Logo} from "@/components/Header/Logo/Logo";
import { LuUser, LuBriefcase } from "react-icons/lu";

export function Header() {
    return (
        <header className={classes.header}>
            <Container className={classes.inner} size={"1440"}>
                <Group gap={30} visibleFrom="xs" justify="center">
                    <Logo />
                    <Button size='md' variant="outline" color='white'>
                        <div className={classes.box}>
                            <LuUser size={50} color='black'/>
                            <NavItem label="Investor" link="/investor" />
                        </div>
                    </Button>
                    <Button size='md' variant="outline" color='white'>
                        <div className={classes.box}>
                            <LuBriefcase size={50} color='black'/>
                            <NavItem label="Business" link="/business" />
                        </div>
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
