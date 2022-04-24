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
import HeaderNavigation from "../../components/HeaderNavigation";
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";
//const SuccessGreeting = lazy(() => import("../../components/SuccessGreeting"))

export default function TicketOrder() {

  const {user} = useAuth0()

  let navigate = useNavigate()

  const [dataTenant, setDataTenant] = useState({
    nama_tenant: "",
    jasa: "",
    lokasi: "",
    hari_operasional: [],
    waktu_operasional: [],
    kuota_antrian: [],
    status: "",
    picture: "",
  });

  const [antrian, setAntrian] = useState({
    nomor_sekarang: 0,
    total_antrian: 0,
    nomor_selesai: 0,
    estimasi_antrian: "",
  });

  const [tanggalAntri, setTanggalAntri] = useState(
    moment().format("yyyy-MM-DD")
  );

  const dateNow = new Date().toISOString().split('T')[0]

  let params = useParams();

  function getIsBuka() {
    let waktu_buka,
      waktu_tutup,
      status = "tutup";
    const now = new Date();
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

  async function getEstimasi(day) {
    let estimasi;
    const waktu = dataTenant.waktu_operasional;
    const now = new Date();
    if (antrian.total_antrian === 0) {
      estimasi = now.setMinutes(now.getMinutes() + 5);
    } else {
      await getLastAntrian(params.tenantId, day).then((data) => {
        if (data.length !== 0) {
          data.forEach((element) => {
            estimasi = new Date(element.waktu_estimasi);
            if(now >= estimasi){
              estimasi = now.setMinutes(now.getMinutes() + 5);
            }else{
              estimasi.setMinutes(estimasi.getMinutes() + 5);
            }
          });
        }
      });
    }
    return estimasi;
  }

  async function getAntrian(tenantId) {
    let nomor, jumlah, selesai, estimasi;
    await getAntrianAktif(tenantId, dateNow).then((data) => {
      if (data.length !== 0) {
        data.forEach((element) => {
          nomor = element.nomor_antrian;
        });
      } else {
        nomor = 0;
      }
    });
    await getAntrianAll(tenantId, dateNow).then((data) => {
      jumlah = data.length;
    });
    await getAntrianSelesai(tenantId, dateNow).then((data) => {
      selesai = data.length;
    });
    estimasi = await getEstimasi(dateNow);
    await setAntrian({
      ...antrian,
      nomor_sekarang: nomor,
      total_antrian: jumlah,
      nomor_selesai: selesai,
      estimasi_antrian: estimasi,
    });
  }

  async function ambilAntrian() {
    await getAntrian(params.tenantId);
    const exist = await getExistAntrian(params.tenantId, user.email, dateNow)
    const status = await getIsBuka()
    if(exist.length < 1 ) {
      const data = {
        nomor_antrian: parseInt(antrian.total_antrian) + 1,
        tanggal: new Date(),
        tenant_id: params.tenantId,
        user_id: user.email,
        nama: user.nickname,
        waktu_antri: new Date(),
        waktu_estimasi: new Date(antrian.estimasi_antrian),
        status: "Antri",
        media: "Online",
      };
      if(status === "buka"){
        await setAntrianBaru(params.tenantId, data);
        await toast.success("Anda berhasil mengambil antrian")
        await navigate("/queue")
      }else{
        toast.error("Dokter saat ini tutup");
      }
    } else {
      toast.error("Anda sudah mengantri")
    }
  }

  useEffect(() => {
    let mounted = true;
    getTenant(params.tenantId).then((item) => {
      if (mounted) {
        setDataTenant(item);
      }
    });
    getAntrian(params.tenantId);
    return () => (mounted = false);
  }, []);

  return (
    <>
      <HeaderNavigation namaTenant={dataTenant.nama_tenant} />
      <div className="flex mt-16 mx-1 justify-center">
        <AmbilAntrianCard
          dataTenant={dataTenant}
          dataAntrian={antrian}
          // onChange={onChange}
          submitAntrian={ambilAntrian}
        />
      </div>
    </>
  );
}
