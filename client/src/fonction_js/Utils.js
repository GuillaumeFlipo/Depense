export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

export const monthNumberToString = (int) => {
  switch (int) {
    case 0:
      return "Janvier";
    case 1:
      return "Février";
    case 2:
      return "Mars";
    case 3:
      return "Avril";
    case 4:
      return "Mai";
    case 5:
      return "Juin";
    case 6:
      return "Juillet";
    case 7:
      return "Août";
    case 8:
      return "Septembre";
    case 9:
      return "Octobre";
    case 10:
      return "Novembre";
    case 11:
      return "Décembre";
  }
};

export const monthStringToNumber = (string) => {
  switch (string) {
    case "Janvier":
      return 0;
    case "Février":
      return 1;
    case "Mars":
      return 2;
    case "Avril":
      return 3;
    case "Mai":
      return 4;
    case "Juin":
      return 5;
    case "Juillet":
      return 6;
    case "Août":
      return 7;
    case "Septembre":
      return 8;
    case "Octobre":
      return 9;
    case "Novembre":
      return 10;
    case "Décembre":
      return 11;
  }
};

export const toInt = (x) => {
  let val = parseInt(x);
  return val;
};

export const toFloat = (x) => {
  let val = parseFloat(x);
  return val;
};
