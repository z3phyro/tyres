import { useNavigate } from "@solidjs/router";
import { pathGet } from "@z3phyro/tyres-core";
import { TDataNode } from "@z3phyro/tyres-core/lib/types";
import { createResource } from "solid-js";
import { ROUTE_ACTION_NEW, ROUTE_PAGE_FEATURE_FLAGS } from "~/config/routes";
import { EUiVariant } from "~/core/types/ui-variants.type";
import FeatureFlagsService from "~/services/feature-flags.service";
import Button from "~/stories/components/button";
import TrashIcon from "~/stories/components/icons/trash.icon";
import Main from "~/stories/components/main";
import Switch from "~/stories/components/switch/switch";
import Table from "~/stories/components/table";
import { useDialog } from "~/stories/containers/dialog-provider/dialog-provider";
import SmartBreadcrumbs from "~/stories/containers/smart-breadcrumbs/smart-breadcrumbs";
import { useToast } from "~/stories/containers/toast-provider/toast-provider";

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
          onClick={() =>
            navigate(`${ROUTE_PAGE_FEATURE_FLAGS}/${ROUTE_ACTION_NEW}`)
          }
        >
          Add feature flag
        </Button>
      </div>
      <Table
        columns={[
          { name: "Feature" },
          ...environments().map((column, i) => ({
            name: column,
            renderCell: (data: any) => (
              <Switch
                class={i === 1 ? "ml-4" : "ml-8"}
                checked={data.value}
                onChange={(val) => handleChange(data.path, column, val)}
              />
            ),
          })),
        ]}
        data={
          all()?.list.map((path) => [
            path,
            ...environments().map((env) => ({
              path,
              env,
              value: !!pathGet(all()?.features[env] as TDataNode, path),
            })),
          ]) ?? []
        }
        actions={[
          {
            content: <TrashIcon />,
            hint: "Remove",
            action: (index: number) => handleRemove(all()?.list[index] ?? ""),
          },
        ]}
      />
    </Main>
  );
}
