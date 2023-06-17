import "./App.css";
import React from "react";
import ModalCreate from "./component/ModalCreate";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      uangsisa: 0,
      pemasukan: 0,
      pengeluaran: 0,
      transaksiIn: 0,
      transaksiOut: 0,
      summary: [
        // {
        //   deskripsi: "Menerima Gaji",
        //   tanggal: "1 July 2023",
        //   nominal: 1000000,
        //   category: "IN",
        // },
        // {
        //   deskripsi: "Makan Nasi",
        //   tanggal: "2 July 2023",
        //   nominal: 20000,
        //   category: "OUT",
        // },
      ],
    };
    this.tambahItem = this.tambahItem.bind(this);
    this.fnHitung = this.fnHitung.bind(this);
  }

  tambahItem(objek) {
    const newData = [...this.state.summary, objek];
    this.updateSummary(newData);
    let dataUangIN = newData.filter((item) => item.category === "IN");
    let nominalUangIn = dataUangIN.map((item) => item.nominal);
    let jumlahUangIn = nominalUangIn.reduce((total, num) => total + num, 0);

    let dataUangOUT = newData.filter((item) => item.category === "OUT");
    let nominalUangOut = dataUangOUT.map((item) => item.nominal);
    let jumlahUangOut = nominalUangOut.reduce((total, num) => total + num, 0);
    this.setState({
      pemasukan: jumlahUangIn,
      transaksiIn: nominalUangIn.length,
      transaksiOut: nominalUangOut.length,
      pengeluaran: jumlahUangOut,
      uangsisa: jumlahUangIn - jumlahUangOut,
      summary: newData,
    });
  }

  fnHitung() {
    const dataUangIN = this.state.summary.filter(
      (item) => item.category === "IN"
    );
    const nominalUangIn = dataUangIN.map((item) => item.nominal);
    const jumlahUangIn = nominalUangIn.reduce((total, num) => total + num, 0);

    const dataUangOUT = this.state.summary.filter(
      (item) => item.category === "OUT"
    );
    const nominalUangOut = dataUangOUT.map((item) => item.nominal);
    const jumlahUangOut = nominalUangOut.reduce((total, num) => total + num, 0);
    this.setState({
      pemasukan: jumlahUangIn,
      transaksiIn: nominalUangIn.length,
      transaksiOut: nominalUangOut.length,
      pengeluaran: jumlahUangOut,
      uangsisa: jumlahUangIn - jumlahUangOut,
    });
  }

  componentDidMount() {
    const storedData = localStorage.getItem("transactionData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      this.updateSummary(parsedData);
    }
  }

  updateSummary(data) {
    this.setState(
      {
        summary: data,
      },
      () => {
        this.fnHitung();
        localStorage.setItem("transactionData", JSON.stringify(data));
      }
    );
  }

  hapusItem(index) {
    const newSummary = [...this.state.summary];
    newSummary.splice(index, 1);
    this.updateSummary(newSummary);
  }

  render() {
    return (
      <>
        <div className="container py-5">
          <div className="row">
            <div className="col-12 text-center">
              <h1 className="fw-bold" tabIndex="0">
                MONEYMAN APPS
              </h1>
              <hr className="w-75 mx-auto" />
              <h2 className="fw-bold" tabIndex="0">
                Rp. {this.state.uangsisa},-
              </h2>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-6">
              <div className="card-wrapper p-4" tabIndex="0">
                <div className="icon-wrapper mb-1">
                  <i className="bi bi-wallet2"></i>
                </div>
                <span className="title-sm" tabIndex="0">
                  Pemasukan
                </span>
                <h3 className="fw-bold" tabIndex="0">
                  Rp. {this.state.pemasukan},-
                </h3>
                <div>
                  <span className="title-sm text-ungu fw-bold" tabIndex="0">
                    {this.state.transaksiIn}
                  </span>
                  <span className="title-sm" tabIndex="0">
                    {" "}
                    Transaksi
                  </span>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card-wrapper p-4" tabIndex="0">
                <div className="icon-wrapper mb-1">
                  <i className="bi bi-cash-stack"></i>
                </div>
                <span className="title-sm" tabIndex="0">
                  Pengeluaran
                </span>
                <h3 className="fw-bold" tabIndex="0">
                  Rp. {this.state.pengeluaran},-
                </h3>
                <div>
                  <span className="title-sm text-ungu fw-bold" tabIndex="0">
                    {this.state.transaksiOut}
                  </span>
                  <span className="title-sm" tabIndex="0">
                    {" "}
                    Transaksi
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-5">
            <div
              className="col-12 d-flex justify-content-between align-items-center"
              tabIndex="0"
            >
              <h4>Ringkasan Transaksi</h4>
              <div className="wrapper-button d-flex">
                <ModalCreate
                  action={this.tambahItem}
                  category="IN"
                  variant="button btn-ungu px-3 py-2 me-2"
                  text="Pemasukan"
                  icon="bi bi-plus-circle-fill"
                  modalheading="Tambahkan Pemasukan"
                />
                <ModalCreate
                  action={this.tambahItem}
                  category="OUT"
                  variant="button btn-pink px-3 py-2"
                  text="Pengeluaran"
                  icon="bi bi-dash-circle-fill"
                  modalheading="Tambahkan Pengeluaran"
                />
              </div>
            </div>
          </div>

          <div className="row mt-4">
            {this.state.summary.length < 1 && <Alert />}
            {this.state.summary.map((sum, index) => {
              return (
                <div
                  key={index}
                  className="mb-3 col-12 d-flex justify-content-between align-items-center"
                >
                  <div className="d-flex align-items-center">
                    <div
                      className={
                        sum.category === "IN"
                          ? "icon-wrapper"
                          : "icon-wrapper-red"
                      }
                    >
                      <i
                        className={
                          sum.category === "IN"
                            ? "bi bi-wallet2"
                            : "bi bi-bag-dash"
                        }
                      ></i>
                    </div>
                    <div
                      className="transaction ms-3 d-flex flex-column"
                      tabIndex="0"
                    >
                      <h6>{sum.deskripsi}</h6>
                      <span className="title-sm" tabIndex="0">
                        {sum.tanggal}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <h5
                      className={sum.category === "IN" ? "in" : "out"}
                      tabIndex="0"
                    >
                      Rp. {sum.nominal},-
                    </h5>
                    <button
                      className="btn btn-danger ms-3"
                      onClick={() => this.hapusItem(index)}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

class Alert extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  render() {
    return <h1>Data Masih Kosong</h1>;
  }
}

export default App;
