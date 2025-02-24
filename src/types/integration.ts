export enum IntegrationStatus {
  Available = "available",
  Connected = "connected",
  ComingSoon = "coming_soon",
}

interface BaseIntegration {
  provider: string;
  name: string;
  description: string;
}

interface ConnectedIntegration extends BaseIntegration {
  status: IntegrationStatus.Connected;
  id: string;
}

interface AvailableIntegration extends BaseIntegration {
  status: IntegrationStatus.Available;
  id: null;
}

interface ComingSoonIntegration extends BaseIntegration {
  status: IntegrationStatus.ComingSoon;
  id: null;
}

export type Integration =
  | ConnectedIntegration
  | AvailableIntegration
  | ComingSoonIntegration;

export interface IntegrationsResponse {
  integrations: Integration[];
}

export const Providers = {
  Oura: "oura",
  Whoop: "whoop",
  Fitbit: "fitbit",
  AppleHealth: "apple_health",
  Garmin: "garmin",
  Coros: "coros",
} as const;
export type Provider = (typeof Providers)[keyof typeof Providers];

export const ProvidersToDisplayNames = {
  oura: "Oura",
  whoop: "Whoop",
  fitbit: "Fitbit",
  apple_health: "Apple Health",
  garmin: "Garmin",
  coros: "Coros",
} as const;
