'use client'

import { AdminHeader } from "@/components/Header/AdminHeader";
import { useState, useEffect } from 'react';
import React from "react";
import { baiSemiBold } from "@/app/(frontend)/styles/fonts";
import classes from "@/app/(frontend)/admin/business/business_list.module.css";
import { BusinessRequestDetail } from "@/components/RequestDetails/BusinessRequestDetail";
import {Loader, Stack} from "@mantine/core";

export default function BusinessRequestPage({ params }: { params: { id: string } }) {
    const [businessData, setBusinessData] = useState<any>(null);

    useEffect(() => {
        const fetchBusinessData = async () => {
            const response = await fetch(`/api/admin/business/${params.id}`);
            const data = await response.json();
            setBusinessData(data);
        };

        fetchBusinessData();
    }, [params.id]);

    if (!businessData) {
        return (
            <Stack align="center" justify="flex-start" gap="sm" className={classes.stack}>
                <Loader color="goldenrod" type="dots" />
            </Stack>
        );
    }

    return (
        <main>
            <AdminHeader />
            <main className={baiSemiBold.className}>
                <h1 className={classes.topic}>Business Detail</h1>
            </main>
            {businessData ? (
                <BusinessRequestDetail business={businessData} />
            ) : (
                <div>Failed to load business details</div>
            )}
        </main>
    );
}
