import { z } from "zod";

export const addEmployeeSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  position: z.string().trim().min(2, "Position must be at least 2 characters"),
  salary: z.coerce.number().positive("Salary must be greater than 0"),
  departmentId: z.string().trim().min(1, "Department is required"),
});

export const addDepartmentSchema = z.object({
  name: z.string().trim().min(2, "Department name must be at least 2 characters"),
  floor: z.coerce.number().int().positive("Floor must be greater than 0"),
});