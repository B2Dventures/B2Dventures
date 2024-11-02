'use client';

import React from 'react';
import { Text, Container, Paper, Stack } from '@mantine/core';
import classes from './ApprovalTable.module.css';
import { baiSemiBold, arimoRegular } from '@/app/(frontend)/styles/fonts';
import { LuChevronRightCircle } from "react-icons/lu";

const elements = [
    { id: '1', firstName: 'John', lastName: 'Doe', nationality: 'Thai', email: 'john.doe@gmail.com' },
    { id: '2', firstName: 'Jane', lastName: 'Smith', nationality: 'American', email: 'jane.smith@gmail.com' },
    { id: '3', firstName: 'Chris', lastName: 'Johnson', nationality: 'Canadian', email: 'chris.johnson@gmail.com' },
    { id: '4', firstName: 'Sara', lastName: 'Lee', nationality: 'Korean', email: 'sara.lee@gmail.com' },
];

export function InvestorApprovalTable() {
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
                        onClick={() => window.location.href = `/admin/investor/${element.id}`}
                    >
                        <Text className={classes.topic}>Name: {element.firstName} {element.lastName}</Text>
                        <Text><strong>Nationality</strong>: {element.nationality}</Text>
                        <Text><strong>Email</strong>: {element.email}</Text>
                        <Text className={classes.check}><LuChevronRightCircle size={25} fontWeight="bold"/></Text>
                    </Paper>
                ))}
            </Stack>
        </Container>
    );
}
