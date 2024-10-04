'use client';

import React from 'react';
import { Table, Container } from '@mantine/core';
import classes from './ApprovalTable.module.css';
import { baiSemiBold, arimoRegular } from '@/app/styles/fonts'


const elements = [
    { id: '1' ,username: 'John Doe', role: 'Investor', email: 'john.doe@gmail.com' },
    { id: '2' ,username: 'Jane Doe', role: 'Investor', email: 'jane.doe@gmail.com' },
    { id: '3' ,username: 'B2D Ventures', role: 'Business', email: 'B2D@gmail.com' },
    { id: '4' ,username: 'Samkhon Group', role: 'Business', email: '3Khon@gmail.com' },
    { id: '5' ,username: 'HADCHEW', role: 'Business', email: 'Jarm@gmail.com' },
];

export function ApprovalTable() {
    const rows = elements.map((element) => (

        <Table.Tr key={element.id} className={classes.info}>
            <Table.Td className={classes.id}>{element.id}</Table.Td>
            <Table.Td>{element.username}</Table.Td>
            <Table.Td className={classes.body}>{element.role}</Table.Td>
            <Table.Td>{element.email}</Table.Td>
        </Table.Tr>

    ));

    return (
        <Container>
            <Table striped highlightOnHover verticalSpacing="md" horizontalSpacing="md" className={classes.table}>
                <Table.Thead className={classes.head}>
                    <Table.Tr>
                        <Table.Th className={classes.body}>ID</Table.Th>
                        <Table.Th className={classes.body}>Username</Table.Th>
                        <Table.Th className={classes.body}>Role Request</Table.Th>
                        <Table.Th className={classes.body}>Email</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody className={arimoRegular.className}>
                    {rows}
                </Table.Tbody>
            </Table>
        </Container>
    );
}
