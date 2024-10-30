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
      <Grid gutter={100}>
        {businesses.map(business => (
          <Grid.Col key={business.id} span={4}>
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

