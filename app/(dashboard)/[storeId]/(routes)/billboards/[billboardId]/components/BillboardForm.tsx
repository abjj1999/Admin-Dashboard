"use client";

import { Heading } from "@/components/Heading";
import { AlertModal } from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";
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
import { BillBoard } from "@prisma/client";
import axios from "axios";
import { SaveIcon, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

import { useOrigin } from "@/hooks/use-origin";
import ImageUpload from "@/components/ui/ImageUpload";
interface BillBoardFormProps {
  initialData: BillBoard | null;
}

const formSchema = z.object({
  label: z.string().min(3),
  imageUrl: z.string().url(),
});

type BillBoardFormValues = z.infer<typeof formSchema>;

export const BillBoardForm: React.FC<BillBoardFormProps> = ({ initialData }) => {
  const form = useForm<BillBoardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    }
  });
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const [open, setOpen] = useState(false); // alert modal
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Billboard" : "Create Billboard";
  const description = initialData ? "Edit your billboard" : "Create a new billboard";
  const toastMessage = initialData ? "Billboard updated successfully" : "Billboard created successfully";
  const action = initialData ? "Save Changes" : "Create Billboard";

  const onSubmit = async (values: BillBoardFormValues) => {
    // console.log(values)
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, values);
      router.refresh();
      toast.success("Store updated successfully");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push("/");
      toast.success("Store deleted successfully");
      
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
          <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background Image</FormLabel>
                  <FormControl>
                    <ImageUpload 
                    value={field.value ? [field.value] : []} 
                      disabled={loading}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange("")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <div
            className="
                grid grid-cols-3 gap-8
            "
          >
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lebal</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      className=""
                      placeholder="Billboard label"
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
