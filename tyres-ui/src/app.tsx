import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import { DialogProvider } from "./stories/containers/dialog-provider/dialog-provider";
import { ToastProvider } from "./stories/containers/toast-provider/toast-provider";
import Sidebar from "./stories/components/sidebar/sidebar";
import { Link, MetaProvider } from "@solidjs/meta";

export default function App() {
  return (
    <Router
      root={(props) => (
        <>
          <MetaProvider>
            <Link rel="icon" href="/favicon.svg" />
          </MetaProvider>
          <DialogProvider>
            <ToastProvider>
              <div class="flex h-screen">
                <Sidebar />
                <Suspense>{props.children}</Suspense>
              </div>
            </ToastProvider>
          </DialogProvider>
        </>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
