'use client'

import { InvestorRequestDetail } from "@/components/RequestDetails/InvestorRequestDetail";
import {AdminHeader} from "@/components/Header/AdminHeader";
import { useState, useEffect } from 'react';
import {baiSemiBold} from "@/app/(frontend)/styles/fonts";
import classes from "@/app/(frontend)/admin/business/business_list.module.css";
import React from "react";

export default function InvestorRequestPage({ params }: { params: { id: string } }) {
    const [investorData, setInvestorData] = useState<any>(null);

    useEffect(() => {
        const fetchInvestorData = async () => {
            const response = await fetch(`/api/admin/investor/${params.id}`);
            const data = await response.json();
            setInvestorData(data);
        };

        fetchInvestorData()
    }, [params.id]);

    if (!investorData) {
        return <div>Loading...</div>;
    }
    return (
        <main>
            <AdminHeader/>
            <main className={baiSemiBold.className}>
                <h1 className={classes.topic}>Investor Detail</h1>
            </main>
            <InvestorRequestDetail investor={investorData} />
        </main>
    );
}
