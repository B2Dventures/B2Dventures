import React from 'react';
import {Container, Text, Group, Badge, Stack, Button} from '@mantine/core';
import classes from './InvestmentInfo.module.css';
import {LuChevronRightCircle} from "react-icons/lu";
import {NavItem} from "@/components/Header/NavItem/NavItem";

interface InvestmentInfoProps {
    raisedAmount: number;
    goalAmount: number;
    totalInvestors: number;
    daysLeft: number;
    campaignName: string;
}

export const InvestmentInfo: React.FC<InvestmentInfoProps> = ({ raisedAmount, goalAmount, totalInvestors, daysLeft, campaignName }) => {
    return (
        <Container className={classes.container}>
            <Stack gap="sm" align="stretch">
                <div className={classes.box}>
                    <Text className={classes.amount}>${raisedAmount.toLocaleString()}</Text>
                    <Text className={classes.goal}>of ${goalAmount.toLocaleString()}</Text>
                </div>
                <div className={classes.box}>
                    <Text className={classes.investors}>{totalInvestors.toLocaleString()}</Text>
                    <Text className={classes.normalText}>Investors</Text>
                </div>
                <div className={classes.badge}>
                    <Badge color="yellow" size='24px'>{daysLeft} days left</Badge>
                </div>
                <div>
                    <Button size='lg' rightSection={<LuChevronRightCircle size={25}/>}
                            variant="outline" color='yellow' radius='20'>
                        Invest in {campaignName}
                    </Button>
                </div>
            </Stack>
        </Container>
    );
};
