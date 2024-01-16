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
import { cn } from "~/lib/utils";

export const TEAMS = [
  {
    id: "1",
    image: "",
    title: "Mua ba le",
    description: "Deloitte Vietnam",
  },
  {
    id: "2",
    image: "",
    title: "Nhay dien",
    description: "Shirai",
  },
  {
    id: "3",
    image: "",
    title: "Nhay khung",
    description: "Tas",
  },
  {
    id: "4",
    image: "",
    title: "Thoi sao",
    description: "ahuuhuhuh",
  },
  {
    id: "5",
    image: "",
    title: "Xam xi",
    description: "ahuuhuhuh",
  },
  {
    id: "6",
    image: "",
    title: "Dien hai",
    description: "ahuuhuhuh",
  },
];

const FormSchema = z.object({
  type: z.enum(["1", "2", "3", "4"], {
    required_error: "You need to select a notification type.",
  }),
});

export function VoteForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: "1",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsLoading(true);
      await vote(data.type);
      toast({
        title: "Bình chọn thành công!",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">Tiết mục số {data.type}</code>
          </pre>
        ),
      });
      setIsLoading(false);
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
          onSubmit={form.handleSubmit(onSubmit)}
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
                    className="grid grid-cols-1 gap-3 md:grid-cols-3"
                  >
                    {TEAMS.map((team) => (
                      <FormItem key={team.id} className="relative h-[150px]">
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
          <button
            type="submit"
            className="glow-effect relative mx-auto block h-10 w-32 rounded-lg bg-blue-500 font-bold text-white hover:bg-blue-600"
          >
            <div className="flex h-full w-full items-center justify-center">
              <p>Bình chọn</p>
              <svg className="glow-container">
                <rect
                  pathLength="100"
                  strokeLinecap="round"
                  className={cn("glow-blur stroke-[rgb(37 99 235)]")}
                ></rect>
                <rect
                  pathLength="100"
                  strokeLinecap="round"
                  className={cn("glow-line stroke-[rgb(37 99 235)]")}
                ></rect>
              </svg>
            </div>
          </button>
        </form>
      </Form>
    </>
  );
}
