import { serve } from "inngest/next";
import { inngest } from "@/config/inngest";
import {
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdatation,
} from "@/config/innjest";
// create an API serves zero function
export const { GET, POST } = serve({
  client: inngest,
  functions: [syncUserCreation, syncUserUpdatation, syncUserDeletion],
});
