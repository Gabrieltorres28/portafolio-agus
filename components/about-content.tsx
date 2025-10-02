"use client";

export default function AboutContent() {
  return (
    <section className="grid gap-6 md:grid-cols-2">
      <div className="rounded-2xl border bg-white dark:bg-[#0F172A] border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold mb-2">Quién soy</h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Soy Analista de Sistemas con foco en tecnología cívica. Desarrollo
          software para municipios con Next.js, Tailwind y Prisma, orientado a
          transparencia y participación ciudadana.
        </p>
      </div>

      <div className="rounded-2xl border bg-white dark:bg-[#0F172A] border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold mb-2">Stack</h3>
        <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
          <li>Next.js 14 · React 18</li>
          <li>Tailwind · shadcn/ui</li>
          <li>Prisma · Postgres</li>
          <li>Vercel · CI/CD</li>
        </ul>
      </div>

      <div className="rounded-2xl border bg-white dark:bg-[#0F172A] border-gray-200 dark:border-gray-700 p-6 md:col-span-2">
        <h3 className="text-lg font-semibold mb-2">Proyectos</h3>
        <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
          <li>Presupuesto Participativo Municipal (roles, votación, ranking)</li>
          <li>Digesto Jurídico (carga, clasificación, búsqueda por ramas)</li>
          <li>Landing institucional con datos en tiempo real</li>
        </ul>
      </div>
    </section>
  );
}
