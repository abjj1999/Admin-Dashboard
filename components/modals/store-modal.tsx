"use client";
// this is a custom Modal to create a store in the app
import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "../ui/Modal";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const FormSchema = z.object({
  name: z.string().min(3).max(25),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    console.log(values);
    //todo: create store
  };

  return (
    <Modal
      title="Create Store"
      description="Add a new store to your account to manage your products and orders."
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div className="">
        <div className="space-y-4 py-2 pb-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Name
                                </FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="Store Name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage
                                    
                                />
                            </FormItem>
                        )}
                    />
                    <div className="pt-6 space-x-2 flex items-center justify-end w-fll">
                            <Button 
                            variant="outline"
                             onClick={storeModal.onClose}>
                                Cancel
                            </Button>
                            <Button type="submit">
                                Create
                            </Button>
                    </div>
                    
                </form>

            </Form>
        </div>
      </div>
    </Modal>
  );
};
