"use client";

import { useState } from "react";
import { ServiceGrid } from "./components/service-grid";
import { DdosProtection } from "./components/ddos-protection";
import { DnsRecords } from "./components/dns-records";

// Sample data - replace with your actual data fetching logic
const providers = [
  {
    name: "SingTel",
    services: [
      {
        name: "Internet Banking",
        code: "IBSB",
        status: "healthy",
      },
      {
        name: "Mobile Banking",
        code: "MBS",
        status: "healthy",
      },
      // Add more services...
    ],
  },
  // Add more providers...
];

const dnsRecords = [
  {
    name: "Internet Banking",
    code: "IB88",
    status: "healthy",
  },
  {
    name: "Mobile Banking",
    code: "MIBS",
    status: "healthy",
  },
  {
    name: "Paylah",
    code: "P2P-SG",
    status: "healthy",
  },
  {
    name: "iWealth",
    code: "IWSM",
    status: "healthy",
  },
  {
    name: "IDEAL",
    code: "IDEAL DNS",
    status: "healthy",
  },
  {
    name: "IDEAL Mobile",
    code: "IDEAL Mobile DNS",
    status: "healthy",
  },
];

const initialDdosServices = [
  {
    name: "StarHub",
    provider: "StarHub DNS Sec",
    enabled: true,
    status: "healthy",
  },
  {
    name: "Akamai",
    provider: "Akamai DNS Sec",
    enabled: true,
    status: "healthy",
  },
  {
    name: "Nexus Guard",
    provider: "NexusGuard DNS",
    enabled: false,
    status: "warning",
  },
];

export default function App() {
  const [ddosServices, setDdosServices] = useState(initialDdosServices);

  const handleToggleService = async (service: {
    name: string;
    enabled: boolean;
  }) => {
    // Implement your toggle logic here
    const updatedServices = ddosServices.map((s) =>
      s.name === service.name ? { ...s, enabled: !s.enabled } : s
    );
    setDdosServices(updatedServices);
  };

  return (
    <div className="container space-y-8 py-8 mx-auto">
      {/* <ServiceGrid providers={providers} /> */}
      <div className="grid gap-8 md:grid-cols-2">
        <DnsRecords records={dnsRecords} />
        <DdosProtection
          services={ddosServices}
          setServices={setDdosServices}
          onToggle={handleToggleService}
        />
      </div>
    </div>
  );
}
