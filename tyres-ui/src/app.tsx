import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import TopMenu from "./stories/containers/top-menu";
import { DialogProvider } from "./stories/containers/dialog-provider/dialog-provider";
import { ToastProvider } from "./stories/containers/toast-provider/toast-provider";
import Sidebar from "./stories/components/sidebar/sidebar";

export default function App() {
  return (
    <Router
      root={(props) => (
        <>
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
