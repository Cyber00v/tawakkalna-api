import { defineConfig } from "tsup";
export default defineConfig({
  target: "es2022",
  format: ["cjs", "esm"],
  splitting: false,
  sourcemap: false,
  clean: true,
  dts: true,
});
