'use client';

import {Header} from "@/components/Header/Header";
import { CampaignTable } from "@/components/CampaignTable/CampaignTable";
import { Container } from '@mantine/core';


export default function Home() {
    return (
        <main>
            <Header/>
            <Container size={1440}>
                <CampaignTable/>
            </Container>
        </main>
    );
}
