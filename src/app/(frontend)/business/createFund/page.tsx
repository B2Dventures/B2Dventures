"use client";

import React, { useState } from "react";
import {
    Container,
    TextInput,
    Textarea,
    NumberInput,
    Button,
    Group,
    Text,
    TagsInput
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { Header } from "@/components/Header/Header";
import { notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { useRouter } from "next/navigation";
import { UploadMultiple } from "@/components/Upload/Upload";
import classes from "./campaignCreate.module.css"

export default function CampaignForm() {
    const [form, setForm] = useState({
        title: "",
        description: "",
        goal: undefined as number | undefined,
        minimumInvest: undefined as number | undefined,
        category: [] as string[],
        startDate: null as Date | null,
        endDate: null as Date | null,
        highlight: "",
        product: "",
        opportunity: "",
        images: [] as string[],
    });

    const router = useRouter();

    const handleInputChange = (field: string, value: any) => {
        setForm((prev) => {
            const updatedForm = { ...prev, [field]: value };

            // Validation for endDate being after startDate
            if (field === "endDate" && updatedForm.startDate && value) {
                if (new Date(value) <= new Date(updatedForm.startDate)) {
                    notifications.show({
                        title: "Invalid End Date",
                        message: "End date must be after the start date.",
                        color: "red",
                    });
                    return prev; // Don't update the form
                }
            }
            return updatedForm;
        });
    };

    const handleUploadComplete = (urls: string[]) => {
        setForm((prev) => ({
            ...prev,
            images: [...prev.images, ...urls],
        }));
    };

    const handleRemoveImage = (index: number) => {
        setForm((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch("/api/campaign/createFund", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const result = await response.json();

            if (response.ok) {
                notifications.show({
                    title: "Campaign Created!",
                    message: "Your campaign has been submitted and is awaiting approval.",
                    color: "green",
                });

                setTimeout(() => {
                    router.push("/business");
                }, 750);
            } else {
                notifications.show({
                    title: "Error",
                    message: result.error || "An error occurred while creating the campaign.",
                    color: "red",
                });
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            notifications.show({
                title: "Error",
                message: "Failed to submit campaign.",
                color: "red",
            });
        }
    };

    return (
        <main>
            <Header />
            <Container size="md" my="xl">
                <Text size="xl" mb="md">
                    Create your Campaign
                </Text>

                <TextInput
                    label="Title"
                    placeholder="Enter the title of your campaign"
                    value={form.title}
                    onChange={(event) => handleInputChange("title", event.currentTarget.value)}
                    required
                />

                <Textarea
                    label="Description"
                    placeholder="Short detail to describe your campaign this section will show in the browsing page!"
                    value={form.description}
                    onChange={(event) => handleInputChange("description", event.currentTarget.value)}
                    minRows={4}
                    required
                    mt="md"
                />

                <NumberInput
                    label="Goal"
                    placeholder="Enter the goal amount of your fund in USD"
                    value={form.goal}
                    onChange={(value) => handleInputChange("goal", value)}
                    required
                    mt="md"
                />

                <NumberInput
                    label="Minimum Investment"
                    placeholder="Enter the minimum amount of your campaign"
                    value={form.minimumInvest}
                    onChange={(value) => handleInputChange("minimumInvest", value)}
                    required
                    mt="md"
                />

                <TagsInput
                    label="Category"
                    placeholder="Select a category for your campaign"
                    data={["Technology", "Health", "Education", "Environment", "Game", "Food"]}
                    value={form.category}
                    onChange={(value) => handleInputChange("category", value)}
                    required
                    mt="md"
                    acceptValueOnBlur
                />

                <Group mt="md" grow>
                    <DateTimePicker
                        clearable
                        defaultValue={new Date()}
                        value={form.startDate}
                        onChange={(value) => handleInputChange("startDate", value)}
                        label="Start date"
                        placeholder="Enter your start date"
                        minDate={new Date()}
                    />
                    <DateTimePicker
                        clearable
                        defaultValue={new Date()}
                        value={form.endDate}
                        onChange={(value) => handleInputChange("endDate", value)}
                        label="End date"
                        placeholder="Enter your end date"
                        minDate={form.startDate || new Date()} // Ensure endDate is after startDate
                    />
                </Group>
                <Text>Image about your campaign (Recommened size: 170x300)</Text>
                {form.images.length > 0 ? (
                    <div>
                        <Text size="sm" mt="md">
                            Uploaded Images:
                        </Text>
                        <>
                            {form.images.map((url, index) => (
                                <div className={classes.imageWrapper} key={index}>
                                    <img
                                        className={classes.uploadedImage}
                                        src={url}
                                        alt={`Uploaded ${index + 1}`}

                                    />
                                    <button
                                        className={classes.deleteButton}
                                        onClick={() => handleRemoveImage(index)}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </>
                    </div>
                ) :
                    <UploadMultiple onUploadComplete={handleUploadComplete} />
                }

                <Textarea
                    label="Highlight"
                    placeholder="Describe the highlights of your campaign"
                    value={form.highlight}
                    onChange={(event) => handleInputChange("highlight", event.currentTarget.value)}
                    styles={{ input: { height: 150 } }}
                    required
                    mt="md"
                />

                <Textarea
                    label="Product"
                    placeholder="Describe your product"
                    value={form.product}
                    onChange={(event) => handleInputChange("product", event.currentTarget.value)}
                    styles={{ input: { height: 150 } }}
                    required
                    mt="md"
                />

                <Textarea
                    label="Opportunity"
                    placeholder="Describe the opportunity"
                    value={form.opportunity}
                    onChange={(event) => handleInputChange("opportunity", event.currentTarget.value)}
                    styles={{ input: { height: 150 } }}
                    required
                    mt="md"
                />

                <Group mt="xl">
                    <Button color="green" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Group>
            </Container>
        </main>
    );
}
