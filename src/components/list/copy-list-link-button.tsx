"use client";

import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { toast } from "sonner";
import { ClipboardIcon } from "lucide-react";
import { Button } from "../ui/button";

interface CopyLinkProps {
  link: string;
  className?: string;
}

const CopyLinkDropdown = (props: CopyLinkProps) => {
  const [, copy] = useCopyToClipboard();

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        toast.success("Link copied to clipboard", {
          description: `${text}`,
        });
      })
      .catch((error) => {
        toast.error(
          "An unexpected error has occurred. Please try again later.",
          {
            description: error,
          },
        );
      });
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleCopy(`${props.link}`)} className="hover:cursor-pointer">
      <ClipboardIcon size={20} />
    </Button>
  );
};

export default CopyLinkDropdown;
