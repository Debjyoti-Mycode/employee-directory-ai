"use server";

import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/mongodb";
import { addDepartmentSchema, addEmployeeSchema } from "@/lib/schemas";

export type ActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function addEmployee(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const raw = {
    name: formData.get("name"),
    position: formData.get("position"),
    salary: formData.get("salary"),
    departmentId: formData.get("departmentId"),
  };

  const parsed = addEmployeeSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the form errors.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  if (!ObjectId.isValid(parsed.data.departmentId)) {
    return {
      success: false,
      message: "Invalid department selected.",
      errors: {
        departmentId: ["Invalid department selected."],
      },
    };
  }

  try {
    const db = await getDb();

    const department = await db.collection("departments").findOne({
      _id: new ObjectId(parsed.data.departmentId),
    });

    if (!department) {
      return {
        success: false,
        message: "Selected department does not exist.",
        errors: {
          departmentId: ["Selected department does not exist."],
        },
      };
    }

    await db.collection("employees").insertOne({
      name: parsed.data.name.trim(),
      position: parsed.data.position.trim(),
      salary: parsed.data.salary,
      departmentId: new ObjectId(parsed.data.departmentId),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Employee added successfully.",
      errors: {},
    };
  } catch (error) {
    console.error("addEmployee error:", error);
    return {
      success: false,
      message: "Failed to add employee due to a server error.",
      errors: {},
    };
  }
}

export async function updateEmployee(
  id: string,
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  if (!ObjectId.isValid(id)) {
    return {
      success: false,
      message: "Invalid employee id.",
      errors: {},
    };
  }

  const raw = {
    name: formData.get("name"),
    position: formData.get("position"),
    salary: formData.get("salary"),
    departmentId: formData.get("departmentId"),
  };

  const parsed = addEmployeeSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the form errors.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  if (!ObjectId.isValid(parsed.data.departmentId)) {
    return {
      success: false,
      message: "Invalid department selected.",
      errors: {
        departmentId: ["Invalid department selected."],
      },
    };
  }

  try {
    const db = await getDb();

    const department = await db.collection("departments").findOne({
      _id: new ObjectId(parsed.data.departmentId),
    });

    if (!department) {
      return {
        success: false,
        message: "Selected department does not exist.",
        errors: {
          departmentId: ["Selected department does not exist."],
        },
      };
    }

    const result = await db.collection("employees").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name: parsed.data.name.trim(),
          position: parsed.data.position.trim(),
          salary: parsed.data.salary,
          departmentId: new ObjectId(parsed.data.departmentId),
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return {
        success: false,
        message: "Employee not found.",
        errors: {},
      };
    }

    revalidatePath("/");
    revalidatePath(`/employee/${id}`);
    revalidatePath(`/employee/${id}/edit`);

    return {
      success: true,
      message: "Employee updated successfully.",
      errors: {},
    };
  } catch (error) {
    console.error("updateEmployee error:", error);
    return {
      success: false,
      message: "Failed to update employee.",
      errors: {},
    };
  }
}

export async function addDepartment(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const raw = {
    name: formData.get("name"),
    floor: formData.get("floor"),
  };

  const parsed = addDepartmentSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the department form errors.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const db = await getDb();

    const existingDepartment = await db.collection("departments").findOne({
      name: {
        $regex: `^${parsed.data.name.trim()}$`,
        $options: "i",
      },
    });

    if (existingDepartment) {
      return {
        success: false,
        message: "Department already exists.",
        errors: {
          name: ["Department already exists."],
        },
      };
    }

    await db.collection("departments").insertOne({
      name: parsed.data.name.trim(),
      floor: parsed.data.floor,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Department added successfully.",
      errors: {},
    };
  } catch (error) {
    console.error("addDepartment error:", error);
    return {
      success: false,
      message: "Failed to add department.",
      errors: {},
    };
  }
}

export async function deleteEmployee(id: string) {
  if (!ObjectId.isValid(id)) {
    throw new Error("Invalid employee id");
  }

  const db = await getDb();

  await db.collection("employees").deleteOne({
    _id: new ObjectId(id),
  });

  revalidatePath("/");
}