export default function HomePage() {}

export async function getServerSideProps(context: any) {
  return { redirect: { destination: '/dashboard', permanent: false } };
}
