// VLY Integrations Configuration
// See /integrations.md for usage documentation

import { createVlyIntegrations } from "@vly-ai/integrations";

export const vly = createVlyIntegrations({
  deploymentToken:
    import.meta.env.VITE_VLY_INTEGRATION_KEY ||
    import.meta.env.VITE_VLY_DEPLOYMENT_TOKEN ||
    "",
  debug: import.meta.env.MODE === "development",
});

if (!import.meta.env.VITE_VLY_INTEGRATION_KEY) {
  console.warn(
    "[VLY] VITE_VLY_INTEGRATION_KEY not configured - VLY features will be disabled. Check your .env file.",
  );
}
