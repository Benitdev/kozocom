"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { set } from "date-fns";
import { ca } from "date-fns/locale";
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
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: "1",
    },
  });

  async function onSubmit() {
    const { type } = form.watch();
    try {
      setIsLoading(true);
      await vote({
        voteId: type,
        username,
      });
      toast({
        title: "Bình chọn thành công!",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">Tiết mục số {type}</code>
          </pre>
        ),
      });
      setIsLoading(false);
      setIsOpenDialog(false);
    } catch (error) {
      toast({
        title: "Bình chọn thất bại!",
      });
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() => setIsOpenDialog(true))}
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
                    className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4"
                  >
                    {TEAMS.map((team) => (
                      <FormItem key={team.id} className="relative h-[300px]">
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
                  <Input
                    id="name"
                    value={username}
                    className="col-span-3"
                    placeholder="Nhập họ và tên"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={onSubmit}
                  className="relative w-28"
                >
                  {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white"></div>
                    </div>
                  ) : (
                    "Bình chọn"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </form>
      </Form>
    </>
  );
}
