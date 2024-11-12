import React from 'react';
import { Container, Text, Stack, Button, Divider, Flex, Image } from '@mantine/core';
import classes from './RequestDetail.module.css';

export function InvestorRequestDetail({ investor }: { investor: any }) {
    return (
        <Container className={classes.container}>
            <Image
                radius="md"
                height="auto"
                width="50%"
                fit="cover"
                src={investor.passport_img || "/passport_ex.png"}
                className={classes.image}
            />
            <Stack gap="md" align="stretch" className={classes.stack}>
                <div className={classes.box}>
                    <Text className={classes.topic}>Personal Information</Text>
                    <Text className={classes.normalText}><strong>Name:</strong> {investor.first_name} {investor.last_name}</Text>
                    <Text className={classes.normalText}><strong>Nationality:</strong> {investor.nationality}</Text>
                    <Text className={classes.normalText}><strong>Passport Number:</strong> {investor.passport_num}</Text>
                    <Flex align="center" className={classes.flex}>
                        <Text className={classes.normalText}>
                            <strong>Birth Date:</strong> {new Date(investor.birth_date).toLocaleDateString()}
                        </Text>
                        <Text className={classes.normalText}>
                            <strong>Age:</strong> {new Date().getFullYear() - new Date(investor.birth_date).getFullYear() -
                            (new Date().getMonth() < new Date(investor.birth_date).getMonth() ||
                            (new Date().getMonth() === new Date(investor.birth_date).getMonth() &&
                                new Date().getDate() < new Date(investor.birth_date).getDate()) ? 1 : 0)}
                        </Text>
                    </Flex>
                </div>
                <Divider my="md" />
                <div className={classes.box}>
                    <Text className={classes.topic}>Occupation</Text>
                    <Text className={classes.normalText}><strong>Occupation:</strong> {investor.occupation}</Text>
                    <Text className={classes.normalText}><strong>Income:</strong> ${investor.income}</Text>
                </div>
                <Divider my="md" />
                <div className={classes.box}>
                    <Text className={classes.topic}>Contact</Text>
                    <Text className={classes.normalText}><strong>Address:</strong> {investor.address}</Text>
                    <Text className={classes.normalText}><strong>Phone:</strong> {investor.phone_num}</Text>
                    <Text className={classes.normalText}><strong>Email:</strong> {investor.user.email}</Text>
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
