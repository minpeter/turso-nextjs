import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  EnvelopeOpenIcon,
  Link2Icon,
  AvatarIcon,
  RocketIcon,
  BackpackIcon,
} from "@radix-ui/react-icons";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DataTableDemo } from "./solveTable";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();

  return (
    <div className="w-full md:w-auto flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>{session?.user?.name ?? "(user name)"}</CardTitle>
          <CardDescription>
            This will change the way your name appears on the scoreboard. You
            can change it once every 10 minutes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-1">
              <RocketIcon className="h-5 w-5 mr-2" /> No points earned
            </div>
            <div className="flex items-center gap-1">
              <BackpackIcon className="h-5 w-5 mr-2" /> Unranked
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Update Information</CardTitle>
          <CardDescription>
            This will change the way your name appears on the scoreboard. You
            can change it once every 10 minutes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-1">
              <Label htmlFor="name">
                <AvatarIcon className="h-5 w-5 mr-2" />
              </Label>
              <Input
                id="name"
                value={session?.user?.name ?? "(user name)"}
                className="col-span-3"
              />
            </div>
            <div className="flex items-center gap-1">
              <Label htmlFor="email">
                <EnvelopeOpenIcon className="h-5 w-5 mr-2" />
              </Label>
              <Input
                id="email"
                value={session?.user?.email ?? "(user email)"}
                className="col-span-3"
              />
            </div>
            <div className="flex items-center gap-1">
              <Label htmlFor="link">
                <Link2Icon className="h-5 w-5 mr-2" />
              </Label>
              <Input
                id="link"
                value="https://test.com"
                className="col-span-3"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Update</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Solves</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTableDemo />
        </CardContent>
      </Card>
    </div>
  );
}
