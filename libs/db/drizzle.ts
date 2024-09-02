import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

import * as authSchema from "./schema/auth";
import * as etcSchema from "./schema/etc";
import * as challengesSchema from "./schema/challenges";

const schema = {
  ...authSchema,
  ...etcSchema,
  ...challengesSchema,
};

const client = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN!,
});

const db = drizzle(client, { schema });
export default db;
