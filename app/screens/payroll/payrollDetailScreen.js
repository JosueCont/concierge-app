import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../../utils/colors";
import ToolbarGeneric from "../../components/ToolbarComponent/ToolbarGeneric";
import ApiApp from "../../utils/ApiApp";
import { connect } from "react-redux";
import ModalCustom from "../../components/modal/ModalCustom";
import LoadingGlobal from "../../components/modal/LoadingGlobal";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const statusHeight = StatusBar.currentHeight;

const payrollDetailScreen = (props) => {
  const [modalCustom, setModalCustom] = useState(false);
  const [iconSourceCustomModal, setIconSourceCustomModal] = useState("");
  const [messageCustomModal, setMessageCustomModal] = useState("");
  const [modalLoading, setModalLoading] = useState(false);
  const [voucher, setVoucher] = useState({});
  const [detailVoucher, setDetailVoucher] = useState([]);

  const clickAction = () => {
    props.navigation.pop();
  };

  const clickProfile = () => {
    props.navigation.navigate("ProfileScreen");
  };

  const viewModalCustom = () => {
    modalCustom ? setModalCustom(false) : setModalCustom(true);
  };

  useEffect(() => {
    if (props.user && props.user.userProfile) {
      getDetail();
    } else {
      props.navigation.goBack(null);
    }
  }, []);

  const getDetail = async () => {
    try {
      let response = await ApiApp.getPayrollVoucherDetail(
        props.navigation.getParam("id")
      );
      if (response.status == 200) {
        setDetailVoucher(response.data.detail_payroll_movements);
        setVoucher(response.data.payroll_voucher);
      }
    } catch (error) {
      setMessageCustomModal("Ocurrio un error, intente de nuevo.");
      setIconSourceCustomModal(2);
      setModalCustom(true);
      setModalLoading(false);
      setTimeout(() => {
        props.navigation.goBack(null);
      }, 1500);
    }
  };

  const ListPerceptionDeduction = ({ detail, type }) => {
    // detail_payroll_movements -->> lista para sacar percepciones
    // movement_type 1 -->> Percepcion usar -->> amount_excent y taxed_amount
    // movement_type 2 -->> Deduccion  usar -->> amount
    // movement_type 3 -->> otros pagos usar -->> employee_allowens
    // console.log("Array -->> ", detail);
    return (
      <>
        {detail.map((p) => {
          if (p.movement_type == type) {
            return (
              <>
                <View style={styles.item}>
                  <Text style={styles.concepto}>
                    {type == 3 ? p.payroll_movement.concept : p.concept}
                  </Text>
                  <Text style={styles.cantidad}>
                    {type == 2
                      ? p.amount
                      : type == 3
                      ? p.amount
                      : p.taxed_amount}
                  </Text>
                </View>
              </>
            );
          }
        })}
      </>
    );
  };

  return (
    <>
      <View
        style={{
          height: "100%",
          zIndex: 1,
          backgroundColor: Colors.bluebg,
        }}
      >
        <StatusBar
          barStyle="dark-content"
          backgroundColor="rgba(1,1,1,0)"
          translucent={true}
        />
        {/* Toolbar componenet para mostar el datos del usuario*/}
        <ToolbarGeneric
          clickAction={clickAction}
          nameToolbar={"Mi Nomina"}
          type={1}
          clickProfile={clickProfile}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            zIndex: 0,
            paddingHorizontal: 22,
          }}
        >
          <View style={styles.container}>
            <View
              style={{
                with: "100%",
                alignItems: "center",
                position: "absolute",
                top: -55,
                right: 0,
                left: 0,
              }}
            >
              <Image
                source={require("../../../assets/img/icono_nomina_negro.png")}
                style={{ width: 110, height: 110, resizeMode: "cover" }}
              ></Image>
            </View>

            <View style={{ marginTop: 80 }}>
              <Text style={styles.monto}>${voucher && voucher.amount}</Text>
              <Text style={styles.fecha}>
                {voucher && voucher.payment_date}
              </Text>

              <View>
                <Text style={styles.title}>Percepciones</Text>

                {detailVoucher.length > 0 && (
                  <ListPerceptionDeduction detail={detailVoucher} type={1} />
                )}
              </View>

              <View>
                <Text style={styles.title}>Deducciones</Text>
                {detailVoucher.length > 0 && (
                  <ListPerceptionDeduction detail={detailVoucher} type={2} />
                )}
              </View>

              <View>
                <Text style={styles.title}>Otros pagos</Text>
                {detailVoucher.length > 0 && (
                  <ListPerceptionDeduction detail={detailVoucher} type={3} />
                )}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  style={{
                    fontFamily: "Cabin-Regular",
                    backgroundColor: Colors.white,
                    borderColor: Colors.bluetitle,
                    borderWidth: 1,
                    height: 45,
                    width: "48%",
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: Colors.bluetitle, fontSize: 14 }}>
                    Descarga PDF
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    fontFamily: "Cabin-Regular",
                    backgroundColor: Colors.white,
                    borderColor: Colors.bluetitle,
                    borderWidth: 1,
                    height: 45,
                    width: "48%",
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: Colors.bluetitle, fontSize: 14 }}>
                    Descarga CFDI
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: "center", marginTop: 10 }}>
                <TouchableOpacity
                  style={{
                    fontFamily: "Cabin-Regular",
                    backgroundColor: Colors.bluetitle,
                    height: 45,
                    width: "48%",
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => props.navigation.goBack(null)}
                >
                  <Text style={{ color: Colors.white, fontSize: 14 }}>
                    Regresar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        <Image
          style={{
            width: "100%",
            height: windowHeight * 0.46,
            position: "absolute",
            bottom: 0,
            left: 0,
            resizeMode: "stretch",
            zIndex: -1,
          }}
          source={require("../../../assets/img/fondo_azul.png")}
        />
      </View>
      <ModalCustom
        visible={modalCustom}
        text={messageCustomModal}
        iconSource={iconSourceCustomModal}
        setVisible={() => viewModalCustom(true)}
      />
      <LoadingGlobal visible={modalLoading} text={"Cargando"} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 400,
    backgroundColor: Colors.white,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 80,
    marginBottom: 50,
    paddingBottom: 30,
  },
  monto: {
    fontFamily: "Cabin-Bold",
    fontSize: 22,
    marginBottom: 8,
    textAlign: "center",
    color: Colors.bluetitle,
  },
  fecha: {
    fontFamily: "Cabin-Regular",
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
    color: Colors.bluetitle,
  },
  title: {
    fontFamily: "Cabin-Bold",
    fontSize: 18,
    color: Colors.bluetitle,
    borderBottomColor: Colors.bluelinks,
    borderBottomWidth: 2,
    paddingBottom: 15,
    marginTop: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    //backgroundColor: 'pink',
    paddingTop: 10,
    paddingBottom: 20,
    borderBottomColor: "#CED8DD",
    borderBottomWidth: 1,
  },
  concepto: {
    flex: 1,
    alignItems: "flex-start",
    fontFamily: "Cabin-Regular",
    fontSize: 16,
    color: Colors.bluetitle,
  },
  cantidad: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    textAlign: "right",
    fontFamily: "Cabin-Bold",
    fontSize: 16,
    color: Colors.bluetitle,
  },
});

const mapState = (state) => {
  return { user: state.user };
};

export default connect(mapState)(payrollDetailScreen);
