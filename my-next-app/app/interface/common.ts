export interface recordContentType {
  Name: string;
  Birthdate: string;
  Score: string;
  Grade: string;
}

export interface recordTypesType {
  Name: string;
  Birthdate: string;
  Score: string;
  Grade: string;
}

export enum TypeOptions {
  Text = "object",
  Int = "int64",
  Float = "float64",
  Date = "datetime64[ns]",
  Category = "category",
  Complex = "complex128",
  Time = "timedelta64[ns]",
}
