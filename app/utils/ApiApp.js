import APIKit from "./axiosApi";
class ApiApp {
  static ApisType = (url, method = "post", params = {}) => {
    switch (method) {
      case "post":
        return APIKit.post(url, params);
        break;
      case "put":
        return APIKit.put(url, params);
        break;
      case "get":
        return APIKit.get(url);
        break;
      case "delete":
        return APIKit.delete(url);
        break;
    }
  };

  static getUserProfile = (data) => {
    return ApiApp.ApisType("/person/person/save_person_jwt/", "post", data);
  };

  static updateProfile = (data) => {
    return ApiApp.ApisType(`/person/person/${data.id}/`, "put", data);
  };

  static updatePhoto = (data) => {
    return ApiApp.ApisType(
      `/person/person/update_pthoto_person/`,
      "post",
      data
    );
  };

  static getComunication = () => {
    return ApiApp.ApisType("/noticenter/notification/", "get");
  };

  static getPayrollVouchers = (data) => {
    return ApiApp.ApisType(`/payroll/payroll-voucher/?${data}`, "get");
  };

  static getPayrollVoucherDetail = (data) => {
    return ApiApp.ApisType(
      `/payroll/payroll-voucher/${data}/detail_movements/`,
      "get"
    );
  };

  static getVacationRequest = (data) => {
    return ApiApp.ApisType(`/person/vacation/${data}`, "get");
  };

  static getVacationDetail = (data) => {
    return ApiApp.ApisType(`/person/vacation/${data}`, "get");
  };

  static vacationRequest = (data) => {
    return ApiApp.ApisType(`/person/vacation/`, "post", data);
  };

  static getPermissionRequest = (data) => {
    return ApiApp.ApisType(`/person/permit/${data}`, "get");
  };

  static getPermissionDetail = (data) => {
    return ApiApp.ApisType(`/person/permit/${data}`, "get");
  };

  static permissionRequest = (data) => {
    return ApiApp.ApisType(`/person/permit/`, "post", data);
  };
}

export default ApiApp;
