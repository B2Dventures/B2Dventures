import React from 'react';
import {Header} from '@/components/Header/Header';
import { InvestmentInfo } from '@/components/InvestmentInfo/InvestmentInfo';
import {Gallery} from '@/components/Gallery/Gallery';
import {Container, Flex, Grid} from "@mantine/core";
import Description from "@/components/Description/Description";



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
                </div>
                <div>
                    <Flex>
                        <Gallery images={images}/>
                        <InvestmentInfo raisedAmount={123456} goalAmount={200000} totalInvestors={1234} daysLeft={50} campaignName={"B2D Ventures"}/>
                    </Flex>

                </div>
                <Flex>
                    <Description  id={id}/>
                </Flex>
            </Container>
        </main>
    );
};

export default CampaignPage;
