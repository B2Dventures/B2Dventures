'use client';

import React from 'react';
import { Container, Text, Stack, Button, Divider, Flex, Image, Avatar } from '@mantine/core';
import classes from './RequestDetail.module.css';

// model Business {
//     business_name      String        @unique
//     founder_first_name String
//     founder_last_name  String
//     market_cap         Int
//     company_address    String
//     business_detail    String
//     industry           String
//     logo               String //URL IMG LINK
//     license            String //URL IMG LINK
//     registration_cer   String //URL IMG LINK
// }

export function BusinessRequestDetail() {
    return (
        <Container className={classes.container}>
            <Image
                radius="md"
                height="auto"
                width="50%"
                fit="cover"
                src="/business-certificate-ex.png"
                className={classes.image}
            />
            <Stack gap="md" align="stretch" className={classes.stack}>
                <div className={classes.logo}>
                    <Avatar src="/logo.ico" radius="sm" size='120px'/>
                </div>
                <div className={classes.box}>
                    <Text className={classes.topic}>Business Information</Text>
                    <Text className={classes.normalText}><strong>Business Name:</strong> ABC Company</Text>
                    <Text className={classes.normalText}><strong>Founder Name:</strong> Firstname Lastname</Text>
                    <Text className={classes.normalText}><strong>Industry:</strong> Health</Text>
                    <Text className={classes.normalText}><strong>Description:</strong> Healthcare Solutions</Text>
                    <Text className={classes.normalText}><strong>Market Cap:</strong> $ 100,000</Text>
                </div>
                <Divider my="md" />
                <div className={classes.box}>
                    <Text className={classes.topic}>Contact</Text>
                    <Text className={classes.normalText}><strong>Address:</strong> Bangkok, Thailand</Text>
                    <Text className={classes.normalText}><strong>Email:</strong> ABC@abc.com</Text>
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
