'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminHeader } from '@/components/Header/AdminHeader';
import { InvestmentInfo } from '@/components/InvestmentInfo/InvestmentInfo';
import { Gallery } from '@/components/Gallery/Gallery';
import {Container, Flex, Text, Loader, Button} from '@mantine/core';
import Description from '@/components/Description/Description';
import { arimoRegular, baiBold } from "@/app/(frontend)/styles/fonts";
import classes from './campaignAdmin.module.css';
import {Campaign} from "types/api";

const CampaignPage = ({ params }: { params: { id: number } }) => {
    const { id } = params;
    const router = useRouter();
    const [campaign, setCampaign] = useState<Campaign>();
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [approvalStatus, setApprovalStatus] = useState<string | undefined>();

    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                const response = await fetch(`/api/campaign/${id.toString()}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch campaign');
                }
                const data = await response.json();
                setCampaign(data);
                setApprovalStatus(data.approvalStatus);
            } catch (error) {
                console.error('Error fetching campaign:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCampaign();
    }, [id]);


    const handleApprove = async () => {
        setActionLoading(true);
        try {
            const response = await fetch(`/api/approve`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: campaign?.id,
                    type: 'campaign',
                    status: 'APPROVED',
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setApprovalStatus('APPROVED');
                router.push('/admin/campaign');
            } else {
                console.error('Failed to approve:', data.error);
            }
        } catch (error) {
            console.error('Error approving campaign:', error);
        } finally {
            setActionLoading(false);
        }
    };

    const handleReject = async () => {
        setActionLoading(true);
        try {
            const response = await fetch(`/api/approve`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: campaign?.id,
                    type: 'campaign',
                    status: 'REJECTED',
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setApprovalStatus('REJECTED');
                router.push('/admin/campaign');
            } else {
                console.error('Failed to reject:', data.error);
            }
        } catch (error) {
            console.error('Error rejecting campaign:', error);
        } finally {
            setActionLoading(false);
        }
    };



    if (loading) {
        return (
            <Flex justify="center" align="center" style={{ height: '100vh' }}>
                {/* Display loading spinner */}
                <Loader size="xl" />
            </Flex>
        );
    }

    if (!campaign) {
        return <p>Campaign not found.</p>;
    }

    return (
        <main>
            <AdminHeader />
            <Container size={1250}>
                <main className={baiBold.className}>
                    <Text
                        variant="gradient"
                        gradient={{ from: '#000000', to: 'goldenrod', deg: 90 }}
                        fw={500}
                        component="span"
                        className={classes.bigtext}
                    >
                        {campaign.name}
                    </Text>
                </main>
                <main className={arimoRegular.className}>
                    <Text className={classes.smalltext}>
                        {campaign.description}
                    </Text>
                </main>
                <Flex direction="row" justify="space-between" align="stretch">
                    <Gallery images={campaign.images} />
                    <InvestmentInfo
                        campaignId={id}
                        stockPrice={campaign.stockPrice} // initial for prisma update
                        raisedAmount={campaign.raisedAmount}
                        goalAmount={campaign.goal}
                        totalInvestors={campaign.investors}
                        daysLeft={campaign.daysLeft}
                        campaignName={campaign.name}
                        category={campaign.industry}
                        minInvest={campaign.min_invest}
                    />
                </Flex>
                <Flex>
                    <Description
                        highlight={campaign.highlights}
                        product={campaign.product}
                        opportunity={campaign.opportunity}
                    />
                </Flex>
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
            </Container>
        </main>
    );
};

export default CampaignPage;
