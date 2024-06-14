export enum TypeOptions {
  Text = "object",
  Int = "int",
  Float = "float",
  Date = "date",
  Category = "category",
  Complex = "complex",
  Time = "timedelta",
  Bool = "bool",
}

export const transformOption = (option: string) => {
  if (option.includes(TypeOptions.Date)) {
    return "Date";
  }

  if (option.includes(TypeOptions.Text)) {
    return "Text";
  }

  if (option.includes(TypeOptions.Float)) {
    return "Float";
  }

  if (option.includes(TypeOptions.Int)) {
    return "Int";
  }

  if (option.includes(TypeOptions.Category)) {
    return "Category";
  }

  if (option.includes(TypeOptions.Time)) {
    return "Time Difference";
  }

  if (option.includes(TypeOptions.Complex)) {
    return "Complex";
  }

  return option;
};

export const convertTypeBack = (selectedType: string) => {
  if (selectedType === "Text") {
    return "object";
  }
  if (selectedType === "Int") {
    return "int64";
  }
  if (selectedType === "Float") {
    return "float64";
  }
  if (selectedType === "Date") {
    return "datetime64[ns]";
  }
  if (selectedType === "Time Difference") {
    return "timedelta[ns]";
  }
  if (selectedType === "Complex") {
    return "complex128";
  }

  return selectedType;
};
