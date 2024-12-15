'use client';

import React, { useEffect, useState } from 'react';
import { Header } from '@/components/Header/Header';
import { InvestmentInfo } from '@/components/InvestmentInfo/InvestmentInfo';
import { Gallery } from '@/components/Gallery/Gallery';
import { Container, Flex, Text, Loader } from '@mantine/core';
import Description from '@/components/Description/Description';
import { arimoRegular, baiBold } from "@/app/(frontend)/styles/fonts";
import classes from './id.module.css';
import {Campaign} from "types/api";

const CampaignPage = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const [campaign, setCampaign] = useState<Campaign>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                const response = await fetch(`/api/campaign/${id.toString()}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch campaign');
                }
                const data = await response.json();
                setCampaign(data);
            } catch (error) {
                console.error('Error fetching campaign:', error);
                window.location.href = '/error';
            } finally {
                setLoading(false);
            }
        };

        void fetchCampaign();
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
            </Container>
        </main>
    );
};

export default CampaignPage;
