'use client';

import React, { useEffect, useState } from 'react';
import { Header } from '@/components/Header/Header';
import { InvestmentInfo } from '@/components/InvestmentInfo/InvestmentInfo';
import { Gallery } from '@/components/Gallery/Gallery';
import { Container, Flex, Text, Loader } from '@mantine/core';
import Description from '@/components/Description/Description';
import { arimoRegular, baiBold } from "@/app/(frontend)/styles/fonts";
import classes from './id.module.css';

const CampaignPage = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const [campaign, setCampaign] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                const response = await fetch(`/api/campaign/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch campaign');
                }
                const data = await response.json();
                setCampaign(data);
            } catch (error) {
                console.error('Error fetching campaign:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCampaign();
    }, [id]);

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

    const images = campaign.images || [];
    const highlights = campaign.details?.highlight || [];

    return (
        <main>
            <Header />
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
                    <Gallery images={images} />
                    <InvestmentInfo
                        raisedAmount={campaign.raisedAmount}
                        goalAmount={campaign.goal}
                        totalInvestors={campaign.investors}
                        daysLeft={campaign.daysLeft}
                        campaignName={campaign.name}
                    />
                </Flex>
                <Flex>
                    <Description
                        highlight={campaign.details.highlight || 'No highlights available'}
                        product={campaign.details.product || 'No product details available'}
                        opportunity={campaign.details.opportunity || 'No opportunities available'}
                    />
                </Flex>
            </Container>
        </main>
    );
};

export default CampaignPage;
