'use client';

import React from 'react';
import { Container, Text, Progress, Badge, Stack, Button, Divider } from '@mantine/core';
import classes from './InvestmentInfo.module.css';
import { LuChevronRightCircle } from "react-icons/lu";
import InvestmentModal from "@/components/InvestmentInfo/InvestmentModal";
import { useUser } from '@clerk/nextjs';

interface InvestmentInfoProps {
    campaignId: number;
    raisedAmount: number;
    goalAmount: number;
    totalInvestors: number;
    daysLeft: number;
    campaignName: string;
    stockPrice: number;
    category: string[];
    minInvest: number;
}

export const InvestmentInfo: React.FC<InvestmentInfoProps> = ({
                                                                  campaignId,
                                                                  raisedAmount,
                                                                  goalAmount,
                                                                  totalInvestors,
                                                                  daysLeft,
                                                                  campaignName,
                                                                  stockPrice,
                                                                  category,
                                                                  minInvest
                                                              }) => {
    const { user } = useUser(); // Fetches user data from Clerk

    // Check if user is an investor
    const isInvestor = user?.publicMetadata?.role === 'investor';
    const isBusiness = user?.publicMetadata?.role === 'business';

    const progressPercentage = Math.min((raisedAmount / goalAmount) * 100, 100);

    return (
        <Container className={classes.container}>
            <Stack gap="sm" align="stretch">
                <div className={classes.box}>
                    <Text className={classes.amount}>${raisedAmount.toLocaleString()}</Text>
                    <Text className={classes.goal}>of ${goalAmount.toLocaleString()}</Text>
                </div>
                <Progress
                    color="yellow"
                    radius="md"
                    size="md"
                    value={progressPercentage}
                    animated
                />
                <Divider my="md"/>
                <div className={classes.box}>
                    <Text className={classes.investors}>{totalInvestors.toLocaleString()}</Text>
                    <Text className={classes.normalText}>Investors</Text>
                </div>
                <Divider my="md"/>
                <div className={classes.box}>
                    <Text className={classes.normalText}>Tags: {category}</Text>
                </div>
                <Divider my="md"/>
                <div className={classes.badge}>
                    <Badge color="yellow" size="24px">{daysLeft} days left</Badge>
                </div>

                    {isInvestor || isBusiness ? (
                        <InvestmentModal
                            campaignId={campaignId}
                            stockPrice={stockPrice}
                            campaignName={campaignName}
                            minInvest={minInvest}
                        />
                    ) : (
                        <Button
                            size="lg"
                            rightSection={<LuChevronRightCircle size={25}/>}
                            variant="outline"
                            color="yellow"
                            radius="20"
                            onClick={() => (window.location.href = '/enroll/investor')}
                        >
                            Enroll as Investor
                        </Button>
                    )}
            </Stack>
        </Container>
);
};
