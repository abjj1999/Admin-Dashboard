"use client";

import { Heading } from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import { SaveIcon, Trash } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z  from "zod";

interface SettingFormProps {
  initialData: Store;
}

const formSchema = z.object({
    name: z.string().min(3),
})

type SettingFormValues = z.infer<typeof formSchema>;

export const SettingForm: React.FC<SettingFormProps> = ({ initialData }) => {

      const form = useForm<SettingFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
      })  

    const [open, setOpen] = useState(false); // alert modal
    const [loading, setLoading] = useState(false);

    const onSubmit = async (values: SettingFormValues) => {
        console.log(values)
    }
  return (
    <>
      <div
        className="
            flex flex-center justify-between
        "
      >
        <Heading title="Settings" description="Manage your store settings" />
        <Button variant="destructive" size="sm" onClick={() => {}} className="">
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
            <div className="
                grid grid-cols-3 gap-8
            ">
                <FormField 
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input 
                                    disabled={loading}
                                    className=""
                                    placeholder="Store Name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <Button type="submit" className="ml-auto " disabled={loading}>
                {/* <SaveIcon className="h-4 w-4 "  /> */}
                Save Changes
            </Button>
        </form>
      </Form>
    </>
  );
};
