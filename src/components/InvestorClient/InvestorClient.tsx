'use client';

import { Grid, Text, Container } from '@mantine/core';
import { baiSemiBold } from '@/app/(frontend)/styles/fonts';
import classes from './InvestorClient.module.css';
import { FundraisingCard } from '@/components/FundraisingCard/FundraisingCard';

interface Business {
  id: number;
  name: string;
  description: string;
  images: string | string[];
  totalInvestment: number;
  investors: number;
  price?: number;
}

interface InvestorClientComponentProps {
  businesses: Business[];
}

const InvestorClient = ({ businesses }: InvestorClientComponentProps) => {
  return (
      <Container fluid className={classes.campaign}>
          <Grid gutter={100} justify="center">
              {businesses.map((business) => {
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
                              totalInvestment={(business.totalInvestment ? business.totalInvestment.toString() : "0")}
                              investors={business.investors.toString()}
                              id={business.id}
                          />
                      </Grid.Col>
                  );
              })}
          </Grid>
      </Container>
  );
}

export default InvestorClient;
