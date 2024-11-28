import React from 'react';
import { Table, Container, LoadingOverlay } from '@mantine/core';
import { arimoRegular } from '@/app/(frontend)/styles/fonts';
import classes from './InvestorDashboard.module.css';
import {InvestmentDashboard} from "types/api";

interface InvestmentProps {
    data: InvestmentDashboard[] | null;
    loading: boolean;
}

export function InvestorDashboard({ data, loading }: InvestmentProps) {
    return (
        <Container style={{ position: 'relative' }}>
            <LoadingOverlay
                visible={loading}
                zIndex={1000}
                overlayProps={{ radius: 'sm', blur: 2 }}
                loaderProps={{ color: 'goldenrod', type: 'bars' }}
            />
            <Table striped highlightOnHover verticalSpacing="md" horizontalSpacing="md" className={classes.table}>
                <Table.Thead className={classes.head}>
                    <Table.Tr>
                        <Table.Th className={classes.body}>Campaign Name</Table.Th>
                        <Table.Th className={classes.body}>Amount ( $ )</Table.Th>
                        <Table.Th className={classes.body}>Datetime</Table.Th>
                        <Table.Th className={classes.body}>Status</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody className={arimoRegular.className}>
                    {data && data.length > 0 ? (
                        data.map((element, index) => (
                            <Table.Tr key={index} className={classes.info}>
                                <Table.Td className={classes.name}>{element.campaign.name}</Table.Td>
                                <Table.Td className={classes.body}>{element.amount}</Table.Td>
                                <Table.Td className={classes.body}>{element.timestamp.toLocaleString()}</Table.Td>
                                <Table.Td className={classes.body}>{element.approvalStatus}</Table.Td>
                            </Table.Tr>
                        ))
                    ) : (
                        <Table.Tr>
                            <Table.Td colSpan={4}>No data available</Table.Td>
                        </Table.Tr>
                    )}
                </Table.Tbody>
            </Table>
        </Container>
    );
}
