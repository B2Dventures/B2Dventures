"use client";

import React from 'react';
import { Container, Group, Button } from '@mantine/core';
import classes from './Header.module.css';
import {NavItem} from "@/components/Header/NavItem/NavItem";
import {Logo} from "@/components/Header/Logo/Logo";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { LuUser, LuBriefcase, LuClipboardList } from "react-icons/lu";
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
} from '@clerk/nextjs';

export function AdminHeader() {

    const investorPage= () => {
        window.location.href = '/admin/investor'; // Redirect to the new URL
    };

    const businessPage= () => {
        window.location.href = '/admin/business'; // Redirect to the new URL
    };

    const campaignPage= () => {
        window.location.href = '/admin/campaign';
    };

    return (
        <header className={classes.header}>
            <Container className={classes.inner} size={"1440"}>
                <Group gap={30} visibleFrom="xs" justify="center">
                    <Logo />
                    <Button size='md' variant="outline" color='white' onClick={investorPage}>
                        <a className={classes.fullButtonLink}>
                            <div className={classes.box}>
                                <LuUser size={50} color='black'/>
                                <div>Investor</div>
                            </div>
                        </a>
                    </Button>
                    <Button size='md' variant="outline" color='white' onClick={businessPage}>
                        <a className={classes.fullButtonLink}>
                            <div className={classes.box}>
                                <LuBriefcase size={25} color='black' />
                                <div>Business</div>
                            </div>
                        </a>
                    </Button>
                    <Button size='md' variant="outline" color='white' onClick={campaignPage}>
                        <a className={classes.fullButtonLink}>
                            <div className={classes.box}>
                                <LuClipboardList size={25} color='black' />
                                <div>Campaign</div>
                            </div>
                        </a>
                    </Button>
                </Group>
                <Group gap={20} visibleFrom="xs">
                        <SignedOut>
                            {/* Replace old login/signup links with Clerk buttons */}
                            <SignInButton>
                                <Button size='md' variant="outline" color="white">
                                    <FaSignInAlt style={{ marginRight: 8 }} size={15} color='black' />
                                    <div className={classes.access}>Login</div>
                                </Button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            {/* If the user is signed in, show a user button */}
                            <UserButton />
                        </SignedIn>
                </Group>
            </Container>
        </header>
    );
}
