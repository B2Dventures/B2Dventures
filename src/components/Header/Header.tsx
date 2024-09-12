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
                        <a href='/investor' className={classes.fullButtonLink}>
                            <div className={classes.box}>
                                <LuUser size={50} color='black'/>
                                <div>Investor</div>
                            </div>
                        </a>
                    </Button>
                    <Button size='md' variant="outline" color='white'>
                        <a href='/business' className={classes.fullButtonLink}>
                            <div className={classes.box}>
                                <LuBriefcase size={25} color='black' />
                                <div>Business</div>
                            </div>
                        </a>
                    </Button>
                </Group>
                <Group gap={20} visibleFrom="xs">
                    <a href='/login'  className={classes.access}>Login</a>
                    <a href='/signup'  className={classes.access}>Signup</a>
                </Group>
            </Container>
        </header>
);
}
