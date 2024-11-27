'use client'

import React, {useEffect, useState} from 'react';
import { Container, Text, Stack, Button, Divider, Image, Avatar } from '@mantine/core';
import {useRouter} from "next/navigation";

import classes from './RequestDetail.module.css';
import { approvalsQuery } from "types/models";
import {adminBusinessDetail} from "types/api";

export function BusinessRequestDetail({ business }: { business: adminBusinessDetail }) {
    const [approvalStatus, setApprovalStatus] = useState('PENDING');
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    useEffect(() => {
        setApprovalStatus(business.approvalStatus);
    }, [business.approvalStatus]);

    const updateRole = async (role: string) => {
        try {
            const payload = {
                id: business.userId,
                role: role,
            }
            const response = await fetch(`/api/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
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
            const payload: approvalsQuery = {
                id: business.id,
                type: 'business',
                status: 'APPROVED',
            }
            const response = await fetch(`/api/approve`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
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
            const payload : approvalsQuery = {
                id: business.id,
                type: 'business',
                status: 'REJECTED',
            }
            const response = await fetch(`/api/approve`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
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
            console.error('Error rejecting business:', error);
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
                    <Text className={classes.normalText}><strong>Email:</strong> {business.userEmail}</Text>
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
