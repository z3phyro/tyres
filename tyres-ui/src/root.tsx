// @refresh reload
import { Suspense } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import "./root.css";
import TopMenu from "./stories/containers/top-menu";
import { ToastProvider } from "./stories/containers/toast-provider/toast-provider";
import { DialogProvider } from "./stories/containers/dialog-provider/dialog-provider";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>TyRes</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body class="h-full bg-gray-30">
        <Suspense>
          <ErrorBoundary>
            <TopMenu />
            <ToastProvider>
              <DialogProvider>
                <Routes>
                  <FileRoutes />
                </Routes>
              </DialogProvider>
            </ToastProvider>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
