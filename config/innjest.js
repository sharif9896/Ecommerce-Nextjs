import { Inngest } from "inngest";
import { serve } from "inngest/next";
import connecrDB from "./db";
import User from "@/models/usermodel";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });

// inngest function to save user data
export const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
  },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      image_url: image_url,
    };
    await connecrDB();
    await User.create(userData);
  }
);

// inngest function to update user data
export const syncUserUpdatation = inngest.createFunction(
  {
    id: "update-user-from-clerk",
  },
  { event: "clerk/user.updated" },

  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      image_url: image_url,
    };
    await connecrDB();
    await User.findByIdAndUpdate(id, userData);
  }
);

// inngest function to delete user data
export const syncUserDeletion = inngest.createFunction(
  {
    id: "delete-user-from-clerk",
  },
  { event: "clerk/user.deleted" },

  async ({ event }) => {
    const { id } = event.data;
    await connecrDB();
    await User.findByIdAndDelete(id);
  }
);

