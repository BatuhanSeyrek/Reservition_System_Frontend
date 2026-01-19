import React from "react";
import UserLayout from "./UserLayout";
import { ShieldCheck, Cpu, Target } from "lucide-react";

function About() {
  return (
    <UserLayout>
      <div className="min-h-screen bg-[#f8fafc] text-slate-900 py-16 px-4">

        {/* HERO */}
        <div className="max-w-5xl mx-auto text-center mb-20">
          <h1 className="text-5xl font-black tracking-tight text-slate-800 mb-6">
            Hakkımızda
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Geleceğin rezervasyon deneyimini bugünden inşa ediyoruz.
            <span className="text-slate-900 font-medium">
              {" "}Hız, güvenlik ve sadelik
            </span>{" "}
            üzerine kurulu modern bir dijital sistem.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-12">

          {/* FEATURES */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-8 w-1 bg-slate-800 rounded-full"></div>
              <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-wider text-sm">
                Öne Çıkan Özellikler
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  t: "Güvenli Kimlik Doğrulama",
                  d: "JWT tabanlı ve rol bazlı erişim kontrolü ile yüksek güvenlik."
                },
                {
                  t: "Akıllı Zaman Yönetimi",
                  d: "Çakışan randevuları otomatik engelleyen algoritmik yapı."
                },
                {
                  t: "Güçlü Yönetim Paneli",
                  d: "Verimlilik odaklı, sade ve kontrolü kolay admin arayüzü."
                },
                {
                  t: "Esnek Tanımlamalar",
                  d: "Koltuk, çalışan ve zaman dilimlerini dinamik olarak yönetin."
                },
                {
                  t: "Otomatik Bildirimler",
                  d: "Randevu öncesi e-posta hatırlatmaları ile unutulan işlemler yok."
                },
                {
                  t: "Ngrok ile Hızlı Erişim",
                  d: "Local ortamda geliştirilen backend servislerinin güvenli şekilde internete açılması."
                }
              ].map((item, i) => (
                <div
                  key={i}
                  className="group p-8 bg-white border border-slate-200 rounded-3xl transition-all duration-300
                             hover:border-slate-400 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center mb-4
                                  group-hover:bg-slate-800 group-hover:text-white transition-colors">
                    <span className="text-sm font-bold">{i + 1}</span>
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2">{item.t}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.d}</p>
                </div>
              ))}
            </div>
          </section>

          {/* TECH & SECURITY */}
          <div className="grid md:grid-cols-2 gap-8">
            <section className="bg-slate-800 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
              <Cpu className="absolute -right-4 -bottom-4 w-32 h-32 text-slate-700 opacity-50" />
              <h2 className="text-xl font-bold mb-6">Teknolojik Mimari</h2>
              <p className="text-slate-300 leading-relaxed relative z-10">
                Backend tarafında <b>Spring Boot</b>, frontend tarafında <b>React.js</b> kullanılmıştır.
                Veritabanı olarak <b>PostgreSQL</b> tercih edilmiştir.
                <br /><br />
                Geliştirme ve test süreçlerinde <b>Ngrok</b> kullanılarak
                lokal backend servisleri güvenli bir şekilde dış dünyaya açılmış,
                frontend–backend entegrasyonu gerçek ortam senaryolarına uygun şekilde sağlanmıştır.
              </p>
            </section>

            <section className="bg-white border border-slate-200 p-10 rounded-[2.5rem] shadow-sm relative overflow-hidden">
              <ShieldCheck className="absolute -right-4 -bottom-4 w-32 h-32 text-slate-100" />
              <h2 className="text-xl font-bold text-slate-800 mb-6">
                Güvenlik & Performans
              </h2>
              <p className="text-slate-500 leading-relaxed relative z-10">
                Rol bazlı erişim kontrolü (RBAC), güvenli token yönetimi ve
                optimize edilmiş API çağrıları sayesinde sistem hem güvenli
                hem de yüksek performanslı bir deneyim sunar.
              </p>
            </section>
          </div>

          {/* MISSION */}
          <section className="bg-slate-100 border border-slate-200 rounded-[2.5rem] p-12 text-center">
            <Target className="w-12 h-12 text-slate-800 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Misyonumuz
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed max-w-3xl mx-auto">
              Randevu süreçlerini dijital sadelikle yeniden tanımlamak.
              İşletmelerin zamanını, kullanıcıların konforunu merkeze alan
              sürdürülebilir ve güvenilir çözümler üretmek.
              <span className="block mt-4 font-semibold text-slate-800">
                Dijital dönüşümde güçlü bir altyapı sunuyoruz.
              </span>
            </p>
          </section>

        </div>
      </div>
    </UserLayout>
  );
}

export default About;
