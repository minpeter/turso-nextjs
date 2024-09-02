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
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";

export function ChallForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      minPoints: 100,
      maxPoints: 500,
      dynamic: false,
      tiebreakEligible: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await createChalls(values);
    if ("error" in result) {
      console.error("Validation errors:", result.details);
    } else {
      form.reset();
      form.clearErrors();
      form.unregister();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["name", "category", "author", "flag"].map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as "name" | "category" | "author" | "flag"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {field.name} <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={field.name} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type your challenge description here."
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {["tiebreakEligible"].map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as "tiebreakEligible"}
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

          <div className="flex flex-col  rounded-lg border p-4 gap-6 shadow-sm">
            <div className="flex flex-row items-center justify-between">
              <div className="space-y-0.5">
                <FormLabel>Dynamic container</FormLabel>
                <FormDescription>
                  If you want to use dynamic container, please check this box.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  // checked={dynamic}
                  // onClick={() => setDynamic(!dynamic)}
                  checked={form.watch("dynamic")}
                  onCheckedChange={(checked) =>
                    form.setValue("dynamic", checked)
                  }
                />
              </FormControl>
            </div>

            {form.watch("dynamic") && (
              <>
                <FormField
                  control={form.control}
                  name="dynamicImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Dynamic container image
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="minpeter/mathematician-in-wonderland:latest"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dynamicType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>
                        Dynamic container type
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="http" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              http, connects to use via browser
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="tcp" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              tcp, connects to use via ncat
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
