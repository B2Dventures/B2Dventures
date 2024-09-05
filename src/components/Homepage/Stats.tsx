"use client";

import { Container, Group, Grid, rem, Button, Space, Text } from '@mantine/core';
import classes from './Stat.module.css';
import { LuDollarSign, LuUsers, LuCheckCircle, LuChevronRightCircle } from "react-icons/lu";
import {NavItem} from "@/components/Header/NavItem/NavItem";
import React from "react";

export function Stats() {
    return (
        <footer className={classes.footer}>
            <Container className={classes.inner} fluid>
                <Grid className={classes.grid}>
                    <Grid.Col span={4}>
                        <LuDollarSign/>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <LuUsers/>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <LuCheckCircle/>
                    </Grid.Col>
                </Grid>
                <Group gap={20} visibleFrom="xs">
                    <Button size='sm' rightSection={<LuChevronRightCircle size={20} color='black' />} variant="gradient"
                            gradient={{ from: 'yellow', to: 'gold', deg: 90 }}>
                        <NavItem label="Start Investing" link="/investor" />
                    </Button>
                </Group>
            </Container>
        </footer>
    );
}
