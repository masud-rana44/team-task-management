"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal-store";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { useDataContext } from "@/contexts/data-context";
import { useUser } from "@clerk/nextjs";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required.",
  }),
  description: z.string().min(1, {
    message: "Description is required.",
  }),
  dueDate: z.date({
    required_error: "A date is required.",
  }),
  priority: z.enum(["low", "medium", "high"]),
  status: z.enum(["completed", "in_progress", "pending"]),
});

export const AddTaskModal = () => {
  const { user } = useUser();
  const router = useRouter();
  const { isOpen, onClose, type } = useModal();
  const { appData, setAppData } = useDataContext();

  const isModalOpen = isOpen && type === "addTask";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: new Date(),
      priority: "low",
      status: "pending",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const newTask = {
        ...values,
        id: uuidv4(),
        creatorId: user?.id,
        teamId: "sldfj934543",
        assignedTo: "",
        dueDate: values.dueDate.toISOString(),
      };
      console.log(appData.tasks);

      setAppData({ ...appData, tasks: [...appData.tasks, newTask] });

      form.reset();
      router.refresh();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-bold text-center text-2xl">
            Add new task
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <ScrollArea className="h-[380px] w-full">
              <div className="space-y-4 px-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70">
                        Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          autoComplete="off"
                          className="border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
                          placeholder="Enter title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={isLoading}
                          autoComplete="off"
                          className="border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
                          placeholder="Enter description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70">
                        Due date
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start border-0 bg-zinc-300/50 text-left font-normal text-black hover:bg-zinc-300/50 hover:text-black focus-visible:ring-0 focus-visible:ring-offset-0",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className=" w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70">
                        Priority
                      </FormLabel>
                      <Select
                        disabled={isLoading}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-0 bg-zinc-300/50 capitalize text-black outline-none ring-offset-0 focus:ring-0 focus:ring-offset-0 ">
                            <SelectValue placeholder="Select a priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {["low", "medium", "high"].map((priority) => (
                            <SelectItem
                              key={priority}
                              value={priority}
                              className="capitalize"
                            >
                              {priority.toLocaleLowerCase()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70">
                        Status
                      </FormLabel>
                      <Select
                        disabled={isLoading}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-0 bg-zinc-300/50 capitalize text-black outline-none ring-offset-0 focus:ring-0 focus:ring-offset-0">
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {["completed", "in_progress", "pending"].map(
                            (status) => (
                              <SelectItem
                                key={status}
                                value={status}
                                className="capitalize"
                              >
                                {status.toLocaleLowerCase()}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </ScrollArea>

            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button variant="brand" disabled={isLoading}>
                Add Task
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
