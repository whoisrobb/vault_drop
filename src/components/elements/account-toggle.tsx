import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const AccountToggle = () => {
  return (
    <div className="border-b mb-4 mt-2 pb-4 border-stone-300">
      <button className="flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center">
        <Avatar>
            <AvatarImage src="https://api.dicebear.com/9.x/notionists/svg" className="rounded shadow" />
            <AvatarFallback className="rounded shadow">CN</AvatarFallback>
        </Avatar>

        <div className="text-start">
          <span className="text-sm font-bold block">Saint Laurent</span>
          <span className="text-xs block text-stone-500">yvessaintlaurent@ysl.com</span>
        </div>

        <ChevronDownIcon className="absolute right-2 top-1/2 translate-y-[calc(-50%+4px)] text-xs" />
        <ChevronUpIcon className="absolute right-2 top-1/2 translate-y-[calc(-50%-4px)] text-xs" />
      </button>
    </div>
  );
};

export default AccountToggle;
