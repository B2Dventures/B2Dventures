import React from 'react';
import { Text } from '@mantine/core';
import classes from "./Description.module.css";
import { arimoRegular, baiBold } from "@/app/(frontend)/styles/fonts";

interface DescriptionProps {
    highlight: string;
    product: string;
    opportunity: string;
}

const Description: React.FC<DescriptionProps> = ({ highlight, product, opportunity }) => {
    return (
        <div>
            <main className={baiBold.className}>
                <Text
                    fw={1000}
                    component="span"
                    className={classes.bigtext}
                    mt="lg"
                    color="goldenrod"
                >
                    Highlight
                </Text>
            </main>
            <main className={arimoRegular.className}>
                <Text className={classes.smalltext} mb="lg" color="dimmed">
                    {highlight || 'No highlights available'}
                </Text>
            </main>
            <main className={baiBold.className}>
                <Text
                    fw={1000}
                    component="span"
                    className={classes.bigtext}
                    color="goldenrod"
                >
                    Product
                </Text>
            </main>
            <main className={arimoRegular.className}>
                <Text className={classes.smalltext} color="dimmed">
                    {product || 'No product details available'}
                </Text>
            </main>
            <main className={baiBold.className}>
                <Text
                    fw={1000}
                    component="span"
                    className={classes.bigtext}
                    color="goldenrod"
                >
                    Opportunity
                </Text>
            </main>
            <main className={arimoRegular.className}>
                <Text className={classes.smalltext} color="dimmed">
                    {opportunity || 'No opportunities available'}
                </Text>
            </main>
        </div>
    );
};

export default Description;
