import React, { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFrappeGetDocList, type Filter } from "frappe-react-sdk";
import type { Employee } from "@/types/Setup/Employee";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Pagination from "@/components/ui/common/Pagination/Pagination";
import { Button } from "@/components/ui/button";
import AddEmployeeButton from "@/components/ui/features/Employees/AddEmployeeButton";

const Employess = () => {

  const [status, setStatus] = useState<string>();

  const [department, setDepartment] = useState<string | undefined>();

  const [pageLimitStart, setPageLimitStart] = useState(0);

  const filter = useMemo(() => {
    const f: Filter[] = [];

    if (status) f.push(["status", "=", status]);
    if (department) f.push(["department", "=", department]);

    return f;
  }, [status, department]);

  const { data: dataDep } = useFrappeGetDocList("Department", {
    fields: ["name"],
    filters: [["company", "=", "GC (Demo)"]],
  });

  console.log(dataDep);

  const { data } = useFrappeGetDocList<Employee>("Employee", {
    fields: [
      "name",
      "employee_name",
      "date_of_joining",
      "department",
      // "employment_type",
      "status",
    ],
    filters: filter,
    limit: 20,
    limit_start: pageLimitStart,
  });

  console.log(data);

  return (
    <div className="p-2 bg-black justify-center items-center">
      <div className="flex items-center justify-between mb-4">
        <h2
          className="
          text-6xl font-extrabold 
          bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
          bg-clip-text text-transparent 
          bg-[length:200%_auto] animate-text-gradient
        
        "
        >
          List View of Employee
        </h2>
        <AddEmployeeButton />
      </div>

      <div className="gap-2 items-center justify-between m-10 border-2 border-gray-600 p-4 rounded-lg">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex  gap-10  py-2">
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className=" bg-black text-white">
                <SelectGroup className=" bg-black text-white">
                  <SelectItem value="Active" className=" bg-black text-white">
                    Active
                  </SelectItem>
                  <SelectItem value="Inactive" className=" bg-black text-white">
                    Inactive
                  </SelectItem>
                  <SelectItem
                    value="Suspended"
                    className=" bg-black text-white"
                  >
                    Suspended
                  </SelectItem>
                  <SelectItem value="Left" className=" bg-black text-white">
                    Left
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent className=" bg-black text-white">
                <SelectGroup className=" bg-black text-white">
                  {dataDep?.map((dep) => (
                    <SelectItem
                      key={dep.name}
                      value={dep.name}
                      className=" bg-black text-white"
                    >
                      {dep.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Pagination
            doctype="Employee"
            pageLimitStart={pageLimitStart}
            filters={filter}
            setPageLimitStart={setPageLimitStart}
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow key={Employess.name}>
              <TableHead className="bg-black text-white">Employee ID</TableHead>
              <TableHead className="bg-black text-white">Full Name</TableHead>
              <TableHead className="bg-black text-white">
                Date Of Joining
              </TableHead>
              <TableHead className="bg-black text-white">Department</TableHead>
              <TableHead className="bg-black text-white">Shift Type</TableHead>
              <TableHead className="text-right bg-black text-white">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((emp) => (
              <TableRow key={emp.name}>
                <TableCell className="font-normal text-white">
                  {emp.name}
                </TableCell>
                <TableCell className="font-bold text-md text-white">
                  {emp.employee_name}
                </TableCell>
                <TableCell className="text-white">
                  {" "}
                  {emp.date_of_joining}{" "}
                </TableCell>
                <TableCell className="text-white"> {emp.department} </TableCell>
                <TableCell className="text-white">
                  {" "}
                  {emp.employment_type}{" "}
                </TableCell>
                <TableCell className="flex justify-end">
                  <Badge
                    className={
                      emp.status === "Active"
                        ? "bg-green-600 text-white"
                        : emp.status === "Inactive"
                          ? "bg-yellow-600 text-white"
                          : emp.status === "Left"
                            ? "bg-red-600 text-white"
                            : "bg-gray-600 text-white"
                    }
                    variant="default"
                  >
                    {emp.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Employess;
