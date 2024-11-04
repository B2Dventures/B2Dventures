'use client';

import { Grid, Text, Container } from '@mantine/core';
import { baiSemiBold } from '@/app/(frontend)/styles/fonts';
import classes from './InvestorClient.module.css';
import {FundraisingCard} from '@/components/FundraisingCard/FundraisingCard';

interface Business {
  id: number;
  name: string;
  description: string;
  image: string;
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
              {businesses.map((business, index) => (
                  <Grid.Col
                      key={business.id}
                      span={businesses.length === 1 ? 6 : businesses.length === 2 ? 6 : 4}
                  >
                      <FundraisingCard
                          title={business.name}
                          description={business.description}
                          imageUrl={'/boxing_club.jpg'}
                          totalInvestment={(business.totalInvestment ? business.totalInvestment.toString() : "0")}
                          investors={business.investors.toString()}
                          id={business.id}
                      />
                  </Grid.Col>
              ))}
          </Grid>
      </Container>
  );
}

export default InvestorClient;

