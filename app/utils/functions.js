import moment from "moment";

export const generateYear = () => {
  let yearsArray = [];
  let currentYear = new Date().getFullYear();
  let startYear = currentYear - 10;
  while (startYear < currentYear) {
    startYear++;
    yearsArray.push({ label: `${startYear}`, value: startYear });
  }
  return yearsArray.reverse();
};

export const getmonths = () => {
  return [
    {
      label: "Enero",
      value: 1,
    },
    {
      label: "Febrero",
      value: 2,
    },
    {
      label: "Marzo",
      value: 3,
    },
    {
      label: "Abril",
      value: 4,
    },
    {
      label: "Mayo",
      value: 5,
    },
    {
      label: "Junio",
      value: 6,
    },
    {
      label: "Julio",
      value: 7,
    },
    {
      label: "Agosto",
      value: 8,
    },
    {
      label: "Septiembre",
      value: 9,
    },
    {
      label: "Octubre",
      value: 10,
    },
    {
      label: "Noviembre",
      value: 11,
    },
    {
      label: "Diciembre",
      value: 12,
    },
  ];
};

export const monthNames = () => {
  return [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
};

export const nameMonthSelected = (month) => {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  let name = "";
  months.map((a, i) => {
    if (month - 1 === i) {
      name = a;
    }
  });
  return name;
};

export const monthNamesShort = () => {
  return [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];
};

export const dayNames = () => {
  return [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
};

export const dayNamesShort = () => {
  return ["D", "L", "M", "M", "J", "V", "S"];
};

export const getNumberDays = (departure, returned) => {
  let requestedDays = 0;
  const out = moment(departure);
  const ret = moment(returned);
  requestedDays = ret.diff(out, "days");
  const departureDate =
    departure.substring(5, 7) +
    "/" +
    departure.substring(8, 10) +
    "/" +
    departure.substring(0, 4);
  const dayNumber = new Date(departureDate).getDay();

  let count = 0;
  let countDay = 0;
  let daysCounter = ret.diff(out, "days");
  while (count < daysCounter) {
    count++;
    countDay = dayNumber + count;
    if (requestedDays >= 3) {
      if (countDay == 6 || countDay == 7) requestedDays = requestedDays - 1;
    }
  }

  return requestedDays;
};
