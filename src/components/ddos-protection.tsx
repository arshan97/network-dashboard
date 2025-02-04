"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DdosProtection } from "../types/dns";
import { StatusBadge } from "./status-badge";

interface DdosProtectionProps {
  services: DdosProtection[];
  setServices: (services: DdosProtection[]) => void;
  onToggle: (service: DdosProtection) => Promise<void>;
}

export function DdosProtection({
  services,
  setServices,
  onToggle,
}: DdosProtectionProps) {
  const [selectedService, setSelectedService] = useState<DdosProtection | null>(
    null
  );
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleToggle = async () => {
    if (selectedService) {
      await onToggle(selectedService);
      setServices(
        services.map((service) =>
          service.name === selectedService.name
            ? { ...service, enabled: !service.enabled }
            : service
        )
      );
      setIsConfirmOpen(false);
      setSelectedService(null);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>DBS's DNS DDoS Protection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {services.map((service) => (
            <div
              key={service.name}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="flex items-center gap-4">
                <StatusBadge status={service.status} />
                <div>
                  <p className="text-sm font-medium">{service.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {service.provider}
                  </p>
                </div>
              </div>
              <Button
                variant={service.enabled ? "destructive" : "default"}
                onClick={() => {
                  setSelectedService(service);
                  setIsConfirmOpen(true);
                }}
              >
                {service.enabled ? "Disable" : "Enable"}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {selectedService?.enabled ? "Disable" : "Enable"}{" "}
              {selectedService?.name}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will {selectedService?.enabled ? "disable" : "enable"} DDoS
              protection for this service. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleToggle}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
