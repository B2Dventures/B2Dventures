'use client'

import React, {useEffect, useState} from 'react';
import { Container, Text, Stack, Button, Divider, Flex, Image, Avatar } from '@mantine/core';
import classes from './RequestDetail.module.css';
import {useRouter} from "next/navigation";

export function BusinessRequestDetail({ business }: { business: any }) {
    const [approvalStatus, setApprovalStatus] = useState('PENDING');
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    useEffect(() => {
        setApprovalStatus(business.approvalStatus);
    }, [business.approvalStatus]);

    const updateRole = async (role: string) => {
        try {
            const response = await fetch(`/api/user?id=${business.user.id}&role=${role}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed to update role');
        } catch (error) {
            console.error('Error updating user role in Clerk:', error);
        }
    };

    const handleApprove = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/approve?id=${business.id}&type=business&status=APPROVED`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (response.ok) {
                setApprovalStatus('APPROVED');
                await updateRole('business');
                router.push('/admin/business');
            } else {
                console.error('Failed to approve:', data.error);
            }
        } catch (error) {
            console.error('Error approving business:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/approve?id=${business.id}&type=business&status=REJECTED`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (response.ok) {
                setApprovalStatus('REJECTED');
                await updateRole('guest');
                router.push('/admin/business');
            } else {
                console.error('Failed to reject:', data.error);
            }
        } catch (error) {
            console.error('Error rejecting investor:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className={classes.container}>
            <Image
                radius="md"
                height="auto"
                width="50%"
                fit="cover"
                src={business.license || "/business-certificate-ex.png"}
                className={classes.image}
            />
            <Stack gap="md" align="stretch" className={classes.stack}>
                <div className={classes.logo}>
                    <Avatar src="/logo.ico" radius="sm" size='120px'/>
                </div>
                <div className={classes.box}>
                    <Text className={classes.topic}>Business Information</Text>
                    <Text className={classes.normalText}><strong>Business Name:</strong> {business.business_name}</Text>
                    <Text className={classes.normalText}><strong>Founder Name:</strong> {business.founder_first_name} {business.founder_last_name}</Text>
                    <Text className={classes.normalText}>
                        <strong>Category:</strong> {Array.isArray(business.industry) ? business.industry.join(', ') : 'Not specified'}
                    </Text>
                    <Text className={classes.normalText}><strong>Description:</strong> {business.business_detail}</Text>
                    <Text className={classes.normalText}><strong>Market Cap:</strong> $ {business.market_cap}</Text>
                </div>
                <Divider my="md" />
                <div className={classes.box}>
                    <Text className={classes.topic}>Contact</Text>
                    <Text className={classes.normalText}><strong>Address:</strong> {business.company_address}</Text>
                    <Text className={classes.normalText}><strong>Email:</strong> {business.user.email}</Text>
                </div>
                <Divider my="md" />
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
