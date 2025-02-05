"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./status-badge";
import type { CdnService, ActiveCdn } from "@/types/dns";
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

interface L7CdnProps {
  cdnServices: CdnService[];
  activeCdn: ActiveCdn[];
  onFlipService: (
    service: CdnService,
    newProvider: "Akamai" | "Cloudflare"
  ) => Promise<void>;
}

export function L7Cdn({ cdnServices, activeCdn, onFlipService }: L7CdnProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<CdnService | null>(
    null
  );
  const [newProvider, setNewProvider] = useState<
    "Akamai" | "Cloudflare" | null
  >(null);

  const handleFlip = async () => {
    if (selectedService && newProvider) {
      await onFlipService(selectedService, newProvider);
      setIsConfirmOpen(false);
      setSelectedService(null);
      setNewProvider(null);
    }
  };

  return (
    <>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>L7 CDN Services</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {["Akamai", "Cloudflare"].map((provider) => (
              <div key={provider} className="space-y-4">
                <h3 className="font-semibold">{provider}</h3>
                {cdnServices
                  .filter((service) => service.provider === provider)
                  .map((service) => (
                    <div
                      key={service.name}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="flex items-center gap-2">
                        <StatusBadge status={service.status} />
                        <span>{service.name}</span>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedService(service);
                          setNewProvider(
                            service.provider === "Akamai"
                              ? "Cloudflare"
                              : "Akamai"
                          );
                          setIsConfirmOpen(true);
                        }}
                      >
                        Flip to{" "}
                        {service.provider === "Akamai"
                          ? "Cloudflare"
                          : "Akamai"}
                      </Button>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active CDN</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeCdn.map((cdn) => (
              <div
                key={cdn.name}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex items-center gap-2">
                  <StatusBadge status={cdn.status} />
                  <span>{cdn.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {cdn.provider}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Flip {selectedService?.name} to {newProvider}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action will change the CDN provider for this service. Are you
              sure you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleFlip}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
