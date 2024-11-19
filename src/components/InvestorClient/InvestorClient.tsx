'use client';

import { Grid, Container } from '@mantine/core';
import classes from './InvestorClient.module.css';
import { FundraisingCard } from '@/components/FundraisingCard/FundraisingCard';
import { Business } from "@/utils/types"


interface InvestorClientComponentProps {
  businesses: Business[]
}

const InvestorClient = ({ businesses }: InvestorClientComponentProps) => {
  return (
      <Container fluid className={classes.campaign}>
          <Grid gutter={100} justify="center">
              {businesses.map((business) => {
                  const firstImage = Array.isArray(business.image)
                      ? business.image[0]
                      : business.image.split(',')[0];

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
      </Container>
  );
}

export default InvestorClient;
