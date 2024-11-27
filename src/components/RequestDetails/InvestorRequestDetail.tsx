'use client';

import React, { useEffect, useState } from 'react';
import { Container, Text, Stack, Button, Divider, Flex, Image } from '@mantine/core';
import { useRouter } from 'next/navigation';
import classes from './RequestDetail.module.css';

//normalize date to DD/MM/YYYY format
const normalizeDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
};

export function InvestorRequestDetail({ investor }: { investor: any }) {
    const [approvalStatus, setApprovalStatus] = useState('PENDING');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const formattedDate = normalizeDate(investor.birth_date);

    useEffect(() => {
        setApprovalStatus(investor.approvalStatus);
    }, [investor.approvalStatus]);

    const updateRole = async (role: string) => {
        try {
            const response = await fetch(`/api/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: investor.user.id,
                    role: role,
                }),
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
            const response = await fetch(`/api/approve`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: investor?.id,
                    type: 'investor',
                    status: 'APPROVED',
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setApprovalStatus('APPROVED');
                await updateRole('investor'); // Update Clerk role to "investor"
                router.push('/admin/investor');
            } else {
                console.error('Failed to approve:', data.error);
            }
        } catch (error) {
            console.error('Error approving investor:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/approve`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: investor?.id,
                    type: 'investor',
                    status: 'REJECTED',
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setApprovalStatus('REJECTED');
                await updateRole('guest');
                router.push('/admin/investor');
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
                            <strong>Birth Date:</strong> {formattedDate}
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
