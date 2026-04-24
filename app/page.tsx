"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";

export default function Home() {
  const [partidos, setPartidos] = useState<any[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "PartidosFinSemana"),
      where("UsuarioInformaID", "!=", "")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const lista: any[] = [];
      querySnapshot.forEach((doc) => {
        lista.push({ id: doc.id, ...doc.data() });
      });
      setPartidos(lista);
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <img src="/logo.png" className="h-20 mb-6 rounded-xl" />

        <h1 className="text-5xl font-black md:text-7xl">
          RedFutbolPro
        </h1>

        <p className="mt-5 max-w-3xl text-xl text-slate-300">
          La red para conectar jugadores, entrenadores, clubes y staff del fútbol base y amateur.
        </p>

        <div className="mt-8 flex gap-4 flex-wrap">
          <a
            href="https://play.google.com/store/apps/details?id=com.mycompany.redfutbolpro"
            target="_blank"
            className="rounded-xl bg-green-500 px-6 py-3 font-bold text-black"
          >
            Descargar en Google Play
          </a>

          <a
            href="https://apps.apple.com/es/app/redfutbolpro/id6760297476"
            target="_blank"
            className="rounded-xl bg-white px-6 py-3 font-bold text-black"
          >
            Descargar en App Store
          </a>

          <a
            href="#resultados"
            className="rounded-xl border border-white/20 px-6 py-3 font-bold"
          >
            Ver resultados
          </a>
        </div>
      </section>

      <section id="resultados" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-4xl font-black">Resultados en directo</h2>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {partidos.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <p className="text-green-400 text-sm font-bold">
                {p.FinPartido ? "Finalizado" : "En directo"}
              </p>

              <h3 className="mt-2 text-lg font-bold">
                {p.EquipoA} vs {p.EquipoB}
              </h3>

              <p className="text-3xl font-black mt-3">
                {p.ResultadoA} - {p.ResultadoB}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
