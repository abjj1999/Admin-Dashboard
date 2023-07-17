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
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

const FormSchema = z.object({
  name: z.string().min(3).max(25),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/stores', values);
      window.location.assign(`/${response.data.id}`);
      // console.log(response.data)
      // toast.success('Store created successfully');

    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
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
                                      disabled={loading}
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
                            disabled={loading}
                            variant="outline"
                             onClick={storeModal.onClose}>
                                Cancel
                            </Button>
                            <Button
                            disabled={loading}
                            type="submit">
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
