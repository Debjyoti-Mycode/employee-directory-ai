import { ObjectId } from "mongodb";
import { getDb } from "./mongodb";

export type Department = {
  _id: string;
  name: string;
  floor: number;
};

export type EmployeeWithDepartment = {
  _id: string;
  name: string;
  position: string;
  salary: number;
  departmentId: string;
  department: {
    _id: string;
    name: string;
    floor: number;
  } | null;
};

export type DashboardStats = {
  totalEmployees: number;
  totalDepartments: number;
  averageSalary: number;
  highestSalary: number;
};

export async function getDepartments(): Promise<Department[]> {
  const db = await getDb();

  const departments = await db
    .collection("departments")
    .find({})
    .sort({ name: 1 })
    .toArray();

  return departments.map((dept) => ({
    _id: dept._id.toString(),
    name: dept.name,
    floor: dept.floor,
  }));
}

export async function getEmployees(
  departmentId?: string,
  search?: string,
  sort?: string
): Promise<EmployeeWithDepartment[]> {
  const db = await getDb();

  const matchStage: Record<string, unknown> = {};

  if (departmentId && ObjectId.isValid(departmentId)) {
    matchStage.departmentId = new ObjectId(departmentId);
  }

  if (search && search.trim()) {
    matchStage.name = {
      $regex: search.trim(),
      $options: "i",
    };
  }

  let sortStage: Record<string, 1 | -1> = { name: 1 };

  if (sort === "name-asc") {
    sortStage = { name: 1 };
  } else if (sort === "name-desc") {
    sortStage = { name: -1 };
  } else if (sort === "salary-asc") {
    sortStage = { salary: 1 };
  } else if (sort === "salary-desc") {
    sortStage = { salary: -1 };
  }

  const employees = await db
    .collection("employees")
    .aggregate([
      { $match: matchStage },
      {
        $lookup: {
          from: "departments",
          localField: "departmentId",
          foreignField: "_id",
          as: "department",
        },
      },
      {
        $unwind: {
          path: "$department",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          position: 1,
          salary: 1,
          departmentId: 1,
          "department._id": 1,
          "department.name": 1,
          "department.floor": 1,
        },
      },
      { $sort: sortStage },
    ])
    .toArray();

  return employees.map((emp) => ({
    _id: emp._id.toString(),
    name: emp.name,
    position: emp.position,
    salary: emp.salary,
    departmentId: emp.departmentId?.toString(),
    department: emp.department
      ? {
          _id: emp.department._id.toString(),
          name: emp.department.name,
          floor: emp.department.floor,
        }
      : null,
  }));
}

export async function getEmployeeById(
  id: string
): Promise<EmployeeWithDepartment | null> {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await getDb();

  const employee = await db
    .collection("employees")
    .aggregate([
      {
        $match: {
          _id: new ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "departments",
          localField: "departmentId",
          foreignField: "_id",
          as: "department",
        },
      },
      {
        $unwind: {
          path: "$department",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          position: 1,
          salary: 1,
          departmentId: 1,
          "department._id": 1,
          "department.name": 1,
          "department.floor": 1,
        },
      },
    ])
    .next();

  if (!employee) {
    return null;
  }

  return {
    _id: employee._id.toString(),
    name: employee.name,
    position: employee.position,
    salary: employee.salary,
    departmentId: employee.departmentId?.toString(),
    department: employee.department
      ? {
          _id: employee.department._id.toString(),
          name: employee.department.name,
          floor: employee.department.floor,
        }
      : null,
  };
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const db = await getDb();

  const [totalEmployees, totalDepartments, salaryStats] = await Promise.all([
    db.collection("employees").countDocuments(),
    db.collection("departments").countDocuments(),
    db
      .collection("employees")
      .aggregate([
        {
          $group: {
            _id: null,
            averageSalary: { $avg: "$salary" },
            highestSalary: { $max: "$salary" },
          },
        },
      ])
      .toArray(),
  ]);

  return {
    totalEmployees,
    totalDepartments,
    averageSalary: salaryStats[0]?.averageSalary ?? 0,
    highestSalary: salaryStats[0]?.highestSalary ?? 0,
  };
}