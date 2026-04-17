export type Department = {
  _id: string;
  name: string;
  floor: number;
};

export type Employee = {
  _id: string;
  name: string;
  position: string;
  salary: number;
  departmentId: string;
};

export type EmployeeWithDepartment = {
  _id: string;
  name: string;
  position: string;
  salary: number;
  departmentId: string;
  department?: {
    _id: string;
    name: string;
    floor: number;
  } | null;
};
