'use client';

import { Grid, Container, Pagination } from '@mantine/core';
import { useState } from 'react';
import classes from './InvestorClient.module.css';
import { FundraisingCard } from '@/components/FundraisingCard/FundraisingCard';

interface InvestorClientComponentProps {
  businesses: Business[]
}

interface Business {
    id: number;
    name: string;
    description: string;
    images: string | string[];
    totalInvestment: number;
    investors: number;
    price?: number;
}

const itemsPerPage = 6;

const InvestorClient = ({ businesses }: InvestorClientComponentProps) => {
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * itemsPerPage; //Number of pages
    const selectedBusinesses = businesses.slice(startIndex, startIndex + itemsPerPage);

    const totalPages = Math.ceil(businesses.length / itemsPerPage);

    return (
        <Container fluid className={classes.campaign}>
            <Grid gutter={100}>
                {selectedBusinesses.map((business) => {
                    const firstImage = Array.isArray(business.images)
                        ? business.images[0]
                        : business.images.split(',')[0];

                    return (
                        <Grid.Col
                            key={business.id}
                            span={businesses.length === 1 ? 12 : businesses.length === 2 ? 6 : 4}
                        >
                            <FundraisingCard
                                title={business.name}
                                description={business.description}
                                imageUrl={firstImage}
                                totalInvestment={(business.totalInvestment ? business.totalInvestment : 0)}
                                investors={business.investors}
                                id={business.id}
                            />
                        </Grid.Col>
                    );
                })}
            </Grid>

            <Pagination
                className={classes.paginator}
                onChange={setCurrentPage}
                total={totalPages}
                color="gold"
                radius="md"
                size="sm"
                withEdges
            />
        </Container>
    );
}

export default InvestorClient;
