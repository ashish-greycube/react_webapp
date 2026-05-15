import { Button } from "@/components/ui/button";
import { PlusSquareIcon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as React from "react";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import LinkField from "../../common/FormFields/LinkField";

const AddEmployeeButton = () => {
  const [date, setDate] = useState<Date>();
  const [dateOfBirth, setDateOfBirth] = useState<Date>();
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="default" size="lg">
            <PlusSquareIcon className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm bg-black text-white">
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
            <DialogDescription>
              Fill in the details for the new employee.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                name="first_name"
                placeholder="Enter First Name"
              />
            </Field>
            <Field>
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                name="last_name"
                placeholder="Enter Last Name"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="gender">Gender</FieldLabel>
              <Select defaultValue="">
                <SelectTrigger id="checkout-exp-month-ts6">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="male">male</SelectItem>
                    <SelectItem value="female">female</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="date_of_joining">Date of Joining</FieldLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!date}
                    className="w-[212px] justify-between text-left  text-white bg-black font-normal data-[empty=true]:text-muted-foreground"
                  >
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    defaultMonth={date}
                  />
                </PopoverContent>
              </Popover>
            </Field>

            <Field>
              <FieldLabel htmlFor="date_of_birth">Date of Birth</FieldLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!dateOfBirth}
                    className="w-[212px] justify-between text-left  text-white bg-black font-normal data-[empty=true]:text-muted-foreground"
                  >
                    {dateOfBirth ? format(dateOfBirth, "PPP") : <span>Pick a date</span>}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateOfBirth}
                    onSelect={setDateOfBirth}
                    defaultMonth={dateOfBirth}
                  />
                </PopoverContent>
              </Popover>
            </Field>
          </FieldGroup>
          <DialogFooter className="bg-black">
            <DialogClose asChild>
              <Button className="text-black" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AddEmployeeButton;
