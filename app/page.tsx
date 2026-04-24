"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export default function Home() {
  const [partidos, setPartidos] = useState<any[]>([]);
  const [usuarios, setUsuarios] = useState<any[]>([]);

  const [categoria, setCategoria] = useState("Todas");
  const [nivel, setNivel] = useState("Todos");

  useEffect(() => {
    const partidosQuery = query(
      collection(db, "PartidosFinSemana"),
      where("UsuarioInformaID", ">", "")
    );

    const unsubscribe = onSnapshot(partidosQuery, (querySnapshot) => {
      const lista: any[] = [];
      querySnapshot.forEach((doc) => {
        lista.push({ id: doc.id, ...doc.data() });
      });
      setPartidos(lista);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const usuariosQuery = query(
      collection(db, "usuarios"),
      orderBy("VisibilidadPLAN", "desc"),
      limit(20)
    );

    const unsubscribe = onSnapshot(usuariosQuery, (querySnapshot) => {
      const lista: any[] = [];
      querySnapshot.forEach((doc) => {
        lista.push({ id: doc.id, ...doc.data() });
      });
      setUsuarios(lista);
    });

    return () => unsubscribe();
  }, []);

  const ordenCategorias = [
    "Amateur",
    "Juvenil",
    "S16",
    "S15",
    "S14",
    "S13",
    "S12",
    "S11",
    "S10",
    "S9",
    "S8",
  ];

  const ordenNiveles = [
    "1 RFEF",
    "2 RFEF",
    "Lliga elit",
    "1 Catalana",
    "2 Catalana",
    "3 Catalana",
    "4 Catalana",
    "División de Honor",
    "Nacional",
    "Preferente",
    "1 División",
    "2 División",
  ];

  const categorias = useMemo(() => {
    const existentes = new Set(partidos.map((p) => p.Categoria).filter(Boolean));
    return ["Todas", ...ordenCategorias.filter((cat) => existentes.has(cat))];
  }, [partidos]);

  const niveles = useMemo(() => {
    const existentes = new Set(
      partidos.map((p) => p.NivelCategoria).filter(Boolean)
    );
    return ["Todos", ...ordenNiveles.filter((niv) => existentes.has(niv))];
  }, [partidos]);

  const partidosFiltrados = partidos.filter((p) => {
    const coincideCategoria = categoria === "Todas" || p.Categoria === categoria;
    const coincideNivel = nivel === "Todos" || p.NivelCategoria === nivel;
    return coincideCategoria && coincideNivel;
  });

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="RedFutbolPro"
              className="h-11 w-11 rounded-xl object-cover"
            />
            <div>
              <p className="text-lg font-black leading-none">RedFutbolPro</p>
              <p className="text-xs text-slate-400">Fútbol base y amateur</p>
            </div>
          </div>

          <div className="flex gap-2">
            <a
              href="#talento"
              className="rounded-xl border border-white/15 px-4 py-2 text-sm font-bold transition hover:bg-white/10"
            >
              Talento
            </a>
            <a
              href="#resultados"
              className="rounded-xl bg-green-500 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-green-400"
            >
              Resultados
            </a>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-green-500/20 blur-3xl" />

        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div className="relative">
            <div className="mb-5 inline-flex rounded-full border border-green-400/30 bg-green-400/10 px-4 py-2 text-sm font-bold text-green-300">
              Resultados en directo · Talento · Vacantes
            </div>

            <h1 className="text-5xl font-black leading-tight md:text-7xl">
              El fútbol base y amateur, conectado.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
              Encuentra jugadores, entrenadores, clubes, vacantes y sigue
              partidos en directo con informadores desde el campo.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://play.google.com/store/apps/details?id=com.mycompany.redfutbolpro"
                target="_blank"
                className="rounded-xl bg-green-500 px-6 py-3 font-bold text-slate-950 transition hover:bg-green-400"
              >
                Google Play
              </a>
              <a
                href="https://apps.apple.com/es/app/redfutbolpro/id6760297476"
                target="_blank"
                className="rounded-xl bg-white px-6 py-3 font-bold text-slate-950 transition hover:bg-slate-200"
              >
                App Store
              </a>
              <a
                href="#resultados"
                className="rounded-xl border border-white/20 px-6 py-3 font-bold transition hover:bg-white/10"
              >
                Ver resultados
              </a>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-black">{usuarios.length}</p>
                <p className="text-sm text-slate-400">perfiles mostrados</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-black">{partidos.length}</p>
                <p className="text-sm text-slate-400">con informador</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-black">{partidosFiltrados.length}</p>
                <p className="text-sm text-slate-400">partidos visibles</p>
              </div>
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">En directo</p>
                <h2 className="text-2xl font-black">Partidos informados</h2>
              </div>
              <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm font-bold text-green-300">
                LIVE
              </span>
            </div>

            {partidosFiltrados.slice(0, 3).length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/15 bg-slate-950/60 p-6 text-slate-300">
                Ahora mismo no hay partidos con informador.
                <br />
                Cuando un usuario informe un partido, aparecerá aquí en tiempo real.
              </div>
            ) : (
              <div className="space-y-3">
                {partidosFiltrados.slice(0, 3).map((p) => (
                  <div
                    key={p.id}
                    className="rounded-2xl border border-white/10 bg-slate-950/70 p-4"
                  >
                    <p className="text-xs font-bold text-green-400">
                      {p.FinPartido ? "Finalizado" : "En directo"}
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      {p.Categoria} · {p.NivelCategoria} · {p.HoraPartido}
                    </p>
                    <p className="mt-2 font-black">
                      {p.EquipoA} vs {p.EquipoB}
                    </p>
                    <p className="mt-2 text-2xl font-black">
                      {p.ResultadoA} - {p.ResultadoB}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section
        id="resultados"
        className="scroll-mt-24 border-t border-white/10 bg-slate-950/60"
      >
        <div className="mx-auto max-w-7xl px-5 py-16">
          <div className="mb-8">
            <p className="mb-2 font-bold text-green-400">
              Actualización en tiempo real
            </p>
            <h2 className="text-4xl font-black">Resultados en directo</h2>
            <p className="mt-3 max-w-2xl text-slate-300">
              Solo se muestran partidos con informador asignado. Si no aparece
              un partido, todavía nadie lo está informando.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
            >
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              value={nivel}
              onChange={(e) => setNivel(e.target.value)}
              className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
            >
              {niveles.map((niv) => (
                <option key={niv} value={niv}>
                  {niv}
                </option>
              ))}
            </select>

            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-300">
              {partidosFiltrados.length} partidos encontrados
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {partidosFiltrados.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-6 text-slate-300 md:col-span-3">
                <p className="text-lg font-bold text-white">
                  No hay partidos disponibles con estos filtros.
                </p>
                <p className="mt-2">
                  Solo se muestran partidos con informador en directo ⚽
                </p>
                <p className="mt-2 text-green-400">
                  ¿Vas a ver o jugar un partido? Sé el primero en informar desde
                  la app.
                </p>
              </div>
            ) : (
              partidosFiltrados.map((p) => (
                <div
                  key={p.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:bg-white/10"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="rounded-full bg-green-500/15 px-3 py-1 text-xs font-bold text-green-300">
                      {p.FinPartido ? "Finalizado" : "En directo"}
                    </p>
                    <p className="text-sm text-slate-400">{p.HoraPartido}</p>
                  </div>

                  <p className="mt-4 text-xs text-slate-400">
                    {p.Categoria} · {p.NivelCategoria} · Grupo {p.Grupo}
                  </p>

                  <h3 className="mt-2 text-xl font-black leading-snug">
                    {p.EquipoA} vs {p.EquipoB}
                  </h3>

                  <p className="mt-4 text-4xl font-black">
                    {p.ResultadoA} - {p.ResultadoB}
                  </p>

                  <p className="mt-3 text-sm text-slate-400">
                    {p.FechaPartido}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section
        id="talento"
        className="scroll-mt-24 border-t border-white/10 bg-[#050816]"
      >
        <div className="mx-auto max-w-7xl px-5 py-16">
          <div className="mb-8">
            <p className="mb-2 font-bold text-green-400">
              Talento RedFutbolPro
            </p>
            <h2 className="text-4xl font-black">
              Explora talento dentro de la app
            </h2>
            <p className="mt-3 max-w-3xl text-slate-300">
              Mostramos una selección de 20 perfiles destacados. Para ver más
              usuarios, filtrar por posición, rol, categoría o zona, y contactar
              por chat interno, descarga RedFutbolPro.
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="font-bold text-white">
              {usuarios.length} perfiles destacados
            </p>
            <p className="text-sm text-slate-400">
              La búsqueda completa y los filtros avanzados están disponibles en
              la app.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {usuarios.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-6 text-slate-300 md:col-span-3">
                <p className="text-lg font-bold text-white">
                  No hay perfiles disponibles ahora mismo.
                </p>
                <p className="mt-2">
                  Descarga la app para explorar el talento completo de
                  RedFutbolPro.
                </p>
              </div>
            ) : (
              usuarios.map((u) => (
                <div
                  key={u.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:bg-white/10"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={u.photo_url || "/logo.png"}
                      alt={u.display_name || "Perfil"}
                      className="h-16 w-16 rounded-2xl object-cover"
                    />

                    <div>
                      <h3 className="text-xl font-black">
                        {u.display_name || "Usuario RedFutbolPro"}
                      </h3>
                      <p className="text-sm font-bold text-green-400">
                        {u.rol}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-1 text-sm text-slate-300">
                    <p>
                      {u.Genero} · {u.categoria} · {u.NivelCategoria}
                    </p>
                    <p>
                      {u.provincia} · {u.municipio}
                    </p>

                    {u.rol === "Jugador" && u.PosicionPrincipal && (
                      <p>
                        Posición:{" "}
                        <span className="font-bold text-white">
                          {u.PosicionPrincipal}
                        </span>
                      </p>
                    )}

                    {u.rol === "Cuerpo técnico" && u.SubRolCTecnico && (
                      <p>
                        Staff:{" "}
                        <span className="font-bold text-white">
                          {u.SubRolCTecnico}
                        </span>
                      </p>
                    )}
                  </div>

                  {u.bio && (
                    <p className="mt-4 line-clamp-3 text-sm text-slate-400">
                      {u.bio}
                    </p>
                  )}

                  <div className="mt-5 rounded-xl bg-green-500/10 p-3 text-sm text-green-300">
                    Para contactar, descarga la app y usa el chat interno.
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-10 rounded-3xl bg-green-500 p-6 text-slate-950 md:p-8">
            <h3 className="text-2xl font-black">
              ¿Quieres ver más perfiles y contactar con ellos?
            </h3>
            <p className="mt-2 max-w-3xl">
              En RedFutbolPro puedes explorar más talento, ver trayectorias,
              filtrar usuarios y contactar por chat interno para crear
              oportunidades reales entre jugadores, entrenadores, clubes y
              staff.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="https://play.google.com/store/apps/details?id=com.mycompany.redfutbolpro"
                target="_blank"
                className="rounded-xl bg-slate-950 px-5 py-3 font-bold text-white transition hover:bg-slate-800"
              >
                Descargar en Google Play
              </a>
              <a
                href="https://apps.apple.com/es/app/redfutbolpro/id6760297476"
                target="_blank"
                className="rounded-xl bg-white px-5 py-3 font-bold text-slate-950 transition hover:bg-slate-200"
              >
                Descargar en App Store
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-slate-400">
        © 2026 RedFutbolPro · Fútbol base y amateur
      </footer>
    </main>
  );
}
