import React from 'react';
import {Header} from '@/components/Header/Header';
import { InvestmentInfo } from '@/components/InvestmentInfo/InvestmentInfo';
import {Gallery} from '@/components/Gallery/Gallery';
import {Container, Flex, Grid} from "@mantine/core";



const CampaignPage = ({ params }: { params: { id: string } }) => {
    const { id } = params;

    const images = [
        '/1.ico',
        '/2.ico',
        '/3.ico'
    ];

    const highlights = [
        'Largest platform for fractional investment in real estate.',
        'Forbes Fintech 50 List for 2024',
        'Investment options starting at $10'
    ];

    return (
        <main>
            <Header/>
            <Container size={1250}>
            <div>
                <Flex>
                    <Gallery images={images}/>
                    <InvestmentInfo raisedAmount={772172} totalInvestors={331} daysLeft={50}/>
                </Flex>

            </div>
            <div>
                <h1>Description</h1>
            </div>
            </Container>
        </main>
    );
};

export default CampaignPage;
