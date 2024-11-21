"use client";

import React from 'react';
import { Container, Group, Button } from '@mantine/core';
import classes from './Header.module.css';
import { Logo } from "@/components/Header/Logo/Logo";
import { LuUser, LuBriefcase, LuUserPlus, LuContact, LuLogIn } from "react-icons/lu";
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
    useUser,
} from '@clerk/nextjs';

export function Header() {
    const { user } = useUser(); // Access user data

    const userRole = user?.publicMetadata?.role || "Role not set";

    const investorPage= () => {
        window.location.href = '/investor'; // Redirect to the new URL
    };

    const businessPage= () => {
        window.location.href = '/business'; // Redirect to the new URL
    };

    const enrollInvestor = () => {
        window.location.href = '/enroll/investor';
    };

    const enrollBusiness = () => {
        window.location.href = '/enroll/business';
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
                </Group>
                <Group gap={20} visibleFrom="xs">
                    <SignedOut>
                        <SignInButton>
                            <Button size='md' variant="outline" color="white">
                                <LuLogIn style={{ marginRight: 8 }} size={15} color='black' />
                                <div className={classes.access}>Login</div>
                            </Button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton>
                            {userRole === "guest" ? (
                                <UserButton.MenuItems>
                                    <UserButton.Action
                                        label={`Role: ${userRole}`}
                                        labelIcon={<LuContact size={16} />}
                                        onClick={() => {}}
                                    />
                                    <UserButton.Action
                                        label="Enroll as Investor"
                                        labelIcon={<LuUserPlus size={16} />}
                                        onClick={enrollInvestor}
                                    />
                                    <UserButton.Action
                                        label="Enroll as Business"
                                        labelIcon={<LuBriefcase size={16} />}
                                        onClick={enrollBusiness}
                                    />
                                </UserButton.MenuItems>
                            ) : (
                                <UserButton.MenuItems>
                                    <UserButton.Action
                                        label={`Role: ${userRole}`}
                                        labelIcon={<LuContact size={16} />}
                                        onClick={() => {}}
                                    />
                                </UserButton.MenuItems>
                            )}
                        </UserButton>
                    </SignedIn>
                </Group>
            </Container>
        </header>
    );
}
