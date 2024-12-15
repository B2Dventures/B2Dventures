import React from 'react';
import { Table, Container, LoadingOverlay } from '@mantine/core';
import classes from './CampaignTable.module.css';
import { baiSemiBold, arimoRegular } from '@/app/(frontend)/styles/fonts';

interface Campaign {
    id: number;
    name: string;
    goal: number;
    raised: number;
    investors: number;
    status: string;
}

interface CampaignTableProps {
    data: Campaign[] | null; // Accept the fetched campaign data as a prop
    loading: boolean; // Add loading prop
}

export function CampaignTable({ data, loading }: CampaignTableProps) {
    return (
        <Container style={{ position: 'relative' }}>
            <LoadingOverlay
                visible={loading} // Use loading prop to control visibility
                zIndex={1000}
                overlayProps={{ radius: 'sm', blur: 2 }}
                loaderProps={{ color: 'goldenrod', type: 'bars' }}
            />
            <Table striped highlightOnHover verticalSpacing="md" horizontalSpacing="md" className={classes.table}>
                <Table.Thead className={classes.head}>
                    <Table.Tr>
                        <Table.Th className={classes.body}>Campaign Name</Table.Th>
                        <Table.Th className={classes.body}>Goals ( $ )</Table.Th>
                        <Table.Th className={classes.body}>Fund Raised</Table.Th>
                        <Table.Th className={classes.body}>Number of Investors</Table.Th>
                        <Table.Th className={classes.body}>Status</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody className={arimoRegular.className}>
                    {data && data.length > 0 ? (
                        data.map((element) => (
                            <Table.Tr key={element.id} onClick={() => window.location.href = `/investor/${element.id}`} className={classes.info}>
                                <Table.Td className={classes.name}>{element.name}</Table.Td>
                                <Table.Td className={classes.body}>{element.goal}</Table.Td>
                                <Table.Td className={classes.body}>{element.raised}</Table.Td>
                                <Table.Td className={classes.body}>{element.investors}</Table.Td>
                                <Table.Td className={classes.body}>{element.status}</Table.Td>
                            </Table.Tr>
                        ))
                    ) : (
                        <Table.Tr>
                            <Table.Td colSpan={5}>No data available</Table.Td>
                        </Table.Tr>
                    )}
                </Table.Tbody>
            </Table>
        </Container>
    );
}
