"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { createChalls } from "./action";
import { formSchema } from "./schema";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

export function ChallForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await createChalls(values);
    if ("error" in result) {
      console.error("Validation errors:", result.details);
    } else {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {[
          "name",
          "description",
          "category",
          "author",
          "flag",
          "dynamicImage",
          "dynamicType",
        ].map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={
              field as
                | "name"
                | "description"
                | "category"
                | "author"
                | "flag"
                | "dynamicImage"
                | "dynamicType"
            }
            render={({ field }) => (
              <FormItem>
                <FormLabel>{field.name}</FormLabel>
                <FormControl>
                  <Input placeholder={field.name} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {["tiebreakEligible", "dynamic"].map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field as "tiebreakEligible" | "dynamic"}
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    {field.name === "tiebreakEligible"
                      ? "Tiebreak Eligible"
                      : "Dynamic Challenge"}
                  </FormLabel>
                  <FormDescription>
                    You can manage your mobile notifications in the{" "}
                    <Link href="/examples/forms">mobile settings</Link> page.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        ))}

        {["sortWeight", "minPoints", "maxPoints"].map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field as "sortWeight" | "minPoints" | "maxPoints"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{field.name}</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
