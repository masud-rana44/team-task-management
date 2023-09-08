"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import {
  Dialog,
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useDataContext } from "@/contexts/data-context";
import { useModal } from "@/hooks/use-modal-store";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Team name is required.",
  }),
});

export const CreateTeamModal = () => {
  const { user } = useUser();
  const router = useRouter();
  const { isOpen, type, onClose } = useModal();
  const { appData, setAppData } = useDataContext();
  const [isMounted, setIsMounted] = useState(false);

  const isModalOpen = isOpen && type === "createTeam";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const newTeam = {
        ...values,
        id: uuidv4(),
        creatorId: user?.id,
        members: [`${user?.id}`],
        tasks: [],
      };

      appData.users.find((u) => u.id === user?.id)?.teams.push(newTeam.id);

      setAppData({ ...appData, teams: [...appData.teams, newTeam] });

      onClose();
      form.reset();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  if (!isMounted) return null;

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-bold text-center text-2xl">
            Create new team
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70">
                      Team name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        autoComplete="off"
                        className="border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Enter team name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button variant="brand" disabled={isLoading}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
