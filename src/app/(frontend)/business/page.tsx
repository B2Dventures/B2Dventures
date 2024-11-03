'use client';

import { Header } from "@/components/Header/Header";
import { CampaignTable } from "@/components/CampaignTable/CampaignTable";
import { Button, Container, Divider, Group, Text } from '@mantine/core';
import classes from "./business.module.css";
import { NavItem } from "@/components/Header/NavItem/NavItem";
import { LuCheckCircle, LuDollarSign, LuUsers } from "react-icons/lu";
import { baiSemiBold } from '@/app/(frontend)/styles/fonts';
import { useEffect, useState } from "react";
import { useUser } from '@clerk/clerk-react';

interface Business {
    id: string;
    name: string;
    goal: number;
    raised: number;
    investors: number;
    status: string;
}

export default function BusinessPage() {
    const { isSignedIn, user, isLoaded } = useUser();
    const [fetchedData, setFetchedData] = useState<Business[]>(null);
    const [loading, setLoading] = useState(true);
    const role = user?.publicMetadata?.role;
    const id = user?.publicMetadata?.id;

    useEffect(() => {
        const fetchData = async () => {
            if (isSignedIn && role === "business") {
                setLoading(true); // Set loading to true before fetching
                const data = { id: id };

                const res = await fetch("http://localhost:3000/api/business", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });

                const responseData = await res.json();
                setFetchedData(responseData);
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchData(); // Call the function to fetch data
    }, [isSignedIn, role, id]); // Dependency array should include relevant dependencies

    if (!isLoaded) {
        return null; // Handle loading state
    }

    return (
        <main>
            <Header />
            <Container size={1440}>
                <main className={baiSemiBold.className}>
                    <h1 className={classes.topic}>All Campaigns list</h1>
                </main>
                <main className={classes.table}>
                    <CampaignTable data={fetchedData} loading={loading} />
                </main>
            </Container>
            <footer className={classes.footer}>
                <Container className={classes.inner} size={1440}>
                    <Group>
                        <div className={classes.box}>
                            <LuDollarSign size={50} />
                            <Text className={classes.name}>Total Fund Raised</Text>
                            <Text className={classes.number}>$ 610,724</Text>
                        </div>
                        <Divider orientation="vertical" />
                        <div className={classes.box}>
                            <LuUsers size={50} />
                            <Text className={classes.name}>Total Investors</Text>
                            <Text className={classes.number}>8,117</Text>
                        </div>
                        <Divider orientation="vertical" />
                        <div className={classes.box}>
                            <LuCheckCircle size={50} />
                            <Text className={classes.name}>Total Campaigns</Text>
                            <Text className={classes.number}>8</Text>
                        </div>
                        <Divider orientation="vertical" />
                    </Group>
                    <Group gap={20} visibleFrom="xs">
                        <Button size='md' variant="gradient" gradient={{ from: 'yellow', to: 'gold', deg: 90 }}
                            onClick={() => window.location.href = "/business/createFund"}>
                            <NavItem label="Create Fundraising" link="/business/createFund" />
                        </Button>
                    </Group>
                </Container>
            </footer>
        </main>
    );
}
