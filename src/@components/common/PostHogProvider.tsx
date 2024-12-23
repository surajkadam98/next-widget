import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "";
const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "";
const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID ?? "";

if (typeof window !== "undefined" && POSTHOG_KEY) {
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: "identified_only",
    capture_pageview: true,
    loaded: (posthog) => {
      posthog.register({ project: PROJECT_ID });
    },
  });
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return <PHProvider client={posthog}>{children}</PHProvider>;
}
