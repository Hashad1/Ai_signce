"use client";

import { GetStartedForm } from "@/components/get-started/form";
import { GetStartedHeader } from "@/components/get-started/header";
import { GetStartedFeatures } from "@/components/get-started/features";

export default function GetStartedPage() {
  return (
    <main className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-4">
        <GetStartedHeader />
        <GetStartedFeatures />
        <GetStartedForm />
      </div>
    </main>
  );
}