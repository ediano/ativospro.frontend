import { PageProps } from "@/@types/global";

type Props = PageProps;

export default function DashboardPage({ params, ...props }: Props) {
  return (
    <>
      <main>Dashboard</main>
    </>
  );
}
