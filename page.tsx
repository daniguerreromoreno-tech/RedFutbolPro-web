"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "./firebase";

type Partido = {
  id: string;
  EquipoA?: string;
  EquipoB?: string;
  ResultadoA?: number;
  ResultadoB?: number;
  FinPartido?: boolean;
};

export default function Home() {
  const [partidos, setPartidos] = useState<Partido[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "PartidosFinSemana"),
      where("UsuarioInformaID", "!=", "")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const lista: Partido[] = [];

      querySnapshot.forEach((doc) => {
        lista.push({ id: doc.id, ...(doc.data() as Omit<Partido, "id">) });
      });

      setPartidos(lista);
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <img
          src="/logo.png"
          alt="RedFutbolPro"
          className="h-20 mb-6 rounded-xl"
        />

        <h1 className="text-5xl font-black md:text-7xl">
          RedFutbolPro
        </h1>

        <p className="mt-5 max-w-3xl text-xl text-slate-300">
          La red para conectar jugadores, entrenadores, clubes y staff del fútbol base y amateur.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="https://play.google.com/store/apps/details?id=com.mycompany.redfutbolpro"
            target="_blank"
            className="rounded-xl bg-green-500 px-6 py-3 font-bold text-black hover:bg-green-400 transition"
          >
            Descargar en Google Play
          </a>

          <a
            href="https://apps.apple.com/es/app/redfutbolpro/id6760297476"
            target="_blank"
            className="rounded-xl bg-white px-6 py-3 font-bold text-black hover:bg-slate-200 transition"
          >
            Descargar en App Store
          </a>

          <a
            href="#resultados"
            className="rounded-xl border border-white/20 px-6 py-3 font-bold hover:bg-white/10 transition"
          >
            Ver resultados
          </a>
        </div>
      </section>

      {/* RESULTADOS */}
      <section id="resultados" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-4xl font-black">Resultados en directo</h2>

        <p className="mt-4 text-slate-400">
          Solo se muestran partidos con informador en directo.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {partidos.length === 0 ? (
            <p className="text-slate-400">
              No hay partidos en directo ahora mismo.
            </p>
          ) : (
            partidos.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:scale-105"
              >
                <p className="text-sm font-bold text-green-400">
                  {p.FinPartido ? "Finalizado" : "En directo"}
                </p>

                <h3 className="mt-2 text-lg font-bold">
                  {p.EquipoA} vs {p.EquipoB}
                </h3>

                <p className="mt-3 text-3xl font-black">
                  {p.ResultadoA ?? 0} - {p.ResultadoB ?? 0}
                </p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-slate-400">
        © 2026 RedFutbolPro
      </footer>
    </main>
  );
}
