import React from 'react';
import {Container, Text, Group, Badge, Card, Flex} from '@mantine/core';

interface InvestmentInfoProps {
    raisedAmount: number;
    totalInvestors: number;
    daysLeft: number;
}

export const InvestmentInfo: React.FC<InvestmentInfoProps> = ({ raisedAmount, totalInvestors, daysLeft }) => {
    return (
        <Container>

            <Flex
                mih={50}
                gap="xl"
                justify="flex-start"
                align="start"
                direction="column"
                wrap="wrap"
            >
                <Text size="xl">${raisedAmount.toLocaleString()}</Text>
                <Text size="sm">{totalInvestors} Investors</Text>
                <Badge color="yellow">{daysLeft} days left to invest</Badge>
            </Flex>
        </Container>
    );
};
