"use client";

import * as Avatar from "@radix-ui/react-avatar";
import * as Tabs from "@radix-ui/react-tabs";
import * as Tooltip from "@radix-ui/react-tooltip";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  Building2,
  CalendarDays,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  ImagePlus,
  LayoutDashboard,
  LoaderCircle,
  Menu,
  MessageCircleMore,
  Save,
  Settings2,
  Stethoscope,
  UsersRound,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";

type Clinic = {
  id?: string;
  nombre: string;
  logo_url: string;
  whatsapp_numero: string;
  instance_evo?: string;
  activa?: boolean;
};

type SaveState =
  | { status: "idle" }
  | { status: "saving" }
  | { status: "saved" }
  | { status: "error"; message: string };

const EMPTY_CLINIC: Clinic = {
  nombre: "",
  logo_url: "",
  whatsapp_numero: "",
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

const menu = [
  { label: "Resumen", icon: LayoutDashboard },
  { label: "Agenda", icon: CalendarDays },
  { label: "Pacientes", icon: UsersRound },
  { label: "Profesionales", icon: Stethoscope },
];

export function ClinicSettings() {
  const [clinic, setClinic] = useState<Clinic>(EMPTY_CLINIC);
  const [initialClinic, setInitialClinic] = useState<Clinic>(EMPTY_CLINIC);
  const [saveState, setSaveState] = useState<SaveState>({ status: "idle" });
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isDirty = useMemo(
    () => JSON.stringify(clinic) !== JSON.stringify(initialClinic),
    [clinic, initialClinic],
  );

  useEffect(() => {
    const controller = new AbortController();
    const loadClinic = async () => {
      try {
        const token = window.localStorage.getItem("access_token");
        if (!token) {
          setLoading(false);
          return;
        }
        const response = await fetch(`${API_URL}/clinica`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("No pudimos cargar la configuración.");
        const data = (await response.json()) as Partial<Clinic>;
        const normalized = {
          ...EMPTY_CLINIC,
          ...data,
          logo_url: data.logo_url ?? "",
          whatsapp_numero: data.whatsapp_numero ?? "",
        };
        setClinic(normalized);
        setInitialClinic(normalized);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setSaveState({
          status: "error",
          message:
            error instanceof Error ? error.message : "Ocurrió un error inesperado.",
        });
      } finally {
        setLoading(false);
      }
    };
    void loadClinic();
    return () => controller.abort();
  }, []);

  const updateField = (field: keyof Clinic, value: string) => {
    setClinic((current) => ({ ...current, [field]: value }));
    setSaveState({ status: "idle" });
  };

  const save = async (event: FormEvent) => {
    event.preventDefault();
    setSaveState({ status: "saving" });
    try {
      const token = window.localStorage.getItem("access_token");
      if (!token) throw new Error("Tu sesión venció. Volvé a iniciar sesión.");
      const response = await fetch(`${API_URL}/clinica`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre: clinic.nombre.trim(),
          logo_url: clinic.logo_url.trim(),
          whatsapp_numero: clinic.whatsapp_numero.trim(),
        }),
      });
      if (!response.ok) throw new Error("No pudimos guardar los cambios.");
      const saved = (await response.json()) as Clinic;
      const normalized = {
        ...clinic,
        ...saved,
        logo_url: saved.logo_url ?? "",
        whatsapp_numero: saved.whatsapp_numero ?? "",
      };
      setClinic(normalized);
      setInitialClinic(normalized);
      setSaveState({ status: "saved" });
      window.setTimeout(() => setSaveState({ status: "idle" }), 2600);
    } catch (error) {
      setSaveState({
        status: "error",
        message:
          error instanceof Error ? error.message : "Ocurrió un error inesperado.",
      });
    }
  };

  return (
    <Tooltip.Provider delayDuration={250}>
      <div className="min-h-screen lg:grid lg:grid-cols-[272px_1fr]">
        <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        <main className="min-w-0">
          <header className="topbar">
            <button
              className="icon-button lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú"
            >
              <Menu size={20} />
            </button>
            <div className="hidden text-sm text-ink-muted sm:block">
              Panel de recepción <span className="mx-2 text-line">/</span>{" "}
              <strong className="font-semibold text-ink">Configuración</strong>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button className="icon-button" aria-label="Ayuda">
                    <CircleHelp size={18} />
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content className="tooltip" sideOffset={8}>
                    Centro de ayuda
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
              <button className="icon-button relative" aria-label="Notificaciones">
                <Bell size={18} />
                <span className="notification-dot" />
              </button>
              <Avatar.Root className="avatar">
                <Avatar.Image src="" alt="María" />
                <Avatar.Fallback>MC</Avatar.Fallback>
              </Avatar.Root>
            </div>
          </header>

          <div className="mx-auto max-w-[1180px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.2, 0.75, 0.2, 1] }}
            >
              <div className="eyebrow">Espacio de trabajo</div>
              <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                Configuración
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-ink-muted sm:text-base">
                Administrá la identidad y los canales de contacto de tu clínica.
              </p>
            </motion.div>

            <Tabs.Root defaultValue="general" className="mt-10">
              <Tabs.List className="tabs-list" aria-label="Secciones de configuración">
                <Tabs.Trigger className="tab" value="general">
                  General
                </Tabs.Trigger>
                <Tabs.Trigger className="tab" value="team">
                  Profesionales
                </Tabs.Trigger>
                <Tabs.Trigger className="tab" value="hours">
                  Horarios
                </Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content value="general">
                <form onSubmit={save} className="mt-8 space-y-6">
                  <motion.section
                    className="settings-card"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 }}
                  >
                    <div className="card-heading">
                      <div className="card-icon">
                        <Building2 size={20} />
                      </div>
                      <div>
                        <h2>Identidad de la clínica</h2>
                        <p>Esta información aparece en links y comunicaciones.</p>
                      </div>
                    </div>

                    {loading ? (
                      <div className="flex h-48 items-center justify-center text-accent">
                        <LoaderCircle className="animate-spin" />
                      </div>
                    ) : (
                      <div className="card-body grid gap-8 md:grid-cols-[180px_1fr]">
                        <div>
                          <label className="field-label">Logo</label>
                          <div className="logo-preview">
                            {clinic.logo_url ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={clinic.logo_url} alt="Logo de la clínica" />
                            ) : (
                              <span className="font-display text-4xl font-bold">
                                {clinic.nombre.slice(0, 1).toUpperCase() || "C"}
                              </span>
                            )}
                          </div>
                          <div className="mt-3 flex items-center gap-2 text-xs text-ink-muted">
                            <ImagePlus size={14} />
                            Vista previa
                          </div>
                        </div>
                        <div className="space-y-5">
                          <Field
                            id="nombre"
                            label="Nombre de la clínica"
                            value={clinic.nombre}
                            placeholder="Ej. Clínica Aurora"
                            onChange={(value) => updateField("nombre", value)}
                            required
                          />
                          <Field
                            id="logo"
                            label="URL del logo"
                            value={clinic.logo_url}
                            placeholder="https://..."
                            onChange={(value) => updateField("logo_url", value)}
                            type="url"
                            hint="Usá una imagen cuadrada de al menos 256 × 256 px."
                          />
                        </div>
                      </div>
                    )}
                  </motion.section>

                  <motion.section
                    className="settings-card"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.16 }}
                  >
                    <div className="card-heading">
                      <div className="card-icon card-icon-green">
                        <MessageCircleMore size={20} />
                      </div>
                      <div>
                        <h2>Canal de WhatsApp</h2>
                        <p>Número asociado a la atención y los agendamientos.</p>
                      </div>
                    </div>
                    <div className="card-body max-w-2xl">
                      <Field
                        id="whatsapp"
                        label="Número de WhatsApp"
                        value={clinic.whatsapp_numero}
                        placeholder="+54 9 11 1234 5678"
                        onChange={(value) =>
                          updateField("whatsapp_numero", value)
                        }
                        hint="Incluí el código de país y de área."
                      />
                      <div className="connection-row">
                        <span className="status-pulse" />
                        <span>
                          {clinic.activa === false
                            ? "Integración pausada"
                            : "Canal preparado para recibir mensajes"}
                        </span>
                        {clinic.instance_evo && (
                          <code className="ml-auto hidden sm:block">
                            {clinic.instance_evo}
                          </code>
                        )}
                      </div>
                    </div>
                  </motion.section>

                  <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
                    <AnimatePresence mode="wait">
                      {saveState.status === "error" && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="mr-auto text-sm text-danger"
                          role="alert"
                        >
                          {saveState.message}
                        </motion.p>
                      )}
                      {saveState.status === "saved" && (
                        <motion.p
                          initial={{ opacity: 0, x: 5 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          className="mr-auto flex items-center gap-2 text-sm text-success"
                          role="status"
                        >
                          <Check size={16} /> Cambios guardados
                        </motion.p>
                      )}
                    </AnimatePresence>
                    <button
                      type="button"
                      className="button-secondary"
                      disabled={!isDirty || saveState.status === "saving"}
                      onClick={() => setClinic(initialClinic)}
                    >
                      Descartar
                    </button>
                    <button
                      type="submit"
                      className="button-primary"
                      disabled={
                        !isDirty ||
                        !clinic.nombre.trim() ||
                        saveState.status === "saving"
                      }
                    >
                      {saveState.status === "saving" ? (
                        <LoaderCircle size={17} className="animate-spin" />
                      ) : (
                        <Save size={17} />
                      )}
                      Guardar cambios
                    </button>
                  </div>
                </form>
              </Tabs.Content>

              <Tabs.Content value="team">
                <EmptySection
                  icon={Stethoscope}
                  title="Profesionales"
                  description="La gestión del equipo estará disponible cuando el endpoint de profesionales esté habilitado."
                />
              </Tabs.Content>
              <Tabs.Content value="hours">
                <EmptySection
                  icon={Clock3}
                  title="Horarios de atención"
                  description="La configuración de disponibilidad se conectará al módulo de horarios."
                />
              </Tabs.Content>
            </Tabs.Root>
          </div>
        </main>
      </div>
    </Tooltip.Provider>
  );
}

