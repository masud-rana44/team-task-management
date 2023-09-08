import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src?: string;
  classname?: string;
}

export const UserAvatar = ({ src, classname }: UserAvatarProps) => {
  return (
    <Avatar className={cn("h-6 w-6 md:h-10 md:w-10", classname)}>
      <AvatarImage src={src} />
    </Avatar>
  );
};
