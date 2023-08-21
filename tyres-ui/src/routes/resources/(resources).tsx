import { A } from "solid-start";
import {
  ROUTE_PAGE_DICTIONARIES,
  ROUTE_PAGE_FEATURE_FLAGS,
  ROUTE_PAGE_I18N,
} from "~/config/routes";
import { ETerms } from "~/config/terms";
import Card from "~/stories/components/card";
import Main from "~/stories/components/main";
import SmartBreadcrumbs from "~/stories/containers/smart-breadcrumbs/smart-breadcrumbs";

export default function Page() {
  return (
    <Main>
      <SmartBreadcrumbs />
      <ul>
        <li>
          <A href={ROUTE_PAGE_I18N}>
            <Card>{ETerms.i18n}</Card>
          </A>
        </li>
        <li>
          <A href={ROUTE_PAGE_DICTIONARIES}>
            <Card>{ETerms.Dictionaries}</Card>
          </A>
        </li>
        <li>
          <A href={ROUTE_PAGE_FEATURE_FLAGS}>
            <Card>{ETerms.FeatureFlags}</Card>
          </A>
        </li>
      </ul>
    </Main>
  );
}