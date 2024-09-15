'use client';

import React from 'react';
import { Table, Container } from '@mantine/core';
import classes from './CampaignTable.module.css';

const elements = [
    { name: 'B2D', goal: 120000, raised: 50000,investors: 2345, status: 'OnGoing' },
    { name: 'D2B', goal: 100000, raised: 123456, investors: 3456, status: 'Finished' },
    { name: 'ABC', goal: 200000, raised: 121231, investors: 1234, status: 'OnGoing' },
    { name: 'ACDC', goal: 5000, raised: 120, investors: 1, status: 'OnGoing' },
    { name: 'A Campaign', goal: 180000, raised: 100000, investors: 112, status: 'OnGoing' },
    { name: 'A Fundraising', goal: 145000, raised: 162000, investors: 452, status: 'Finished' },
    { name: 'XYZ', goal: 10000, raised: 13200, investors: 191, status: 'OnGoing' },
    { name: '123Company', goal: 50000, raised: 32600, investors: 326, status: 'OnGoing' },

];

export function CampaignTable() {
    const rows = elements.map((element) => (
        <Table.Tr key={element.name}>
            <Table.Td className={classes.name}>{element.name}</Table.Td>
            <Table.Td className={classes.body}>{element.goal}</Table.Td>
            <Table.Td className={classes.body}>{element.raised}</Table.Td>
            <Table.Td className={classes.body}>{element.investors}</Table.Td>
            <Table.Td className={classes.body}>{element.status}</Table.Td>
        </Table.Tr>
    ));

    return (
        <Container className={classes.table}>
            <Table striped highlightOnHover withTableBorder verticalSpacing="md" horizontalSpacing="md">
                <Table.Thead className={classes.head}>
                    <Table.Tr>
                        <Table.Th className={classes.body}>Campaign Name</Table.Th>
                        <Table.Th className={classes.body}>Goals($)</Table.Th>
                        <Table.Th className={classes.body}>Fund Raised</Table.Th>
                        <Table.Th className={classes.body}>Number of Investors</Table.Th>
                        <Table.Th className={classes.body}>Status</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {rows}
                </Table.Tbody>
            </Table>
        </Container>
    );
}
