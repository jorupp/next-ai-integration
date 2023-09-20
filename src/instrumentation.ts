export function register() {
    (global as any).__MAGIC_VALUE_INSTR = 'instrumentation';
    console.log(`instrumentation.register() - process.title: ${process.title}.`);
    console.log(`  global names: ${Object.entries(global).map(([k]) => k).sort()}.`);
}