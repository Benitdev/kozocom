"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import VoteItem from "~/app/end-of-year/_components/vote-item";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { toast } from "~/components/ui/use-toast";
import { vote } from "~/server/vote";

const TEAMS = [
  {
    id: "1",
    image: "",
    title: "ahihi",
    description: "ahuuhuhuh",
  },
  {
    id: "2",
    image: "",
    title: "ahihi",
    description: "ahuuhuhuh",
  },
  {
    id: "3",
    image: "",
    title: "ahihi",
    description: "ahuuhuhuh",
  },
  {
    id: "4",
    image: "",
    title: "ahihi",
    description: "ahuuhuhuh",
  },
];

const FormSchema = z.object({
  type: z.enum(["1", "2", "3", "4"], {
    required_error: "You need to select a notification type.",
  }),
});

export function VoteForm() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: "1",
    },
  });

  async function onSubmit() {
    const data = form.watch();
    await vote(data.type);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() => setIsOpenDialog)}
          className="container mx-auto space-y-6"
        >
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid h-[300px] grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4"
                  >
                    {TEAMS.map((team) => (
                      <FormItem key={team.id} className="relative">
                        <FormControl>
                          <RadioGroupItem
                            value={team.id}
                            className="opacity-0"
                          />
                        </FormControl>
                        <FormLabel className="absolute inset-0">
                          <VoteItem
                            id={team.id}
                            title={team.title}
                            image={team.image}
                            description={team.description}
                            selected={field.value === team.id}
                          />
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mx-auto flex">
            Bình chọn
          </Button>
        </form>
      </Form>
      <Dialog
        open={isOpenDialog}
        onOpenChange={(open) => setIsOpenDialog(open)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Xác nhận bình chọn</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn với lựa chọn của mình không?
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Họ và tên
              </Label>
              <Input id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => onSubmit()}>
              Bình chọn
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
