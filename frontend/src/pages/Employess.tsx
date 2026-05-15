import { useMemo, useState } from "react";
import {
  Table,
  TableBody,
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
      "employment_type",
      "status",
    ],
    filters: filter,
    limit: 20,
    limit_start: pageLimitStart,
  });

  console.log(data);

  return (
    <div className="p-3 sm:p-4 bg-black min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h2
          className="
          text-2xl sm:text-4xl md:text-6xl font-extrabold
          bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
          bg-clip-text text-transparent
          bg-[length:200%_auto] animate-text-gradient
        "
        >
          List View of Employee
        </h2>
        <AddEmployeeButton />
      </div>

      <div className="border-2 border-gray-600 p-3 sm:p-4 rounded-lg mx-0 sm:mx-4 md:mx-10">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-3">
          <div className="flex flex-wrap gap-3 py-1">
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full sm:w-45 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className=" bg-black text-white">
                <SelectGroup className=" bg-black text-white">
                  <SelectItem value="Active" className="bg-black text-white focus:bg-gray-700 focus:text-white data-[state=checked]:bg-gray-700">
                    Active
                  </SelectItem>
                  <SelectItem value="Inactive" className="bg-black text-white focus:bg-gray-700 focus:text-white data-[state=checked]:bg-gray-700">
                    Inactive
                  </SelectItem>
                  <SelectItem
                    value="Suspended"
                    className="bg-black text-white focus:bg-gray-700 focus:text-white data-[state=checked]:bg-gray-700"
                  >
                    Suspended
                  </SelectItem>
                  <SelectItem value="Left" className="bg-black text-white focus:bg-gray-700 focus:text-white data-[state=checked]:bg-gray-700">
                    Left
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger className="w-full sm:w-45 text-white">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent className=" bg-black text-white">
                <SelectGroup className=" bg-black text-white">
                  {dataDep?.map((dep) => (
                    <SelectItem
                      key={dep.name}
                      value={dep.name}
                      className="bg-black text-white focus:bg-gray-700 focus:text-white data-[state=checked]:bg-gray-700"
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

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow key={Employess.name}>
                <TableHead className="bg-black text-white whitespace-nowrap">Employee ID</TableHead>
                <TableHead className="bg-black text-white whitespace-nowrap">Full Name</TableHead>
                <TableHead className="bg-black text-white whitespace-nowrap">
                  Date Of Joining
                </TableHead>
                <TableHead className="bg-black text-white whitespace-nowrap">Department</TableHead>
                <TableHead className="bg-black text-white whitespace-nowrap">Shift Type</TableHead>
                <TableHead className="text-right bg-black text-white whitespace-nowrap">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((emp) => (
                <TableRow key={emp.name}>
                  <TableCell className="font-normal text-white whitespace-nowrap">
                    {emp.name}
                  </TableCell>
                  <TableCell className="font-bold text-md text-white whitespace-nowrap">
                    {emp.employee_name}
                  </TableCell>
                  <TableCell className="text-white whitespace-nowrap">
                    {emp.date_of_joining}
                  </TableCell>
                  <TableCell className="text-white whitespace-nowrap">{emp.department}</TableCell>
                  <TableCell className="text-white whitespace-nowrap">
                    {emp.employment_type}
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
    </div>
  );
};

export default Employess;
