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

  static getComunication = (data) => {
    return ApiApp.ApisType(
      "/noticenter/notification/notifications_user/",
      "post",
      data
    );
  };

  static changeStatusComunication = (data) => {
    return ApiApp.ApisType("/noticenter/user-notification/", "post", data);
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

  static getEvents = (data) => {
    return ApiApp.ApisType(`/person/event/${data}`, "get");
  };

  static getLoanRequest = (data) => {
    return ApiApp.ApisType(`/payroll/loan/${data}`, "get");
  };

  static getLoanDetail = (data) => {
    return ApiApp.ApisType(`/payroll/payment-plan/?loan__id=${data}`, "get");
  };

  static getLoanConfig = (data) => {
    return ApiApp.ApisType(
      `payroll/loan-config/get_config_for_node/?node=${data}`,
      "get"
    );
  };

  static loanRequest = (data) => {
    return ApiApp.ApisType(`/payroll/loan/`, "post", data);
  };

  static getBanks = () => {
    return ApiApp.ApisType(`/setup/banks/`, "get");
  };

  static getBankAccount = (data) => {
    return ApiApp.ApisType(
      `/person/person/${data}/bank_account_person/`,
      "get"
    );
  };

  static requestBankAccount = (data) => {
    return ApiApp.ApisType(`/person/bank-account-request/`, "post", data);
  };

  static getIncapacityRequest = (data) => {
    return ApiApp.ApisType(`/person/incapacity/${data}`, "get");
  };

  static getIncapacityDetail = (data) => {
    return ApiApp.ApisType(`/person/incapacity/${data}/`, "get");
  };

  static incapacityRequest = (data) => {
    return ApiApp.ApisType(`/person/incapacity/`, "post", data);
  };

  static getProceedings = (data) => {
    return ApiApp.ApisType(`/person/person/${data}/document_person/`, "get");
  };

  static userDevice = (data) => {
    return ApiApp.ApisType(`/noticenter/user-device/`, "post", data);
  };

  static deleteUserDevice = (data) => {
    return ApiApp.ApisType(
      `/noticenter/user-device/delete_device/`,
      "post",
      data
    );
  };
}

export default ApiApp;
