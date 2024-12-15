import React, { useState } from 'react';
import { Modal, Button, TextInput, Group, Box } from '@mantine/core';
import {notifications} from "@mantine/notifications";
import {LuChevronRightCircle} from "react-icons/lu";


import {InvestmentQuery} from "types/models";

interface InvestmentModalProps {
    stockPrice: number;
    campaignId: string;
    campaignName: string;
    minInvest: number;
}

export default function InvestmentModal({ stockPrice, campaignId, campaignName, minInvest }: InvestmentModalProps) {
    const [opened, setOpened] = useState(false);
    const [formData, setFormData] = useState({
        money: '',
        stocks: '',
    });
    const minPrice = minInvest * stockPrice;

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        // Update money and stocks dynamically based on the input field
        if (!/^\d+$/.test(value)) {
            setFormData({
                ...formData,
                stocks: value,
                money: "stock value must be a number",
            });
        } else {
            const result = (Number(value) * stockPrice || 0)
            if (result < minPrice) {
                setFormData({
                    ...formData,
                    stocks: minInvest.toFixed(0),
                    money: minPrice.toFixed(2),
                });

            }
            else {
                setFormData({
                    ...formData,
                    stocks: value,
                    money: result.toFixed(2),
                });
            }

        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const payload: InvestmentQuery = {
                campaignId: campaignId,
                amount: Number(formData.money),
                stockUnit: Number(formData.money)/stockPrice,
            }
            const response = await fetch('/api/investment', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload),
            });
            if (response.ok) {
                console.log(response);
            }
            console.log(response);

        } catch (error) {
            console.log(error);

        }
        setOpened(false);
    };

    return (
        <>
            <Button
                size="lg"
                rightSection={<LuChevronRightCircle size={25} />}
                variant="outline"
                color="yellow"
                radius="20"
                onClick={() => setOpened(true)}
            >
                Invest in {campaignName}
            </Button>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Investment Form"
                centered
            >
                <form onSubmit={handleSubmit}>
                    <Box>
                        {/* Stock Input */}
                        <TextInput
                            label={`Number of Stocks (Min Investment: ${minInvest})`}
                            name="stocks"
                            placeholder="Enter number of stocks"
                            value={formData.stocks}
                            onChange={handleInputChange}
                            required
                            mt="sm"
                        />

                        {/* Money Input */}
                        <TextInput
                            label="Investment Amount (in $)"
                            name="money"
                            value={formData.money}
                            disabled
                        />

                        {/* Stock Price Display */}
                        <TextInput
                            label="Current Stock Price"
                            value={`$${stockPrice}`}
                            disabled
                            mt="sm"
                        />
                    </Box>

                    {/* Submit Button */}
                    <Group mt="md">
                        <Button type="submit"
                                onClick={() =>
                                    notifications.show({
                                        title: "investment Form",
                                        message: "Request accepted",
                                    })}
                        >Request to Invest</Button>
                    </Group>
                </form>
            </Modal>
        </>
    );
}
