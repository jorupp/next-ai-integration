'use server';

export const today = () => {
    (global as any).__MAGIC_VALUE_SA = 'server-action';
    console.log(`server-action - ${process.pid} - ${process.title} - ${process.env.NEXT_RUNTIME}`);
    console.log(`  global names: ${Object.entries(global).map(([k]) => k).sort()}.`);

    new Date().getTime();
}