import React, { useState } from 'react';
import { Modal, Button, TextInput, Group, Box } from '@mantine/core';
import {InvestmentQuery} from "@/utils/types";
import {notifications} from "@mantine/notifications";

interface InvestmentModalProps {
    stockPrice: number; // Pass the current stock price as a prop
    campaignId: number;
}

export default function InvestmentModal({ stockPrice, campaignId }: InvestmentModalProps) {
    const [opened, setOpened] = useState(false);
    const [formData, setFormData] = useState({
        money: '',
        stocks: '',
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        // Update money and stocks dynamically based on the input field
        if (name === 'money') {
            setFormData({
                ...formData,
                money: value,
                stocks: (parseFloat(value) / stockPrice || 0).toFixed(2),
            });
        } else if (name === 'stocks') {
            setFormData({
                ...formData,
                stocks: value,
                money: (parseFloat(value) * stockPrice || 0).toFixed(2),
            });
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const payload: InvestmentQuery = {
                campaignId: campaignId,
                amount: Number(formData.money),
            }
            const response = await fetch('/api/investment/invest', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload),
            });
            if (response.ok) {
                console.log(response);
            }

        } catch (error) {

        }
        setOpened(false);
    };

    return (
        <>
            <Button onClick={() => setOpened(true)}>Invest Now</Button>

            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Investment Form"
                centered
            >
                <form onSubmit={handleSubmit}>
                    <Box>
                        {/* Money Input */}
                        <TextInput
                            label="Investment Amount (in $)"
                            name="money"
                            placeholder="Enter amount of money"
                            value={formData.money}
                            onChange={handleInputChange}
                            required
                        />

                        {/* Stock Input */}
                        <TextInput
                            label="Number of Stocks"
                            name="stocks"
                            placeholder="Enter number of stocks"
                            value={formData.stocks}
                            onChange={handleInputChange}
                            required
                            mt="sm"
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
                        <Button type="submit">Request to Invest</Button>
                    </Group>
                </form>
            </Modal>
        </>
    );
}
