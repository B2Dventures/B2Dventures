'use client'

import React, {useEffect, useState} from 'react';
import { Container, Text, Stack, Button, Divider, Image, Avatar } from '@mantine/core';
import {useRouter} from "next/navigation";

import classes from './RequestDetail.module.css';
import {approvalsQuery, updateRoleQuery} from "types/models";

export function InvestmentRequestDetail({ investment }: { investment: any }) {
    const [approvalStatus, setApprovalStatus] = useState('PENDING');
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    useEffect(() => {
        setApprovalStatus(investment.approvalStatus);
    }, [investment.approvalStatus]);
    type roleCheck = 'admin' | 'investor' | 'business' | 'guest' | 'investor(pending)' | "business(pending)";


    const handleApprove = async () => {
        setLoading(true);
        try {
            const payload: approvalsQuery = {
                id: investment.id,
                type: 'investment',
                status: 'APPROVED',
            }
            const response = await fetch(`/api/approve?id=${investment.id}&type=investment&status=APPROVED`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (response.ok) {
                setApprovalStatus('APPROVED');
                router.push('/admin/investment');
            } else {
                console.error('Failed to approve:', data.error);
            }
        } catch (error) {
            console.error('Error approving investment:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/approve?id=${investment.id}&type=investment&status=REJECTED`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (response.ok) {
                setApprovalStatus('REJECTED');
                router.push('/admin/investment');
            } else {
                console.error('Failed to reject:', data.error);
            }
        } catch (error) {
            console.error('Error rejecting investment:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className={classes.container}>
            <Stack gap="md" align="stretch" className={classes.stack}>
                <div className={classes.box}>
                    <Text className={classes.topic}>Investor Information</Text>
                    <Text className={classes.normalText}><strong>Investor
                        Name:</strong> {investment.investor.first_name} {investment.investor.last_name}</Text>
                    <Text className={classes.normalText}><strong>Passport
                        Number:</strong> {investment.investor.passport_num}</Text>
                    <Text className={classes.normalText}><strong>Phone Number:</strong> {investment.investor.phone_num}</Text>
                </div>
                <Divider my="md"/>
                <div className={classes.box}>
                    <Text className={classes.topic}>Campaign Information</Text>
                    <Text className={classes.normalText}><strong>Campaign Name:</strong> {investment.campaign.name}</Text>
                    <Text className={classes.normalText}><strong>Description:</strong> {investment.campaign.description}</Text>
                    <Text className={classes.normalText}><strong>From Business:</strong> {investment.campaign.business.business_name}</Text>
                </div>
                <Divider my="md"/>
                <div className={classes.box}>
                    <Text className={classes.topic}>Investment Information</Text>
                    <Text className={classes.normalText}><strong>Market Cap:</strong> $ {investment.amount}</Text>
                    <Text><strong>Time:</strong> {new Date(investment.timestamp).toLocaleString()}</Text>
                </div>
                <Divider my="md"/>
                <div className={classes.buttonContainer}>
                    <Button
                        size="lg"
                        color="green"
                        radius="20"
                        className={classes.button}
                        onClick={handleApprove}
                        disabled={loading || approvalStatus !== 'PENDING'} // Disable if loading or not in "PENDING" state
                    >
                        Approve
                    </Button>
                    <Button
                        size="lg"
                        color="red"
                        radius="20"
                        className={classes.button}
                        onClick={handleReject}
                        disabled={loading || approvalStatus !== 'PENDING'} // Disable if loading or not in "PENDING" state
                    >
                        Reject
                    </Button>
                </div>
            </Stack>
        </Container>
    );
}
