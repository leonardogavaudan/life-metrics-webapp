export enum IntegrationStatus {
  Available = "available",
  Connected = "connected",
  ComingSoon = "coming_soon",
}

export interface Integration {
  id: string | null;
  provider: string;
  name: string;
  description: string;
  status: IntegrationStatus;
}

export interface IntegrationsResponse {
  integrations: Integration[];
}
