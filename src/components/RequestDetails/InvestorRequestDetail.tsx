'use client';

import React from 'react';
import { Container, Text, Stack, Button, Divider, Flex, Image } from '@mantine/core';
import classes from './InvestorRequestDetail.module.css';

export function InvestorRequestDetail() {
    return (
        <Container className={classes.container}>
            <Image
                radius="md"
                height="auto"
                width="50%"  // Adjust to half the container width
                fit="cover"
                src="/passport_ex.png"
                className={classes.image}
            />
            <Stack gap="md" align="stretch" className={classes.stack}>
                <div className={classes.box}>
                    <Text className={classes.topic}>Personal Information</Text>
                    <Text className={classes.normalText}><strong>Name:</strong> First Lastname</Text>
                    <Text className={classes.normalText}><strong>Nationality:</strong> Nationality</Text>
                    <Text className={classes.normalText}><strong>Passport Number:</strong> 123456789</Text>
                    <Flex align="center" className={classes.flex}>
                        <Text className={classes.normalText}><strong>Birth Date:</strong> 01/01/2000</Text>
                        <Text className={classes.normalText}><strong>Age:</strong> 24</Text>
                    </Flex>
                </div>
                <Divider my="md" />
                <div className={classes.box}>
                    <Text className={classes.topic}>Occupation</Text>
                    <Text className={classes.normalText}><strong>Occupation:</strong> occupation</Text>
                    <Text className={classes.normalText}><strong>Income:</strong> $1,000</Text>
                </div>
                <Divider my="md" />
                <div className={classes.box}>
                    <Text className={classes.topic}>Contact</Text>
                    <Text className={classes.normalText}><strong>Address:</strong> Bangkok, Thailand</Text>
                    <Text className={classes.normalText}><strong>Phone:</strong> +66812345678</Text>
                    <Text className={classes.normalText}><strong>Email:</strong> ABC@abc.com</Text>
                </div>
                <Divider my="md" />
                <div className={classes.buttonContainer}>
                    <Button size="lg" color="green" radius="20" className={classes.button}>
                        Approve
                    </Button>
                    <Button size="lg" color="red" radius="20" className={classes.button}>
                        Reject
                    </Button>
                </div>
            </Stack>
        </Container>
    );
}
