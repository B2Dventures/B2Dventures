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
                <Group>
                    <Grid>
                        <Grid.Col span={4}>
                            <div className={classes.box}>
                                <LuDollarSign size={50} />
                                <Text className={classes.name}>Total Investment</Text>
                                <Text className={classes.number}>$ 8M+</Text>
                            </div>
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <div className={classes.box}>
                                <LuUsers size={50} />
                                <Text className={classes.name}>Total Investors</Text>
                                <Text className={classes.number}>100K+</Text>
                            </div>
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <div className={classes.box}>
                                <LuCheckCircle size={50} />
                                <Text className={classes.name}>Ventures Supported</Text>
                                <Text className={classes.number}>1200+</Text>
                            </div>
                        </Grid.Col>
                    </Grid>
                </Group>
                <Group gap={20} visibleFrom="xs">
                    <Button size='lg' rightSection={<LuChevronRightCircle size={25} color='black' />} variant="gradient"
                            gradient={{ from: 'yellow', to: 'gold', deg: 90 }}>
                        <NavItem label="Start Investing" link="/investor" />
                    </Button>
                </Group>
            </Container>
        </footer>
    );
}
