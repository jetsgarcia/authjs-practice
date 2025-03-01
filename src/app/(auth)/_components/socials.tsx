import { Button } from "@/components/ui/button";
import { Github, Mail } from "lucide-react";

export default function Socials() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button variant="outline" className="w-full hover:cursor-pointer">
        <Mail className="mr-2 h-4 w-4" />
        Google
      </Button>
      <Button variant="outline" className="w-full hover:cursor-pointer">
        <Github className="mr-2 h-4 w-4" />
        GitHub
      </Button>
    </div>
  );
}
