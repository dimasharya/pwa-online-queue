import { useAuth0 } from "@auth0/auth0-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getAntrianAktif,
  getAntrianAll,
  getAntrianSelesai,
  getExistAntrian,
  getLastAntrian,
  setAntrianBaru,
} from "../../api/Antrian";
import { getTenant } from "../../api/Tenant";
import AmbilAntrianCard from "../../components/AmbilAntrianCard";
import AmbilAntrianSkeleton from "../../components/AmbilAntrianSkeleton";
import HeaderNavigation from "../../components/HeaderNavigation";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getRekamMedis } from "../../api/RekamMedis";

export default function TicketOrder() {
  const { user } = useAuth0();

  let navigate = useNavigate();

  const [isLoading, setLoading] = useState(true);

  const [dataTenant, setDataTenant] = useState({
    nama_tenant: "",
    jasa: "",
    lokasi: "",
    hari_operasional: [""],
    waktu_operasional: [""],
    kuota_antrian: [""],
    status: "",
    picture: "",
  });

  const [antrian, setAntrian] = useState({
    nomor_sekarang: 0,
    total_antrian: 0,
    nomor_selesai: 0,
    estimasi_antrian: "",
  });

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      await getTenant(params.tenantId).then((item) => {
        if (mounted) {
          setDataTenant(item);
        }
      });
    };
    fetchData();
    setLoading(false);
    return () => (mounted = false);
  }, []);

  // const dateNow = new Date().toISOString().split("T")[0];

  const [tanggalAntri, setTanggalAntri] = useState(
  );

  useEffect(() => {
    const fetchData = async () => {
      await getAntrian(params.tenantId);
    };
    fetchData();
  }, [tanggalAntri]);

  function onChange(props) {
    setTanggalAntri(props);
  }

  let params = useParams();

  function getIsBuka() {
    let waktu_buka,
      waktu_tutup,
      status = "tutup";
    const now = new moment().format();
    for (let i = 0; i < dataTenant.waktu_operasional.length; i++) {
      const strbuka = dataTenant.waktu_operasional[i].split("-");
      const strbuka2 = strbuka[0].split(":");
      waktu_buka = new Date();
      waktu_buka.setHours(strbuka2[0], strbuka2[1], "00");
      const strtutup = strbuka[1].split(":");
      waktu_tutup = new Date();
      waktu_tutup.setHours(strtutup[0], strtutup[1], "00");
      if (waktu_buka <= now && waktu_tutup > now) {
        status = "buka";
        break;
      }
    }
    return status;
  }

  async function getAntrian(tenantId) {
    let nomor, jumlah, selesai, estimasi;
    const dateDay = moment(tanggalAntri).format("yyyy-MM-DD");
    await getAntrianAktif(tenantId, dateDay).then((data) => {
      if (data.length !== 0) {
        data.forEach((element) => {
          nomor = element.nomor_antrian;
        });
      } else {
        nomor = 0;
      }
    });
    await getAntrianAll(tenantId, dateDay).then((data) => {
      jumlah = data.length;
    });
    await getAntrianSelesai(tenantId, dateDay).then((data) => {
      selesai = data.length;
    });
    estimasi = await getEstimasi(dateDay, jumlah);
    return setAntrian({
      nomor_sekarang: nomor,
      total_antrian: jumlah,
      nomor_selesai: selesai,
      estimasi_antrian: estimasi,
    });
  }

  async function getEstimasi(day, jumlah) {
    let estimasi,
      waktu = [];
    // ambil jam opersional
    await dataTenant.waktu_operasional.map((item, idx) => {
      let jamwaktu = [];
      const wkt1 = item.split("-");
      for (let i = 0; i < wkt1.length; i++) {
        const wkt2 = wkt1[i].split(":");
        jamwaktu.push(wkt2[0]);
      }
      waktu[idx] = { buka: jamwaktu[0], tutup: jamwaktu[1] };
    });
    const dateDay = new Date(day);
    const today = new Date();
    if (jumlah === 0) {
      for (let i = 0; i < waktu.length; i++) {
        // apabila antrian pada hari ini dan gaada yg antri
        if (dateDay.getDate() === today.getDate()) {
          // console.log(`today${i}`);
          // apabila antrian pada hari ini jam ambil antrian sebelum buka dan gaada yg antri
          if (today.getHours() < waktu[i].buka) {
            estimasi = today.setHours(waktu[i].buka, "00", "00");
            // console.log(
            //   "render apabila antrian pada hari ini jam ambil antrian sebelum buka dan gaada yg antri"
            // );
            // console.log(`sebelum${i}`);
            break;
            // apabila antrian pada hari ini jam ambil antrian setelah buka dan gaada yg antri
          } else if (
            today.getHours() > waktu[i].buka &&
            today.getHours() < waktu[i].tutup
          ) {
            estimasi = today.setMinutes(today.getMinutes() + 5);
            // console.log(
            //   "render apabila antrian pada hari ini jam ambil antrian setelah buka dan gaada yg antri"
            // );
            // console.log(`pas${i}`);
            break;
          }
          // else{
          //   console.log(`today setelah tutup${i}`);
          // }
        } else {
          if (
            dateDay.getDate() === today.getDate() &&
            today.getHours() > waktu[i].tutup
          ) {
            estimasi = "";
            break;
          } else {
            estimasi = dateDay.setHours(waktu[i].buka, "00", "00");
            // console.log(
            //   "render apabila antrian bukan hari ini jam ambil antrian sebelum buka dan gaada yg antri"
            // );
            // console.log(`hari lain${i}`);
            break;
          }
        }
      }
    } else {
      // apabila terdapat antrian
      await getLastAntrian(params.tenantId, day).then((data) => {
        if (data.length !== 0) {
          data.forEach((element) => {
            const est = new Date(element.waktu_estimasi);
            for (let i = 0; i < waktu.length; i++) {
              // apabila antri hari ini dan waktu antri melebihi jam antrian terakhir
              if (dateDay.getDate() === today.getDate()) {
                if (today.getHours() < waktu[i].buka) {
                  // console.log(
                  //   "render terdapat antrian dan waktu ambil sebelum jam antri terakhir"
                  // );
                  estimasi = dateDay.setHours(waktu[i].buka, "00", "00");
                  break;
                } else if (today.getHours() > waktu[i].buka) {
                  // console.log(
                  //   "render terdapat antrian dan waktu ambil hari ini melebihi jam antri terakhir"
                  // );
                  estimasi = today.setMinutes(today.getMinutes() + 5);
                  break;
                } else {
                  est.setMinutes(est.getMinutes() + 5);
                  estimasi = est;
                  // console.log("render ada antrian dan antri sebelum");
                }
              } else {
                est.setMinutes(est.getMinutes() + 5);
                estimasi = est;
                // console.log("render ada antrian dan antri sebelum");
              }
              // console.log(`render iterasi ${i}`);
            }
          });
        }
      });
    }
    return estimasi;
  }

  async function ambilAntrian() {
    await getAntrian(params.tenantId);
    let exist;
    await getExistAntrian(params.tenantId, user.email, tanggalAntri).then(
      (res) => {
        res.length !== 0 ? (exist = true) : (exist = false);
      }
    );
    //const status = await getIsBuka()
    const dataRekam = await getRekamMedis(user.email);

    if (dataRekam) {
      let dataRekamMedis;
      await getRekamMedis(user.email).then((res) => (dataRekamMedis = res));
      if (exist === false) {
        const data = {
          nomor_antrian: parseInt(antrian.total_antrian) + 1,
          tanggal: moment(tanggalAntri).format(),
          tenant_id: params.tenantId,
          user_id: user.email,
          nama: dataRekamMedis.nama,
          alamat: dataRekamMedis.alamat,
          no_telepon: dataRekamMedis.no_telepon,
          nomor_rekam: dataRekamMedis.nomor_rekam,
          waktu_antri: moment(antrian.estimasi_antrian).format(),
          waktu_estimasi: moment(antrian.estimasi_antrian).format(),
          status: "Antri",
          media: "Online",
        };
        // if(status === "buka"){
        await setAntrianBaru(params.tenantId, data);
        await toast.success("Anda berhasil mengambil antrian");
        await navigate("/queue");
        // }else{
        //   toast.error("Dokter saat ini tutup");
        // }
      } else {
        await toast.error("Anda sudah mengantri");
      }
    } else {
      await toast.error("Lengkapi diri anda dahulu");
      await navigate("/account");
    }
  }

  return (
    <>
      <HeaderNavigation namaTenant={dataTenant.nama_tenant} />
      <div className="flex mt-16 mx-1 justify-center">
        {isLoading ? (
          <AmbilAntrianSkeleton />
        ) : (
          <AmbilAntrianCard
            dataTenant={dataTenant}
            dataAntrian={antrian}
            onChange={onChange}
            submitAntrian={ambilAntrian}
          />
        )}
      </div>
    </>
  );
}
