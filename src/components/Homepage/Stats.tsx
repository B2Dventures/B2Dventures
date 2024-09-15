"use client";

import { Container, Group, Button, Divider, Text } from '@mantine/core';
import classes from './Stat.module.css';
import { LuDollarSign, LuUsers, LuCheckCircle, LuChevronRightCircle } from "react-icons/lu";
import {NavItem} from "@/components/Header/NavItem/NavItem";
import React from "react";

export function Stats() {
    return (
        <footer className={classes.footer}>
            <Container className={classes.inner} size={1440}>
                <Group>
                    <div className={classes.box}>
                        <LuDollarSign size={50} />
                        <Text className={classes.name}>Total Investment</Text>
                        <Text className={classes.number}>$ 8M+</Text>
                    </div>
                    <Divider orientation="vertical" />
                    <div className={classes.box}>
                        <LuUsers size={50} />
                        <Text className={classes.name}>Total Investors</Text>
                        <Text className={classes.number}>100K+</Text>
                    </div>
                    <Divider orientation="vertical" />
                    <div className={classes.box}>
                        <LuCheckCircle size={50} />
                        <Text className={classes.name}>Ventures Supported</Text>
                        <Text className={classes.number}>1200+</Text>
                    </div>
                    <Divider orientation="vertical" />
                </Group>
                <Group gap={20} visibleFrom="xs">
                    <Button size='lg' rightSection={<LuChevronRightCircle size={25} color='white' />} variant="gradient"
                            gradient={{ from: 'goldenrod', to: 'yellow', deg: 90 }}>
                        <NavItem label="Start Investing" link="/investor" />
                    </Button>
                </Group>
            </Container>
        </footer>
    );
}