function Field({
  id,
  label,
  value,
  placeholder,
  onChange,
  type = "text",
  hint,
  required,
}: {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  type?: string;
  hint?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="field-label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="field-input"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        type={type}
        required={required}
      />
      {hint && <p className="mt-2 text-xs text-ink-muted">{hint}</p>}
    </div>
  );
}

function EmptySection({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Stethoscope;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      className="empty-section"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="card-icon">
        <Icon size={22} />
      </div>
      <h2 className="mt-5 text-lg font-bold text-ink">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-ink-muted">
        {description}
      </p>
    </motion.div>
  );
}

function Sidebar({
  mobileOpen,
  onClose,
}: {
  mobileOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {mobileOpen && (
        <button
          className="fixed inset-0 z-40 bg-ink/35 backdrop-blur-sm lg:hidden"
          aria-label="Cerrar menú"
          onClick={onClose}
        />
      )}
      <aside
        className={`sidebar ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex h-[78px] items-center border-b border-white/10 px-6">
          <div className="brand-mark">A</div>
          <div className="ml-3">
            <div className="font-display text-lg font-bold leading-none text-white">
              Aurora
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/45">
              Clínica
            </div>
          </div>
          <button
            className="ml-auto rounded-lg p-2 text-white/60 lg:hidden"
            onClick={onClose}
            aria-label="Cerrar menú"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="p-4">
          <div className="sidebar-label">Gestión</div>
          {menu.map(({ label, icon: Icon }) => (
            <button className="sidebar-item" key={label}>
              <Icon size={18} />
              {label}
              <ChevronRight className="ml-auto opacity-0" size={15} />
            </button>
          ))}
          <div className="sidebar-label mt-8">Administración</div>
          <button className="sidebar-item sidebar-item-active">
            <Settings2 size={18} />
            Configuración
            <ChevronRight className="ml-auto" size={15} />
          </button>
        </nav>
        <div className="mt-auto border-t border-white/10 p-4">
          <div className="rounded-xl bg-white/[0.06] p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-white/85">
              <span className="status-pulse" />
              WhatsApp conectado
            </div>
            <p className="mt-2 text-[11px] leading-5 text-white/40">
              La recepción automática está activa.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
