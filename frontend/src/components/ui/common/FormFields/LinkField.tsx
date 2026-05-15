import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../popover";
import { Button } from "../../button";

type Props = {
doctype: string;
  value: string;
  onChange: (value: string) => void;
};

const LinkField = ({ doctype, value, onChange }: Props) => {

  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[212px] justify-between text-left  text-white bg-black font-normal data-[empty=true]:text-muted-foreground"
        >
            {value  ? value : `Select ${doctype}`}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        
      </PopoverContent>
    </Popover>
  );
};

export default LinkField;
