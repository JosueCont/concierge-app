import APIKit from "./axiosApi";
class ApiApp {
  static ApisType = (url, method = "post", params = {}) => {
    switch (method) {
      case "post":
        return APIKit.post(url, params);
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
    console.log("PERSON-->>> ", data);
    // return ApiApp.ApisType(`/person/person/${data.id}/`, "post", data);
  };
  static updatePassword = (data) => {
    return ApiApp.ApisType(`/rest-auth/password/change/`, "post", data);
  };

  static getComunication = () => {
    return ApiApp.ApisType("/noticenter/notification/", "get");
  };

  static getCouponsByCategory = (id, latitude, longitude) => {
    return ApiApp.ApisType(
      `business/api/coupon/?is_active=true&is_deleted=false&company__category=${id}&lat=${latitude}&long=${longitude}`,
      "get"
    );
  };

  static generateCoupon = (coupon_id, user_id, branch_id) => {
    return ApiApp.ApisType(`/business/api/get-redeem-coupon-qrcode/`, "post", {
      user: user_id,
      coupon: coupon_id,
      branch: branch_id,
    });
  };

  static generateReward = (reward_id, user_id, branch_id) => {
    return ApiApp.ApisType(`/business/api/get-redeem-reward-qrcode/`, "post", {
      user: user_id,
      reward: reward_id,
      branch: branch_id,
    });
  };

  static favoriteCoupon = (coupon_id, user_id) => {
    return ApiApp.ApisType(`/business/api/user-liked-coupon/`, "post", {
      user: user_id,
      coupon: coupon_id,
    });
  };

  static deleteFavoriteCoupon = (coupon_id) => {
    return ApiApp.ApisType(
      `/business/api/user-liked-coupon/${coupon_id}/`,
      "delete"
    );
  };

  static getFavoriteCoupons = (user_id, page) => {
    return ApiApp.ApisType(
      `/business/api/user-liked-coupon/?is_active=true&is_deleted=false&user=${user_id}&page=${page}`,
      "get"
    );
  };

  static getHistoryCoupons = (user_id, page) => {
    return ApiApp.ApisType(
      `/business/api/redeem-coupon/?user=${user_id}&page=${page}&is_active=true&is_deleted=false`,
      "get"
    );
  };

  static getRewards = (idCategory, isKupodex, latitude, longitude) => {
    let getUrl = "";
    if (isKupodex) {
      getUrl = `/business/api/reward/?is_active=true&is_deleted=false&is_kupodex=true&lat=${latitude}&long=${longitude}`;
    } else {
      getUrl = `/business/api/reward/?is_active=true&company__category=${idCategory}&is_deleted=false&is_kupodex=false&lat=${latitude}&long=${longitude}`;
    }
    return ApiApp.ApisType(getUrl, "get");
  };

  static getCouponRecommended = (data) => {
    return ApiApp.ApisType(
      `/business/api/get-recomended-coupons/`,
      "post",
      data
    );
  };

  static registerVisit = (data) => {
    /***Para  registrar visitas del cupón o de la recompensa  al abrir su detalle.****/
    return ApiApp.ApisType(`/business/api/register-visit/`, "post", data);
  };

  static verificationStatus = (id) => {
    return ApiApp.ApisType(`/business/api/redeem-coupon/${id}/`, "get");
  };
}

export default ApiApp;
