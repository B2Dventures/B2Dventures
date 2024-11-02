'use client';

import React from 'react';
import { Text, Container, Paper, Stack, Flex } from '@mantine/core';
import classes from './ApprovalTable.module.css';
import { baiSemiBold, arimoRegular } from '@/app/(frontend)/styles/fonts';
import { LuChevronRightCircle } from 'react-icons/lu';

const elements = [
    { id: '1', businessName: 'VoeVin Corp.', founderFirstName: 'John', founderLastName: 'Doe', detail: 'NextGen Game Developers', industry: 'Game', email: 'vvcorp@gmail.com' },
    { id: '2', businessName: 'Tech Innovators', founderFirstName: 'Jane', founderLastName: 'Smith', detail: 'Innovative Tech Solutions', industry: 'Technology', email: 'techinnovators@gmail.com' },
    { id: '3', businessName: 'EcoFriendly Co.', founderFirstName: 'Chris', founderLastName: 'Johnson', detail: 'Sustainable Products', industry: 'Retail', email: 'ecofriendlyco@gmail.com' },
    { id: '4', businessName: 'Health First', founderFirstName: 'Sara', founderLastName: 'Lee', detail: 'Healthcare Solutions', industry: 'Health', email: 'healthfirst@gmail.com' },
];

export function BusinessApprovalTable() {
    return (
        <Container>
            <Stack align="center" justify="flex-start" gap="sm" className={classes.stack}>
                {elements.map((element) => (
                    <Paper
                        key={element.id}
                        shadow="md"
                        radius="md"
                        p="xl"
                        className={`${classes.paper} ${arimoRegular.className}`}
                        onClick={() => window.location.href = `/admin/business/${element.id}`} // Corrected to point to business instead of campaign
                    >
                        <Text className={classes.topic}>Business Name: {element.businessName}</Text>
                        <Text><strong>Founder:</strong> {element.founderFirstName} {element.founderLastName}</Text>
                        <Flex align="center" className={classes.descriptionGoal}>
                            <Text><strong>Description:</strong> {element.detail}</Text>
                            <Text className={classes.industry}><strong>Industry:</strong> {element.industry}</Text>
                        </Flex>
                        <Text>
                            <strong>Email:</strong> {element.email}
                        </Text>
                        <Text className={classes.check}>
                            <LuChevronRightCircle size={25} fontWeight="bold" />
                        </Text>
                    </Paper>
                ))}
            </Stack>
        </Container>
    );
}
