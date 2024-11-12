import React from 'react';
import { Container, Text, Stack, Button, Divider, Flex, Image, Avatar } from '@mantine/core';
import classes from './RequestDetail.module.css';

export function BusinessRequestDetail({ business }: { business: any }) {
    return (
        <Container className={classes.container}>
            <Image
                radius="md"
                height="auto"
                width="50%"
                fit="cover"
                src={business.license || "/business-certificate-ex.png"}
                className={classes.image}
            />
            <Stack gap="md" align="stretch" className={classes.stack}>
                <div className={classes.logo}>
                    <Avatar src="/logo.ico" radius="sm" size='120px'/>
                </div>
                <div className={classes.box}>
                    <Text className={classes.topic}>Business Information</Text>
                    <Text className={classes.normalText}><strong>Business Name:</strong> {business.business_name}</Text>
                    <Text className={classes.normalText}><strong>Founder Name:</strong> {business.founder_first_name} {business.founder_last_name}</Text>
                    <Text className={classes.normalText}><strong>Industry:</strong> {business.industry}</Text>
                    <Text className={classes.normalText}><strong>Description:</strong> {business.business_detail}</Text>
                    <Text className={classes.normalText}><strong>Market Cap:</strong> $ {business.market_cap}</Text>
                </div>
                <Divider my="md" />
                <div className={classes.box}>
                    <Text className={classes.topic}>Contact</Text>
                    <Text className={classes.normalText}><strong>Address:</strong> {business.company_address}</Text>
                    <Text className={classes.normalText}><strong>Email:</strong> {business.user.email}</Text>
                </div>
                <Divider my="md" />
                <div className={classes.buttonContainer}>
                    <Button size="lg" color="green" radius="20" className={classes.button}>
                        Approve
                    </Button>
                    <Button size="lg" color="red" radius="20" className={classes.button}>
                        Reject
                    </Button>
                </div>
            </Stack>
        </Container>
    );
}
