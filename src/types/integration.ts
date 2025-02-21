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
