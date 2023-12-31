"use client";

import { Heading } from "@/components/Heading";
import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Size } from "@prisma/client";
import axios from "axios";
import { SaveIcon, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

import ImageUpload from "@/components/ui/ImageUpload";
interface SizeFormProps {
  initialData: Size | null;
}

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

type SizeFormValues = z.infer<typeof formSchema>;

export const SizeForm: React.FC<SizeFormProps> = ({ initialData }) => {
  const form = useForm<SizeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    }
  });
  const params = useParams();
  const router = useRouter();
  // const origin = useOrigin();

  const [open, setOpen] = useState(false); // alert modal
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Size" : "Create Size";
  const description = initialData ? "Edit your Size" : "Create a new Size";
  const toastMessage = initialData ? "Size updated successfully" : "Size created successfully";
  const action = initialData ? "Save Changes" : "Create Size";

  const onSubmit = async (values: SizeFormValues) => {
    // console.log(values)
    try {
      setLoading(true);
      if(initialData){
        await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, values);
      }else {
        await axios.post(`/api/${params.storeId}/sizes`, values);
        
      }
      router.refresh();
      router.push(`/${params.storeId}/sizes`)
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`);
      router.refresh();
      router.push(`/${params.storeId}/sizes`);
      toast.success("size deleted successfully");
      
    } catch (error) {
      toast.error("Something went wrong");
    }finally{
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <>
    <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
    />
      <div
        className="
            flex flex-center justify-between
        "
      >
        <Heading title={title} description={description} />
        { initialData && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
            className=""
            disabled={loading}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )

        }
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          
          <div
            className="
                grid grid-cols-3 gap-8
            "
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      className=""
                      placeholder="Size Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      className=""
                      placeholder="Size value"
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
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
      
    </>
  );
};
