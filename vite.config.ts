import preact from "@preact/preset-vite"
import {resolve} from "path"
import {defineConfig} from "vite"
import stylex from "vite-plugin-stylex"

export default defineConfig({
    plugins: [preact(), stylex()],
    root: "src/frontend",
    resolve: {alias: [{find: "~", replacement: resolve(__dirname, "src/frontend")}]},
    build: {outDir: "../../dist", emptyOutDir: true},
    publicDir: "../../public",
})
