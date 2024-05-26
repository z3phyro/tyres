import { useNavigate } from "@solidjs/router";
import { pathGet } from "@z3phyro/tyres-core";
import { TDataNode } from "@z3phyro/tyres-core/lib/types";
import { createResource } from "solid-js";
import { ROUTE_ACTION_NEW, ROUTE_PAGE_FEATURE_FLAGS } from "~/config/routes";
import { EUiVariant } from "~/core/types/ui-variants.type";
import FeatureFlagsService from "~/services/feature-flags.service";
import Button from "~/stories/components/button";
import Card from "~/stories/components/card";
import TrashIcon from "~/stories/components/icons/trash.icon";
import Main from "~/stories/components/main";
import Switch from "~/stories/components/switch/switch";
import { useDialog } from "~/stories/containers/dialog-provider/dialog-provider";
import SmartBreadcrumbs from "~/stories/containers/smart-breadcrumbs/smart-breadcrumbs";
import { useToast } from "~/stories/containers/toast-provider/toast-provider";
import { capitalize } from "~/utils/slugify.helper";

export default function Page() {
  const [all, { refetch }] = createResource(async () => {
    const features = await FeatureFlagsService.getAll();
    const list = await FeatureFlagsService.getList();

    return { features, list };
  });

  const navigate = useNavigate();
  const dialog = useDialog();
  const toast = useToast();

  const actionRemove = async (path: string) => {
    await FeatureFlagsService.remove(path);
    toast.info({ title: "Feature removed" });
    refetch();
  };

  const handleRemove = async (path: string) => {
    dialog?.show({
      title: "Confirmation",
      description: "Are you sure you want to delete this feature-flag?",
      buttons: [
        {
          children: "Yes",
          variant: EUiVariant.Danger,
          onClick: () => actionRemove(path),
        },
        {
          children: "No",
          variant: EUiVariant.Neutral,
        },
      ],
    });
  };

  const handleChange = (path: string, environment: string, value: boolean) => {
    FeatureFlagsService.setValue(path, environment, value);
  };

  const environments = () => Object.keys(all()?.features ?? ({} as any));

  return (
    <Main>
      <div class="flex justify-between mb-4">
        <SmartBreadcrumbs />
        <Button
          class="mb-2"
          onClick={() => navigate(`${ROUTE_PAGE_FEATURE_FLAGS}/${ROUTE_ACTION_NEW}`)}>
          Add feature flag
        </Button>
      </div>
      <Card>
        <table class="w-full">
          <thead>
            <tr>
              <td class="text-gray-400 font-light">Feature name</td>
              {all() &&
                environments().map((env) => (
                  <th class="text-center">
                    <span class="rounded-xl py-1 px-3 bg-gray-200 font-light">
                      {capitalize(env)}
                    </span>
                  </th>
                ))}
              <td></td>
            </tr>
          </thead>
          <tbody>
            {all() &&
              all()?.list.map((path) => (
                <tr>
                  <td>{path}</td>
                  {environments().map((env) => (
                    <td class="text-center">
                      <div class="my-3">
                        <Switch
                          onChange={(val) => handleChange(path, env, val)}
                          checked={!!pathGet(all()?.features[env] as TDataNode, path)}
                        />
                      </div>
                    </td>
                  ))}
                  <td>
                    <span
                      role="button"
                      class="cursor-pointer hover:text-blue-500"
                      onClick={() => handleRemove(path)}>
                      <TrashIcon />
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Card>
    </Main>
  );
}
