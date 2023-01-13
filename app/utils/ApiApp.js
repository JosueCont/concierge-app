import APIKit from "./axiosApi";
import Constants from 'expo-constants';

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
      case "patch":
        return APIKit.patch(url);
        break;
    }
  };

  static validateTenantCode = (data) => {
    const {production, URL_TENANT_VALIDATE, URL_TENANT_VALIDATE_DEV} = Constants.manifest.extra
    return ApiApp.ApisType(
      production ? URL_TENANT_VALIDATE : URL_TENANT_VALIDATE_DEV,
      "post",
      data
    );
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
      `/noticenter/user-notification/get_notification_user/`,
      "post",
      { person: data }
    );
  };

  static changeStatusComunication = (id, data) => {
    return ApiApp.ApisType(`/noticenter/user-notification/${id}/`, "put", data);
  };

  /**
   * Ver Jesus TODO
   * @param data
   * @returns {Promise<AxiosResponse<any>>}
   */
  static getPayrollVouchers = (data) => {
    console.log("data: ", data);
    return ApiApp.ApisType(
      `https://nominaqa.api.people.hiumanlab.mx/payroll/cfdi-voucher${data}`,
      "get"
    );
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

  static getRecordVacations = (data) => {
    return ApiApp.ApisType(
      `/person/vacation/get_record_vacations/?person__id=${data}`,
      "get"
    );
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
    return ApiApp.ApisType(`/fiscal/bank/`, "get");
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

  static getCLientId = ({url}) => {
    return ApiApp.ApisType(
      `${url}/setup/site-configuration/`,
      "get"
    );
  };

  static deleteUserData = (data) => {
    return ApiApp.ApisType(`/person/person/deletion_request/`,"post",data);
  }
}

export default ApiApp;
